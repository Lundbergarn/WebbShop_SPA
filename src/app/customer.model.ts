import { Order } from "./order.model";

export class Customer {
  id: number;
  email: string;
  first_Name: string;
  last_Name: string;
  phone: string;
  address: string;
  order: Order[];
}
