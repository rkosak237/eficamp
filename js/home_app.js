$(document).foundation();
// Dashboard - layout

//Start - searching in history
const endpoint = 'https://efigence-camp.herokuapp.com/api/data/history';

const items = [];

fetch(endpoint)
  .then(rawData => rawData.json())
  .then(data => items.push(...data.content));


function findMatches(wordToMatch, items) {
  return items.filter(historyList => {
    const regex = new RegExp(wordToMatch, 'gi');
    return historyList.description.match(regex) || historyList.category.match(regex)
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, items);
  const html = matchArray.map(historyList => {
    const regex = new RegExp(this.value, 'gi');
    const descData = historyList.description.replace(regex, `<span class="hl">${this.value}</span>`);
    const categoryData = historyList.category.replace(regex, `<span class="hl">${this.value}</span>`);

    return `
      <li>
        <span class="name">${descData}, ${categoryData}</span>
      </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
}


const searchInput = document.querySelector('.history-search_input');
const suggestions = document.querySelector('.history-search_results');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
//history-search_input <- miejsce inputu

//Stop - searching in history

$(document).ready(function() {
//Start - btn search
     $('.btn-search').click(function() {
    $('.input-search').toggleClass('expand-search');
    });
     $('.btn-search').click(function() {
    $('.btn-search').toggleClass('btn-search-active');
    });
//Stop - btn search

//Start - history card
$('#history').click(function() {
  $('.history-card').fadeIn();
  $('.dashboard-layout').fadeOut('slow');
});

$('#home').click(function() {
  $('.history-card').fadeOut();
  $('.dashboard-layout').fadeIn('slow');
});
//Stop - history card

//Start - Load summary 
const getSummary = () => {
$.get("https://efigence-camp.herokuapp.com/api/data/summary", (data) => {
  const summaryList = data.content;
    summaryList.forEach((element, index) => {

      let summaryTemplate = (summaryData) => {
        return `
              <ul class="small-12 medium-4 large-4 hide-for-small-only">
                <li class=""><p class="finance-headers">Balance</p></li>
                <li><p class="text"><strong>${((summaryData.balance).toFixed(2))}</strong> PLN</p></li>
              </ul>
              <ul class="small-12 medium-4 large-4 ">
                <li class=""><p class="finance-headers">Available funds</p></li>
                <li class="">
                  <p class="text"><strong>${((summaryData.funds).toFixed(2))}</strong> PLN</li>
              </ul>
              <ul class="small-12 medium-4 large-4 hide-for-small-only">
                <li class=""><p class="finance-headers">Schedule payments</p></li>
                <li class=""><p class="text"><strong>${((summaryData.payments).toFixed(2))}</strong> PLN</p></li>
              </ul>
        `
      };

      const template = summaryTemplate(element);
      $(".summary").append(template);
    });

// ${((productData.amount).toFixed(2))}
  });
}
getSummary();

//Stop - Load summary

// Start - Load product list
const getProduct = () => {
  $.get("https://efigence-camp.herokuapp.com/api/data/products", (data) => {
     const productsList = data.content; 
    productsList.forEach((element, index) => {
        
      const printing = document.querySelector(".products");
      
      
      let productTemplate = (productData) => {
        
        switch(productData.type) {
         
          case "Wallet":
              icon = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 1000.3 860.3" y="0" x="0"><path d="m208.1 180.56l355-96.9 -18.8-38c-12.3-24.7-42.3-34.9-67-22.6l-317.8 157.5 48.6 0zM673.3 86.46c-4.399 0-8.8 0.6-13.2 1.8l-83.399 22.8 -254.701 69.5 289.1 0 126 0 -15.6-57.2c-6-22.3-26.2-36.9-48.2-36.9zM789.2 215.56l-11.4 0 -15.5 0 -15.5 0 -118.3 0 -434.7 0 -57 0 -48 0 -8.9 0 -29.8 0c-15.8 0-29.9 7.3-39.1 18.8 -4.2 5.3-7.4 11.4-9.2 18.1 -1.1 4.2-1.8 8.6-1.8 13.1l0 6 0 57 0 494.1c0 27.601 22.4 50 50 50l739.1 0c27.601 0 50-22.399 50-50l0-139.5 -296.7 0c-46.9 0-85-38.1-85-85l0-45.8 0-15.5 0-15.5 0-34.4c0-23 9.199-43.899 24.1-59.199 13.2-13.601 30.9-22.801 50.7-25.101 3.3-0.399 6.7-0.6 10.1-0.6l255.2 0 15.5 0 15.5 0 10.6 0 0-136.5c0.1-27.6-22.3-50-49.9-50zM874.2 449.86c-5-4.6-10.9-8.1-17.5-10.4 -5.101-1.699-10.5-2.699-16.2-2.699l-1.3 0 -1 0 -15.5 0 -55.9 0 -224.4 0c-27.601 0-50 22.399-50 50l0 24.899 0 15.5 0 15.5 0 55.4c0 27.6 22.399 50 50 50l296.8 0 1.3 0c5.7 0 11.1-1 16.2-2.7 6.6-2.2 12.5-5.8 17.5-10.4 10-9.1 16.3-22.3 16.3-36.899l0-111.3c0-14.601-6.3-27.802-16.3-36.901zm-227.4 102.5c0 13.8-11.2 25-25 25l-16.6 0c-13.8 0-25-11.2-25-25l0-16.6c0-8 3.7-15.101 9.6-19.601 4.3-3.3 9.601-5.399 15.4-5.399l4.2 0 12.4 0c13.8 0 25 11.199 25 25l0 16.6 0 0z"/></svg>'
            break;
            case "Deposits":
              icon = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" width="204.268" height="204.268" viewBox="0 0 210.3 210.3"><path d="m196.161 112.685l-12.8 0c-2.921-10.579-8.846-20.24-17.036-28.328 2.988-5.547 7.202-10.121 7.243-10.165 1.232-1.321 1.656-3.205 1.108-4.927 -0.548-1.722-1.982-3.014-3.752-3.38 -0.306-0.063-3.11-0.617-7.437-0.617 -4.609 0-11.663 0.657-19.172 3.758 -12.398-5.978-26.837-9.424-42.249-9.424 -25.791 0-48.88 9.615-64.181 24.682 -0.956-1.622-2.128-3.271-3.56-4.802 0.63-2.656 1.038-5.654 1.167-9.022 0.105-2.759-2.046-5.082-4.806-5.188 -2.746-0.108-5.082 2.045-5.188 4.806 -0.048 1.266-0.14 2.449-0.271 3.555 -0.571-0.185-1.161-0.349-1.77-0.49 -9.752-2.262-14.865 1.305-17.046 3.632 -2.875 3.066-4.002 7.472-2.871 11.225 1.775 5.892 8.165 9.691 14.856 8.832 3.909-0.5 8.014-2.615 11.226-6.848 0.464 0.848 0.842 1.678 1.151 2.443 -7.649 10.281-12.058 22.339-12.058 35.221 0 16.361 7.112 31.389 18.941 43.139l-6.456 27.332c-0.351 1.487-0.003 3.054 0.945 4.252 0.948 1.199 2.393 1.897 3.921 1.897l22 0c2.196 0 4.135-1.433 4.78-3.532l3.561-11.596c10.818 4.198 22.906 6.556 35.659 6.556 12.753 0 24.841-2.358 35.659-6.556l3.561 11.597c0.645 2.099 2.584 3.532 4.78 3.532l22 0c1.528 0 2.973-0.699 3.921-1.897 0.948-1.198 1.296-2.765 0.945-4.252l-6.456-27.332c6.186-6.145 11.063-13.192 14.326-20.852l15.36 0c2.761 0 5-2.239 5-5l0-27.25c-0.001-2.762-2.24-5.001-5.001-5.001zm-179.033-25.772c-1.998 0.254-3.689-0.723-4.009-1.784 -0.034-0.152-0.025-0.909 0.65-1.58 0.757-0.752 2.062-1.135 3.757-1.135 1.08 0 2.317 0.155 3.671 0.469 0.363 0.084 0.715 0.186 1.055 0.302 -1.515 2.357-3.365 3.503-5.124 3.728zm108.095 0.382c-1.455 2.332-4.515 3.05-6.854 1.617 -0.19-0.112-6.319-3.631-17.388-3.631 -11.578 0-20.496 4.846-20.584 4.895 -0.766 0.422-1.594 0.623-2.411 0.623 -1.762 0-3.471-0.934-4.382-2.585 -1.334-2.418-0.455-5.459 1.962-6.793 0.455-0.25 11.29-6.139 25.416-6.139 14.268 0 22.312 4.917 22.647 5.125 2.341 1.461 3.055 4.546 1.594 6.888zm28.188 37.911c-6.141 0-11.136-5.383-11.136-12s4.996-12 11.136-12 11.137 5.383 11.137 12 -4.997 12-11.137 12zm-28.917-101.873c0 12.866-10.467 23.333-23.333 23.333s-23.334-10.467-23.334-23.333c0-12.866 10.468-23.333 23.334-23.333s23.333 10.467 23.333 23.333z"/></svg>'
            break;
            case "Accounts":
              icon = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" width="345" height="345" viewBox="0 0 360.3 320.3"><g stroke="null"><path stroke="null"  d="m203.55769 234.85905l-109.44914 0c-12.35606 0-22.40815-10.05209-22.40815-22.40815l0-82.54474c0-2.72998-2.21205-4.94203-4.94203-4.94203l-55.51085 0c-5.09919 0-9.24752 4.14834-9.24752 9.24752l0 129.11545c0 5.0982 4.14834 9.24654 9.24752 9.24654l14.87946 0c1.59924 0 3.10656 0.77886 4.03171 2.08356l25.11045 35.44324c0.92712 1.30766 2.43049 2.08455 4.0327 2.08455 1.60319 0 3.10656-0.77689 4.0327-2.08455l25.10847-35.44127c0.92614-1.30568 2.43346-2.08554 4.03368-2.08554l106.77353 0c5.09919 0 9.24851-4.14834 9.24851-9.24654l0-23.52702c0.00099-2.72899-2.21106-4.94104-4.94104-4.94104zM330.47592 36.05209l-231.42534 0c-6.905 0-12.52409 5.6181-12.52409 12.52409l0 158.93368c0 6.905 5.61909 12.52409 12.52409 12.52409l131.43129 0c1.60023 0 3.10854 0.77886 4.0327 2.08455l32.77257 46.25838c0.92712 1.30766 2.43049 2.08455 4.0327 2.08455 1.60319 0 3.10656-0.77689 4.0327-2.08455l32.7706-46.25739c0.92515-1.30568 2.43444-2.08554 4.03368-2.08554l18.31813 0c6.90401 0 12.52409-5.61909 12.52409-12.52409l0-158.93467c0.00099-6.90599-5.6181-12.5231-12.5231-12.5231zm-103.53749 132.04904l0 11.02072c0 1.1426-0.92712 2.06972-2.06873 2.06972l-15.86293 0c-1.14161 0-2.06774-0.92712-2.06774-2.06972l0-11.42498c-8.35895-2.00745-16.0863-6.29318-21.40195-11.90732l-3.08185-3.25581c-0.37658-0.39833-0.57921-0.93009-0.56537-1.47964 0.0168-0.54758 0.25007-1.06748 0.64642-1.44604l11.52185-10.9031c0.83026-0.78479 2.1399-0.74822 2.9237 0.08105l3.08086 3.25581c3.91804 4.14043 10.87642 6.92082 17.31193 6.92082 5.0893 0 13.70128-1.34423 13.70128-6.38312 0.03558-4.35393-1.84931-6.10242-15.17895-10.14006 -11.39928-3.4525-30.47651-9.23171-30.47651-30.70977 0-12.03088 8.2008-21.59864 21.51858-25.2854l0-11.80354c0-1.1426 0.92614-2.06972 2.06774-2.06972l15.86293 0c1.14161 0 2.06873 0.92712 2.06873 2.06972l0 10.70839c6.89117 1.01509 13.57674 3.38924 18.58104 6.62133l3.76484 2.43247c0.96172 0.62072 1.23551 1.9007 0.6138 2.86143l-8.60506 13.32272c-0.61973 0.95875-1.90169 1.23452-2.86143 0.61479l-3.76681-2.43247c-3.55826-2.30002-9.8208-3.96944-14.88638-3.96944 -5.33344 0-14.35956 1.45988-14.35956 6.92872 0 5.14366 2.13594 7.28653 16.2741 11.56929 11.76697 3.5632 29.55136 8.95001 29.38432 29.36257 0 12.96195-9.1981 22.59199-24.13885 25.44058z"/></g></svg>'
            break;
            case "Funds":
              icon = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" width="424.98" height="424.98" viewBox="0 0 460.3 460.3"><title>Layer 1</title><path d="m241.395 282.304c-1.587-1.738-3.595-3.038-5.67-4.121 -4.518-2.356-9.459-3.785-14.365-5.075l0 38.016c7.963-0.9 17.105-3.79 21.286-11.224l0 0c1.996-3.551 2.393-7.914 1.58-11.867 -0.441-2.142-1.352-4.108-2.831-5.729z"/><path d="m242.604 299.973c0.016-0.027 0.025-0.044 0.042-0.073l0 0c-0.014 0.024-0.028 0.048-0.042 0.073z"/><path d="m184.009 221.532c-1.369 1.999-2.228 4.27-2.465 6.684 -0.237 2.419-0.104 5.11 0.815 7.387 0.875 2.17 2.708 3.772 4.6 5.062 2.123 1.444 4.458 2.572 6.836 3.528 1.995 0.803 4.239 1.571 6.658 2.313l0-34.4c-6.111 1.304-12.788 4.088-16.444 9.426z"/><path d="m242.804 299.619c-0.05 0.089-0.104 0.182-0.157 0.28l0 0c0.062-0.114 0.111-0.198 0.157-0.28z"/><path d="m243.004 299.263c0.013-0.024 0.015-0.026 0 0l0 0z"/><path d="m234.753 92.469c32.329-27.158 53.931-88.341 40.637-91.017 -17.664-3.557-56.022 12.04-74.562 14.788 -26.296 3.175-54.936-28.515-71.012-10.851 -13.071 14.362 9.371 66.592 44.482 89.346 -104.752 51.484-251.988 309.938 4.873 328.691 355.411 25.949 177.444-280.787 55.582-330.957zm30.523 203.829c-1.093 10.076-6.433 19.188-14.415 25.374 -8.428 6.532-18.999 9.57-29.502 10.421l0 11.133c0 2.979-1.301 5.86-3.531 7.832 -3.065 2.712-7.569 3.381-11.289 1.667 -3.673-1.69-6.086-5.457-6.086-9.499l0-12.168c-1.801-0.342-3.589-0.749-5.356-1.234 -9.816-2.697-18.921-7.954-25.572-15.732 -3.313-3.877-6.014-8.276-7.882-13.025 -0.488-1.241-0.923-2.505-1.304-3.783 -0.345-1.157-0.701-2.333-0.824-3.539 -0.207-2.023 0.194-4.087 1.137-5.889 1.938-3.707 6.022-5.946 10.192-5.574 4.104 0.364 7.701 3.212 8.993 7.124 0.398 1.205 0.668 2.44 1.115 3.632 0.443 1.184 0.978 2.335 1.607 3.431 1.242 2.158 2.798 4.148 4.59 5.875 3.694 3.559 8.399 5.872 13.304 7.248l0-41.362c-9.591-2.483-19.491-5.69-27.411-11.848 -3.849-2.994-7.115-6.714-9.254-11.117 -2.257-4.647-3.192-9.824-3.23-14.966 -0.039-5.221 0.953-10.396 3.131-15.153 2.04-4.454 4.977-8.453 8.578-11.768 7.7-7.087 17.928-11.04 28.187-12.492l0-0.91 0-10.647c0-2.978 1.301-5.86 3.531-7.832 3.066-2.711 7.568-3.381 11.289-1.667 3.672 1.691 6.086 5.457 6.086 9.499l0 10.647 0 0.847c1.367 0.172 2.73 0.378 4.086 0.624 10.074 1.823 19.927 5.983 27.294 13.246 3.49 3.44 6.347 7.539 8.356 12.009 0.561 1.247 1.052 2.523 1.477 3.824 0.396 1.213 0.794 2.462 0.983 3.728 0.302 2.021-0.006 4.109-0.871 5.958 -1.772 3.788-5.746 6.2-9.927 6.021 -4.108-0.179-7.83-2.854-9.301-6.694 -0.438-1.142-0.657-2.351-1.104-3.49 -0.451-1.153-1.035-2.253-1.708-3.292 -1.308-2.02-3.003-3.752-4.938-5.179 -4.19-3.094-9.272-4.706-14.35-5.607l0 39.582c6.035 1.445 12.075 3.021 17.857 5.301 8.739 3.446 17.02 8.73 21.79 17.062 -0.74-1.298-1.46-2.563 0.025 0.043 1.458 2.56 0.762 1.34 0.03 0.057 3.795 6.688 5.042 14.685 4.217 22.282z"/><path d="m242.493 300.169c-0.061 0.109-0.114 0.205-0.156 0.278 0.036-0.063 0.09-0.158 0.156-0.278z"/></svg>'
            break;
            case "Bank loans":
              icon = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" width="432" height="309" viewBox="0 0 400.3 350.3"><g transform="rotate(90 192.5885009765625,194.07499694824222) "><path d="m294.442 388.15c1.393-4.576 2.918-9.344 3.938-11.8 24.241-58.511 21.491-120.33 20.417-140.134 -0.745-13.367-2.054-24.655-9.518-33.615 -11.025-13.153-27.935-17.248-35.158-18.452 -4.588-11.529-11.602-19.11-20.867-22.584 -3.621-1.36-7.572-2.048-11.715-2.048 -6.966 0-13.229 1.91-17.438 3.615 -5.566-10.104-12.994-16.369-22.098-18.651 -2.498-0.633-5.143-0.952-7.854-0.952 -8.67 0-16.603 3.27-21.995 6.197 -1.402-9.334-6.29-84.8-9.185-126.176 -0.924-13.248-11.943-23.55-25.229-23.55l-0.018 0c-14.192 0-25.709 11.47-25.767 25.656 -0.435 89.7-2.765 178.297-3.312 191.718 -8.713 3.963-23.89 9.253-30.643 18.41 -15.444 20.945-8.725 37.362-1.068 50.177 17.285 28.967 47.384 80.74 60.204 102.189l157.306 0 0 0z"/></g></svg>'
            break;
          default:
            icon = "icon-default"
         }
      return `
                <div class="options-content small-12 medium-12 large-5">
                  <ul class="{icon} menu simple">
                    <li class="small-5 text-left select">${icon}</li>
                    <li class="small-7 text-left">${productData.type} [${productData.elements}] <br> ${((productData.amount).toFixed(2))} ${productData.currency} </li>
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
getProduct();
// Stop load product list

//Start load history list
const getHistory = () => {
  $.get("https://efigence-camp.herokuapp.com/api/data/history", (data) => {
     const historyList = data.content; 
    historyList.forEach((element, index) => {
         
      
      let historyTemplate = (historyData) => {

        let amountType;

        if (historyData.status == "income") {
          amountType = "income";
        } else {
          amountType = "outcome";
          historyData.amount = - `${((historyData.amount).toFixed(2))}`;
        }
      return `
                <div class="history-list">
                  <ul class="menu row">
                    <li class="small-3 medium-2 large-2 history-elements">${(historyData.date).replace(/(\d{4})-(\d\d)-(\d\d)/, "$3-$2")}</li>
                    <li class="small-5 medium-7 large-5 history-elements">${historyData.description}</li>
                    <li class="small-5 medium-7 large-2 history-elements">${historyData.category}</li>
                    <li class="small-4 medium-3 large-3 history-elements text-right"><span class="${amountType}">${((historyData.amount).toFixed(2))}</span> ${historyData.currency}</li>

                  </ul>
                </div>
      `
      };
     
      const template = historyTemplate(element);
      $(".history, .history--card-dynamic").append(template);
      });
  });
}
getHistory();
//Stop load history list

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
               backgroundColor: ['rgba(252, 139, 2, 1)']
      },
      {
        label: 'Test 03',
        data: [3, 9, 5, 5, 6, 20 , 29],
               backgroundColor: ['rgba(19, 189, 210, 1)']
      },
    ],
  }
});
});