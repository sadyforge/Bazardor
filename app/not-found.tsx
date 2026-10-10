
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-white px-4 text-center">
      <h1 className="text-8xl font-extrabold tracking-tight text-red-600">
        404
      </h1>

      <h2 className="mt-4 text-2xl font-bold text-gray-800">
        পেজটি খুঁজে পাওয়া যায়নি!
      </h2>

      <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
        দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি।
        পেজটি সরানো হতে পারে অথবা লিংকটি ভুল হতে পারে।
      </p>

      <Link
        href="/"
        className="mt-6 rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
};

export default NotFound;
