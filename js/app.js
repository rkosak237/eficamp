$(document).foundation();
// Login-page
$(document).ready(function() {
  const button = document.querySelector(".submit");
  const passInput = document.querySelector(".pass");
  const changeBtn = document.querySelector(".btnChangeLogin");
  const showLog = document.querySelector(".login");
  const hideLogExample = document.querySelector(".example-login");
  const addArrow = document.querySelector(".wrap");

  button.addEventListener("click", event => {
    event.preventDefault();
    console.log(passInput.value);

    if (passInput.value == 0)  {
      passInput.classList.add("alert");
      alert('use proper password');
      addArrow.classList.toggle("InvaildPass");

    } else if (showLog.value == 0) {
      showLog.classList.add("alert");
      addArrow.classList.toggle("InvaildLogin");
      alert('use proper LOGIN');

    } else if ((passInput.value == "camp") && (showLog.value == "efi")) {
      alert('success!');
      addArrow.classList.remove("InvaildLogin");
      addArrow.classList.remove("InvaildPass");
      showLog.classList.remove("alert");
      passInput.classList.remove("alert");
      let yourLogin = showLog.value;
      let yourPass = passInput.value;
      $.ajax({
        type: "post",
        data: {
          login: showLog.value,
          password: passInput.value
        },
        url: "https://efigence-camp.herokuapp.com/api/login",
        error: function(response) {
          console.log(response.responseText);
        },
        success: function(response) {
          console.log(response);
        }
      });
      window.location.replace('home.html');
    } else if ((passInput.value !== "camp") && (showLog.value !== "efi")) { 
      alert('Invaild: Login or password');
    } else {
      alert('ou better go for a cigarette');
    }
  });

    changeBtn.addEventListener("click", function() {
    changeBtn.classList.toggle("hide");
    showLog.classList.toggle("hide");
    hideLogExample.classList.toggle("hide");
  });

// Home page

const getUrl = () => {
  $.get("https://efigence-camp.herokuapp.com/data/products", (data) => {
    console.log(data);
  });

}
getUrl();

});