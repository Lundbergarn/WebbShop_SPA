import { order_Rows } from "./order_rows";

export interface Order {
  id: number;
  order_Date: Date;
  order_Rows: order_Rows[];
  customerId: number;
}
