import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const lang = req.nextUrl.searchParams.get("lang") || "vi";
  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8011/api";
  try {
    const res = await fetch(`${apiBaseUrl}/mission?lang=${lang}`);
    if (!res.ok) throw new Error("Failed to fetch mission data");
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Không thể lấy dữ liệu mission từ API" },
      { status: 500 }
    );
  }
}
