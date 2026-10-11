
"use client";

import { authClient } from "@/lib/auth-client";

const GoogleAndGitPage = () => {
  const signInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  const signInWithGithub = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });
  };

  return (
    <div className="flex w-full items-center justify-between gap-3">
      <button
        type="button"
        onClick={signInWithGoogle}
        className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-slate-300 px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
      >
        <span className="text-lg font-bold">G</span>
        Google
      </button>

      <button
        type="button"
        onClick={signInWithGithub}
        className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-slate-300 px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
      >
        <span className="text-lg font-bold">●</span>
        GitHub
      </button>
    </div>
  );
};

export default GoogleAndGitPage;
