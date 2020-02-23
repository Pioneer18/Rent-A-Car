import { Test, TestingModule } from '@nestjs/testing';
/**
 * What does this pipe do?
 * summary:
 * Accepts a RawSearchRentalDto and returns a PostGivenNoticeDto
 * creates a givenNotice
 * validatesRequestedTime
 * Tests:
 * #1 transform:
 * expect a PostGivenNotice from a valid given RawSearchRentalDto
 * expect an Error if an invalid RawSearchRentalDto is given
 * #2 createGivenNotice:
 * expect a number of milliseconds >= 3600000
 * expect an Error otherwise
 * #3 validateRequestedTime
 * expect an Error if startTime > endTime
 * expect an Error if there is less than an hour difference between the rental start and end time
 * expect a returned number greater than 3600000
 */
