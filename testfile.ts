const appId = process.env.GEO_ID;  //appConfig.geo_id
const appCode = process.env.GEO_CODE;  //appConfig.geo_code;
const geoUrl = process.env.GEO_URL;  //appConfig.geo_url;
const address = {
    street: "9706 Forestdale Ct",
    city: "Riverview",
    zip: 33578
}

const axios = require('axios');
const sendRequest = async () => {
    try{
        const result = await axios.default.get(`${geoUrl}?app_id=${appId}&app_code=${appCode}&searchtext=${address}`);
        console.log(result);
        return;
    }catch(err){
        throw new Error(err);
    }
}
sendRequest()