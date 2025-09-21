"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

interface Product {
  _id: string;
  name: string;
  imageCover: string;
  price: number;
}

interface ProductResponse {
  data: Product[];
}

export default function BrandProductsPage() {
  const { slug } = useParams(); 
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products?brand=${slug}`
        );
        const data: ProductResponse = await res.json();
        if (data?.data) {
          setProducts(data.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchProducts();
  }, [slug]);

  if (loading) return <p className="p-5">Loading products...</p>;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-6 capitalize">{slug} Products</h2>
      {products.length === 0 ? (
        <p>No products found for this brand.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg shadow-sm p-3 hover:shadow-lg transition"
            >
              <Image
                src={product.imageCover}
                alt={product.name}
                width={200}
                height={200}
                className="w-full h-40 object-contain mb-3"
              />
              <h3 className="font-medium text-main line-clamp-1">
                {product.name}
              </h3>
              <p className="text-gray-600">${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
