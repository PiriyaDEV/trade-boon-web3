  let regionSelected = "";
  let templeSelected = "";

  function initTemple() {
    $.getJSON('../data/temple.json', function(data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (i = 0; i < data.length; i ++) {
        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('img').attr('src', data[i].picture);
        petTemplate.find('.pet-breed').text(data[i].breed);
        petTemplate.find('.pet-age').text(data[i].age);
        petTemplate.find('.pet-location').text(data[i].location);
        petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

        petsRow.append(petTemplate.html());
      }
    });
  }

  function regionSelect(region) {
    var tamboon = document.getElementById("tamboon-select");
    var temple = document.getElementById("temple-select-section");
    var package = document.getElementById("package-select-section");
    regionSelected = region;
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

    document.getElementById("tamboon-title").innerHTML = "เลือกแพคเกจที่ท่านต้องการ";
  }

  function donatePackage(packageName){
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
    forTemple.style.display = "flex"

    if(packageName === "water-package"){
      selectedPackage.style.display = "grid";
      payment.style.display = "flex";
      document.getElementById("tamboon-title").innerHTML = "ทำบุญค่าน้ำ / ค่าไฟ";
    }
    else if(packageName === "sangkatarn-package"){
      selectedPackage.style.display = "grid";
      payment.style.display = "none";
      document.getElementById("tamboon-title").innerHTML = "เลือกสังฆทานที่ท่านต้องการ";
    }
    else if(packageName === "lottery-package"){
      selectedPackage.style.display = "flex";
      payment.style.display = "none";
      lotteryNumber.style.display = "inherit"
      document.getElementById("tamboon-title").innerHTML = "เลือกจำนวนเลขเด็ดที่ท่านต้องการ";
    }
    else{
      selectedPackage.style.display = "grid";
      payment.style.display = "none";
      document.getElementById("tamboon-title").innerHTML = "เลือกพระที่ท่านต้องการเช่า";
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
    alert(regionSelected);
    displayAllNone();
    var tamboon = document.getElementById("tamboon-select");
    var temple = document.getElementById("temple-select-section");
    var package = document.getElementById("package-select-section");
    var payment = document.getElementById("payment-section");
    if(page === "region") {
      regionSelected = ""
      tamboon.style.display = "grid";
      document.getElementById("tamboon-title").innerHTML = "เลือกภูมิภาคที่ท่านสนใจ";
    } else if (page === "temple") {
      temple.style.display = "grid";
      document.getElementById("tamboon-title").innerHTML = "เลือกวัดที่ท่านต้องการ";
    } else if (page === "package") {
      package.style.display = "inherit";
      document.getElementById("tamboon-title").innerHTML = "เลือกแพคเกจที่ท่านต้องการ";
    } else {
      donatePackage()
    }
  }
