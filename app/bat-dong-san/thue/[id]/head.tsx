import React from "react";
import { Metadata } from "next";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8011/api";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const language = "vi";
  let property: any = null;
  try {
    const res = await fetch(
      `${API_BASE_URL}/property/${params.id}?lang=${language}`,
      { cache: "no-store" }
    );
    const data = await res.json();
    property = data.property;
  } catch {
    property = null;
  }
  if (!property || !property[language]) {
    return {
      title: "Không tìm thấy bất động sản",
      description: "Không tìm thấy thông tin bất động sản.",
    };
  }
  const title =
    property[language]?.title || property[language]?.name || "Bất động sản";
  const description =
    property[language]?.description || property[language]?.summary || title;
  const image = property.images?.[0]?.url || "/default-og-image.jpg";
  const url = `${
    process.env.NEXT_PUBLIC_BASE_URL || "https://huynhland.vn"
  }/bat-dong-san/thue/${params.id}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [image],
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default function Head() {
  return null;
}
