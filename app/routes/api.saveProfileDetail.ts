import { ActionFunction, json, redirect } from '@remix-run/node';
import prisma from "prisma/Prisma";

interface ProfileData {
  id: string;
  name: string;
  title: string;
  bio: string;
  email: string;
}

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const { data }: { data: ProfileData } = await request.json();

    if (!data.id || !data.name || !data.title || !data.bio || !data.email) {
      return json({ error: 'Missing required fields' }, { status: 400 });
    }

    const updatedProfile = await prisma.profile.update({
      where: { id: data.id },
      data: {
        name: data.name,
        title: data.title,
        bio: data.bio,
        email: data.email,
      },
    });

    return json({ success: true, profile: updatedProfile });
  } catch (error) {
    console.error('Error updating profile:', error);
    return json({ error: 'Failed to update profile' }, { status: 500 });
  }
};