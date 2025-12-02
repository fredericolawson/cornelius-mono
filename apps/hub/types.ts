export type Product = {
  id: string;
  name: string;
  type: string;
  price: number;
  priceGbp: number;
  currency: string;
  image: string;
  cost: number | null;
};

export type CollectionProduct = {
  id: string;
  title: string;
  category: string | null;
  status: string;
};

export type Collection = {
  id: string;
  title: string;
  description: string | null;
  image: string | null;
  products: CollectionProduct[];
  updatedAt: string;
};
