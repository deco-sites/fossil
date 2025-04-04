import { PropertyValue } from "apps/commerce/types.ts";

export const useCheckCluster = (
    clusters: PropertyValue[],
    clusterId: string,
) => {
    const result = clusters.some((cluster) => cluster.propertyID === clusterId);
    return result;
};
