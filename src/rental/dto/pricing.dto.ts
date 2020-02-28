export class PricingDto {
    price: number;
    discounts: {
        weekly: number;
        monthly: number;
    };
}
