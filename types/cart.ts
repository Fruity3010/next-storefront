export type CartLineApiData = {
  productId: number;
  title: string;
  price: number;
  thumbnail: string;
  stock: number;
  quantity: number;
};

export type CartApiData = {
  items: CartLineApiData[];
  totalQuantity: number;
  subtotal: number;
};

export type CartProductData = Omit<CartLineApiData, 'quantity'>;

export type AddCartItemQueryArgs = {
  product: CartProductData;
  quantity: number;
};

export type UpdateCartItemQueryArgs = {
  productId: number;
  quantity: number;
};
