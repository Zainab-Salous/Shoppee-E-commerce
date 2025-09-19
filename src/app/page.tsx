import { product, ProductData } from "images/types/products.type";
import MainSlider from "./_Component/MainSlider/MainSlider";
import ProductCard from "./_Component/ProductCard/ProductCard";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Suspense } from "react";
import { HomeLoading } from "./_Component/HomeLoading/HomeLoading";


export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`);
  const data : ProductData = await res.json();
  const productList: product[] = data.data
  
  return (
<>
<MainSlider/>
<h1>Home</h1>
<div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8">
<Suspense fallback={<HomeLoading/>}>
  {
  productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ))
}


</Suspense>
</div>
</>
  );
}
