import type { MenuType } from "./menu";

export interface OrderItemType {
  id: number;
  menu_id: number;
  order_id: number;
  price_at_order: number;
  quantity: number;
  created_at: string;
  updated_at: string;
  menu: MenuType; 
}
