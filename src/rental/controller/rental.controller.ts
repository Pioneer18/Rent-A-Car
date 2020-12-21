import { Controller, Post, Body, Get, Param, UsePipes, Query, Res, Req, UseGuards, Request } from '@nestjs/common';
import { RentalService } from '../service/rental.service';
import { GeoUrlApiPipe } from '../pipes/geo-url-api.pipe';
import { MapNewRentalPipe } from '../pipes/map-new-rental.pipe';
import { CreateRentalDto } from '../dto/createRental/create-rental.dto';
import { JoiValidationPipe } from '../../common/pipes/joi-validation.pipe';
import { CreateRentalValidationSchema } from '../schema/validation/create-rental-validation.schema';
import { GeoUrlApiUtil } from '../utils/geo-url-api.util';
import { RentalDurationPipe } from '../pipes/rental-duration.pipe';
import { GenerateRentalDurationEnumUtil } from '../utils/generate-rental-duration-enum.util';
import { SearchRentalDto } from '../dto/searchRental/search-rental.dto';
import { RequestCoordinatesPipe } from '../pipes/request-coordinates.pipe';
import { GivenNoticePipe } from '../pipes/given-notice.pipe';
import { SearchRentalValidationSchema } from '../schema/validation/search-rental-validation.schema';
import { PricingPipe } from '../pipes/pricing.pipe';
import { PricingDto } from '../dto/pricing/pricing.dto';
import { ValidateEditDetailsPipe } from '../pipes/validate-edit-details.pipe';
import { EditDetailsDto } from '../dto/details/edit-details.dto';
import { SortUnavailabilityPipe } from '../pipes/sort-unavailability.pipe';
import { ValidateUnavailabilityPipe } from '../pipes/validate-unavailability.pipe';
import { ProcessUnavailabilityPipe } from '../pipes/process-unavailability.pipe';
import { ProcessedUnavailabilityDto } from '../dto/unavailability/schedule/processed-unavailability.dto';
import { CreateUpdaterDtoPipe } from '../pipes/create-updater-dto.pipe';
import { UpdateUnavailabilityDataDto } from '../dto/unavailability/update/update-unavailability-data.dto'; // '../dto/update-unavailability-data.dto';
import { ValidateRemoveUnavailabilityPipe } from '../pipes/validate-remove-unavailability.pipe';
import { RemoveUnavailabilityDto } from '../dto/unavailability/remove/remove-unavailability.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RentalInterface } from '../interface/rental.interface';
import { UnavailabilityInterface } from '../interface/unavailability.interface';
import { UpdateResponseInterface } from '../../common/interfaces/update-response.interface';
import { DeleteResponseInterface } from '../../common/interfaces/delete-response.interface';
import { ToItemsIndexes } from '../../common/util/to-item-indexes';
import { LoggedOutGuard } from '../../auth/guards/logged-out.guard';
import { RentalIdDto } from '../dto/rental-id.dto';

/**
 * - **summary**: controller for managing rentals in the application
 * - **Middleware**: The ValidateUpdateUnavailabilityMiddleware class is applied to the updateUnavailability method
 */
@UseGuards(JwtAuthGuard)
@UseGuards(LoggedOutGuard)
@Controller('rental')
export class RentalController {
  constructor(
    private readonly rentalService: RentalService,
  ) { }

  /**
   * **summary**: Create a new vehicle rental listing
   */
  @Post()
  @UsePipes(new JoiValidationPipe(CreateRentalValidationSchema))
  @UsePipes(new MapNewRentalPipe())
  @UsePipes(new GeoUrlApiPipe(new GeoUrlApiUtil()))
  async createRental(@Body() rental: CreateRentalDto, @Req() req): Promise<RentalInterface> {
    try {
      return await this.rentalService.createRental(rental, req.user);
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * **summary**: Find rentals available near a specified location (user's location)
   * - **Note**: This route is using **POST** instead of **GET** because Goolge Cloud App Engine is experiencing an error
   * where any **GET** request with a body recieve a 400 Bad Request Error default 
   */
  @Post('search-rental')
  @UsePipes(new JoiValidationPipe(SearchRentalValidationSchema))
  @UsePipes(new RequestCoordinatesPipe(new GeoUrlApiUtil()))
  @UsePipes(new RentalDurationPipe(new GenerateRentalDurationEnumUtil()))
  @UsePipes(new GivenNoticePipe())
  async searchRental(@Body() searchRentalDto: SearchRentalDto): Promise<RentalInterface[]> {
    return await this.rentalService.searchRental(searchRentalDto);
  }

  /**
   * **summary**: Find all of the current logged in user's rentals
   * @param userId
   */
  @Get('user-rentals')
  async userRentals(@Request() req): Promise<RentalInterface[]> {
    return await this.rentalService.userRentals(req.user)
  }

  /**
   * **summary** Edit the selected rental price
   */
  @Post('edit-price')
  @UsePipes(new PricingPipe())
  async editPricing(@Body() pricingDto: PricingDto): Promise<RentalInterface> {
    return await this.rentalService.editPricing(pricingDto);
  }

  /**
   * **summary**: Edit the details of the Rental (# of seats, color, etc.)
   */
  @Post('edit-details')
  @UsePipes(new ValidateEditDetailsPipe())
  async editDetails(@Body() editDetailsDto: EditDetailsDto): Promise<RentalInterface> {
    return await this.rentalService.editDetails(editDetailsDto);
  }

  /**
   * **summary**: Set a period of unavailability for the rental
   */
  @Post('schedule-unavailability')
  @UsePipes(new ProcessUnavailabilityPipe())
  @UsePipes(new ValidateUnavailabilityPipe(new ToItemsIndexes()))
  @UsePipes(new SortUnavailabilityPipe())
  async scheduleUnavailability(@Body() processed: ProcessedUnavailabilityDto): Promise<UnavailabilityInterface[]> {
    return await this.rentalService.scheduleUnavailability(processed);
  }

  /**
   * **summary**: Edit the selected rental's unavailability
   */
  @Post('update-unavailability')
  @UsePipes(new CreateUpdaterDtoPipe())
  async updateUnavailability(@Body() data: UpdateUnavailabilityDataDto): Promise<UpdateResponseInterface> {
    return await this.rentalService.updateUnavailability(data);
  }

  /**
   * **summary**: Remove unavailability from the selected rental
   */
  @Post('remove-unavailability')
  @UsePipes(new ValidateRemoveUnavailabilityPipe())
  async removeUnavailability(@Body() data: RemoveUnavailabilityDto): Promise<DeleteResponseInterface> {
    return await this.rentalService.removeUnavailability(data);
  }

  /**
   * **summary**: Remove the selected rental
   * @param rentalId
   */
  @Post('remove-rental')
  async removeRental(@Query() params: RentalIdDto) {
    return await this.rentalService.removeRental(params.rentalId);
  }
}
