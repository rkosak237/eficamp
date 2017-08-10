$(document).foundation({
  const button = document.querySelector(".submit");
    const loginInput = document.querySelector(".login");

    button.addEventListener("click", event => {
      
      event.preventDefault();
      console.log(loginInput.value);

      if (loginInput.value == 0)  {
      loginInput.classList.add("alert");

    } else {
      loginInput.classList.remove("alert");
    }
  }
    );


});
