import { useCart } from 'apps/vtex/hooks/useCart.ts';
import Button, { Props as BtnProps } from './common.tsx';
import {
  getMarketingDataByClientCookies,
  sendMarketingData,
} from '../../../sdk/useMarketingData.ts';

export interface Props extends Omit<BtnProps, 'onAddItem'> {
  seller: string;
  productID: string;
}

function AddToCartButton({ seller, productID, eventParams }: Props) {
  const { addItems, cart } = useCart();
  const coupon = cart.value?.marketingData?.coupon;
  const onAddItem = () => {
    const marketing_data = getMarketingDataByClientCookies(coupon);
    sendMarketingData(marketing_data);

    return addItems({
      orderItems: [
        {
          id: productID,
          seller: seller,
          quantity: 1,
        },
      ],
    });
  };

  return <Button onAddItem={onAddItem} eventParams={eventParams} />;
}

export default AddToCartButton;
