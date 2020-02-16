import { Controller, Post, Body, Get, Param, UsePipes } from '@nestjs/common';
import { RentalService } from '../service/rental.service';
import { GeoUrlApiPipe } from '../pipes/geo-url-api.pipe';
import { MapNewRentalPipe } from '../pipes/map-new-rental.pipe';
import { MappedRentalInterface } from '../interface/mapped-rental.interface';
import { JoiValidationPipe } from 'src/common/pipes/joi-validation.pipe';
import { CreateRentalValidation } from '../schema/validation/create-rental-validation.schema';

@Controller('rental')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  /**
   * Create Rental:
   * create a new vehcile rental listing
   */
  @Post()
  @UsePipes(new JoiValidationPipe(CreateRentalValidation))
  @UsePipes(new MapNewRentalPipe())
  @UsePipes(new GeoUrlApiPipe())
  async createRental(@Body() rental: MappedRentalInterface) {
    return await this.rentalService.createRental(rental);
  }

  /**
   * Search Rental:
   * find rentals available near a specified location (user's location)
   */
  @Get()
  // @UsePipes(new JoiValidationPipe(SearchVehicleValidation))
  // @UsePipes(new LuxonSearchVehiclePipe())
  async searchRental(@Param() searchRentalDto: any /*SearchVehicleDto*/) {
    return await this.rentalService.searchRental(searchRentalDto);
  }

  /**
   * Edit Pricing:
   * edit the rental price
   */
  @Post('edit-price')
  // @UsePipes(new PricingPipe())
  // @UsePipes(new JoiValidationPipe(PricingValidation))
  async editPricing(@Body() editPricingDto: any /*EditPricingDto*/) {
    return await this.rentalService.editPricing(editPricingDto);
  }

  /**
   * Edit Rental Details:
   * edit the details of the Rental (# of seats, color, etc.)
   */
  @Post('edit-details')
  async editDetails(@Body() editDetailsDto: any /*EdiDetailsDto*/) {
    return await this.rentalService.editDetails(editDetailsDto);
  }

  /**
   * Schedule Unavailability
   * set a period of unavailability for the rental (e.g. mon - wed  )
   */
  @Post('schedule-unavailability')
  async scheduleUnavailability(@Body() scheduleUnavailabilityDto: any /*ScheduleUnavailabilityDto*/) {
    return await this.rentalService.scheduleUnavailability(scheduleUnavailabilityDto);
  }
}
