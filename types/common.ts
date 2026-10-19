export type WithPagination<DataT> = {
  products: DataT[];
  total: number;
  skip: number;
  limit: number;
};
