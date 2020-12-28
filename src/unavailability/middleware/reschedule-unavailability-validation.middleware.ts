import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";

@Injectable()
export class ReschedulePickupUnavailabilityValidationMiddleware implements NestMiddleware {
    use = async (req: Request, res: Response, next: Function): Promise <void> => {
        if (req.originalUrl === '/unavailability/reschedule-pickup-unavailability') {
            
        }
        next();
    }
}