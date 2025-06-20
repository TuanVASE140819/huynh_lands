"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, User, Eye, Search } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import newsData from "@/data/news.json"

export default function NewsPage() {
  const { t, language } = useLanguage()
  const { featuredNews, articles } = newsData

  const categories = ["all", "market-analysis", "guide", "investment", "legal", "design", "new-projects", "tax"]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
            {t("news.title")}
          </h1>
          <p className="text-lg text-gray-600">{t("news.subtitle")}</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder={t("news.searchNews")} className="pl-10" />
              </div>
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder={t("news.category")} />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {t(`newsCategories.${category}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder={t("search.sortBy")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">{t("sortOptions.newest")}</SelectItem>
                <SelectItem value="oldest">Cũ nhất</SelectItem>
                <SelectItem value="most-viewed">Xem nhiều nhất</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Featured News */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
            {t("news.featured")}
          </h2>
          <Card className="overflow-hidden shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <div className="md:flex">
              <div className="md:w-1/2">
                <Image
                  src={featuredNews.image || "/placeholder.svg"}
                  alt={featuredNews.title[language]}
                  width={600}
                  height={300}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0">
                    {featuredNews.category[language]}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    {featuredNews.date}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">{featuredNews.title[language]}</h3>
                <p className="text-gray-600 mb-6">{featuredNews.excerpt[language]}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {featuredNews.author}
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {featuredNews.views} {t("news.views")}
                    </div>
                  </div>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700"
                  >
                    <Link href={`/tin-tuc/${featuredNews.id}`}>{t("news.readMore")}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* News Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
            {t("news.latest")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Card
                key={article.id}
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm"
              >
                <div className="relative">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title[language]}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-2 left-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
                    {article.category[language]}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2">{article.title[language]}</CardTitle>
                  <CardDescription className="line-clamp-3">{article.excerpt[language]}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {article.date}
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {article.views}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="h-4 w-4 mr-1" />
                      {article.author}
                    </div>
                    <Button asChild variant="outline" size="sm" className="border-2 hover:bg-primary-50">
                      <Link href={`/tin-tuc/${article.id}`}>{t("news.readMore")}</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center">
          <div className="flex space-x-2">
            <Button variant="outline">{t("pagination.previous")}</Button>
            <Button>1</Button>
            <Button variant="outline">2</Button>
            <Button variant="outline">3</Button>
            <Button variant="outline">{t("pagination.next")}</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
