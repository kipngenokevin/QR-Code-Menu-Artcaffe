document.getElementById("view-more").addEventListener("click", function() {
    var noteElement = document.getElementsByClassName("note")[0];
    var arrowElement = document.getElementById("view-more");
    
    if (noteElement.style.height === "" || noteElement.style.height === "0px") {
      noteElement.style.height = "auto";
      noteElement.style.padding = "20px";
    //noteElement.style.transition = "height ease 1s";
      arrowElement.innerHTML = "keyboard_arrow_up";
    } else {
      noteElement.style.height = "0px";
      noteElement.style.padding = "0px";
      arrowElement.innerHTML = "keyboard_arrow_down";
    }
  });
  