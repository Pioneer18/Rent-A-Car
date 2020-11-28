import { EditPricingInterface } from '../../interface/service/edit-pricing.interface';
/**
 * **summary**: Dto for the rental.controller.editPrice() handler
 * - note: [**request payloads**](https://docs.nestjs.com/controllers#request-payloads) are dto classes and not interfaces so they can be accessed by NestJS at runtime
 */
export class PricingDto implements EditPricingInterface {
    rentalId: string;
    price: number | null;
    discounts: {
        weekly: number | null;
        monthly: number | null;
    };
}
