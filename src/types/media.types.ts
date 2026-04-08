export type TId = number;
export type TPrice = number;
export type TDate = string;

export interface IBase {
  id: TId;
  price: TPrice;
}

export interface IMedia extends IBase {
  photographerId: TId;
  title: string;
  image?: string | null;
  video?: string | null;
  likes: number;
  date: TDate;
}
