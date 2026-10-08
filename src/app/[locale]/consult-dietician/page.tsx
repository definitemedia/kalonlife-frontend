import { setRequestLocale } from "next-intl/server";
import { permanentRedirect } from "@/i18n/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  permanentRedirect({ href: "/consult-your-dietician", locale });
}
