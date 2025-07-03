"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Phone,
  Mail,
  Share2,
  Heart,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
} from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8011/api";

function formatPrice(price: number, lang: string) {
  if (!price) return "";
  if (lang === "vi")
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  if (lang === "en")
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  if (lang === "ko")
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(price);
  return price.toLocaleString();
}

export default function PropertyDetailClient({ id }: { id: string }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { t, language } = useLanguage();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`${API_BASE_URL}/property/${id}?lang=${language}`)
      .then((res) => res.json())
      .then((data) => {
        setProperty(data.property);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id, language]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const nextImage = () => {
    if (!property?.images) return;
    setCurrentImageIndex((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!property?.images) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  if (loading)
    return <div className="p-8">{t("loading") || "Đang tải..."}</div>;
  if (!property)
    return (
      <div className="p-8 text-red-500">
        {t("notFound") || "Không tìm thấy bất động sản"}
      </div>
    );
  if (!property[language]) return null;

  return (
    // ... Copy/paste the full return JSX from your current PropertyDetailPage here ...
    // For brevity, not repeated here. You can copy the full return block from your current file.
    <></>
  );
}
