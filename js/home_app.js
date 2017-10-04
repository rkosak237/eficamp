$(document).foundation();
// Login-page
$(document).ready(function() {
const getUrl = () => {
  $.get("https://efigence-camp.herokuapp.com/api/data/products", (data) => {
     const productsList = data.content; 
    productsList.forEach((element, index) => {
        
      const printing = document.querySelector(".products");
      
      
      let productTemplate = (productData) => {
        
     //wallet
     //deposits
     //accounts
     // funds
     // bank loans  
        
       //pozycjonowanie tak jak w projekcie
        switch(productData.type) {
         
          case "Wallet":
              icon = '<img class="product__icon" src="img/wallet.svg" alt="wallet icon">'
            break;
            case "Deposits":
              icon = '<img class="product__icon" src="img/pig-money-safe.svg" alt="savings icon">'
            break;
            case "Accounts":
              icon = '<img class="product__icon" src="img/bank-account.svg" alt="product icon">'
            break;
            case "Funds":
              icon = '<img class="product__icon" src="img/bar-chart.svg" alt="funds icon">'
            break;
            case "Bank loans":
              icon = '<img class="product__icon" src="img/point.svg" alt="loans icon">'
            break;
          default:
            icon = "icon-default"
         }
      return `
                <ul class="options-content small-12 medium-8 large-5">
                  <ul class="{icon} menu">
                    <li class="small-4 text-center">${icon}</li>
                    <li class="small-8 text-center">${productData.type} [${productData.elements}]</li>
                    <li class="small-8 text-right">${((productData.amount).toFixed(2))} ${productData.currency}</li>
                    
                  </ul>
                </ul>
      `
      };
      const template = productTemplate(element);
      $(".products").append(template);
      });
  });
}
getUrl();








const getHistory = () => {
  $.get("https://efigence-camp.herokuapp.com/api/data/history", (data) => {
     const historyList = data.content; 
    historyList.forEach((element, index) => {
         
      const printing = document.querySelector(".history");
      let historyTemplate = (historyData) => {
      return `
                <ul class="history-list">
                  <ul class="menu row">
                    <li class="small-3 text-center history-elements">${(historyData.date).replace(/(\d{4})-(\d\d)-(\d\d)/, "$3-$2-$1")}</li>
                    <li class="small-6 history-elements">${historyData.description}</li>
                    <li class="small-2 text-right history-elements"><strong>${((historyData.amount).toFixed(2))}</strong></li>

                    <li class="small-1 text-right history-elements">${historyData.currency}</li>
                  </ul>
                </ul>
      `
      };
      function addZeroes(num) {
      var value = Number(num);
      var res = num.split(".");
      if(num.indexOf('.') === -1) {
          value = value.toFixed(2);
          num = value.toString();
      } else if (res[1].length < 3) {
          value = value.toFixed(2);
          num = value.toString();
      }
      return num
  }

      const template = historyTemplate(element);
      $(".history").append(template);
      });
  });
}

getHistory();
//search oldData in history 
/* function findMatches(wordToMatch, oldData){
  $.get("https://efigence-camp.herokuapp.com/api/data/history", (data) => {
     const historySearch = data.content; 
    historyList.forEach((element, index) => {
         
      const printing = document.querySelector(".history");
      let historyTemplate = (historyData) => {
      return `
                <ul class="history-list">
                  <ul class="menu row">
                    <li class="small-3 text-center">${historyData.date}</li>
                    <li class="small-6">${historyData.description}</li>
                    <li class="small-2 text-right"><strong>${historyData.amount}</strong></li>
                    <li class="small-1 text-right">${historyData.currency}</li>
                  </ul>
                </ul>
      `
      };
      const template = historyTemplate(element);
      $(".history").append(template);
      });
  });
}*/

var canvas = document.getElementById("myChart");
var ctx = canvas.getContext("2d");

var parent = document.getElementById('parent');

canvas.width = parent.offsetWidth;
canvas.height = parent.offsetHeight;

var chart = new Chart(ctx, {
  type: 'line',
  options: {
    responsive: true,
    maintainAspectRatio: false
  },
  data: {
    labels: ['01', '02', '03', '05', '06', '09'],
    datasets: [
      {
        label: 'Test 01',
        data: [1, 2, 3, 6]
      },
      {
        label: 'Test 03',
        data: [3, 2, 5, 10, 23, 21]
      },
      {
        label: 'Test 02',
        data: [3, 9, 5, 5, 6, 29]
      }
    ]
  }
});

});