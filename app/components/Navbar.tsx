import Link from "next/link";
import bazarlogo from "@/public/logo-icon.png"
import Image from "next/image";

const categories = [
  { name: "হোম", href: "/" },
  { name: "সবজি", href: "/category/vegetables" },
  { name: "মাছ", href: "/category/fish" },
  { name: "মাংস", href: "/category/meat" },
  { name: "চাল", href: "/category/rice" },
  { name: "ডাল", href: "/category/lentils" },
  { name: "মসলা", href: "/category/spices" },
  { name: "ফল", href: "/category/fruits" },
];

const Navbar = () => {
  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        {/* Top Section */}
        <div className="flex items-center justify-between py-5">
          {/* Logo */}
          <Link href="/" className="group">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-xl shadow-sm">
         <Image className="" src={bazarlogo} height={20} width={20} alt="bazar"/>
              </div>

              <div>
                <h1 className="text-xl font-bold tracking-tight text-gray-900">
                  বাজার দর
                </h1>

                <p className="text-xs text-gray-500">
                  ২৩ আশ্বিন ১৪৩৩ বঙ্গাব্দ
                </p>
              </div>
            </div>
          </Link>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
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
        </div>

        {/* Category Navigation */}
        <nav className="border-t border-gray-100">
          <div className="flex items-center gap-1 overflow-x-auto">
            {categories.map((category, index) => (
              <Link
                key={category.href}
                href={category.href}
                className={`relative whitespace-nowrap px-5 py-4 text-sm font-medium transition ${
                  index === 0
                    ? "text-red-600"
                    : "text-gray-600 hover:text-red-600"
                }`}
              >
                {category.name}

                {/* Active Indicator */}
                {index === 0 && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-red-600" />
                )}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;