export type IGetAllLocationFilter = object;
export interface ILocation {
  uuid: string;
  createdAt: string;
  createdBy: null | string;
  updatedBy: null | string;
  deletedAt: null | string;
  updatedAt: string;
  locationId: string;
  locationCode: string;
  name: string;
  address: string;
  town: string;
  city: string;
  region: string;
  country: string;
  description: string;
  isTaxExempt: boolean;
  type: string;
}
