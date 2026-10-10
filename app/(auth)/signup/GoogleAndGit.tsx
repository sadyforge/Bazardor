
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
        provider: "github"
    })
}



  return (
    <div className="flex w-full justify-between items-center gap-3">
      <button
        type="button"
        onClick={signInWithGoogle}
        className="flex flex-1 items-center cursor-pointer justify-center gap-2 rounded-lg border border-slate-300 px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
      >
        <span className="text-lg font-bold">G</span>
        Google
      </button>

      <button
      onClick={signInWithGithub}
        type="button"
      
        className="flex flex-1  items-center cursor-pointer justify-center gap-2 rounded-lg border border-slate-300 px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 fill-current"
          aria-hidden="true"
        >
          <path d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.5-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 .1.77 2.04 3.25 1.44.1-.73.4-1.23.72-1.51-2.5-.28-5.13-1.25-5.13-5.56 0-1.23.44-2.24 1.16-3.03-.12-.29-.5-1.43.11-2.98 0 0 .95-.3 3.08 1.16a10.7 10.7 0 0 1 5.6 0c2.13-1.45 3.07-1.16 3.07-1.16.62 1.55.23 2.69.12 2.98.72.79 1.15 1.8 1.15 3.03 0 4.32-2.63 5.27-5.14 5.55.4.35.76 1.03.76 2.08v3.08c0 .3.2.65.78.54A11.2 11.2 0 0 0 12 .8Z" />
        </svg>
        GitHub
      </button>
    </div>
  );
};

export default GoogleAndGitPage;
