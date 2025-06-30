import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const businessType = searchParams.get("businessType") || "buy";
  const status = searchParams.get("status") || "active";
  const lang = searchParams.get("lang") || "vi";
  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8011/api";

  try {
    const url = `${apiBaseUrl}/property?businessType=${businessType}&status=${status}&lang=${lang}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch property data");
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Không thể lấy dữ liệu property từ API" },
      { status: 500 }
    );
  }
}
