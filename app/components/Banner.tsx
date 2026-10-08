import Image from "next/image";
import Link from "next/link";
import bannerLogo from "@/public/bazar-hero.png"

const BannerPage = () => {
  return (
    <section className="bg-red-50">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-2 md:py-12">
        {/* Left Content */}
        <div className="max-w-lg">
          {/* Eyebrow */}
          <p className="mb-3 text-xs font-semibold tracking-wide text-red-600">
            বাংলাদেশের দৈনিক বাজারদর
          </p>

          {/* Main Heading */}
          <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
            আজকের বাজারদর
            <span className="block text-red-600">
              এক নজরেই জানুন
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 max-w-md text-sm leading-6 text-gray-600 sm:text-base">
            নিত্যপ্রয়োজনীয় পণ্যের সর্বশেষ বাজারদর সহজেই দেখুন।
            আপনার প্রয়োজনীয় পণ্যের দাম সম্পর্কে থাকুন সবসময় আপডেটেড।
          </p>

          {/* CTA */}
          <div className="mt-6">
            <Link
              href="#সব-পণ্য"
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              সব পণ্যের দাম দেখুন
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Right Banner Image */}
        <div className="relative mx-auto w-full max-w-md">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
            <Image
              src={bannerLogo}
              alt="বাজারের বিভিন্ন পণ্যের ছবি"
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Floating Card */}
          <div className="absolute -bottom-3 left-4 rounded-xl bg-white px-4 py-3 shadow-md">
            <p className="text-[11px] text-gray-500">
              আজকের বাজার
            </p>

            <p className="text-sm font-bold text-gray-900">
              সর্বশেষ আপডেট
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerPage;