$(".x").click(function() {
  $(".x").removeClass("open");
  $(".product").removeClass("open");
  rotateSpeed = -0.1;
  $('.product').scrollTop(0);
  fx.setText(phrases[0]).then(() => {
  });
});

$(".collection-1").click(function() {
  rotateSpeed = 0;
  $(".product-1").addClass("open");
  $(".x").addClass("open");
});

$(".collection-2").click(function() {
  rotateSpeed = 0;
  $(".product-2").addClass("open");
  $(".x").addClass("open");
});

$(".collection-3").click(function() {
  rotateSpeed = 0;
  $(".product-3").addClass("open");
  $(".x").addClass("open");
});

$(".collection-4").click(function() {
  rotateSpeed = 0;
  $(".product-4").addClass("open");
  $(".x").addClass("open");
});

$( '#box' ).on( 'mousewheel DOMMouseScroll', function ( e ) {
    this.scrollTop = 0;
    e.preventDefault();
});
