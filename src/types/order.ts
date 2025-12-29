import type { OrderItemType } from "./orderItem";

export interface OrderType {
  id: number;
  table_number: number;
  status: string;
  total_price: number;
  items: Array<OrderItemType>;
  created_at: string;
  updated_at: string;
}
