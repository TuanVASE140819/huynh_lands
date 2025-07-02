"use client";

import { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Grid,
  List,
  Heart,
  ArrowUp,
} from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export default function ThuePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { t, language } = useLanguage();
  const [properties, setProperties] = useState<any[]>([]);
  // filter state for actual search
  const [propertyType, setPropertyType] = useState("");
  const [address, setAddress] = useState("");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [keyword, setKeyword] = useState("");
  const [areaFrom, setAreaFrom] = useState("");
  const [areaTo, setAreaTo] = useState("");
  const [sortBy, setSortBy] = useState("");
  // temp filter state for UI
  const [propertyTypes, setPropertyTypes] = useState<any[]>([]);
  const [filterPropertyType, setFilterPropertyType] = useState("all");
  const [filterAddress, setFilterAddress] = useState("");
  const [filterPriceFrom, setFilterPriceFrom] = useState("");
  const [filterPriceTo, setFilterPriceTo] = useState("");
  const [filterKeyword, setFilterKeyword] = useState("");
  const [filterAreaFrom, setFilterAreaFrom] = useState("");
  const [filterAreaTo, setFilterAreaTo] = useState("");
  const [filterSortBy, setFilterSortBy] = useState("");

  function formatPrice(price: number, lang: string) {
    if (!price) return "";
    if (lang === "vi") {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price);
    }
    if (lang === "en") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);
    }
    if (lang === "ko") {
      return new Intl.NumberFormat("ko-KR", {
        style: "currency",
        currency: "KRW",
      }).format(price);
    }
    return price.toLocaleString();
  }

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8011/api";
  // Lấy propertyTypes từ API
  useEffect(() => {
    fetch(`${API_BASE_URL}/property-type?lang=${language}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.propertyTypes))
          setPropertyTypes(data.propertyTypes);
        else setPropertyTypes([]);
      })
      .catch(() => setPropertyTypes([]));
  }, [language, API_BASE_URL]);

  useEffect(() => {
    const params = new URLSearchParams({
      businessType: "rent",
      status: "active",
      lang: language,
    });
    if (propertyType && propertyType !== "all")
      params.append("propertyType", propertyType);
    if (address) params.append("address", address);
    if (priceFrom && !isNaN(Number(priceFrom)))
      params.append("priceFrom", Number(priceFrom).toString());
    if (priceTo && !isNaN(Number(priceTo)))
      params.append("priceTo", Number(priceTo).toString());
    if (keyword) params.append("keyword", keyword);
    if (areaFrom) params.append("areaFrom", areaFrom);
    if (areaTo) params.append("areaTo", areaTo);
    if (sortBy) params.append("sortBy", sortBy);

    fetch(`${API_BASE_URL}/property?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.properties)) setProperties(data.properties);
        else setProperties([]);
      })
      .catch(() => setProperties([]));
  }, [
    language,
    propertyType,
    address,
    priceFrom,
    priceTo,
    keyword,
    areaFrom,
    areaTo,
    sortBy,
  ]);

  // Handler for search button
  const handleSearch = () => {
    setPropertyType(filterPropertyType);
    setAddress(filterAddress);
    setPriceFrom(filterPriceFrom);
    setPriceTo(filterPriceTo);
    setKeyword(filterKeyword);
    setAreaFrom(filterAreaFrom);
    setAreaTo(filterAreaTo);
    setSortBy(filterSortBy);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
            {t("nav.rent")}
          </h1>
          <p className="text-gray-600">{t("featured.subtitle")}</p>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          {/* Hàng 1: Các filter chính */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("search.propertyType")}
              </label>
              <Select
                onValueChange={(value) => setFilterPropertyType(value)}
                value={filterPropertyType}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("search.propertyType")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("propertyTypes.all")}</SelectItem>
                  {propertyTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type[language]?.name || type.vi?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("search.location")}
              </label>
              <Input
                placeholder={t("search.location")}
                value={filterAddress}
                onChange={(e) => setFilterAddress(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("search.priceRange")}
              </label>
              <Select
                onValueChange={(value) => {
                  if (value === "all") {
                    setFilterPriceFrom("");
                    setFilterPriceTo("");
                  } else {
                    const [from, to] = value.split("-");
                    setFilterPriceFrom(from);
                    setFilterPriceTo(to);
                  }
                }}
                value={
                  filterPriceFrom && filterPriceTo
                    ? `${filterPriceFrom}-${filterPriceTo}`
                    : "all"
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("search.priceRange")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("priceRanges.all")}</SelectItem>
                  <SelectItem value="0-5000000000">
                    {t("priceRanges.duoi-5ty")}
                  </SelectItem>
                  <SelectItem value="5000000000-10000000000">
                    {t("priceRanges.5-10ty")}
                  </SelectItem>
                  <SelectItem value="10000000000-20000000000">
                    {t("priceRanges.10-20ty")}
                  </SelectItem>
                  <SelectItem value="20000000000-999999999999">
                    {t("priceRanges.tren-20ty")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Có thể thêm filter diện tích, phòng ngủ... ở đây nếu muốn */}
          </div>

          {/* Hàng 2: Từ khóa, nút tìm kiếm, chuyển chế độ xem */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <Input
              placeholder={t("search.keyword")}
              className="max-w-md"
              value={filterKeyword}
              onChange={(e) => setFilterKeyword(e.target.value)}
            />
            <div className="flex items-center space-x-2">
              <Button
                onClick={handleSearch}
                className="bg-primary-600 text-white"
              >
                {t("search.search")}
              </Button>
              <span className="text-sm text-gray-600">
                {t("search.viewMode")}:
              </span>
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            {t("search.results").replace(
              "{count}",
              properties.length.toString()
            )}
          </p>
        </div>

        {/* Properties Grid/List */}
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-6"
          }
        >
          {properties.map((property, idx) => (
            <Card
              key={property.id || idx}
              className={`overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm ${
                viewMode === "list" ? "flex flex-row" : ""
              }`}
            >
              <div className={viewMode === "list" ? "w-1/3" : ""}>
                <div className="relative">
                  <Image
                    src={property.images?.[0] || "/placeholder.svg"}
                    alt={property[language]?.name || "Property"}
                    width={300}
                    height={200}
                    className={`object-cover ${
                      viewMode === "list" ? "w-full h-full" : "w-full h-48"
                    }`}
                  />
                  <Badge className="absolute top-2 left-2 bg-gradient-to-r from-primary-600 to-accent-600 text-white border-0">
                    {property.propertyType}
                  </Badge>
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 cursor-pointer transition-colors" />
                  </div>
                </div>
              </div>

              <div className={viewMode === "list" ? "w-2/3" : ""}>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {property[language]?.name}
                  </CardTitle>
                  <CardDescription className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property[language]?.address}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <p className="text-gray-600 mb-4 text-sm">
                    {property[language]?.description}
                  </p>

                  <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Square className="h-4 w-4 mr-1" />
                      {property[language]?.area}
                    </div>
                    {property[language]?.bedrooms > 0 && (
                      <div className="flex items-center">
                        <Bed className="h-4 w-4 mr-1" />
                        {property[language]?.bedrooms} {t("property.bedrooms")}
                      </div>
                    )}
                    {property[language]?.bathrooms > 0 && (
                      <div className="flex items-center">
                        <Bath className="h-4 w-4 mr-1" />
                        {property[language]?.bathrooms}{" "}
                        {t("property.bathrooms")}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                      {formatPrice(Number(property[language]?.price), language)}
                    </span>
                  </div>

                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 shadow-lg"
                  >
                    <Link href={`/bat-dong-san/thue/${property.id || idx}`}>
                      {t("property.viewDetails")}
                    </Link>
                  </Button>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination (hidden for now) */}
        {/* <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            <Button variant="outline">{t("pagination.previous")}</Button>
            <Button>1</Button>
            <Button variant="outline">2</Button>
            <Button variant="outline">3</Button>
            <Button variant="outline">{t("pagination.next")}</Button>
          </div>
        </div> */}
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
