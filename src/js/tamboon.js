let temples = [];
let sangkatarns = [];
let monks = [];
let regionSelected = "";
let templeSelected = {};
let regionClick = false;
let templeClick = false;
let packageClick = false;

fetchData();

function fetchData() {
  // fetch temples data
  fetch("../data/temples.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      temples = data;
    });

  //fetch sangkatarns data
  fetch("../data/sangkatarns.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      sangkatarns = data;
    });

  //fetch monks data
  fetch("../data/monks.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      monks = data;
    });
}

function showTemples(keyword = "") {
  let templeList = $("#temple-select").empty();
  let templeFlex = $(".temple-template");
  let ratingTemplate = $(".rating-template");
  let ratingFlex = ratingTemplate.find(".rating-star");

  let templesByRegion = temples.filter(
    (temple) => temple.region === regionSelected
  );

  if (keyword) {
    templesByRegion = templesByRegion.filter(
      (temple) =>
        temple.name.toUpperCase().includes(keyword) ||
        temple.province.toUpperCase().includes(keyword)
    );
  }

  for (let i = 0; i < templesByRegion.length; i++) {
    templeFlex.find(".temple-picture").attr("src", templesByRegion[i].picture);
    templeFlex.find(".temple-name").text(templesByRegion[i].name);
    templeFlex.find(".temple-province").text(templesByRegion[i].province);
    templeFlex.find(".temple-flex").attr("temple-id", templesByRegion[i].id);

    let list = templeFlex.find("#temple-rating-list").empty();

    for (let j = 0; j < templesByRegion[i].rating; j++) {
      list.append(ratingFlex.clone());
    }

    templeList.append(templeFlex.html());
  }
}

function showSangkatarns() {
  let sangkatarnList = $("#sangkatarn-package").empty();
  let sangkatarnFlex = $(".sangkatarn-template");

  for (let i = 0; i < sangkatarns.length; i++) {
    sangkatarnFlex
      .find(".sangkatarn-picture")
      .attr("src", sangkatarns[i].picture);
    sangkatarnFlex.find(".sangkatarn-name").text(sangkatarns[i].name);
    sangkatarnFlex.find(".sangkatarn-price").text(sangkatarns[i].price);
    sangkatarnFlex.find(".sangkatarn-btn").attr("data-id", sangkatarns[i].id);
    sangkatarnFlex
      .find(".sangkatarn-btn")
      .attr("data-price", sangkatarns[i].price);

    sangkatarnList.append(sangkatarnFlex.html());
  }
}

function showMonks() {
  let monkList = $("#rent-package").empty();
  let monkFlex = $(".monk-template");

  for (let i = 0; i < monks.length; i++) {
    monkFlex.find(".monk-picture").attr("src", monks[i].picture);
    monkFlex.find(".monk-name").text(monks[i].name);
    monkFlex.find(".monk-price").text(monks[i].price);
    monkFlex.find(".monk-btn").attr("data-id", monks[i].id);
    monkFlex.find(".monk-btn").attr("data-price", monks[i].price);

    monkList.append(monkFlex.html());
  }
}

function regionSelect(region) {
  var tamboon = document.getElementById("tamboon-select");
  var temple = document.getElementById("temple-select-section");
  var packages = document.getElementById("package-select-section");
  regionSelected = region;
  showTemples();
  regionClick = true;
  tamboon.style.display = "none";
  temple.style.display = "grid";
  packages.style.display = "none";
  document.getElementById("tamboon-title").innerHTML = "เลือกวัดที่ท่านต้องการ";
  document.getElementById("buttonTemple").classList.remove("gray-text");
}

function templeSelect(item) {
  var tamboon = document.getElementById("tamboon-select");
  var temple = document.getElementById("temple-select-section");
  var packages = document.getElementById("package-select-section");

  let selectId = $(item).attr("temple-id");

  templeSelected = temples.find((temple) => temple.id == selectId);

  document.getElementById(
    "select-temple-name"
  ).innerHTML = `${templeSelected.name} : จังหวัด${templeSelected.province}`;
  document.getElementById("select-temple-img").src = templeSelected.picture;

  tamboon.style.display = "none";
  temple.style.display = "none";
  packages.style.display = "inherit";

  document.getElementById("tamboon-title").innerHTML =
    "เลือกแพคเกจที่ท่านต้องการ";
  templeClick = true;
  document.getElementById("buttonPackage").classList.remove("gray-text");
}

