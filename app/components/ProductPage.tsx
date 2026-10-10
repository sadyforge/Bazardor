import Link from "next/link";

type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
};

const API_URL = "https://api.abcz.workers.dev/api/bazardor/products";

const unitMap: Record<string, string> = {
  kg: "প্রতি কেজি",
  liter: "প্রতি লিটার",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
  pcs: "প্রতি পিস",
};

const toBanglaNumber = (value: number | string) => {
  const numbers: Record<string, string> = {
    "0": "০",
    "1": "১",
    "2": "২",
    "3": "৩",
    "4": "৪",
    "5": "৫",
    "6": "৬",
    "7": "৭",
    "8": "৮",
    "9": "৯",
  };

  return String(value).replace(/[0-9]/g, (digit) => numbers[digit]);
};

const formatPrice = (price: number) => {
  return toBanglaNumber(price.toLocaleString("en-US"));
};

const getChangeStyle = (dir: Product["change"]["dir"]) => {
  if (dir === "up") {
    return {
      text: "text-green-600",
      bg: "bg-green-50",
      icon: "▲",
    };
  }

  if (dir === "down") {
    return {
      text: "text-red-600",
      bg: "bg-red-50",
      icon: "▼",
    };
  }

  return {
    text: "text-gray-500",
    bg: "bg-gray-100",
    icon: "—",
  };
};

const ProductCard = ({ product }: { product: Product }) => {
  const change = product.change ?? { dir: "flat" as const, pct: 0 };
  const changeStyle = getChangeStyle(change.dir);

  return (
    <Link
      href={`/product/${product.id}`}
      className="block rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex h-28 items-center justify-center rounded-xl bg-red-50 text-6xl">
        {product.image || product.categoryIcon}
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-bold text-gray-900">
          {product.nameBn}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          {unitMap[product.unit] || `প্রতি ${product.unit}`}
        </p>
      </div>

      <div className="mt-5 flex items-end justify-between gap-3">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>

          <p className="mt-1 text-xl font-bold text-red-600">
            {formatPrice(product.today)} টাকা
          </p>
        </div>

        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${changeStyle.bg} ${changeStyle.text}`}
        >
          {changeStyle.icon}{" "}
          {toBanglaNumber(change.pct.toFixed(1))}%
        </span>
      </div>
    </Link>
  );
};

const ProductPage = async () => {
  let data: Product[] = [];
  let hasError = false;

  try {
    const res = await fetch(API_URL, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`API request failed: ${res.status}`);
    }

    const contentType = res.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      const responseText = await res.text();
      console.error("API returned HTML or non-JSON:", responseText.slice(0, 200));
      throw new Error("API did not return JSON");
    }

    const result: unknown = await res.json();

    if (Array.isArray(result)) {
      data = result as Product[];
    } else if (
      result &&
      typeof result === "object" &&
      "products" in result &&
      Array.isArray(result.products)
    ) {
      data = result.products as Product[];
    } else {
      throw new Error("Unexpected API response format");
    }
  } catch (error) {
    hasError = true;
    console.error("Failed to fetch products:", error);
  }

  const risers = data
    .filter((product) => product.change?.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = data
    .filter((product) => product.change?.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <section id="সব-পণ্য" className="bg-gray-50 py-12">
      <div className="mx-auto max-w-6xl px-4">
        {hasError ? (
          <div className="rounded-2xl border border-red-200 bg-white px-6 py-12 text-center">
            <h2 className="text-xl font-bold text-gray-900">
              পণ্যের তথ্য লোড করা যায়নি
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              API সার্ভারে সমস্যা হতে পারে। কিছুক্ষণ পর আবার চেষ্টা করুন।
            </p>
          </div>
        ) : data.length === 0 ? (
          <div className="rounded-2xl bg-white px-6 py-12 text-center">
            <p className="text-gray-500">কোনো পণ্যের তথ্য পাওয়া যায়নি।</p>
          </div>
        ) : (
          <>
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  আজ দাম বেড়েছে{" "}
                  <span className="text-green-600">▲</span>
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  যেসব পণ্যের দাম আজ সবচেয়ে বেশি বেড়েছে
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {risers.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>

            <div className="mt-14">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  আজ দাম কমেছে{" "}
                  <span className="text-red-600">▼</span>
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  যেসব পণ্যের দাম আজ সবচেয়ে বেশি কমেছে
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {fallers.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>

            <div className="mt-16">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  সব পণ্য
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  নিত্যপ্রয়োজনীয় সব পণ্যের আজকের সর্বশেষ বাজারদর
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {data.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductPage;