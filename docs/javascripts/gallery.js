document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("a.fancybox");
  images.forEach((image) => {
    image.setAttribute("data-fancybox", "gallery");
  });
  Fancybox.bind("[data-fancybox]", {
    // Your custom options
  });
});
