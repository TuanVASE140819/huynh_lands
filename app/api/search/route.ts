import { NextRequest, NextResponse } from "next/server";

function parsePriceToNumber(priceStr: string): number {
  // Chuyển "8.2 tỷ" => 8200000000, "12.8 tỷ" => 12800000000
  if (!priceStr) return 0;
  const match = priceStr.match(/([\d.]+)\s*tỷ/);
  if (match) {
    return parseFloat(match[1].replace(/\./g, "")) * 1_000_000_000;
  }
  return 0;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const location = searchParams.get("location");
  const price = searchParams.get("price");
  const keyword = searchParams.get("keyword")?.toLowerCase();

  // Lấy base URL từ biến môi trường
  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8011/api";

  // Lấy dữ liệu từ API ngoài
  let all: any[] = [];
  try {
    const res = await fetch(apiBaseUrl);
    if (!res.ok) throw new Error("Failed to fetch data from API");
    all = await res.json();
  } catch (error) {
    return NextResponse.json(
      { error: "Không thể lấy dữ liệu từ API" },
      { status: 500 }
    );
  }

  // Gộp tất cả bất động sản
  // let all = [
  //   ...(properties.featuredProperties || []),
  //   ...(properties.allProperties || []),
  // ];

  if (type) {
    all = all.filter((item: any) => {
      if (typeof item.type === "string") return item.type === type;
      return (
        item.type?.vi === type ||
        item.type?.en === type ||
        item.type?.ko === type
      );
    });
  }
  if (location) {
    all = all.filter((item: any) => {
      if (typeof item.location === "string") return item.location === location;
      return (
        item.location?.vi === location ||
        item.location?.en === location ||
        item.location?.ko === location
      );
    });
  }
  if (price) {
    all = all.filter((item: any) => {
      const p = parsePriceToNumber(item.price);
      if (price === "duoi-5ty") return p < 5_000_000_000;
      if (price === "5-10ty") return p >= 5_000_000_000 && p <= 10_000_000_000;
      if (price === "10-20ty") return p > 10_000_000_000 && p <= 20_000_000_000;
      if (price === "tren-20ty") return p > 20_000_000_000;
      return true;
    });
  }
  if (keyword) {
    all = all.filter((item: any) => {
      const title =
        typeof item.title === "string"
          ? item.title
          : Object.values(item.title || {}).join(" ");
      const desc =
        typeof item.description === "string"
          ? item.description
          : Object.values(item.description || {}).join(" ");
      return (
        title.toLowerCase().includes(keyword) ||
        desc.toLowerCase().includes(keyword)
      );
    });
  }

  return NextResponse.json(all);
}
