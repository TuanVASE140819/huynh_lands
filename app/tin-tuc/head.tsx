import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tin tức bất động sản mới nhất | Huỳnh Land",
  description: "Cập nhật tin tức, xu hướng, phân tích thị trường bất động sản mới nhất từ Huỳnh Land. Thông tin chính xác, nhanh chóng, đa chiều.",
  openGraph: {
    title: "Tin tức bất động sản mới nhất | Huỳnh Land",
    description: "Cập nhật tin tức, xu hướng, phân tích thị trường bất động sản mới nhất từ Huỳnh Land.",
    url: "https://huynhland.vn/tin-tuc",
    type: "website"
  },
  alternates: {
    canonical: "https://huynhland.vn/tin-tuc"
  }
};

export default function Head() {
  return null;
}
