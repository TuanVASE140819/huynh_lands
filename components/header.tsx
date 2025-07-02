"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Menu, X, Search, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import LanguageSwitcher from "@/components/language-switcher";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();
  const [contactInfo, setContactInfo] = useState<{ hotline: string; email: string }>({
    hotline: "",
    email: "",
  });

  useEffect(() => {
    fetch("/api/contact")
      .then((res) => res.json())
      .then((data) => {
        setContactInfo({
          hotline: data.contact?.hotline || "0123 456 789",
          email: data.contact?.email || "info@thuyanhland.com",
        });
      })
      .catch(() => {
        setContactInfo({ hotline: "0123 456 789", email: "info@thuyanhland.com" });
      });
  }, []);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div>Hotline: {contactInfo.hotline} | Email: {contactInfo.email}</div>
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <Link href="/dang-ky" className="hover:underline">
              {t("nav.register")}
            </Link>
            <Link href="/dang-nhap" className="hover:underline">
              {t("nav.login")}
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white p-2 rounded-lg">
              <span className="font-bold text-xl">TA</span>
            </div>
            <div>
              <div className="font-bold text-xl bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                Huỳnh Land
              </div>
              <div className="text-sm text-gray-600">Bất động sản uy tín</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              {t("nav.home")}
            </Link>
            <Link
              href="/gioi-thieu"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              {t("nav.about")}
            </Link>
            <Link
              href="/bat-dong-san/thue"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              {t("nav.rent")}
            </Link>
            <Link
              href="/bat-dong-san/mua"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              {t("nav.buy")}
            </Link>
            <Link
              href="/tin-tuc"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              {t("nav.news")}
            </Link>
            <Link
              href="/lien-he"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              {t("nav.contact")}
            </Link>
          </nav>

          {/* Contact Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              asChild
              className="bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 shadow-lg"
            >
              <Link href="tel:0123456789">
                <Phone className="h-4 w-4 mr-2" />
                {t("cta.call")}
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Search bar */}
        <div className="hidden md:block pb-4">
          <div className="flex items-center space-x-2 max-w-4xl mx-auto">
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder={t("search.propertyType")} />
              </SelectTrigger>
              <SelectContent>
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
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder={t("search.location")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="quan-1">{t("locations.quan-1")}</SelectItem>
                <SelectItem value="quan-7">{t("locations.quan-7")}</SelectItem>
                <SelectItem value="thu-duc">
                  {t("locations.thu-duc")}
                </SelectItem>
                <SelectItem value="binh-thanh">
                  {t("locations.binh-thanh")}
                </SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder={t("search.priceRange")} />
              </SelectTrigger>
              <SelectContent>
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
            <div className="flex-1">
              <Input placeholder={t("search.keyword")} />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <Link
              href="/"
              className="block text-gray-700 hover:text-blue-600 font-medium"
            >
              {t("nav.home")}
            </Link>
            <Link
              href="/gioi-thieu"
              className="block text-gray-700 hover:text-blue-600 font-medium"
            >
              {t("nav.about")}
            </Link>
            <Link
              href="/bat-dong-san/thue"
              className="block text-gray-700 hover:text-blue-600 font-medium"
            >
              {t("nav.rent")}
            </Link>
            <Link
              href="/bat-dong-san/mua"
              className="block text-gray-700 hover:text-blue-600 font-medium"
            >
              {t("nav.buy")}
            </Link>
            <Link
              href="/tin-tuc"
              className="block text-gray-700 hover:text-blue-600 font-medium"
            >
              {t("nav.news")}
            </Link>
            <Link
              href="/lien-he"
              className="block text-gray-700 hover:text-blue-600 font-medium"
            >
              {t("nav.contact")}
            </Link>
            <div className="pt-4 border-t flex items-center justify-between">
              <LanguageSwitcher />
              <Button asChild className="bg-orange-500 hover:bg-orange-600">
                <Link href="tel:0123456789">
                  <Phone className="h-4 w-4 mr-2" />
                  {t("cta.call")}: 0123 456 789
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
