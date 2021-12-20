const reqProm = require('request-promise');

module.exports = async function(city = '') {
    if(!city) {
        throw new Error('Имя города не может быть пустым');
    }


    const KEY = 'acb634048d18223ffaad1144ec8959c1'; 
    const uri = 'http://api.openweathermap.org/data/2.5/weather';

    const options = {
        uri,
        qs: {
            appid: KEY,
            q: city, 
            units: 'imperial'
        },
        json: true
    };

    try {
        const data = await reqProm(options); 
        const celsius = (data.main.temp - 30) * 5/9;

        return {
            wheather: `${data.name} : ${celsius.toFixed(0)}`,
            error: null
        };

    } catch (error) {
        return {
            wheather: null,
            error: error.error.massage
        };
    }
};