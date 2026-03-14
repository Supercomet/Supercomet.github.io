document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.gallery').forEach(function(gallery) {
    var preview = gallery.querySelector('#preview-image');
    var thumbnails = gallery.querySelectorAll('.thumbnails img');

    if (thumbnails[0]) thumbnails[0].classList.add('active');

    gallery.querySelector('.thumbnails').addEventListener('click', function(e) {
      var thumb = e.target.closest('img');
      if (!thumb) return;

      if (thumb.classList.contains('active')) return;

      thumbnails.forEach(function(t) { t.classList.remove('active'); });
      thumb.classList.add('active');

      preview.src = thumb.src;
      preview.alt = thumb.alt;
    });
  });
});


var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}