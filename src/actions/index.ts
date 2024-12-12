'use server';

import { api } from '../../convex/_generated/api';
import { ConvexHttpClient } from 'convex/browser';

import { auth, clerkClient } from '@clerk/nextjs/server';

import type { Id } from '../../convex/_generated/dataModel';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const getDocuments = async (ids: Id<'documents'>[]) => {
  return await convex.query(api.documents.getByIds, { ids });
};

export const getUsers = async () => {
  const { sessionClaims } = await auth();

  const clerk = await clerkClient();

  const res = await clerk.users.getUserList({
    organizationId: [sessionClaims?.org_id as string],
  });

  const users = res.data.map((user) => ({
    id: user.id,
    name: user.fullName ?? 'Anonymous',
    avatar: user.imageUrl,
  }));

  return users;
};
