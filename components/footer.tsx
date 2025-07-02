"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Youtube, Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { useEffect, useState } from "react";

export default function Footer() {
  const { t } = useLanguage();

  const [contact, setContact] = useState<{
    hotline: string;
    email: string;
  } | null>(null);
  const [mainOffice, setMainOffice] = useState<{ address: string } | null>(
    null
  );

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8011/api";
  useEffect(() => {
    fetch(`${API_BASE_URL}/contact`)
      .then((res) => res.json())
      .then((data) => setContact(data.contact || null))
      .catch(() => setContact(null));
    fetch(`${API_BASE_URL}/office?lang=vi`)
      .then((res) => res.json())
      .then((data) => {
        // Ưu tiên lấy văn phòng đầu tiên làm văn phòng chính
        if (Array.isArray(data.office) && data.office.length > 0) {
          setMainOffice({ address: data.office[0].address });
        } else if (data.office && data.office.address) {
          setMainOffice({ address: data.office.address });
        } else {
          setMainOffice(null);
        }
      })
      .catch(() => setMainOffice(null));
  }, [API_BASE_URL]);

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white p-2 rounded-lg">
                <span className="font-bold text-xl">TA</span>
              </div>
              <div>
                <div className="font-bold text-xl bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                  Huỳnh Land
                </div>
                <div className="text-sm text-gray-400">Bất động sản uy tín</div>
              </div>
            </div>
            <p className="text-gray-400 mb-4">{t("footer.description")}</p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-400 hover:text-primary-400 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/gioi-thieu"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/bat-dong-san"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("nav.properties")}
                </Link>
              </li>
              <li>
                <Link
                  href="/tin-tuc"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("nav.news")}
                </Link>
              </li>
              <li>
                <Link
                  href="/lien-he"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4 bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
              {t("footer.contactInfo")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary-400" />
                <span className="text-gray-400">
                  {contact?.hotline || "..."}
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary-400" />
                <span className="text-gray-400">{contact?.email || "..."}</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-primary-400 mt-1" />
                <span className="text-gray-400">
                  {mainOffice?.address || "..."}
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4 bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
              {t("footer.newsletter")}
            </h3>
            <p className="text-gray-400 mb-4">{t("footer.newsletterDesc")}</p>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email của bạn"
                className="bg-gray-800 border-gray-700 text-white focus:border-primary-500"
              />
              <Button className="w-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700">
                {t("footer.subscribe")}
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
