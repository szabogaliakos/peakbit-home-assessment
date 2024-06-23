import { NextRequest, NextResponse } from "next/server";
import { generateToken, renewToken } from "@/src/app/_lib/api";

export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get("uuidToken")?.value;

  if (!cookie) {
    const uuidToken = await generateToken();
    const cookieValue = JSON.stringify(uuidToken);

    const response = NextResponse.next();
    response.cookies.set("uuidToken", cookieValue, { httpOnly: true });

    return response;
  } else {
    const uuidToken = JSON.parse(cookie);

    if (uuidToken.availableUsages <= 0) {
      const response = NextResponse.next();
      const uuidToken = JSON.parse(cookie);
      await renewToken(uuidToken);

      uuidToken.availableUsages = 5;
      const cookieValue = JSON.stringify(uuidToken);
      response.cookies.set("uuidToken", cookieValue, { httpOnly: true });

      return response;
    } else {
      const response = NextResponse.next();

      const newAvailableUsages = uuidToken.availableUsages - 1;
      const newUuidToken = { ...uuidToken, availableUsages: newAvailableUsages };

      const cookieValue = JSON.stringify(newUuidToken);
      response.cookies.set("uuidToken", cookieValue, { httpOnly: true });
      return response;
    }
  }
}

export const config = {
  matcher: "/articles/:articleId*",
};
