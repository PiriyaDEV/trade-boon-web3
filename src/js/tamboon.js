function regionSelect(region) {
    var tamboon = document.getElementById("tamboon-select");
    var temple = document.getElementById("temple-select-section");
    var package = document.getElementById("package-select-section");

    tamboon.style.display = "none";
    temple.style.display = "grid";
    package.style.display = "none";
    
    document.getElementById("tamboon-title").innerHTML = "เลือกวัดที่ท่านต้องการ";
  }

  function packageSelect() {
    var tamboon = document.getElementById("tamboon-select");
    var temple = document.getElementById("temple-select-section");
    var package = document.getElementById("package-select-section");

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

    tamboon.style.display = "none";
    temple.style.display = "none";
    package.style.display = "none";
    forTemple.style.display = "flex"

    selectedPackage.style.display = "grid";

    if(packageName === "water-package"){
      payment.style.display = "flex";
      document.getElementById("tamboon-title").innerHTML = "ทำบุญค่าน้ำ / ค่าไฟ";
    }
    else if(packageName === "sangkatarn-package"){
      payment.style.display = "none";
      document.getElementById("tamboon-title").innerHTML = "ทำบุญค่าน้ำ / ค่าไฟ";
    }
    else{
      document.getElementById("tamboon-title").innerHTML = "ทำบุญค่าน้ำ / ค่าไฟ";
    }
  }
function backTo(page) {
  var tamboon = document.getElementById("tamboon-select");
  var temple = document.getElementById("temple-select-section");
  var package = document.getElementById("package-select-section");
  var payment = document.getElementById("payment-section");
  if(page === "region") {
    tamboon.style.display = "none";
    temple.style.display = "none";
    package.style.display = "none";
    payment.style.display = "none";
    document.getElementById("tamboon-title").innerHTML = "เลือกภูมิภาคที่ท่านสนใจ";
  } else if (page === "temple") {
    tamboon.style.display = "none";
    temple.style.display = "grid";
    package.style.display = "none";
    payment.style.display = "none";
    document.getElementById("tamboon-title").innerHTML = "เลือกวัดที่ท่านต้องการ";
  } else if (page === "package") {
    tamboon.style.display = "none";
    temple.style.display = "none"; 
    package.style.display = "inherit";
    payment.style.display = "none";
    document.getElementById("tamboon-title").innerHTML = "เลือกแพคเกจที่ท่านต้องการ";
  } else {

  }
}