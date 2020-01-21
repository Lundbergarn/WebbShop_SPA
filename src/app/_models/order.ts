import { orderRows } from "./orderRows";

export interface Order {
  id: number;
  orderDate: Date;
  orderRows: orderRows[];
  customerId: number;
}
