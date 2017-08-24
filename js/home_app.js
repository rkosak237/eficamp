const getUrl = () => {
  $.get("https://efigence-camp.herokuapp.com/api/data/products", (data) => {
    console.log(data);
  });
}

getUrl();
