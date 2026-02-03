import { Style } from "@/app/types/types";

export type OrderUIModel = {
  id: string;
  quantity: number;
  shipDate: string;
  styleName: string;
};

export const mapEligibleStylesToOrderUI = (data: Style[]): OrderUIModel[] =>
  data
    .filter((item) => item.vendor_order_id)
    .map((item) => ({
      id: item.vendor_order_id,
      quantity: item.order_quantity ?? 0,
      shipDate: item.earliest_ship_date ?? "",
      styleName: item.style_name ?? "",
    }));
