export class PricingDto {
    rentalId: string;
    price: number;
    discounts: {
        weekly: number;
        monthly: number;
    };
}
