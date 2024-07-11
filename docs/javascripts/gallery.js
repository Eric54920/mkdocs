document.addEventListener("DOMContentLoaded", function () {
  // 处理所有照片
  const images = document.querySelectorAll("a.fancybox-gallery");
  images.forEach((image) => {
    image.setAttribute("data-fancybox", "gallery");
  });
  Fancybox.bind("[data-fancybox]", {
    // Your custom options
  });

  // 处理视频
  const players = Plyr.setup('.js-player');
});
