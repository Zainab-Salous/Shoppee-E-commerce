"use client";
import SmallCard from "images/app/_Component/SmallCard/SmallCard";
import React, { useEffect, useState } from "react";

interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

interface BrandResponse {
  data: Brand[];
}

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/brands`
        );
        const data: BrandResponse = await res.json();
        if (data?.data) {
          setBrands(data.data);
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  if (loading) return <p className="p-5">Loading brands...</p>;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-6">All Brands</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {brands.map((brand) => (
          <SmallCard key={brand._id} brand={brand}  />
        ))}
      </div>
    </div>
  );
}
