$(document).foundation();
$(document).ready(function() {
  const button = document.querySelector(".submit");
  const passInput = document.querySelector(".pass");

  button.addEventListener("click", event => {

    event.preventDefault();
    console.log(passInput.value);

    if (passInput.value == 0) {
      passInput.classList.add("alert");
      alert('use proper login');


    } else {
      passInput.classList.remove("alert");
      let yourLogin = passInput.value;
      let yourPass =
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
    }
  });
  const changeBtn = document.querySelector(".btnlog");
  const showLog = document.querySelector(".custominput");


  changeBtn.addEventListener("click", function() {
    changeBtn.classList.toggle("hide");
    showLog.classList.toggle("hide");
  });

});
//dodac do pola trojkat ktory bedzie wskazywal bledne pole, znajduje się na inpucie ::after
