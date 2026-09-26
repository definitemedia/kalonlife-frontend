import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const handleI18n = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.delete("accept-language");

  return handleI18n(
    new NextRequest(request.url, {
      headers,
      method: request.method,
    }),
  );
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
