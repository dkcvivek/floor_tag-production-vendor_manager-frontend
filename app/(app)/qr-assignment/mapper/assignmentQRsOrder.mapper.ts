export interface AssignQrsOrderPart {
  style_part_id: string;
  style_part_name: string;
}

export interface AssignQrsOrderColorSize {
  vendor_color: string;
  ticket_color: string;
  size: string;
}

export interface AssignQrsOrderResponse {
  vendor_order_id: string;
  style_name: string;
  available_parts: AssignQrsOrderPart[];
  available_color_sizes: AssignQrsOrderColorSize[];
}

export interface ApiProcessResponse {
  process_id: number;
  style_part_id: string;
  style_part_name: string;
  ticket_color: string;
  vendor_color: string;
  size: string;
  pieces_assigned_quantity: number;
  operators: {
    operator_id: string;
    operator_name: string;
  }[];
}

export interface ApiHistoryItem {
  process_id: number;
  style_part_id: string;
  style_part_name: string;
  ticket_color: string;
  vendor_color: string;
  size: string;
  status: string;
  pieces_assigned_quantity: number;
  logged_at: string; // ISO date
  operators: {
    operator_id: string;
    operator_name: string;
  }[];
}

export type ApiHistoryResponse = ApiHistoryItem[];

export interface StylePart {
  id: string;
  name: string;
}

export interface ColorSize {
  vendorColor: string;
  ticketColor: string;
  size: string;
}

export interface Style {
  vendorOrderId: string;
  styleName: string;
  parts: StylePart[];
  colorSizes: ColorSize[];
}

export interface Operator {
  id: string;
  name: string;
}

export interface Process {
  id: number;
  stylePartId: string;
  stylePartName: string;
  ticketColor: string;
  vendorColor: string;
  size: string;
  pieces: number;
  operators: Operator[];
}

export interface HistoryItem {
  id: number;
  stylePartId: string;
  stylePartName: string;
  ticketColor: string;
  vendorColor: string;
  size: string;
  status: string;
  pieces: number;
  loggedAt: Date;
  operators: Operator[];
}

export const mapStyleResponse = (data: AssignQrsOrderResponse): Style => {
  return {
    vendorOrderId: data.vendor_order_id,
    styleName: data.style_name,

    parts: Array.isArray(data.available_parts)
      ? data.available_parts.map(part => ({
          id: part.style_part_id,
          name: part.style_part_name,
        }))
      : [],

    colorSizes: Array.isArray(data.available_color_sizes)
      ? data.available_color_sizes.map(cs => ({
          vendorColor: cs.vendor_color,
          ticketColor: cs.ticket_color,
          size: cs.size.toUpperCase(),
        }))
      : [],
  };
};

export const mapProcessResponse = (data: ApiProcessResponse): Process => ({
  id: data.process_id,
  stylePartId: data.style_part_id,
  stylePartName: data.style_part_name,
  ticketColor: data.ticket_color,
  vendorColor: data.vendor_color,
  size: data.size,
  pieces: data.pieces_assigned_quantity,
  operators: (data.operators ?? []).map((op) => ({
    id: op.operator_id,
    name: op.operator_name,
  })),
});

export const mapHistoryResponse = (data: ApiHistoryResponse): HistoryItem[] =>
  data.map((item) => ({
    id: item.process_id,
    stylePartId: item.style_part_id,
    stylePartName: item.style_part_name,
    ticketColor: item.ticket_color,
    vendorColor: item.vendor_color,
    size: item.size,
    status: item.status,
    pieces: item.pieces_assigned_quantity,
    loggedAt: new Date(item.logged_at),
    operators: (item.operators ?? []).map((op) => ({
      id: op.operator_id,
      name: op.operator_name,
    })),
  }));
