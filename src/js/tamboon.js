function regionSelect() {
    var x = document.getElementById("tamboon-select");
    var y = document.getElementById("temple-select-section");

    x.style.display = "none";
    y.style.display = "grid";
    
    document.getElementById("tamboon-title").innerHTML = "เลือกวัดที่ท่านต้องการ";
  }

  function packageSelect() {
    var x = document.getElementById("tamboon-select");
    var y = document.getElementById("temple-select-section");

    x.style.display = "none";
    y.style.display = "none";

    document.getElementById("tamboon-title").innerHTML = "เลือกแพคเกจที่ท่านต้องการ";
  }