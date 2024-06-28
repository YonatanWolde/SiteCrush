const navLinks = document.getElementById('nav-links');
document.querySelector('.close').addEventListener("click", function () {
  navLinks.style.right = '-400px';
})

document.querySelector('.gg-menu').addEventListener("click", function () {
  navLinks.style.right = '0';
})