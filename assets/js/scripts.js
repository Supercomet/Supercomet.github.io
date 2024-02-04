function showPreview(imageSrc, clickedThumbnail) {
    var previewImage = document.getElementById('preview-image');
    previewImage.src = imageSrc;

    // Remove border from all thumbnails
    var thumbnails = document.querySelectorAll('.thumbnails img');
    thumbnails.forEach(function(thumbnail) {
        thumbnail.style.border = 'none';
    });

    // Add border to the clicked thumbnail
    clickedThumbnail.style.border = '4px solid grey';
}


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