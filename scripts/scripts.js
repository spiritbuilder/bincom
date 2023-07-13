console.log("check");
window.addEventListener("DOMContentLoaded", (e) => {
  let select = document.getElementById("select");
  let value = select.options[select.selectedIndex].value;
  console.log(value);
  select.addEventListener("change", (e) => {
    console.log("changed");
    location.href = "/units?unit=" + e.target.value;
  });


});
