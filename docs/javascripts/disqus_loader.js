document.addEventListener("DOMContentLoaded", function () {
  var disqus_shortname = "{{ config.extra.disqus_shortname }}";
  var script = document.createElement("script");
  script.src = "https://" + disqus_shortname + ".disqus.com/embed.js";
  script.setAttribute("data-timestamp", +new Date());
  (document.head || document.body).appendChild(script);
});
