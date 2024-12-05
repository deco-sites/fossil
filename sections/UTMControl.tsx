import { getCookies } from 'std/http/mod.ts';
import { SectionProps } from 'deco/types.ts';
import { getMarketingDataByLoader } from '../sdk/useMarketingData.ts';
import { AppContext } from '../apps/site.ts';

import UTMSaveController from '../islands/UTMSaveController.tsx';

export const loader = (_props: unknown, req: Request, _ctx: AppContext) => {
  const cookies = getCookies(req.headers);
  const marketing_data = getMarketingDataByLoader(cookies, req.url);
  return { marketing_data };
};

export default function UTMControl(props: SectionProps<typeof loader>) {
  return (
    <>
      <UTMSaveController marketing_data={props.marketing_data} />
    </>
  );
}
