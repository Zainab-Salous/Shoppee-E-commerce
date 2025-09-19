'use client'
import Image from "next/image";
import React from "react";

type CategoryCardProps = {
  name: string;
  image: string;
};

export default function CategoryCard({ name, image }: CategoryCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 cursor-pointer text-center">
      <div className="relative w-full h-40 mb-3">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover rounded-xl"
        />
      </div>
      <h2 className="text-lg font-semibold">{name}</h2>
    </div>
  );
}
