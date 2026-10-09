
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface Product {
  id: number;
  nameBn: string;
  categoryNameBn: string;
  categoryIcon: string;
  today: number;
  unit: string;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

const MarquePage = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    {
      cache: "no-store",
    }
  );



  const data: Product[] = await res.json();
  const headLines = data.slice(0, 10);

  return (
    <div className="mx-4 my-6 overflow-hidden rounded-xl border border-red-200 bg-white shadow-sm">
      <div className="flex min-w-0 items-center bg-red-50 py-3">
        <MarqueeText>
          {headLines.map((item) => (
            <span
              key={item.id}
              className="mx-5 inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium text-gray-800 sm:text-base"
            >
              <span className="text-lg">
                {item.categoryIcon}
              </span>

              <span>{item.nameBn}</span>

              <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-700">
                {item.categoryNameBn}
              </span>

              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-sm font-bold ${
                  item.change.dir === "up"
                    ? "bg-red-100 text-red-600"
                    : item.change.dir === "down"
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {item.change.dir === "up" ? (
                  <span>↑</span>
                ) : item.change.dir === "down" ? (
                  <span>↓</span>
                ) : (
                  <span>→</span>
                )}

                ৳{item.today}/{item.unit === "kg" ? "কেজি" : item.unit}

                <span>
                  ({item.change.pct > 0 ? "+" : ""}
                  {item.change.pct}%)
                </span>
              </span>

              <span className="ml-2 text-red-400">◆</span>
            </span>
          ))}
        </MarqueeText>
      </div>
    </div>
  );
};

export default MarquePage;
