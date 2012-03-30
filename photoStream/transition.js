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

function illimited() {
  // simulate that is application is plug to a photostream
  var photoStream = Array(
    'http://farm2.staticflickr.com/1028/1389775699_6389630398.jpg',
    'http://farm3.staticflickr.com/2367/1799905815_1099687d90.jpg',
    'http://farm2.staticflickr.com/1088/1391834001_a923c71555.jpg',
    'http://farm2.staticflickr.com/1260/646428920_3114d2bf59.jpg'
  );
  add(photoStream[Math.floor(Math.random()*photoStream.length)]);

  setTimeout(illimited, 4000);
}

function addStack (psSrc) {
  var iStackWidth = 800,
      iTotalWidth = 1200,
      lsImgTag, liImgWidth, liMarginLeft, gap;

  // append the new image at the end of items div
  lsImgTag = '<img src="' + psSrc +
    '" alt="query image"' +
    'style="margin-left:400px"' +
    '/>';
  $('.items').append(lsImgTag);

  // after webkit transition
  $('.items img:last').bind('webkitTransitionEnd', moveStack);

  // set timeout to force the redraw
  setTimeout( function() {
    $('.items img:last').css('margin-left', '0px');
  }, 0);

  // Set the value of the first image margin-left
  //liImgWidth = $('.items img:last').width();
  //$('.items img:first').css('margin-left', '-' + liImgWidth + 'px');
}

function moveStack(e, piL) {
  var liLastImgWidth, liFirstMarginLeft, gap, reste,
      liFirstImgWidth;

if(piL == undefined){
  piL = 0;
}
  liFirstImgWidth = $('.items img:first').width();
  liLastImgWidth = $('.items img:last').width() - piL;
  liFirstMarginLeft = parseInt($('.items img:first').css('margin-left'), 10);
  gap = liFirstMarginLeft - liLastImgWidth; //negatif
  reste = liFirstImgWidth + liFirstMarginLeft; //positif

  if( liLastImgWidth <= reste ){
    // Cas simple
    $('.items img:first').css('margin-left', + gap + 'px');

    $('.items img:last').unbind('webkitTransitionEnd', moveStack);
  }
  else{
    // il faut reporter le decalage
      $('.items img:last').unbind('webkitTransitionEnd', moveStack);
      $('.items img:first').css('margin-left', '-' + liFirstImgWidth + 'px');

      setTimeout( function() {
        moveStack(e, reste);
      }, 1000);
  }
}

function removeFirstImage () {
  var w = $('.items img:first').width(),
      m = parseInt($('.items img:first').css('margin-left'), 10);
  console.log("w : " + w + " m : " + m);

  // if the width is inferior than margin-left
  if( w <= (-1)*m ){
    $('.items img:first').remove();
    $('.items img:first').bind('webkitTransitionEnd',
      function (e) {
        removeFirstImage();
      }
    );
  }

}
