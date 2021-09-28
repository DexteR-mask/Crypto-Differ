var fs = require("fs");
var Papa =require("papaparse");
var getJSON = require('get-json')
var withbit ;
var price_bit;
function readData(err, data) {
	 var csv = data.toString();
      Papa.parse(csv, {
        header: true,
        dynamicTyping: true,
        complete: function(results) {
         // console.log("Finished:", results.data);
          withbit = results.data;
          getJSON('https://bitbns.com/order/getTickerWithVolume/', function(error, response){
          //console.log(response);
         price_bit=response;
         for (i=0; i<withbit.length-3;i++)
          {
            //if (price_bit[(withbit[i].name).toUpperCase()] != null)
             // console.log( price_bit[(withbit[i].name).toUpperCase()].last_traded_price);
              //else
              {
               // console.log("NULL");
              }
          }
})
          
        
        }});

  
}

fs.readFile('data1.csv', 'utf8', readData);
 