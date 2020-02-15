import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { RentalService } from '../service/rental.service';
import { CreateRentalDto } from '../dto/create-rental-dto';

@Controller('Rental')
export class RentalController {
  constructor(private readonly rentalService: RentalService) { }

  /**
   * Create Rental:
   * create a new vehcile rental listing
   */
  @Post()
  // @UsePipes(new JoiValidationPipe(CreatRentalValidation))
  async createRental(@Body() createRentalDto: CreateRentalDto) {
    return await this.rentalService.createRental(createRentalDto);
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
  @Post()
  // @UsePipes(new PricingPipe())
  // @UsePipes(new JoiValidationPipe(PricingValidation))
  async editPricing(@Body() editPricingDto: any /*EditPricingDto*/) {
    return await this.rentalService.editPricing(editPricingDto);
  }

  /**
   * Edit Rental Details:
   * edit the details of the Rental (# of seats, color, etc.)
   */
  async editDetails(@Body() editDetailsDto: any /*EdiDetailsDto*/) {
    return await this.rentalService.editDetails(editDetailsDto);
  }

  /**
   * Schedule Unavailability
   * set a period of unavailability for the rental (e.g. mon - wed  )
   */
  async scheduleUnavailability(@Body() scheduleUnavailabilityDto: any /*ScheduleUnavailabilityDto*/) {
    return await this.rentalService.scheduleUnavailability(scheduleUnavailabilityDto);
  }
}
