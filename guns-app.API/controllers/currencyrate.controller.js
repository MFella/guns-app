
const got = require('got');
const CurrencyRate = require('../models/currencyrate');

module.exports = {

    retrieveCurrency: async(req, res) =>
    {
        let url = 'https://api.ratesapi.io/api/latest';

        got(url).then(async(response) => 
        {
            const parsedCurrs = JSON.parse(response.body);

            const currs =  await module.exports.saveCurrencies(parsedCurrs);
            console.log(currs);

            try{

                await res.json({success: true, data: currs});

            }catch(e)
            {
                console.log(e);
            }
                
        }).catch(err => 
        {
            console.log(err.response.body);

        });
    },
    saveCurrencies: async(toSave) => 
    {
        const comments = await CurrencyRate.find({date: toSave.date});

        //console.log(comments);

        if(comments.length == 0)
        {
            //delete oldest one
            await CurrencyRate.deleteMany({});

            //create new
            const res = await CurrencyRate.create(toSave);

            //and save it
            await res.save();
            return res;

        }else
        {
            let toRet = await CurrencyRate.find({});      
            return toRet;
        }

    },
}