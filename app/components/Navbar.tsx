import Link from "next/link";
import bazarlogo from "@/public/logo-icon.png";
import Image from "next/image";
import NavLinks from "./NavLinks";
import { Suspense } from "react";
import MarquePage from "./Marque";
import UserInfoPage from "./UserInfo";

// const categories = [
//   { name: "হোম", href: "/" },
//   { name: "সবজি", href: "/category/vegetables" },
//   { name: "মাছ", href: "/category/fish" },
//   { name: "মাংস", href: "/category/meat" },
//   { name: "চাল", href: "/category/rice" },
//   { name: "ডাল", href: "/category/lentils" },
//   { name: "মসলা", href: "/category/spices" },
//   { name: "ফল", href: "/category/fruits" },
// ];

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
                <Image
                  className=""
                  src={bazarlogo}
                  height={20}
                  width={20}
                  alt="bazar"
                />
              </div>

              <div>
                <h1 className="text-xl font-bold tracking-tight text-gray-900">
                  বাজার দর
                </h1>

                <p className="text-xs text-gray-500">২৩ আশ্বিন ১৪৩৩ বঙ্গাব্দ</p>
              </div>
            </div>
          </Link>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
          <UserInfoPage/>
          </div>
        </div>

        {/* Category Navigation */}
        <Suspense fallback={"Loading..."}>
          {" "}
          <NavLinks />
        </Suspense>
        <Suspense fallback={"Loading..."}>
          <MarquePage />
        </Suspense>
      </div>
    </header>
  );
};

export default Navbar;
