import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UnavailabilityDto } from '../dto/unavailability.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { LoggedOutGuard } from '../../auth/guards/logged-out.guard';
import { UnavailabilityService } from '../service/unavailability.service';

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
     */
    @Get('view-pickup-unavailability')
    async viewUnavailability() {
        // return await this.unavailabilityService.viewUnavailability();
    }

    /**
     * **summary**: Reschedule the selected Unavailability
     */
    @Post('reschedule-pickup-unavailability')
    async rescheduleUnavailability() {
        // return await this.unavailabilityService.rescheduleUnavailability();
    }

    /**
     * **summary**: Remove the selected unavailability
     */
    @Post('remove-pickup-unavailability')
    async removeUnavailability() {
        // return await this.unavailabilitySevice.removeUnavailability();
    }
}
