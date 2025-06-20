"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Bed, Bath, Square, Phone, Mail, Share2, Heart, ChevronLeft, ChevronRight, ArrowUp } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import propertiesData from "@/data/properties.json"

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const { t, language } = useLanguage()

  // Find property from data (mock implementation)
  const allProperties = [...propertiesData.featuredProperties, ...propertiesData.allProperties]
  const property = allProperties.find((p) => p.id.toString() === params.id) || propertiesData.featuredProperties[0]

  // Mock additional data for property detail
  const propertyDetail = {
    ...property,
    landArea: "250m²",
    floors: 3,
    code: "BDS001",
    status: {
      vi: "Sẵn sàng bán",
      en: "Ready to sell",
      ko: "판매 준비됨",
    },
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    agent: {
      name: "Nguyễn Văn A",
      phone: "0123 456 789",
      email: "agent@thuyanhland.com",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  }

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [params.id])

  // Show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === propertyDetail.images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? propertyDetail.images.length - 1 : prev - 1))
  }

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
            <span className="text-gray-900">{propertyDetail.title[language]}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="relative">
                <Image
                  src={propertyDetail.images[currentImageIndex] || "/placeholder.svg"}
                  alt={propertyDetail.title[language]}
                  width={600}
                  height={400}
                  className="w-full h-96 object-cover"
                />
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
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {propertyDetail.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                    />
                  ))}
                </div>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-4 gap-2">
                  {propertyDetail.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative overflow-hidden rounded border-2 transition-colors ${
                        index === currentImageIndex ? "border-blue-500" : "border-gray-200"
                      }`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${propertyDetail.title[language]} ${index + 1}`}
                        width={150}
                        height={100}
                        className="w-full h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{propertyDetail.title[language]}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {propertyDetail.location[language]}
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline">
                      {t("property.code")}: {propertyDetail.code}
                    </Badge>
                    <Badge className="bg-green-100 text-green-800">{propertyDetail.status[language]}</Badge>
                    <Badge className="bg-blue-100 text-blue-800">{propertyDetail.type[language]}</Badge>
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
                {language === "en"
                  ? propertyDetail.priceUSD
                  : language === "ko"
                    ? propertyDetail.priceKRW
                    : propertyDetail.price}
              </div>

              {/* Property Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Square className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                  <div className="font-semibold">{propertyDetail.area}</div>
                  <div className="text-sm text-gray-600">{t("property.area")}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Square className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                  <div className="font-semibold">{propertyDetail.landArea}</div>
                  <div className="text-sm text-gray-600">Diện tích đất</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Bed className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                  <div className="font-semibold">{propertyDetail.bedrooms}</div>
                  <div className="text-sm text-gray-600">{t("property.bedrooms")}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Bath className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                  <div className="font-semibold">{propertyDetail.bathrooms}</div>
                  <div className="text-sm text-gray-600">{t("property.bathrooms")}</div>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">{t("property.description")}</h3>
                <p className="text-gray-700 leading-relaxed">{propertyDetail.description[language]}</p>
              </div>

              {/* Features */}
              {propertyDetail.features && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">{t("property.features")}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {propertyDetail.features[language]?.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Info */}
              <div>
                <h3 className="text-xl font-semibold mb-3">{t("property.additionalInfo")}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium">{t("property.floors")}:</span>
                    <span className="ml-2 text-gray-700">{propertyDetail.floors} tầng</span>
                  </div>
                  <div>
                    <span className="font-medium">{t("property.direction")}:</span>
                    <span className="ml-2 text-gray-700">{propertyDetail.direction?.[language]}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">{t("property.mapLocation")}</h3>
              <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Google Maps sẽ được tích hợp tại đây</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Contact */}
            <Card>
              <CardHeader>
                <CardTitle>{t("property.contactAgent")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <Image
                    src={propertyDetail.agent.avatar || "/placeholder.svg"}
                    alt={propertyDetail.agent.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">{propertyDetail.agent.name}</h4>
                    <p className="text-sm text-gray-600">{t("property.specialist")}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                    <Link href={`tel:${propertyDetail.agent.phone}`}>
                      <Phone className="h-4 w-4 mr-2" />
                      {propertyDetail.agent.phone}
                    </Link>
                  </Button>

                  <Button asChild variant="outline" className="w-full">
                    <Link href={`mailto:${propertyDetail.agent.email}`}>
                      <Mail className="h-4 w-4 mr-2" />
                      {t("property.sendEmail")}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>{t("property.requestConsultation")}</CardTitle>
                <CardDescription>Để lại thông tin để được tư vấn miễn phí</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <Input placeholder={`${t("property.fullName")} *`} required />
                  <Input placeholder={`${t("property.phone")} *`} type="tel" required />
                  <Input placeholder={t("property.email")} type="email" />
                  <Textarea placeholder={t("property.consultationContent")} rows={4} />
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">{t("property.sendRequest")}</Button>
                </form>
              </CardContent>
            </Card>

            {/* Similar Properties */}
            <Card>
              <CardHeader>
                <CardTitle>{t("property.similarProperties")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allProperties.slice(0, 3).map((item) => (
                    <Link key={item.id} href={`/bat-dong-san/${item.id}`} className="block">
                      <div className="flex space-x-3 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                        <Image
                          src="/placeholder.svg?height=60&width=80"
                          alt="Property"
                          width={80}
                          height={60}
                          className="rounded object-cover"
                        />
                        <div className="flex-1">
                          <h5 className="font-medium text-sm mb-1">{item.title[language]}</h5>
                          <p className="text-xs text-gray-600 mb-1">{item.location[language]}</p>
                          <p className="text-sm font-semibold text-red-600">
                            {language === "en" ? item.priceUSD : language === "ko" ? item.priceKRW : item.price}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
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
  )
}
