let temples = [];
let regionSelected = "";
let templeSelected = "";

fetchData();

function fetchData() {
  fetch("../data/temples.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      temples = data;
    });
}

function showTemples() {
  let templeList = $("#temple-select").empty();
  let templeFlex = $(".temple-template");

  for (let i = 0; i < temples.length; i++) {
    templeFlex.find(".temple-picture").attr("src", temples[i].picture);
    templeFlex.find(".temple-name").text(temples[i].name);
    templeFlex.find(".temple-province").text(temples[i].province);
    //templeFlex.find(".temple-flex").attr("data-id", temples[i].id);

    let ratingList = $("#temple-rating-list").empty();
    let ratingFlex = $(".rating-template");
    for (let j = 0; j < temples[i].rating; j++) {
      ratingList.append(ratingFlex.html());
    }

    templeList.append(templeFlex.html());
  }
}

function regionSelect(region) {
  var tamboon = document.getElementById("tamboon-select");
  var temple = document.getElementById("temple-select-section");
  var package = document.getElementById("package-select-section");
  regionSelected = region;
  showTemples();
  tamboon.style.display = "none";
  temple.style.display = "grid";
  package.style.display = "none";
  document.getElementById("tamboon-title").innerHTML = "เลือกวัดที่ท่านต้องการ";
}

function packageSelect(temple) {
  var tamboon = document.getElementById("tamboon-select");
  var temple = document.getElementById("temple-select-section");
  var package = document.getElementById("package-select-section");

  templeSelected = temple;

  tamboon.style.display = "none";
  temple.style.display = "none";
  package.style.display = "inherit";

  document.getElementById("tamboon-title").innerHTML =
    "เลือกแพคเกจที่ท่านต้องการ";
}

function donatePackage(packageName) {
  var tamboon = document.getElementById("tamboon-select");
  var temple = document.getElementById("temple-select-section");
  var package = document.getElementById("package-select-section");
  var selectedPackage = document.getElementById(packageName);
  var payment = document.getElementById("payment-section");
  var forTemple = document.getElementById("for-temple");

  var lotteryNumber = document.getElementById("lottery-number-section");

  tamboon.style.display = "none";
  temple.style.display = "none";
  package.style.display = "none";
  forTemple.style.display = "flex";

  if (packageName === "water-package") {
    selectedPackage.style.display = "grid";
    payment.style.display = "flex";
    document.getElementById("tamboon-title").innerHTML = "ทำบุญค่าน้ำ / ค่าไฟ";
  } else if (packageName === "sangkatarn-package") {
    selectedPackage.style.display = "grid";
    payment.style.display = "none";
    document.getElementById("tamboon-title").innerHTML =
      "เลือกสังฆทานที่ท่านต้องการ";
  } else if (packageName === "lottery-package") {
    selectedPackage.style.display = "flex";
    payment.style.display = "none";
    lotteryNumber.style.display = "inherit";
    document.getElementById("tamboon-title").innerHTML =
      "เลือกจำนวนเลขเด็ดที่ท่านต้องการ";
  } else {
    selectedPackage.style.display = "grid";
    payment.style.display = "none";
    document.getElementById("tamboon-title").innerHTML =
      "เลือกพระที่ท่านต้องการเช่า";
  }
}

function displayAllNone() {
  var tamboon = document.getElementById("tamboon-select");
  var temple = document.getElementById("temple-select-section");
  var package = document.getElementById("package-select-section");
  var payment = document.getElementById("payment-section");
  var water = document.getElementById("water-package");
  var sangkatarn = document.getElementById("sangkatarn-package");
  var lottery = document.getElementById("lottery-package");
  // var sangkatarn = document.getElementById("sangkatarn-package");
  tamboon.style.display = "none";
  temple.style.display = "none";
  package.style.display = "none";
  payment.style.display = "none";
  water.style.display = "none";
  sangkatarn.style.display = "none";
  lottery.style.display = "none";
}

function backTo(page) {
  displayAllNone();
  var tamboon = document.getElementById("tamboon-select");
  var temple = document.getElementById("temple-select-section");
  var package = document.getElementById("package-select-section");
  var payment = document.getElementById("payment-section");
  if (page === "region") {
    regionSelected = "";
    tamboon.style.display = "grid";
    document.getElementById("tamboon-title").innerHTML =
      "เลือกภูมิภาคที่ท่านสนใจ";
  } else if (page === "temple") {
    temple.style.display = "grid";
    document.getElementById("tamboon-title").innerHTML =
      "เลือกวัดที่ท่านต้องการ";
  } else if (page === "package") {
    package.style.display = "inherit";
    document.getElementById("tamboon-title").innerHTML =
      "เลือกแพคเกจที่ท่านต้องการ";
  } else {
    donatePackage();
  }
}
