export interface ApiResponseData {
    items: [
      {
        title: string;
        id: string;
        resultType: string;
        houseNumberType: string;
        address: {
          label: string;
          countryCode: string;
          countryName: string;
          stateCode: string;
          state: string;
          county: string;
          city: string;
          street: string;
          postalCode: string;
          houseNumber: string;
        },
        position: {
          lat: number;
          lng: number;
        },
        access: [
          {
            lat: number;
            lng: number;
          }
        ],
        mapView: {
          west: number;
          south: number;
          east: number;
          north: number;
        },
        scoring: {
          queryScore: number;
          fieldScore: {
            city: number;
            streets: [
              number
            ],
            houseNumber: number;
            postalCode: number;
          }
        }
      }
    ]
  }