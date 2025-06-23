import { NextResponse } from "next/server";

export async function GET() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8011/api";
  try {
    const res = await fetch(`${apiBaseUrl}/mainoffice-map`);
    if (!res.ok) throw new Error("Failed to fetch main office map data");
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Không thể lấy dữ liệu bản đồ văn phòng chính từ API" }, { status: 500 });
  }
}
