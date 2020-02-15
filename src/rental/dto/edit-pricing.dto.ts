import { Injectable } from '@nestjs/common';

@Injectable()
export class EditPricingDto {
  id: string;
  defaultPrice: number;
  discounts: {
    weekly: number;
    monthly: number;
  };
  customPrices: [
    {
      vehicle: string;
      year: number;
      DOY: number;
      price: number;
      title: string;
    }
  ];
}
