import { Controller, Post, Body, Get, UsePipes, Query, Req, UseGuards, Request } from '@nestjs/common';
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
import { RentalSearchFilterPipe } from '../pipes/rental-search-filter.pipe';
import { SearchRentalValidationSchema } from '../schema/validation/search-rental-validation.schema';
import { PricingPipe } from '../pipes/pricing.pipe';
import { PricingDto } from '../dto/pricing/pricing.dto';
import { ValidateEditDetailsPipe } from '../pipes/validate-edit-details.pipe';
import { EditDetailsDto } from '../dto/details/edit-details.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RentalInterface } from '../interface/rental.interface';
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
  @UsePipes(new RentalSearchFilterPipe())
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
   * **summary**: Remove the selected rental
   * @param rentalId
   */
  @Post('remove-rental')
  async removeRental(@Query() params: RentalIdDto) {
    return await this.rentalService.removeRental(params.rentalId);
  }
}
