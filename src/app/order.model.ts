import { order_Rows } from "./order_rows.module";

export class Order {
  public id: number;
  public order_Date: Date;
  public order_Rows: order_Rows;
  public customerId: number;
}
