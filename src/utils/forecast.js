const request = require('request');

const forecast = (lat, lon, callback) => {
    const url = "https://api.openweathermap.org/data/2.5/weather?appid=a18dfd5878e2989cbca098b9f389cd54&units=metric&lat="+ lat +"&lon="+ lon +"";
    
    request({url, json: true}, (error,{body}) => {
        if (error) {
            //Low level error
            callback(error, undefined);
        } else if (body.message) {
            callback(body.message, undefined);
        } else {
            callback(undefined, body.main.temp + ' degrees Celcius');
        }
    });
}

module.exports = forecast;