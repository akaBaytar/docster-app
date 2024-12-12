import { ConvexError, v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { paginationOptsValidator } from 'convex/server';

type OrganizationID = string | undefined;

export const create = mutation({
  args: {
    title: v.optional(v.string()),
    initialContent: v.optional(v.string()),
  },

  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) throw new ConvexError('No authorization.');

    const org_id = (user.organization_id ?? undefined) as OrganizationID;

    return await ctx.db.insert('documents', {
      title: args.title ?? 'Untitled Document',
      ownerId: user.subject,
      organizationId: org_id,
      initialContent: args.initialContent,
    });
  },
});

export const get = query({
  args: {
    paginationOpts: paginationOptsValidator,
    search: v.optional(v.string()),
  },

  handler: async (ctx, { paginationOpts, search }) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) throw new ConvexError('No authorization.');

    const org_id = (user.organization_id ?? undefined) as OrganizationID;

    if (search && org_id) {
      return await ctx.db
        .query('documents')
        .withSearchIndex('search_title', (q) =>
          q.search('title', search).eq('organizationId', org_id)
        )
        .paginate(paginationOpts);
    }

    if (search) {
      return await ctx.db
        .query('documents')
        .withSearchIndex('search_title', (q) =>
          q.search('title', search).eq('ownerId', user.subject)
        )
        .paginate(paginationOpts);
    }

    if (org_id) {
      return await ctx.db
        .query('documents')
        .withIndex('by_organization_id', (q) => q.eq('organizationId', org_id))
        .paginate(paginationOpts);
    }

    return await ctx.db
      .query('documents')
      .withIndex('by_owner_id', (q) => q.eq('ownerId', user.subject))
      .paginate(paginationOpts);
  },
});

export const getById = query({
  args: { id: v.id('documents') },

  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

export const getByIds = query({
  args: { ids: v.array(v.id('documents')) },

  handler: async (ctx, { ids }) => {
    const documents = [];

    for (const id of ids) {
      const document = await ctx.db.get(id);

      if (document) {
        documents.push({ id: document._id, name: document.title });
      } else {
        documents.push({ id, name: '*Removed Document*' });
      }
    }

    return documents;
  },
});

export const update = mutation({
  args: {
    id: v.id('documents'),
    title: v.string(),
  },

  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) throw new ConvexError('No authorization.');

    const org_id = (user.organization_id ?? undefined) as OrganizationID;

    const document = await ctx.db.get(args.id);

    if (!document) throw new ConvexError('Document not found.');

    const isOwner = document.ownerId === user.subject;
    const isOrgMember = !!(
      document.organizationId && document.organizationId === org_id
    );

    if (!isOwner && !isOrgMember) throw new ConvexError('No authorization.');

    return await ctx.db.patch(args.id, { title: args.title });
  },
});

export const remove = mutation({
  args: {
    id: v.id('documents'),
  },

  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) throw new ConvexError('No authorization.');

    const org_id = (user.organization_id ?? undefined) as OrganizationID;

    const document = await ctx.db.get(args.id);

    if (!document) throw new ConvexError('Document not found.');

    const isOwner = document.ownerId === user.subject;
    const isOrgMember = !!(
      document.organizationId && document.organizationId === org_id
    );

    if (!isOwner && !isOrgMember) throw new ConvexError('No authorization.');

    return await ctx.db.delete(args.id);
  },
});
