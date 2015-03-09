$(document).ready(function(){
    $('.menu-button').on('click',function(){
        $('ul').toggleClass('showMenu');
        $('.main').toggleClass('slideBody');
        $('.main').toggleClass('no-scroll');
        $('.shadow').fadeToggle("fast","linear");
    });
    $('body').on('swiperight',function(){
        $('ul').addClass('showMenu');
        $('.main').addClass('slideBody');
        $('.main').addClass('no-scroll');
        $('.shadow').fadeIn("fast","linear");
    });
    $('.shadow').on('click',function(){
        $('ul').toggleClass('showMenu');
        $('.main').toggleClass('slideBody');
        $('.main').toggleClass('no-scroll');
        $('.shadow').fadeToggle("fast","linear");
    });
    $('body').on('swipeleft',function(){
        $('ul').removeClass('showMenu');
        $('.main').removeClass('slideBody');
        $('.main').removeClass('no-scroll');
        $('.shadow').fadeOut("fast","linear");
    });
});