import { Liveblocks } from '@liveblocks/node';
import { ConvexHttpClient } from 'convex/browser';
import { auth, currentUser } from '@clerk/nextjs/server';

import { api } from '../../../../convex/_generated/api';

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const POST = async (req: Request) => {
  const { sessionClaims } = await auth();

  if (!sessionClaims) return new Response('Unauthorized.', { status: 401 });

  const user = await currentUser();

  if (!user) return new Response('Unauthorized.', { status: 401 });

  const { room } = await req.json();

  const document = await convex.query(api.documents.getById, { id: room });

  if (!document) return new Response('Not found.', { status: 404 });

  const isOwner = document.ownerId === user.id;
  const isOrgMem = !!(
    document.organizationId && document.organizationId === sessionClaims.org_id
  );

  if (!isOwner && !isOrgMem) {
    return new Response('Unauthorized.', { status: 401 });
  }

  const session = liveblocks.prepareSession(user.id, {
    userInfo: {
      name: user.fullName ?? 'Anonymous',
      avatar: user.imageUrl,
    },
  });

  session.allow(room, session.FULL_ACCESS);

  const { body, status } = await session.authorize();

  return new Response(body, { status });
};
