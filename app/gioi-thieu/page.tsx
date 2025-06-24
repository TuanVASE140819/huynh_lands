"use client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Award, TrendingUp, Target, Eye, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/language-context";

export default function AboutPage() {
  const team = [
    {
      name: "Nguyễn Thùy Anh",
      position: "Giám đốc điều hành",
      experience: "15 năm kinh nghiệm",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Trần Văn B",
      position: "Trưởng phòng kinh doanh",
      experience: "12 năm kinh nghiệm",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Lê Thị C",
      position: "Chuyên viên tư vấn cao cấp",
      experience: "8 năm kinh nghiệm",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Phạm Văn D",
      position: "Chuyên viên pháp lý",
      experience: "10 năm kinh nghiệm",
      image: "/placeholder.svg?height=200&width=200",
    },
  ];

  const achievements = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      number: "5000+",
      title: "Khách hàng tin tưởng",
    },
    {
      icon: <Award className="h-8 w-8 text-blue-600" />,
      number: "1000+",
      title: "Giao dịch thành công",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
      number: "15+",
      title: "Năm kinh nghiệm",
    },
    {
      icon: <Target className="h-8 w-8 text-blue-600" />,
      number: "98%",
      title: "Khách hàng hài lòng",
    },
  ];

  const { language } = useLanguage();
  const [history, setHistory] = useState<{ title: string; content: string } | null>(null);
  const [mission, setMission] = useState<{ title: string; content: string } | null>(null);
  const [vision, setVision] = useState<{ title: string; content: string } | null>(null);

  useEffect(() => {
    fetch(`/api/history?lang=${language}`)
      .then((res) => res.json())
      .then((data) => {
        // Đảm bảo data.history là object, nếu không thì set null
        if (data && typeof data.history === "object" && data.history !== null) {
          setHistory(data.history);
        } else {
          setHistory(null);
        }
      })
      .catch(() => setHistory(null));
  }, [language]);

  useEffect(() => {
    fetch(`/api/mission?lang=${language}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.mission === "object" && data.mission !== null) {
          setMission(data.mission);
        } else {
          setMission(null);
        }
      })
      .catch(() => setMission(null));
  }, [language]);

  useEffect(() => {
    fetch(`/api/vision?lang=${language}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.vision === "object" && data.vision !== null) {
          setVision(data.vision);
        } else {
          setVision(null);
        }
      })
      .catch(() => setVision(null));
  }, [language]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-blue-900 to-blue-700 flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Về Thùy Anh Land</h1>
          <p className="text-xl">
            Đối tác tin cậy trong mọi giao dịch bất động sản
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Company Story */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                {history?.title || "Lịch sử hình thành"}
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  {history?.content || (
                    <>
                      Thùy Anh Land được thành lập vào năm 2009 với sứ mệnh mang
                      đến những giải pháp bất động sản tối ưu cho khách hàng. Từ
                      một công ty nhỏ với đội ngũ chỉ 5 người, chúng tôi đã phát
                      triển thành một trong những thương hiệu uy tín hàng đầu
                      trong lĩnh vực bất động sản tại TP.HCM.
                    </>
                  )}
                </p>
              </div>
            </div>
            <div>
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Thùy Anh Land Office"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="text-center p-8">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Target className="h-12 w-12 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">
                  {mission?.title || "Sứ mệnh"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {mission?.content ||
                    "Mang đến những giải pháp bất động sản tối ưu, giúp khách hàng tìm được ngôi nhà mơ ước và thực hiện các khoản đầu tư sinh lời bền vững."}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Eye className="h-12 w-12 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">
                  {vision?.title || "Tầm nhìn"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {vision?.content ||
                    "Trở thành công ty bất động sản hàng đầu Việt Nam, được khách hàng tin tưởng và lựa chọn số 1 trong mọi giao dịch bất động sản."
                  }
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Giá trị cốt lõi</h2>
            <p className="text-lg text-gray-600">
              Những giá trị định hướng mọi hoạt động của chúng tôi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Heart className="h-12 w-12 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Tận tâm</h3>
              <p className="text-gray-600">
                Luôn đặt lợi ích khách hàng lên hàng đầu, tư vấn tận tình và chu
                đáo
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Award className="h-12 w-12 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Uy tín</h3>
              <p className="text-gray-600">
                Xây dựng niềm tin qua từng giao dịch, minh bạch trong mọi hoạt
                động
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <TrendingUp className="h-12 w-12 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Chuyên nghiệp</h3>
              <p className="text-gray-600">
                Đội ngũ được đào tạo bài bản, am hiểu sâu sắc thị trường bất
                động sản
              </p>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="mb-16 bg-gray-50 -mx-4 px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Thành tựu đạt được</h2>
            <p className="text-lg text-gray-600">
              Những con số ấn tượng sau hơn 15 năm hoạt động
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {achievement.icon}
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {achievement.number}
                </div>
                <div className="text-gray-600">{achievement.title}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Đội ngũ lãnh đạo</h2>
            <p className="text-lg text-gray-600">
              Những người dẫn dắt Thùy Anh Land phát triển
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={120}
                      height={120}
                      className="rounded-full"
                    />
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription>{member.position}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline">{member.experience}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Tại sao chọn Thùy Anh Land?
            </h2>
            <p className="text-lg text-gray-600">
              Những lợi thế cạnh tranh của chúng tôi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 font-semibold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Mạng lưới rộng khắp
                  </h3>
                  <p className="text-gray-600">
                    Có mặt tại tất cả các quận huyện chính của TP.HCM và các
                    tỉnh lân cận
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 font-semibold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Đội ngũ chuyên nghiệp
                  </h3>
                  <p className="text-gray-600">
                    Hơn 50 chuyên viên tư vấn được đào tạo bài bản, có chứng chỉ
                    hành nghề
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 font-semibold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Dịch vụ toàn diện
                  </h3>
                  <p className="text-gray-600">
                    Từ tư vấn, định giá, pháp lý đến hỗ trợ vay vốn và bàn giao
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 font-semibold">4</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Công nghệ hiện đại
                  </h3>
                  <p className="text-gray-600">
                    Ứng dụng công nghệ trong quản lý và tư vấn khách hàng
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 font-semibold">5</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Hỗ trợ 24/7</h3>
                  <p className="text-gray-600">
                    Luôn sẵn sàng hỗ trợ khách hàng mọi lúc, mọi nơi
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 font-semibold">6</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Cam kết chất lượng
                  </h3>
                  <p className="text-gray-600">
                    Đảm bảo 100% pháp lý rõ ràng và hỗ trợ hậu mãi tận tình
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
