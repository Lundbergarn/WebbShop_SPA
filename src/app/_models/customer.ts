import { Order } from "./order";

export interface Customer {
  id: number;
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  order: Order[];
}
