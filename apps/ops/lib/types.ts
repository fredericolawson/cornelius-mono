export type Customer = {
  recordId: string;
  id: string;
  name: string;
  email: string;
  orders: Order[];
  shipments: Shipment[];
};

export type Order = {
  recordId: string;
  number: string;
  date: string;
  status: string;
  variants: string[];
  link: {
    url: string;
  };
};

export type Shipment = {
  recordId: string;
  reference: string;
  status: string;
  link: {
    url: string;
  };
};

export type Data = {
  customer: Customer;
  orders: Order[];
  shipments: Shipment[];
};
