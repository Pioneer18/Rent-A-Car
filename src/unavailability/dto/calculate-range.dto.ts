/**
 * **summary**: This dto is for the ValidateUpdateUnavailabilityMiddleware.calculateRange() private method
 * - note: [**request payloads**](https://docs.nestjs.com/controllers#request-payloads) are dto classes and not interfaces so they can be accessed by NestJS at runtime
 */
export class CalculateRangeDto {
    y1: { sD: number; eD: number };
    y2: { sD: number; eD: number } | null;
}
