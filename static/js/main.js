// Change color for StickyNav
let doc = document;
let bod = doc.body;
let htm = doc.documentElement;

addEventListener("load", function () {
  addEventListener("scroll", function () {
    doc.getElementById("sticky__nav").style.backgroundColor =
      htm.scrollTop > 10 ? "#fff" : "transparent";
  });
});

// Sticky Navbar
window.onscroll = function () {
  myFunction();
};

let navbar = document.getElementById("sticky__nav");
let sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

// Shrink Navbar
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
    document.getElementById("sticky__nav").style.marginTop = "0px";
    document.querySelector(".number").style.color = "#131217";
    document.getElementById("phone__nav").style.marginTop = "5px";
    document.getElementById("mobile__nav--logo").style.marginTop = "5px";
    document.getElementById("btn__nav").style.marginTop = "35px";
  } else {
    document.getElementById("sticky__nav").style.marginTop = "60px";
    document.querySelector(".number").style.color = "#fff";
    document.getElementById("phone__nav").style.marginTop = "0px";
    document.getElementById("mobile__nav--logo").style.marginTop = "0px";
    document.getElementById("btn__nav").style.marginTop = "0px";
  }
}
