"use client";
import { Card } from "images/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export default function SmallCard({ brand }: { brand: Brand }) {
  return (
    <Link href={`/brands/${brand.slug}`}>
      <Card className="rounded-lg shadow-sm p-4 flex flex-col items-center hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
        <Image
          width={80}
          height={80}
          src={brand.image}
          alt={brand.name}
          className="w-20 h-20 object-contain mb-3"
        />
        <h3 className="font-medium text-main">{brand.name}</h3>
      </Card>
    </Link>
  );
}
