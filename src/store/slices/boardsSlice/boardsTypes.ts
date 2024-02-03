export interface boardsTypes {
  boards: Array<boardsObject>;
  loading: boolean;
  error: boolean;
}

export type boardsObject = {
  id: number;
  title: string;
  items: Array<itemTypes>;
};

export type itemTypes = {
  id: number;
  itemId: number;
  title: string;
  price: number;
  company: string;
  date: string;
  email:string;
  place:string;
  img:string;
};
