import { Controller, Post, Body, Get, Param, UsePipes } from '@nestjs/common';
import { RentalService } from '../service/rental.service';
import { GeoUrlApiPipe } from '../pipes/geo-url-api.pipe';
import { MapNewRentalPipe } from '../pipes/map-new-rental.pipe';
import { MappedRentalInterface } from '../interface/mapped-rental.interface';
import { JoiValidationPipe } from '../../common/pipes/joi-validation.pipe';
import { CreateRentalValidation } from '../schema/validation/create-rental-validation.schema';
import { GeoUrlApiUtil } from '../utils/geo-url-api.util';
import { RentalDurationPipe } from '../pipes/rental-duration.pipe';
import { GenerateRentalDurationEnumUtil } from '../utils/generate-rental-duration-enum';
import { SearchRentalDto } from '../dto/search-rental.dto';
import { RequestCoordinatesPipe } from '../pipes/request-coordinates.pipe';
import { GivenNoticePipe } from '../pipes/given-notice.pipe';

@Controller('rental')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  /**
   * Create Rental:
   * create a new vehicle rental listing
   */
  @Post()
  @UsePipes(new JoiValidationPipe(CreateRentalValidation))
  @UsePipes(new MapNewRentalPipe())
  @UsePipes(new GeoUrlApiPipe(new GeoUrlApiUtil()))
  async createRental(@Body() rental: MappedRentalInterface) {
    return await this.rentalService.createRental(rental);
  }

  /**
   * Search Rental:
   * find rentals available near a specified location (user's location)
   */
  @Get()
  @UsePipes(new RequestCoordinatesPipe(new GeoUrlApiUtil()))
  @UsePipes(new RentalDurationPipe(new GenerateRentalDurationEnumUtil()))
  @UsePipes(new GivenNoticePipe())
  async searchRental(@Param() searchRentalDto: SearchRentalDto) {
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
