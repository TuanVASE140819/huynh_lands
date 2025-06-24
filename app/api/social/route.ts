import { NextResponse } from "next/server";

export async function GET() {
  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8011/api";
  try {
    const res = await fetch(`${apiBaseUrl}/social`);
    if (!res.ok) throw new Error("Failed to fetch social data");
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Không thể lấy dữ liệu social từ API" },
      { status: 500 }
    );
  }
}
