"use client";
// --- Move all imports and logic below this line ---
import React from "react";
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

export default function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              {t("nav.home")}
            </Link>
            <span>/</span>
            <Link href="/bat-dong-san" className="hover:text-blue-600">
              {t("nav.properties")}
            </Link>
            <span>/</span>
            <span className="text-gray-900">{property[language]?.name}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            {Array.isArray(property.images) && property.images.length > 0 && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <div className="relative">
                  <Image
                    src={
                      property.images[currentImageIndex] || "/placeholder.svg"
                    }
                    alt={property[language]?.name}
                    width={600}
                    height={400}
                    className="w-full h-96 object-cover"
                  />
                  {property.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}
                  {property.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {property.images.map((_: any, index: number) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-3 h-3 rounded-full transition-colors ${
                            index === currentImageIndex
                              ? "bg-white"
                              : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
                {property.images.length > 1 && (
                  <div className="p-4">
                    <div className="grid grid-cols-4 gap-2">
                      {property.images.map((image: string, index: number) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`relative overflow-hidden rounded border-2 transition-colors ${
                            index === currentImageIndex
                              ? "border-blue-500"
                              : "border-gray-200"
                          }`}
                        >
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`${property[language]?.name} ${index + 1}`}
                            width={150}
                            height={100}
                            className="w-full h-20 object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Property Details */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">
                    {property[language]?.name}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property[language]?.address}
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline">
                      {t("property.code")}: {property[language]?.code}
                    </Badge>
                    {Array.isArray(property[language]?.hashtags) &&
                      property[language]?.hashtags.length > 0 &&
                      property[language]?.hashtags.map(
                        (tag: string, idx: number) => (
                          <Badge
                            key={idx}
                            className="bg-gray-100 text-gray-800 border border-gray-300"
                          >
                            {tag}
                          </Badge>
                        )
                      )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="text-3xl font-bold text-red-600 mb-6">
                {formatPrice(Number(property[language]?.price), language)}
              </div>

              {/* Property Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Square className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                  <div className="font-semibold">
                    {property[language]?.area}
                  </div>
                  <div className="text-sm text-gray-600">
                    {t("property.area")}
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Square className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                  <div className="font-semibold">
                    {property[language]?.landArea}
                  </div>
                  <div className="text-sm text-gray-600">Diện tích đất</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Bed className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                  <div className="font-semibold">
                    {property[language]?.bedrooms}
                  </div>
                  <div className="text-sm text-gray-600">
                    {t("property.bedrooms")}
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Bath className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                  <div className="font-semibold">
                    {property[language]?.bathrooms}
                  </div>
                  <div className="text-sm text-gray-600">
                    {t("property.bathrooms")}
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">
                  {t("property.description")}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {property[language]?.description}
                </p>
              </div>

              {/* Features */}
              {property.highlights &&
                Array.isArray(property[language]?.highlights) && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3">
                      {t("property.features")}
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {property[language]?.highlights.map(
                        (feature: string, index: number) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

              {/* Extras (Tiện ích) */}
              {property[language]?.extras &&
                Array.isArray(property[language]?.extras) && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3">
                      {t("property.extras") ||
                        (language === "en"
                          ? "Extras"
                          : language === "ko"
                          ? "편의시설"
                          : "Tiện ích")}
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {property[language]?.extras.map(
                        (extra: string, idx: number) => (
                          <div
                            key={idx}
                            className="flex items-center space-x-2"
                          >
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            <span className="text-gray-700">{extra}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

              {/* Additional Info */}
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  {t("property.additionalInfo")}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium">{t("property.floors")}:</span>
                    <span className="ml-2 text-gray-700">
                      {property[language]?.floors}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">
                      {t("property.direction")}:
                    </span>
                    <span className="ml-2 text-gray-700">
                      {property[language]?.direction}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">
                {t("property.mapLocation")}
              </h3>
              <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">
                  Google Maps sẽ được tích hợp tại đây
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Contact */}
            {property.agent && (
              <Card>
                <CardHeader>
                  <CardTitle>{t("property.contactAgent")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 mb-4">
                    <Image
                      src={property.agent.avatar || "/placeholder.svg"}
                      alt={property.agent.name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold">{property.agent.name}</h4>
                      <p className="text-sm text-gray-600">
                        {t("property.specialist")}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      asChild
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      <Link href={`tel:${property.agent.phone}`}>
                        <Phone className="h-4 w-4 mr-2" />
                        {property.agent.phone}
                      </Link>
                    </Button>

                    <Button asChild variant="outline" className="w-full">
                      <Link href={`mailto:${property.agent.email}`}>
                        <Mail className="h-4 w-4 mr-2" />
                        {t("property.sendEmail")}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Contact Form */}
            <div className="sticky top-36">
              <Card>
                <CardHeader>
                  <CardTitle>{t("property.requestConsultation")}</CardTitle>
                  <CardDescription>
                    {t("property.consultationDescription")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ConsultationForm t={t} />
                </CardContent>
              </Card>
            </div>
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

// Thêm component form tư vấn
function ConsultationForm({ t }: { t: any }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/contact-message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        window.alert(
          t("contact.successMessage") || "Gửi thông tin thành công!"
        );
        setForm({ name: "", phone: "", email: "", message: "" });
      } else {
        window.alert(
          t("contact.errorMessage") ||
            "Gửi thông tin thất bại. Vui lòng thử lại."
        );
      }
    } catch {
      window.alert(
        t("contact.errorMessage") || "Gửi thông tin thất bại. Vui lòng thử lại."
      );
    }
    setLoading(false);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Input
        placeholder={`${t("property.fullName")} *`}
        required
        value={form.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />
      <Input
        placeholder={`${t("property.phone")} *`}
        type="tel"
        required
        value={form.phone}
        onChange={(e) => handleChange("phone", e.target.value)}
      />
      <Input
        placeholder={t("property.email")}
        type="email"
        value={form.email}
        onChange={(e) => handleChange("email", e.target.value)}
      />
      <Textarea
        placeholder={t("property.consultationContent")}
        rows={4}
        required
        value={form.message}
        onChange={(e) => handleChange("message", e.target.value)}
      />
      <Button
        className="w-full bg-orange-500 hover:bg-orange-600"
        type="submit"
        disabled={loading}
      >
        {loading
          ? t("common.loading") || "Đang gửi..."
          : t("property.sendRequest")}
      </Button>
    </form>
  );
}
