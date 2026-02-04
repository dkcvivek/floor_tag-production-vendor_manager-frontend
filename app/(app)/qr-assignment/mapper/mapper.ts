export interface ApiStylePart {
  style_part_id: string;
  style_part_name: string;
}

export interface ApiColorSize {
  vendor_color: string;
  ticket_color: string;
  size: string;
}

export interface ApiStyleData {
  vendor_order_id: string;
  style_name: string;
  available_parts: ApiStylePart[];
  available_color_sizes: ApiColorSize[];
}

export interface ApiStyleResponse {
  data: ApiStyleData;
}
