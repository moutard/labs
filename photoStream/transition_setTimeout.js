function add(psSrc) {

  // append the new image at the end of items div
  var lsImgTag = '<img src="' + psSrc + '" alt="query image" />';
  $('.items').append(lsImgTag);
  
  // Set the value of the first image margin-left
  var liImgWidth = $('.items img:first').width();
  $('.items img:first').css('margin-left', '-' + liImgWidth + 'px');

  // Wait for the end of animation to remove the first image
  setTimeout(function () {
    $('.items img:first').remove();
  }, 1200); // if you change the time of the transition you should change this value to.

}
