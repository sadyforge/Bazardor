
import BannerPage from "./components/Banner";
import ProductPage from "./components/ProductPage";
import { Suspense } from "react";

export default function Home() {
  return (
   <div>
    <BannerPage/>
    <Suspense fallback={"Loading..."}><ProductPage/></Suspense>
   </div>
  );
}
