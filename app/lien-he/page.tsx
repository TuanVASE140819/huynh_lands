"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock, Facebook, Youtube } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function ContactPage() {
  const { t, language } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.")
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const offices = [
    {
      name: {
        vi: "Văn phòng chính - Quận 1",
        en: "Main Office - District 1",
        ko: "본사 - 1구",
      },
      address: {
        vi: "123 Đường Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM",
        en: "123 Nguyen Hue Street, Ben Nghe Ward, District 1, HCMC",
        ko: "호치민시 1구 벤게동 응우옌후에거리 123번지",
      },
      phone: "028 3822 1234",
      email: "quan1@thuyanhland.com",
    },
    {
      name: {
        vi: "Chi nhánh Quận 7",
        en: "District 7 Branch",
        ko: "7구 지점",
      },
      address: {
        vi: "456 Đường Nguyễn Thị Thập, Phường Tân Phú, Quận 7, TP.HCM",
        en: "456 Nguyen Thi Thap Street, Tan Phu Ward, District 7, HCMC",
        ko: "호치민시 7구 탄푸동 응우옌티탑거리 456번지",
      },
      phone: "028 5412 5678",
      email: "quan7@thuyanhland.com",
    },
    {
      name: {
        vi: "Chi nhánh Thủ Đức",
        en: "Thu Duc Branch",
        ko: "투득 지점",
      },
      address: {
        vi: "789 Đường Võ Văn Ngân, Phường Linh Chiểu, TP. Thủ Đức, TP.HCM",
        en: "789 Vo Van Ngan Street, Linh Chieu Ward, Thu Duc City, HCMC",
        ko: "호치민시 투득시 린치에우동 보반간거리 789번지",
      },
      phone: "028 3715 9012",
      email: "thuduc@thuyanhland.com",
    },
  ]

  const contactSubjects = ["mua-ban", "cho-thue", "tu-van", "phap-ly", "khac"]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-accent-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{t("contact.title")}</h1>
          <p className="text-xl">{t("contact.subtitle")}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                  {t("contact.sendMessage")}
                </CardTitle>
                <CardDescription>{t("contact.formDescription")}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">{t("property.fullName")} *</label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder={t("property.fullName")}
                        className="border-2 border-gray-200 focus:border-primary-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">{t("property.phone")} *</label>
                      <Input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder={t("property.phone")}
                        className="border-2 border-gray-200 focus:border-primary-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">{t("property.email")}</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder={t("property.email")}
                      className="border-2 border-gray-200 focus:border-primary-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">{t("contact.subject")}</label>
                    <Select onValueChange={(value) => handleChange("subject", value)}>
                      <SelectTrigger className="border-2 border-gray-200 focus:border-primary-500 transition-colors">
                        <SelectValue placeholder={t("contact.subject")} />
                      </SelectTrigger>
                      <SelectContent>
                        {contactSubjects.map((subject) => (
                          <SelectItem key={subject} value={subject}>
                            {t(`contactSubjects.${subject}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">{t("contact.content")} *</label>
                    <Textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      placeholder={t("property.consultationContent")}
                      className="border-2 border-gray-200 focus:border-primary-500 transition-colors"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    {t("contact.sendMessageBtn")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Quick Contact */}
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                  {t("contact.quickContact")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary-600" />
                  <div>
                    <div className="font-medium">{t("contact.hotline")}</div>
                    <div className="text-gray-600">0123 456 789</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary-600" />
                  <div>
                    <div className="font-medium">{t("property.email")}</div>
                    <div className="text-gray-600">info@thuyanhland.com</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-primary-600" />
                  <div>
                    <div className="font-medium">{t("contact.workingHours")}</div>
                    <div className="text-gray-600">{t("contact.workingTime")}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Office Locations */}
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                  {t("contact.officeLocations")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {offices.map((office, index) => (
                  <div key={index} className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
                    <h4 className="font-semibold mb-2">{office.name[language]}</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-4 w-4 mt-0.5 text-primary-600" />
                        <span>{office.address[language]}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-primary-600" />
                        <span>{office.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-primary-600" />
                        <span>{office.email}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                  {t("contact.connectWithUs")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-2 border-2 hover:bg-primary-50"
                  >
                    <Facebook className="h-4 w-4" />
                    <span>Facebook</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-2 border-2 hover:bg-primary-50"
                  >
                    <Youtube className="h-4 w-4" />
                    <span>YouTube</span>
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mt-4">{t("contact.followUs")}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                {t("contact.mapTitle")}
              </CardTitle>
              <CardDescription>123 Đường Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Google Maps sẽ được tích hợp tại đây</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
