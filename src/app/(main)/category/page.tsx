'use client'
import CategoryCard from "images/app/_Component/CategoryCard/CategoryCard";
import React, { useEffect, useState } from "react";

type Category = {
  _id: string;
  name: string;
  slug: string;
  image: string;
};

export default function Category() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories`);
      const data = await res.json();
      // API response: { results, metadata, data: Array<Category> }
      setCategories(data.data);
    };

    fetchCategory();
  }, []);

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">All Categories</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {categories.map((cat) => (
          <CategoryCard key={cat._id} name={cat.name} image={cat.image} />
        ))}
      </div>
    </div>
  );
}
