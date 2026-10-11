import BannerPage from "./components/Banner";
import ProductPage from "./components/ProductPage";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <BannerPage />

      <Suspense fallback={<div>পণ্য লোড হচ্ছে...</div>}>
        <ProductPage />
      </Suspense>
    </div>
  );
}