'use client'
import { HomeLoading } from "images/app/_Component/HomeLoading/HomeLoading";
import ProductCard from "images/app/_Component/ProductCard/ProductCard";
import { product, ProductData } from "images/types/products.type";
import React, { Suspense, useMemo, useState } from "react";

const PRODUCTS_PER_PAGE = 12;

export default function ProductsPage() {
  const [products, setProducts] = useState<product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string>("all");
  const [sort, setSort] = useState<string>("default");
  const [page, setPage] = useState<number>(1);

  React.useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`);
        const data: ProductData = await res.json();
        setProducts(data.data);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(
        products
          .map((p) => p.subcategory?.[0]?.name) 
          .filter(Boolean) as string[]
      )
    );
    return ["all", ...uniqueCategories];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let filtered =
      category === "all"
        ? products
        : products.filter((p) => p.subcategory?.[0]?.name === category);

    if (sort === "price-asc") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }
    return filtered;
  }, [products, category, sort]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [filteredProducts, page]);

  React.useEffect(() => {
    setPage(1);
  }, [category, sort]);

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Products</h1>

      <div className="flex gap-4 mb-6">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {String(cat).charAt(0).toUpperCase() + String(cat).slice(1)}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="default">Sort by</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8">
        <Suspense fallback={<HomeLoading />}>
          {loading ? (
            <HomeLoading />
          ) : (
            paginatedProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </Suspense>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
}
