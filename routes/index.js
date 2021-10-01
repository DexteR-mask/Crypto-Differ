var express = require('express');
var router = express.Router();
var price_wx;
var fs = require("fs");
  var Papa = require("papaparse");
  var getJSON = require('get-json')
  var withbit;
  var price_bit,USD_inr,binance;
/* GET home page. */
router.get('/', function (req, res, next) {
  
  function readData(err, data) {
    var csv = data.toString();
    Papa.parse(csv, {
      header: true,
      dynamicTyping: true,
      complete: function (results) {
        // console.log("Finished:", results.data);
        withbit = results.data;
        getJSON('https://bitbns.com/order/getTickerWithVolume/', function (error, response) {
          //console.log(response);
          price_bit = response;
          getJSON('https://api.wazirx.com/api/v2/market-status', function (error, response) {
            
            price_wx = response;
            //console.log(response);
            getJSON('https://free.currconv.com/api/v7/convert?q=USD_inr&compact=ultra&apiKey=0ae2e14e0071bd60fd1d', function (error, response) {
            
              USD_inr = response;
            getJSON('https://api.binance.com/api/v3/ticker/price', function (error, response) {
            
              
              binance =response;
              console.log(response[0].symbol);
              res.render('index', { title: 'Express', price_bit: price_bit, withbit: withbit ,price_wx : price_wx,USD_inr : USD_inr,binance : binance });


          })
              


          })
            


          })
          

        })


      }
    });


  }

  fs.readFile('data1.csv', 'utf8', readData);



});

module.exports = router;
