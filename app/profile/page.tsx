'use client';

import { authClient } from '@/lib/auth-client';
import React from 'react';
import Link from 'next/link';

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  if (isPending) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <div className="rounded-full bg-base-200 p-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 opacity-60"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.1a8.25 8.25 0 0115 0A17.9 17.9 0 0112 22.5a17.9 17.9 0 01-7.5-2.4z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold">Welcome Back!</h2>
        <p className="max-w-sm text-base-content/60">
          Please sign in to view your profile information.
        </p>
        <Link href="/sign-in" className="btn btn-primary rounded-xl px-8">
          Sign In
        </Link>
      </div>
    );
  }

  const joinedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Not available';

  const initials = user.name
    ?.trim()
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'U';

  return (
    <main className="min-h-screen bg-base-200/50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Account Dashboard
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            My Profile
          </h1>
          <p className="mt-2 text-base-content/60">
            Manage your account and personal information.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          <aside className="card h-fit overflow-hidden border border-base-300/70 bg-base-100 shadow-sm">
            <div className="h-28 bg-gradient-to-r from-primary to-secondary" />

            <div className="-mt-14 flex flex-col items-center px-6 pb-7">
              <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-base-100 bg-primary text-3xl font-bold text-primary-content shadow-md">
                {initials}
              </div>

              <h2 className="mt-4 text-center text-xl font-bold">
                {user.name || 'User'}
              </h2>

              <p className="mt-1 break-all text-center text-sm text-base-content/60">
                {user.email}
              </p>

              <div className="mt-4">
                {user.emailVerified ? (
                  <span className="badge badge-success badge-outline gap-1 py-3">
                    <span>✓</span> Verified Account
                  </span>
                ) : (
                  <span className="badge badge-warning badge-outline gap-1 py-3">
                    Email Not Verified
                  </span>
                )}
              </div>

              <div className="mt-6 w-full rounded-xl bg-base-200/70 p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-base-content/50">
                  Member Since
                </p>
                <p className="mt-2 text-sm font-semibold">{joinedDate}</p>
              </div>
            </div>
          </aside>

          <section className="space-y-6">
            <div className="card border border-base-300/70 bg-base-100 shadow-sm">
              <div className="border-b border-base-300/70 px-6 py-5">
                <h2 className="text-lg font-bold">Personal Information</h2>
                <p className="mt-1 text-sm text-base-content/60">
                  Your account details and information.
                </p>
              </div>

              <div className="space-y-5 p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-primary/10 p-3 text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.7}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.1a8.25 8.25 0 0115 0A17.9 17.9 0 0112 22.5a17.9 17.9 0 01-7.5-2.4z"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-base-content/50">Full Name</p>
                    <p className="mt-1 break-words font-semibold">
                      {user.name || 'Not provided'}
                    </p>
                  </div>
                </div>

                <div className="divider my-0 opacity-60" />

                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-primary/10 p-3 text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.7}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H3a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-base-content/50">
                      Email Address
                    </p>
                    <p className="mt-1 break-all font-semibold">{user.email}</p>
                  </div>
                </div>

                <div className="divider my-0 opacity-60" />

                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-primary/10 p-3 text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.7}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-base-content/50">
                      Account Created
                    </p>
                    <p className="mt-1 font-semibold">{joinedDate}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card border border-base-300/70 bg-base-100 shadow-sm">
              <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-bold">Account Settings</h2>
                  <p className="mt-1 text-sm text-base-content/60">
                    Keep your profile information up to date.
                  </p>
                </div>
                <Link
                  href="/profile/edit"
                  className="btn btn-primary rounded-xl"
                >
                  Edit Profile
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;