function donatePackage(packageName) {
  var tamboon = document.getElementById("tamboon-select");
  var temple = document.getElementById("temple-select-section");
  var packages = document.getElementById("package-select-section");
  var selectedPackage = document.getElementById(packageName);
  var payment = document.getElementById("payment-section");
  var forTemple = document.getElementById("for-temple");

  var lotteryNumber = document.getElementById("lottery-number-section");

  tamboon.style.display = "none";
  temple.style.display = "none";
  packages.style.display = "none";
  forTemple.style.display = "flex";

  var mobileRes = window.matchMedia("(max-width: 1280px)");

  if (packageName === "water-package") {
    if (mobileRes.matches) {
      selectedPackage.style.display = "flex";
    } else {
      selectedPackage.style.display = "grid";
    }
    payment.style.display = "flex";
    document.getElementById("tamboon-title").innerHTML = "ทำบุญค่าน้ำ / ค่าไฟ";
  } else if (packageName === "sangkatarn-package") {
    selectedPackage.style.display = "grid";
    payment.style.display = "none";
    document.getElementById("tamboon-title").innerHTML =
      "เลือกสังฆทานที่ท่านต้องการ";
    showSangkatarns();
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
    showMonks();
  }
  packageClick = true;
  document.getElementById("buttonDonate").classList.remove("gray-text");
}

function displayAllNone() {
  var tamboon = document.getElementById("tamboon-select");
  var temple = document.getElementById("temple-select-section");
  var packages = document.getElementById("package-select-section");
  var payment = document.getElementById("payment-section");
  var water = document.getElementById("water-package");
  var sangkatarn = document.getElementById("sangkatarn-package");
  var lottery = document.getElementById("lottery-package");
  var forTemple = document.getElementById("for-temple");
  var lotteryNumber = document.getElementById("lottery-number-section");
  var rentmonk = document.getElementById("rent-package");
  tamboon.style.display = "none";
  temple.style.display = "none";
  packages.style.display = "none";
  payment.style.display = "none";
  water.style.display = "none";
  sangkatarn.style.display = "none";
  lottery.style.display = "none";
  forTemple.style.display = "none";
  lotteryNumber.style.display = "none";
  rentmonk.style.display = "none";
}

function backTo(page) {
  var tamboon = document.getElementById("tamboon-select");
  var temple = document.getElementById("temple-select-section");
  var packages = document.getElementById("package-select-section");
  var payment = document.getElementById("payment-section");
  if (page === "region") {
    displayAllNone();
    regionSelected = "";
    tamboon.style.display = "grid";
    document.getElementById("tamboon-title").innerHTML =
      "เลือกภูมิภาคที่ท่านสนใจ";
    regionClick = false;
    templeClick = false;
    packageClick = false;
    document.getElementById("buttonTemple").classList.add("gray-text");
    document.getElementById("buttonPackage").classList.add("gray-text");
    document.getElementById("buttonDonate").classList.add("gray-text");
  } else if (page === "temple") {
    if (regionClick) {
      displayAllNone();
      templeClick = false;
      packageClick = false;
      document.getElementById("buttonPackage").classList.add("gray-text");
      document.getElementById("buttonDonate").classList.add("gray-text");
      temple.style.display = "grid";
      document.getElementById("tamboon-title").innerHTML =
        "เลือกวัดที่ท่านต้องการ";
    }
  } else if (page === "package") {
    if (regionClick && templeClick) {
      displayAllNone();
      packageClick = false;
      document.getElementById("buttonDonate").classList.add("gray-text");
      packages.style.display = "inherit";
      document.getElementById("tamboon-title").innerHTML =
        "เลือกแพคเกจที่ท่านต้องการ";
    }
  }
}

function searchEngine() {
  var keyword = document
    .getElementById("keywordSearch")
    .value.toUpperCase()
    .trim();

  showTemples(keyword);
}

function sumAmount() {
  var waterAmount = $(".water-amount").val() || 0;
  var electricAmount = $(".electric-amount").val() || 0;

  var totalAmount = parseFloat(waterAmount) + parseFloat(electricAmount);

  $(".total-amount").text(totalAmount);
}
