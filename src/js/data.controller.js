function fetchTemples() {
  $.getJSON("../../data/temples.json", function (temples) {
    
    return temples;
  });
}