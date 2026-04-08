import { IBase } from './media.types';

export interface IPhotographer extends IBase {
  name: string;
  portrait: string;
  city: string;
  country: string;
  tagline: string;
}
