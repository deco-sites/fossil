import { MatchContext } from "deco/blocks/matcher.ts";

interface UtmProps {
  /**
      @description The name of the campaign
     **/
  campaignName?: string;
}

/**
 * Checks if the campaign name matches the utm_campaign parameter in the URL
 */
export default function Utm(
  { campaignName }: UtmProps,
  ctx: MatchContext,
): boolean {
  const url = new URL(ctx.request.url);
  const utmCampaign = url.searchParams.get("utmi_pc");
  return (utmCampaign !== null && utmCampaign === campaignName) ||
    utmCampaign === "BuscaFullText";
}
