import Link from "next/link";
import { notFound } from "next/navigation";

type MarketPrice = {
  market: string;
  division: string;
  min: number;
  max: number;
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
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change?: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
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
    "https://api.api-store.workers.dev/api/bazardor/products",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি");
  }

  const products: ProductDetail[] = await res.json();

  const detail = products.find(
    (product) =>
      String(product.id) === productId || product.slug === productId
  );

  if (!detail) {
    notFound();
  }

  const marketPrices = detail.markets ?? [];

  const minimumPrice =
    marketPrices.length > 0
      ? Math.min(...marketPrices.map((market) => market.min))
      : detail.today;

  const maximumPrice =
    marketPrices.length > 0
      ? Math.max(...marketPrices.map((market) => market.max))
      : detail.today;

  const averagePrice =
    marketPrices.length > 0
      ? Math.round(
          marketPrices.reduce(
            (total, market) => total + (market.min + market.max) / 2,
            0
          ) / marketPrices.length
        )
      : detail.today;

  const unit = unitMap[detail.unit] || `প্রতি ${detail.unit}`;

  return (
    <main className="bg-gray-50 py-10">
      <div className="mx-auto max-w-6xl px-4">
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-6xl">
              {detail.image || detail.categoryIcon}
            </div>

            <div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-600">
                  {detail.categoryNameBn}
                </span>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                  {unit}
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

        <section className="mt-8">
          <h2 className="mb-5 text-2xl font-bold text-gray-900">
            মূল্য সারাংশ
          </h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="rounded-2xl border border-green-100 bg-green-50 p-6">
              <p className="text-sm text-gray-600">সর্বনিম্ন দাম</p>
              <p className="mt-2 text-3xl font-bold text-green-600">
                ৳{minimumPrice}
              </p>
              <p className="mt-1 text-sm text-gray-500">{unit}</p>
            </div>

            <div className="rounded-2xl border border-red-100 bg-red-50 p-6">
              <p className="text-sm text-gray-600">সর্বোচ্চ দাম</p>
              <p className="mt-2 text-3xl font-bold text-red-600">
                ৳{maximumPrice}
              </p>
              <p className="mt-1 text-sm text-gray-500">{unit}</p>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
              <p className="text-sm text-gray-600">গড় দাম</p>
              <p className="mt-2 text-3xl font-bold text-blue-600">
                ৳{averagePrice}
              </p>
              <p className="mt-1 text-sm text-gray-500">{unit}</p>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-gray-900">
              বাজারভিত্তিক আজকের দাম
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              বিভিন্ন বাজারে {detail.nameBn} এর আজকের দাম
            </p>
          </div>

          {marketPrices.length > 0 ? (
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
              <div className="grid grid-cols-4 border-b bg-gray-50 px-5 py-4 text-sm font-semibold text-gray-700">
                <span>বাজার</span>
                <span>বিভাগ</span>
                <span>দামের সীমা</span>
                <span>একক</span>
              </div>

              {marketPrices.map((market) => (
                <div
                  key={`${market.market}-${market.division}`}
                  className="grid grid-cols-4 items-center border-b border-gray-100 px-5 py-5 last:border-b-0"
                >
                  <span className="font-medium text-gray-900">
                    {market.market}
                  </span>

                  <span className="text-gray-600">{market.division}</span>

                  <span className="font-bold text-red-600">
                    ৳{market.min} – ৳{market.max}
                  </span>

                  <span className="text-gray-500">{unit}</span>
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

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex rounded-lg bg-red-600 px-5 py-2.5 font-medium text-white transition hover:bg-red-700"
          >
            ← হোমে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailPage;