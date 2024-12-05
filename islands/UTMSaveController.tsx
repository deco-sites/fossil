import { MarketingData } from 'apps/vtex/utils/types.ts';
import { useEffect } from 'preact/hooks';
import { saveMarketingData } from '../sdk/useMarketingData.ts';

interface Props {
  marketing_data: MarketingData;
}

export default function UTMSaveController(props: Props) {
  useEffect(() => {
    saveMarketingData(props.marketing_data);
  }, []);

  return null;
}
