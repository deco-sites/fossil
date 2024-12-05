import { useCart } from "apps/vtex/hooks/useCart.ts";
import { MarketingData } from "apps/vtex/utils/types.ts";
import { deleteCookie, getCookie, setCookie } from "./useClientCookies.ts";

export function getMarketingDataByLoader(
  cookies: Record<string, string>,
  url: string,
): MarketingData {
  const { searchParams } = new URL(url);

  const utmSource = searchParams.get("utm_source") ||
    cookies["deco_utm_source"];

  const utmMedium = searchParams.get("utm_medium") ||
    cookies["deco_utm_medium"];

  const utmCampaign = searchParams.get("utm_campaign") ||
    cookies["deco_utm_campaign"];

  const utmiPage = searchParams.get("utmi_page") ||
    cookies["deco_utmi_page"];

  const utmiPart = searchParams.get("utmi_part") ||
    cookies["deco_utmi_part"];

  const utmiCampaign = searchParams.get("utmi_campaign") ||
    cookies["deco_utmi_campaign"];

  const coupon = searchParams.get("coupon") ||
    cookies["deco_coupon"];

  const marketing_data: MarketingData = {
    marketingTags: [],
    utmSource,
    utmMedium,
    utmCampaign,
    utmiPage,
    utmiPart,
    utmiCampaign,
    coupon,
  };

  return marketing_data;
}

export function getMarketingDataByClientCookies(
  coupon: string | undefined,
): MarketingData {
  const utmSource = getCookie("deco_utm_source");
  const utmMedium = getCookie("deco_utm_medium");
  const utmCampaign = getCookie("deco_utm_campaign");
  const utmiPage = getCookie("deco_utmi_page");
  const utmiPart = getCookie("deco_utmi_part");
  const utmiCampaign = getCookie("deco_utmi_campaign");

  const marketing_data: MarketingData = {
    marketingTags: [],
    utmSource,
    utmMedium,
    utmCampaign,
    utmiPage,
    utmiPart,
    utmiCampaign,
    coupon,
  };

  return marketing_data;
}

export function saveMarketingData(marketingData: MarketingData) {
  Object.entries(marketingData).forEach(([key, value]) => {
    if (value) setCookie(key, value);
  });
}

export function cleanMarketingData() {
  const empty_marketing_data: MarketingData = {
    utmSource: undefined,
    utmMedium: undefined,
    utmCampaign: undefined,
    utmiPage: undefined,
    utmiPart: undefined,
    utmiCampaign: undefined,
    coupon: undefined,
    marketingTags: undefined,
  };

  Object.entries(empty_marketing_data).forEach(([key, _value]) => {
    deleteCookie(key);
  });
}

export async function sendMarketingData(marketingData: MarketingData) {
  const { sendAttachment } = useCart();

  if (marketingData) {
    await sendAttachment({
      attachment: "marketingData",
      body: marketingData,
    });
  }
}
