export interface Fund {
  id: number;
  name: string;
  ticker: string;
  price: number;
  description: string;
  risk: string;
  returns: number; // annual return %
  quantityOwned: number;
}
