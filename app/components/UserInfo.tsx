"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const UserInfoPage = () => {
    const router=useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log(user, "user");


  const handleSignout = async () => {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        toast.success("Successfully signed out!");
        router.push("/signin")
    
      },
      onError: (ctx) => {
        toast.error(ctx.error.message || "Sign out failed");
      },
    },
  });
};
 
  return (
    <div>
      {user ? (
        <>

<div className="dropdown dropdown-end">
  <div
    tabIndex={0}
    role="button"
    className="flex items-center gap-3 rounded-full border border-base-300 bg-base-100 p-2 pr-4 shadow-sm transition-all duration-200 hover:shadow-md"
  >
    <div className="avatar">
      <div className="w-11 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
        <img
          alt={user?.name || "User avatar"}
          src={
            user?.image ||
            "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
          }
        />
      </div>
    </div>

    <div className="hidden text-left sm:block">
      <h2 className="max-w-32 truncate text-sm font-semibold text-base-content">
        {user?.name || "User"}
      </h2>
      <p className="text-xs text-base-content/60">My Account</p>
    </div>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 text-base-content/60"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19 9-7 7-7-7"
      />
    </svg>
  </div>

  <ul
    tabIndex={0}
    className="menu dropdown-content z-50 mt-3 w-72 rounded-2xl border border-base-300 bg-base-100 p-2 shadow-xl"
  >
    <li className="pointer-events-none mb-1">
      <div className="flex items-center gap-3 rounded-xl bg-base-200/60 p-3">
        <div className="avatar">
          <div className="w-12 rounded-full ring-2 ring-primary ring-offset-1 ring-offset-base-100">
            <img
              alt={user?.name || "User avatar"}
              src={
                user?.image ||
                "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
              }
            />
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-base-content">
            {user?.name || "User"}
          </p>
          <p className="truncate text-xs text-base-content/60">
            {user?.email}
          </p>
        </div>
      </div>
    </li>

    <li>
      <Link href="/profile" className="flex items-center gap-3 rounded-lg py-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.121 17.804A9 9 0 0 1 12 15a9 9 0 0 1 6.879 2.804M15 9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <span>My Profile</span>
      </Link>
    </li>

    <div className="my-1 border-t border-base-300" />

    <li>
      <button
        type="button"
        className="flex items-center gap-3 rounded-lg py-3 text-error hover:bg-error/10"
        onClick={handleSignout}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5m5 5H3"
          />
        </svg>
        <span>Sign Out</span>
      </button>
    </li>
  </ul>
</div>

</>
      ) : (
        <>
          {" "}
          <div className="space-x-2">
            <Link
              href="/signin"
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:border-red-500 hover:text-red-600"
            >
              সাইন ইন
            </Link>

            <Link
              href="/signup"
              className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              সাইন আপ
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default UserInfoPage;
