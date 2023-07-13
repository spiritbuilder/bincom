console.log("check");
window.addEventListener("DOMContentLoaded", (e) => {
  let lgs = document.getElementById("lgas");
  let lgValue = lgs.options[lgs.selectedIndex].value;
  console.log(lgValue);
  lgs.addEventListener("change", (e) => {
    console.log("changed");
    location.href = "/lgas?lga=" + e.target.value;
  });
});
