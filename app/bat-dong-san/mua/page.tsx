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

export default function MuaPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { t, language } = useLanguage();
  const [properties, setProperties] = useState<any[]>([]);
  const [propertyType, setPropertyType] = useState("");
  const [address, setAddress] = useState("");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [keyword, setKeyword] = useState("");
  const [areaFrom, setAreaFrom] = useState("");
  const [areaTo, setAreaTo] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const params = new URLSearchParams({
      businessType: "buy",
      status: "active",
      lang: language,
    });
    if (propertyType) params.append("propertyType", propertyType);
    if (address) params.append("address", address);
    if (priceFrom) params.append("priceFrom", priceFrom);
    if (priceTo) params.append("priceTo", priceTo);
    if (keyword) params.append("keyword", keyword);

    fetch(`/api/property?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.properties)) setProperties(data.properties);
        else setProperties([]);
      })
      .catch(() => setProperties([]));
  }, [language, propertyType, address, priceFrom, priceTo, keyword]);

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
            {t("nav.properties")}
          </h1>
          <p className="text-gray-600">{t("featured.subtitle")}</p>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            <Select
              onValueChange={(value) => setPropertyType(value)}
              value={propertyType}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("search.propertyType")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("propertyTypes.all")}</SelectItem>
                <SelectItem value="nha-pho">
                  {t("propertyTypes.nha-pho")}
                </SelectItem>
                <SelectItem value="can-ho">
                  {t("propertyTypes.can-ho")}
                </SelectItem>
                <SelectItem value="biet-thu">
                  {t("propertyTypes.biet-thu")}
                </SelectItem>
                <SelectItem value="dat-nen">
                  {t("propertyTypes.dat-nen")}
                </SelectItem>
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value) => setAddress(value)}
              value={address}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("search.location")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("locations.all")}</SelectItem>
                <SelectItem value="quan-1">{t("locations.quan-1")}</SelectItem>
                <SelectItem value="quan-2">{t("locations.quan-2")}</SelectItem>
                <SelectItem value="quan-7">{t("locations.quan-7")}</SelectItem>
                <SelectItem value="quan-9">{t("locations.quan-9")}</SelectItem>
                <SelectItem value="thu-duc">
                  {t("locations.thu-duc")}
                </SelectItem>
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value) => {
                const [from, to] = value.split("-");
                setPriceFrom(from);
                setPriceTo(to);
              }}
              value={`${priceFrom}-${priceTo}`}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("search.priceRange")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("priceRanges.all")}</SelectItem>
                <SelectItem value="duoi-5ty">
                  {t("priceRanges.duoi-5ty")}
                </SelectItem>
                <SelectItem value="5-10ty">
                  {t("priceRanges.5-10ty")}
                </SelectItem>
                <SelectItem value="10-20ty">
                  {t("priceRanges.10-20ty")}
                </SelectItem>
                <SelectItem value="tren-20ty">
                  {t("priceRanges.tren-20ty")}
                </SelectItem>
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value) => {
                const [from, to] = value.split("-");
                setAreaFrom(from);
                setAreaTo(to);
              }}
              value={`${areaFrom}-${areaTo}`}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("search.area")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("areaRanges.all")}</SelectItem>
                <SelectItem value="duoi-100">
                  {t("areaRanges.duoi-100")}
                </SelectItem>
                <SelectItem value="100-200">
                  {t("areaRanges.100-200")}
                </SelectItem>
                <SelectItem value="200-300">
                  {t("areaRanges.200-300")}
                </SelectItem>
                <SelectItem value="tren-300">
                  {t("areaRanges.tren-300")}
                </SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={(value) => setSortBy(value)} value={sortBy}>
              <SelectTrigger>
                <SelectValue placeholder={t("search.sortBy")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">
                  {t("sortOptions.newest")}
                </SelectItem>
                <SelectItem value="price-low">
                  {t("sortOptions.price-low")}
                </SelectItem>
                <SelectItem value="price-high">
                  {t("sortOptions.price-high")}
                </SelectItem>
                <SelectItem value="area-large">
                  {t("sortOptions.area-large")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between items-center">
            <Input
              placeholder={t("search.keyword")}
              className="max-w-md"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <div className="flex items-center space-x-2">
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
                      {property[language]?.price}
                    </span>
                  </div>

                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 shadow-lg"
                  >
                    <Link href={`/bat-dong-san/${property.id || idx}`}>
                      {t("property.viewDetails")}
                    </Link>
                  </Button>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            <Button variant="outline">{t("pagination.previous")}</Button>
            <Button>1</Button>
            <Button variant="outline">2</Button>
            <Button variant="outline">3</Button>
            <Button variant="outline">{t("pagination.next")}</Button>
          </div>
        </div>
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
