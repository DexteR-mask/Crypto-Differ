var data,data1;
parse();
function parse() {
    var file = new LocalFileData('data1.csv');
    $.ajax({
      url: "http://bitbns.com/order/getTickerWithVolume/",
      type: 'GET',
      cache: false,
      success: function(result) {
         console.log(result);
         data1=result;
          Papa.parse(file, {
            header: true,
            dynamicTyping: true,
            complete: function(results) {
              console.log("Finished:", results.data);
              data = results.data;
              var table = document.createElement('table');
          for (var i = 0; i <  data.length-3; i++){
            var tr = document.createElement('tr');   
        
            var td1 = document.createElement('td');
            var td2 = document.createElement('td');
        
            var text1 = document.createTextNode(data[i].name.toUpperCase());
            var text2 = document.createTextNode(data[i].fee);
        
            td1.appendChild(text1);
            td2.appendChild(text2);
            tr.appendChild(td1);
            tr.appendChild(td2);
        
            table.appendChild(tr);
            table.setAttribute("border", "1");
        }
      
      document.body.appendChild(table);
            }
      
          });
  
      },
      error: function() {
          alert("No");
      }
  });
    
    
}