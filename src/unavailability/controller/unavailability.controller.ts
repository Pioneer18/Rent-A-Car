import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { UnavailabilityDto } from '../dto/unavailability.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { LoggedOutGuard } from '../../auth/guards/logged-out.guard';
import { UnavailabilityService } from '../service/unavailability.service';
import { RentalIdParamsDto } from '../../rental/dto/rental-id-params.dto';
import { RescheduleUnavailabilityDto } from '../dto/reschedule-unavailability.dto';

@UseGuards(LoggedOutGuard)
@UseGuards(JwtAuthGuard)
@Controller('unavailability')
export class UnavailabilityController {
    constructor(private readonly unavailabilityService: UnavailabilityService) {}

    /**
     * **summary**: Schedule a period of **rental pickup unavailability** for the selected rental
     */
    @Post('schedule-pickup-unavailability')
    async scheduleUnavailability(@Body() unavailability: UnavailabilityDto) {
        return await this.unavailabilityService.scheduleUnavailability(unavailability);
    }

    /**
     * **summary**: Return all of a rental's **Scheduled Unavailability**
     * @param rentalId the selected rental's _id
     */
    @Get('view-pickup-unavailability')
    async viewUnavailability(@Query() params: RentalIdParamsDto) {
        return await this.unavailabilityService.viewUnavailability(params.rental_id);
    }

    /**
     * **summary**: Reschedule the selected Unavailability
     */
    @Post('reschedule-pickup-unavailability')
    async rescheduleUnavailability(@Body() unavailability: RescheduleUnavailabilityDto) {
        return await this.unavailabilityService.rescheduleUnavailability(unavailability);
    }

    /**
     * **summary**: Remove the selected unavailability
     */
    @Post('remove-pickup-unavailability')
    async removeUnavailability() {
        // return await this.unavailabilitySevice.removeUnavailability();
    }
}
