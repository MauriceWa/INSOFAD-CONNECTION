import { Product } from "./product.model";
import { GiftCard } from "./giftcard.model";
import {Topup} from "./topup.model";

export class Order {
  public id: number;
  public name: string;
  public last_name: string;
  public zipcode: string;
  public houseNumber: number;
  public notes: string;
  public orderDate: string;
  public products: Product[];
  public giftCards: GiftCard[];
  public cardsToppedUp: string[];
  public appliedGiftCards: string[];
  public total: number;
  public top_up_amount: number;
}
