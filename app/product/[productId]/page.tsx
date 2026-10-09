import React from "react";

type MarketPrice = {
  bazarName?: string;
  name?: string;
  price?: number;
  minPrice?: number;
  maxPrice?: number;
  averagePrice?: number;
};

type ProductDetail = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  description?: string;
  today?: number;
  yesterday?: number;
  lastWeek?: number;
  lastMonth?: number;
  minPrice?: number;
  maxPrice?: number;
  averagePrice?: number;
  markets?: MarketPrice[];
};

const unitMap: Record<string, string> = {
  kg: "প্রতি কেজি",
  liter: "প্রতি লিটার",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
  pcs: "প্রতি পিস",
};

const ProductDetailPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;

  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products/${productId}`,
    {
      cache: "no-store",
    }
  );



  const detail: ProductDetail = await res.json();

  const minimumPrice =
    detail.minPrice ??
    Math.min(
      detail.today ?? Infinity,
      detail.yesterday ?? Infinity,
      detail.lastWeek ?? Infinity,
      detail.lastMonth ?? Infinity
    );

  const maximumPrice =
    detail.maxPrice ??
    Math.max(
      detail.today ?? -Infinity,
      detail.yesterday ?? -Infinity,
      detail.lastWeek ?? -Infinity,
      detail.lastMonth ?? -Infinity
    );

  const averagePrice =
    detail.averagePrice ??
    Math.round(
      ((detail.today ?? 0) +
        (detail.yesterday ?? 0) +
        (detail.lastWeek ?? 0) +
        (detail.lastMonth ?? 0)) /
        4
    );

  return (
    <main className="bg-gray-50 py-10">
      <div className="mx-auto max-w-6xl px-4">
        {/* Top Summary */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            {/* Product Image / Emoji */}
            <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-6xl">
              {detail.image || detail.categoryIcon}
            </div>

            {/* Product Info */}
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-600">
                  {detail.categoryNameBn}
                </span>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                  {unitMap[detail.unit] || `প্রতি ${detail.unit}`}
                </span>
              </div>

              <h1 className="mt-3 text-3xl font-bold text-gray-900">
                {detail.nameBn}
              </h1>

              <p className="mt-2 text-gray-600">
                {detail.description ||
                  `${detail.nameBn} এর আজকের বাজারদর ও বিভিন্ন বাজারের মূল্য দেখুন।`}
              </p>
            </div>
          </div>
        </section>

        {/* Price Summary */}
        <section className="mt-8">
          <h2 className="mb-5 text-2xl font-bold text-gray-900">
            মূল্য সারাংশ
          </h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {/* Minimum */}
            <div className="rounded-2xl border border-green-100 bg-green-50 p-6">
              <p className="text-sm text-gray-600">সর্বনিম্ন দাম</p>

              <p className="mt-2 text-3xl font-bold text-green-600">
                ৳{minimumPrice}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {unitMap[detail.unit] || `প্রতি ${detail.unit}`}
              </p>
            </div>

            {/* Maximum */}
            <div className="rounded-2xl border border-red-100 bg-red-50 p-6">
              <p className="text-sm text-gray-600">সর্বোচ্চ দাম</p>

              <p className="mt-2 text-3xl font-bold text-red-600">
                ৳{maximumPrice}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {unitMap[detail.unit] || `প্রতি ${detail.unit}`}
              </p>
            </div>

            {/* Average */}
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
              <p className="text-sm text-gray-600">গড় দাম</p>

              <p className="mt-2 text-3xl font-bold text-blue-600">
                ৳{averagePrice}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {unitMap[detail.unit] || `প্রতি ${detail.unit}`}
              </p>
            </div>
          </div>
        </section>

        {/* Market Prices */}
        <section className="mt-10">
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-gray-900">
              বাজারভিত্তিক আজকের দাম
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              বিভিন্ন বাজারে {detail.nameBn} এর আজকের দাম
            </p>
          </div>

          {detail.markets && detail.markets.length > 0 ? (
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
              <div className="grid grid-cols-3 border-b bg-gray-50 px-5 py-4 text-sm font-semibold text-gray-700">
                <span>বাজার</span>
                <span>দাম</span>
                <span>একক</span>
              </div>

              {detail.markets.map((market, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 border-b border-gray-100 px-5 py-5 last:border-b-0"
                >
                  <span className="font-medium text-gray-900">
                    {market.bazarName || market.name}
                  </span>

                  <span className="font-bold text-red-600">
                    ৳
                    {market.price ??
                      market.averagePrice ??
                      market.minPrice ??
                      market.maxPrice}
                  </span>

                  <span className="text-gray-500">
                    {unitMap[detail.unit] || `প্রতি ${detail.unit}`}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
              <p className="text-gray-500">
                এই পণ্যের বাজারভিত্তিক তথ্য বর্তমানে পাওয়া যাচ্ছে না।
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default ProductDetailPage;