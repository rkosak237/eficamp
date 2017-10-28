$(document).foundation();
// Login-page
$(document).ready(function() {
const getUrl = () => {
  $.get("https://efigence-camp.herokuapp.com/api/data/products", (data) => {
     const productsList = data.content; 
    productsList.forEach((element, index) => {
        
      const printing = document.querySelector(".products");
      
      
      let productTemplate = (productData) => {
        
        switch(productData.type) {
         
          case "Wallet":
              icon = '<div id="wallet" class="wallet" alt="wallet icon" id="wallet"></div>'
            break;
            case "Deposits":
              icon = '<div id="savings" class="savings" alt="savings icon" id="savings"></div>'
            break;
            case "Accounts":
              icon = '<div id="bank_account" class="bank_account" alt="product icon" id="bank_account"></div>'
            break;
            case "Funds":
              icon = '<div id="bar_chart" class="bar_chart" alt="funds icon" id="bar_chart"></div>'
            break;
            case "Bank loans":
              icon = '<div id="loans" class="loans" alt="loans icon" id="loans"></div>'
            break;
          default:
            icon = "icon-default"
         }
      return `
                <div class="options-content small-12 medium-8 large-5">
                  <div class="row select ">
                    ${icon}
                    <ul class="{icon} menu ">
                      <li class="small-12 text-left">${productData.type} [${productData.elements}] <br> ${((productData.amount).toFixed(2))} ${productData.currency} </li>
                    </ul>
                  </div>
                </div>

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
                    <li class="small-3 text-center history-elements">${(historyData.date).replace(/(\d{4})-(\d\d)-(\d\d)/, "$3-$2")}</li>
                    <li class="small-6 history-elements">${historyData.description}</li>
                    <li class="small-2 text-right history-elements"><strong>${((historyData.amount).toFixed(2))}</strong></li>

                    <li class="small-1 text-right history-elements">${historyData.currency}</li>
                  </ul>
                </ul>
      `
      };
     
      const template = historyTemplate(element);
      $(".history").append(template);
      });
  });
}
getHistory();

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
    labels: ['02', '04', '06', '08', '10', '12'],
    datasets: [
      {
        label: 'Test 01',
        data: [1, 2, 3, 6],
        backgroundColor: ['rgba(5, 121, 182, 1)']
      },
      {
        label: 'Test 02',
        data: [3, 2, 5, 10, 23, 21],
               backgroundColor: ['rgba(252, 139, 0, 1)']
      },
      {
        label: 'Test 03',
        data: [3, 9, 5, 5, 6, 20 , 29],
               backgroundColor: ['rgba(19, 189, 210, 1)']
      },
    ],
  }
});


/* function needs to add to existing classes defined in list of produtcs prefix _active 
when item is clicked, class should change background position in existing roller */
$(function() {
   $('.products >').click(function() {
     var to = $(this);
      // remove classes from all
     to.removeClass();
     var iconId = event.target.id;
     var iconClass = to.attr("class");
      to.toggleClass(iconId +'_active');
     if (iconId == iconClass) {
     to.toggle(iconId +'_active', '');
     } else {
       to.click(function() {
         to.toggleClass(iconId, '');
       })
     }
   });
});
});