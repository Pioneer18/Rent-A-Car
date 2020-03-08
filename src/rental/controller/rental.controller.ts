import { Controller, Post, Body, Get, Param, UsePipes, Query, Inject } from '@nestjs/common';
import { RentalService } from '../service/rental.service';
import { GeoUrlApiPipe } from '../pipes/geo-url-api.pipe';
import { MapNewRentalPipe } from '../pipes/map-new-rental.pipe';
import { MappedRentalInterface } from '../interface/mapped-rental.interface';
import { JoiValidationPipe } from '../../common/pipes/joi-validation.pipe';
import { CreateRentalValidation } from '../schema/validation/create-rental-validation.schema';
import { GeoUrlApiUtil } from '../utils/geo-url-api.util';
import { RentalDurationPipe } from '../pipes/rental-duration.pipe';
import { GenerateRentalDurationEnumUtil } from '../utils/generate-rental-duration-enum.util';
import { SearchRentalDto } from '../dto/search-rental.dto';
import { RequestCoordinatesPipe } from '../pipes/request-coordinates.pipe';
import { GivenNoticePipe } from '../pipes/given-notice.pipe';
import { SearchRentalValidationSchema } from '../schema/validation/search-rental-validation.schema';
import { PricingPipe } from '../pipes/pricing.pipe';
import { PricingDto } from '../dto/pricing.dto';
import { EditDetailsPipe } from '../pipes/edit-details.pipe';
import { EditDetailsDto } from '../dto/edit-details.dto';
import { SortUnavailabilityPipe } from '../pipes/sort-unavailability.pipe';
import { ValidateUnavailabilityPipe } from '../pipes/validate-unavailability.pipe';
import { ProcessUnavailabilityPipe } from '../pipes/process-unavailability.pipe';
import { ProcessedUnavailabilityDto } from '../dto/processed-unavailability.dto';
import { CreateUpdaterDtoPipe } from '../pipes/create-updater-dto.pipe';
import { UpdateUnavailabilityDto } from '../dto/update-unavailability.dto';
import { UpdateUnavailabilityDataDto } from '../dto/update-unavailability-data.dto';
import { ValidateRemoveUnavailabilityPipe } from '../pipes/validate-remove-unavailability.pipe';
import { RemoveUnavailabilityDto } from '../dto/remove-unavailability.dto';

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
    try {
      return await this.rentalService.createRental(rental);
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Search Rental:
   * find rentals available near a specified location (user's location)
   */
  @Get()
  @UsePipes(new JoiValidationPipe(SearchRentalValidationSchema))
  @UsePipes(new RequestCoordinatesPipe(new GeoUrlApiUtil()))
  @UsePipes(new RentalDurationPipe(new GenerateRentalDurationEnumUtil()))
  @UsePipes(new GivenNoticePipe())
  async searchRental(@Query() searchRentalDto: SearchRentalDto) {
      return await this.rentalService.searchRental(searchRentalDto);
  }

  /**
   * Edit Pricing:
   * edit the rental price
   */
  @Post('edit-price')
  @UsePipes(new PricingPipe())
  async editPricing(@Body() pricingDto: PricingDto) {
      return await this.rentalService.editPricing(pricingDto);
  }

  /**
   * Edit Rental Details:
   * edit the details of the Rental (# of seats, color, etc.)
   */
  @Post('edit-details')
  @UsePipes(new EditDetailsPipe())
  async editDetails(@Body() editDetailsDto: EditDetailsDto) {
      return await this.rentalService.editDetails(editDetailsDto);
  }

  /**
   * Schedule Unavailability
   * set a period of unavailability for the rental
   */
  @Post('schedule-unavailability')
  @UsePipes(new ProcessUnavailabilityPipe())
  @UsePipes(new ValidateUnavailabilityPipe())
  @UsePipes(new SortUnavailabilityPipe())
  async scheduleUnavailability(@Body() processed: ProcessedUnavailabilityDto ) {
    return await this.rentalService.scheduleUnavailability(processed);
  }

  /**
   * Update Unavailability
   * edit current unavailability
   */
  @Post('update-unavailability')
  @UsePipes(new CreateUpdaterDtoPipe())
  async updateUnavailability(@Body() data: UpdateUnavailabilityDataDto) {
    return await this.rentalService.updateUnavailability(data);
  }

   /**
    * Remove Unavailability
    * remove existing unavailability
    */
   @Post('remove-unavailability')
   @UsePipes(new ValidateRemoveUnavailabilityPipe())
   async removeUnavailability(@Body() data: RemoveUnavailabilityDto) {
     return await this.rentalService.removeUnavailability(data);
   }
}
