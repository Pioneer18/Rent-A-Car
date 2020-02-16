import * as axios from 'axios';
/**
 * Return coordinates and an address from the incoming request
 */
export const geoUrlApi = async rental => {
  const appId = process.env.GEO_ID;
  const appCode = process.env.GEO_CODE;
  const geoUrl = process.env.GEO_URL;

  // const coords = [];
  // create address string from incoming vehilce.address document
  const address: string = `${rental.location.street} ${rental.location.city} ${
    rental.location.zip
  }`;
  // format address into a location for the urlGeocodeRequest
  const location: string = address.replace(/\s+/g, '+');
  // create the request
  const response: any = await axios.default.get(
    `${geoUrl}?app_id=${appId}&app_code=${appCode}&searchtext=${location}`,
  );
  // grab the coordinates
  const rawCoordinates =
    response.data.Response.View[0].Result[0].Location.DisplayPosition;
  // push rawCoordinates to an array
  // coords.push(rawCoordinates.Latitude);
  // coords.push(rawCoordinates.Longitude);
  const coords: [number, number] = [
    rawCoordinates.Latitude,
    rawCoordinates.Longitude,
  ];

  return { coords, address };
};
