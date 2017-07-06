document.addEventListener("DOMContentLoaded", function() {
"use strict";


  document.getElementById("accordion").addEventListener('click', function () { //lets make an accordian with some info
    var fa = document.getElementById("fa");
    var x;
    var panel = document.getElementById("panel");
    
    if (fa.classList.contains('fa-caret-square-o-down') ) {
      fa.classList.remove('fa-caret-square-o-down');
      fa.classList.add('fa-caret-square-o-up');
      panel.style.visibility = "visible";
      panel.style.opacity = 1;
  } else {
    fa.classList.remove('fa-caret-square-o-up');
    fa.classList.add("fa-caret-square-o-down");
    panel.style.visibility = "hidden";
    panel.style.opacity = 0;
  }


  });

});