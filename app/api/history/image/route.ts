import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return NextResponse.json({
    url: "https://dl.dropboxusercontent.com/scl/fi/6dx1m40t55pxw05yh4bju/1751246849728_bom.png?rlkey=kghkfvd0f9unvr2datnoxh8p5&dl=0",
  });
}
