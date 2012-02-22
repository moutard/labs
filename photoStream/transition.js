'use strict';

function add(psSrc) {

  // jsLint : declare all the variables at the beginning of the functions
  var lsImgTag, liImgWidth;

  // append the new image at the end of items div
  lsImgTag = '<img src="' + psSrc + '" alt="query image" />';
  $('.items').append(lsImgTag);

  // Set the value of the first image margin-left
  liImgWidth = $('.items img:first').width();
  $('.items img:first').css('margin-left', '-' + liImgWidth + 'px');

  // Wait for the end of animation to remove the first image
  $('.items img:last').bind('webkitTransitionEnd',
    function (e) {
      $('.items img:first').remove();
    }
  );

}
