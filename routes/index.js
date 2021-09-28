var express = require('express');
var router = express.Router();
var price_wx;
/* GET home page. */
router.get('/', function (req, res, next) {
  var fs = require("fs");
  var Papa = require("papaparse");
  var getJSON = require('get-json')
  var withbit;
  var price_bit;
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
            res.render('index', { title: 'Express', price_bit: price_bit, withbit: withbit ,price_wx : price_wx});


          })
          

        })


      }
    });


  }

  fs.readFile('data1.csv', 'utf8', readData);



});

module.exports = router;
