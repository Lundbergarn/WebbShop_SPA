import { Order } from "./order";

export interface Customer {
  id: number;
  email: string;
  userName: string;
  first_Name: string;
  last_Name: string;
  phone: string;
  address: string;
  order: Order[];
}
