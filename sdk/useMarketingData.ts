import { useCart } from "apps/vtex/hooks/useCart.ts";
import { MarketingData } from "apps/vtex/utils/types.ts";
import { deleteCookie, getCookie, setCookie } from "./useClientCookies.ts";
import { is_two_string_arrays_equal } from "../util/compare.ts";

const UTM_COOKIE = {
  utmSource: "utmSource",
  utmMedium: "utmMedium",
  utmCampaign: "utmCampaign",
  utmiPage: "utmiPage",
  utmiPart: "utmiPart",
  utmiCampaign: "utmiCampaign",
};

export function getMarketingDataByLoader(
  cookies: Record<string, string>,
  url: string,
  coupon_props?: string,
): MarketingData {
  const { searchParams } = new URL(url);

  const utmSource = searchParams.get("utm_source") ||
    cookies[UTM_COOKIE.utmSource];

  const utmMedium = searchParams.get("utm_medium") ||
    cookies[UTM_COOKIE.utmMedium];

  const utmCampaign = searchParams.get("utm_campaign") ||
    cookies[UTM_COOKIE.utmCampaign];

  const utmiPage = searchParams.get("utmi_page") ||
    cookies[UTM_COOKIE.utmiPage];

  const utmiPart = searchParams.get("utmi_part") ||
    cookies[UTM_COOKIE.utmiPart];

  const utmiCampaign = searchParams.get("utmi_campaign") ||
    cookies[UTM_COOKIE.utmiCampaign];

  const coupon = searchParams.get("coupon") || coupon_props;

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
  coupon?: string,
): MarketingData {
  const utmSource = getCookie(UTM_COOKIE.utmSource);
  const utmMedium = getCookie(UTM_COOKIE.utmMedium);
  const utmCampaign = getCookie(UTM_COOKIE.utmCampaign);
  const utmiPage = getCookie(UTM_COOKIE.utmiPage);
  const utmiPart = getCookie(UTM_COOKIE.utmiPart);
  const utmiCampaign = getCookie(UTM_COOKIE.utmiCampaign);

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
    marketingTags: [],
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

export function merge_two_marketing_data(
  data_a: MarketingData,
  data_b: MarketingData,
  coupon?: string,
): MarketingData {
  return {
    coupon,
    marketingTags: data_a.marketingTags &&
        data_a.marketingTags.length > 0
      ? data_a.marketingTags
      : data_b.marketingTags,
    utmCampaign: data_a.utmCampaign ? data_a.utmCampaign : data_b.utmCampaign,
    utmSource: data_a.utmSource ? data_a.utmSource : data_b.utmSource,
    utmMedium: data_a.utmMedium ? data_a.utmMedium : data_b.utmMedium,
    utmiCampaign: data_a.utmiCampaign
      ? data_a.utmiCampaign
      : data_b.utmiCampaign,
    utmiPage: data_a.utmiPage ? data_a.utmiPage : data_b.utmiPage,
    utmiPart: data_a.utmiPart ? data_a.utmiPart : data_b.utmiPart,
  };
}

export function is_two_marketing_datas_equal(
  data_a: MarketingData,
  data_b: MarketingData,
) {
  return (
    data_a.coupon === data_b.coupon &&
    data_a.marketingTags === data_b.marketingTags &&
    data_a.utmCampaign === data_b.utmCampaign &&
    data_a.utmSource === data_b.utmSource &&
    data_a.utmMedium === data_b.utmMedium &&
    data_a.utmiCampaign === data_b.utmiCampaign &&
    data_a.utmiPage === data_b.utmiPage &&
    data_a.utmiPart === data_b.utmiPart &&
    (data_a.marketingTags && data_b.marketingTags) &&
    is_two_string_arrays_equal(data_a.marketingTags, data_b.marketingTags)
  );
}
