"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Users, Award, TrendingUp, Heart } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import propertiesData from "@/data/properties.json"

export default function HomePage() {
  const { t, language } = useLanguage()
  const { featuredProperties } = propertiesData

  const whyChooseUs = [
    {
      icon: <Award className="h-8 w-8 text-primary-600" />,
      title: {
        vi: "Uy tín hàng đầu",
        en: "Leading Reputation",
        ko: "최고의 신뢰",
      },
      description: {
        vi: "Hơn 10 năm kinh nghiệm trong lĩnh vực bất động sản",
        en: "Over 10 years of experience in real estate",
        ko: "부동산 분야 10년 이상의 경험",
      },
    },
    {
      icon: <Users className="h-8 w-8 text-primary-600" />,
      title: {
        vi: "Đội ngũ chuyên nghiệp",
        en: "Professional Team",
        ko: "전문 팀",
      },
      description: {
        vi: "Đội ngũ môi giới giàu kinh nghiệm, tư vấn tận tình",
        en: "Experienced brokers, dedicated consultation",
        ko: "경험 많은 중개인, 전담 상담",
      },
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary-600" />,
      title: {
        vi: "Thị trường rộng lớn",
        en: "Extensive Market",
        ko: "광범위한 시장",
      },
      description: {
        vi: "Kết nối với hàng nghìn dự án bất động sản chất lượng",
        en: "Connected to thousands of quality real estate projects",
        ko: "수천 개의 양질의 부동산 프로젝트와 연결",
      },
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-br from-primary-900 via-primary-800 to-accent-700 flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/50 to-transparent"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 animate-fade-in">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
            {t("hero.title")}
          </h1>
          <p className="text-xl mb-8 text-gray-100">{t("hero.subtitle")}</p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <Link href="/bat-dong-san">{t("hero.cta")}</Link>
          </Button>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-r from-accent-400/20 to-primary-400/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-r from-secondary-400/20 to-accent-400/20 rounded-full blur-xl"></div>
      </section>

      {/* Quick Search */}
      <section className="py-8 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
            <h2 className="text-2xl font-semibold mb-4 text-center bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              {t("search.title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select>
                <SelectTrigger className="border-2 border-gray-200 hover:border-primary-300 transition-colors">
                  <SelectValue placeholder={t("search.propertyType")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nha-pho">{t("propertyTypes.nha-pho")}</SelectItem>
                  <SelectItem value="can-ho">{t("propertyTypes.can-ho")}</SelectItem>
                  <SelectItem value="biet-thu">{t("propertyTypes.biet-thu")}</SelectItem>
                  <SelectItem value="dat-nen">{t("propertyTypes.dat-nen")}</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="border-2 border-gray-200 hover:border-primary-300 transition-colors">
                  <SelectValue placeholder={t("search.location")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quan-1">{t("locations.quan-1")}</SelectItem>
                  <SelectItem value="quan-7">{t("locations.quan-7")}</SelectItem>
                  <SelectItem value="thu-duc">{t("locations.thu-duc")}</SelectItem>
                  <SelectItem value="binh-thanh">{t("locations.binh-thanh")}</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="border-2 border-gray-200 hover:border-primary-300 transition-colors">
                  <SelectValue placeholder={t("search.priceRange")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="duoi-5ty">{t("priceRanges.duoi-5ty")}</SelectItem>
                  <SelectItem value="5-10ty">{t("priceRanges.5-10ty")}</SelectItem>
                  <SelectItem value="10-20ty">{t("priceRanges.10-20ty")}</SelectItem>
                  <SelectItem value="tren-20ty">{t("priceRanges.tren-20ty")}</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 shadow-lg transform hover:scale-105 transition-all duration-300">
                {t("search.search")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              {t("about.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t("about.description")}</p>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              {t("featured.title")}
            </h2>
            <p className="text-lg text-gray-600">{t("featured.subtitle")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <Card
                key={property.id}
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm"
              >
                <div className="relative">
                  <Image
                    src={property.image || "/placeholder.svg"}
                    alt={property.title[language]}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-2 left-2 bg-gradient-to-r from-primary-600 to-accent-600 text-white border-0">
                    {property.type[language]}
                  </Badge>
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 cursor-pointer transition-colors" />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{property.title[language]}</CardTitle>
                  <CardDescription className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.location[language]}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                      {language === "en" ? property.priceUSD : language === "ko" ? property.priceKRW : property.price}
                    </span>
                    <span className="text-gray-600">{property.area}</span>
                  </div>
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 shadow-lg"
                  >
                    <Link href={`/bat-dong-san/${property.id}`}>{t("property.viewDetails")}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-primary-200 hover:bg-primary-50 hover:border-primary-300"
            >
              <Link href="/bat-dong-san">{t("property.viewAll")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              {t("whyChoose.title")}
            </h2>
            <p className="text-lg text-gray-600">{t("whyChoose.subtitle")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex justify-center mb-4 p-3 bg-gradient-to-r from-primary-100 to-accent-100 rounded-full w-fit mx-auto">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title[language]}</h3>
                <p className="text-gray-600">{item.description[language]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-4">{t("cta.title")}</h2>
          <p className="text-xl mb-8 text-gray-100">{t("cta.subtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Link href="/lien-he">{t("cta.contact")}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-primary-600 border-white hover:bg-white hover:text-primary-700 shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Link href="tel:0123456789">
                <Phone className="h-4 w-4 mr-2" />
                {t("cta.call")}: 0123 456 789
              </Link>
            </Button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-16 h-16 bg-secondary-400/20 rounded-full blur-xl"></div>
      </section>
    </div>
  )
}
