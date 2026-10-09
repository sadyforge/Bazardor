"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Product {
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
    dir: "up" | "down" | "same";
    pct: number;
  };
}

type SortOption = "default" | "low" | "high";

const CategoryPage = () => {
  const params = useParams<{ categoryId: string }>();
  const categoryId = params.categoryId;

  const [products, setProducts] = useState<Product[]>([]);
  const [sort, setSort] = useState<SortOption>("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(false);

      try {
        const res = await fetch(
          `https://api.abcz.workers.dev/api/bazardor/products?category=${encodeURIComponent(categoryId)}`,
          { cache: "no-store" }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: Product[] = await res.json();

        setProducts(
          data.filter((product) => product.category === categoryId)
        );
      } catch {
        setError(true);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchProducts();
    }
  }, [categoryId]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "low") return a.today - b.today;
    if (sort === "high") return b.today - a.today;
    return 0;
  });

  const categoryName = products[0]?.categoryNameBn;
  const categoryIcon = products[0]?.categoryIcon;

  const formatUnit = (unit: string) => {
    if (unit === "kg") return "প্রতি কেজি";
    if (unit === "liter") return "প্রতি লিটার";
    if (unit === "piece") return "প্রতি পিস";
    return `প্রতি ${unit}`;
  };

  if (loading) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8 h-10 w-52 animate-pulse rounded-lg bg-gray-200" />
        <div className="mb-6 h-11 w-full animate-pulse rounded-lg bg-gray-100 sm:w-64" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-xl border border-gray-200 p-5"
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl bg-gray-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-28 rounded bg-gray-200" />
                  <div className="h-3 w-20 rounded bg-gray-100" />
                </div>
              </div>
              <div className="h-6 w-32 rounded bg-gray-200" />
              <div className="mt-4 h-8 w-full rounded bg-gray-100" />
            </div>
          ))}
        </div>
      </main>
    );
  }

  if (error || products.length === 0) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center justify-center px-4 text-center">
        <div className="mb-4 text-6xl">🛒</div>
        <h1 className="text-2xl font-bold text-gray-800">
          ক্যাটাগরিটি খুঁজে পাওয়া যায়নি
        </h1>
        <p className="mt-2 text-gray-500">
          এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
        </p>
        <Link
          href="/"
          className="mt-6 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          হোম পেজে ফিরে যান
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="mb-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-red-600">
              হোম
            </Link>
            {" / "}ক্যাটাগরি
          </p>

          <h1 className="flex items-center gap-3 text-2xl font-bold text-gray-900 sm:text-3xl">
            <span>{categoryIcon}</span>
            {categoryName}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            মোট {products.length}টি পণ্য
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="whitespace-nowrap text-sm text-gray-600">
            সাজান:
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="max-w-[220px] rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low">দাম: কম থেকে বেশি</option>
            <option value="high">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="group rounded-xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:border-red-200 hover:shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-4xl">
                {product.image}
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-bold text-gray-800 group-hover:text-red-600">
                  {product.nameBn}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {formatUnit(product.unit)}
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs text-gray-500">আজকের দাম</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">
                  ৳{product.today}
                  <span className="ml-1 text-sm font-normal text-gray-500">
                    / {product.unit}
                  </span>
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1.5 text-sm font-semibold ${
                  product.change.dir === "up"
                    ? "bg-red-50 text-red-600"
                    : product.change.dir === "down"
                      ? "bg-green-50 text-green-700"
                      : "bg-gray-100 text-gray-600"
                }`}
              >
                {product.change.dir === "up"
                  ? "↑"
                  : product.change.dir === "down"
                    ? "↓"
                    : "—"}{" "}
                {Math.abs(product.change.pct)}%
              </span>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 text-sm">
              <span className="text-gray-500">গতকালের দাম</span>
              <span className="font-semibold text-gray-700">
                ৳{product.yesterday}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default CategoryPage;