import { MarketingData } from "apps/vtex/utils/types.ts";
import { useEffect } from "preact/hooks";
import {
  getMarketingDataByClientCookies,
  is_two_marketing_datas_equal,
  merge_two_marketing_data,
  saveMarketingData,
  sendMarketingData,
} from "../sdk/useMarketingData.ts";
import { useCart } from "apps/vtex/hooks/useCart.ts";

interface Props {
  marketing_data: MarketingData;
}

export default function UTMSaveController(props: Props) {
  const { cart } = useCart();

  useEffect(() => {
    const coupon = cart.value?.marketingData?.coupon;
    const client_marketing_data = getMarketingDataByClientCookies(coupon);
    const merged_marketing_data = merge_two_marketing_data(
      props.marketing_data,
      client_marketing_data,
      coupon,
    );

    if (
      !is_two_marketing_datas_equal(
        merged_marketing_data,
        client_marketing_data,
      )
    ) {
      saveMarketingData(merged_marketing_data);
      sendMarketingData(merged_marketing_data);
    }
  }, []);

  return null;
}
