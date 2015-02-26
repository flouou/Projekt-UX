$(document).ready(function(){
    $('#mapButtonRight').on('click',function(){
        $('#start').toggleClass('swipeToLeft100');
        $('#mapButtonRight').toggleClass('swipeTo0px');
        $('#mapButtonRight i').toggleClass('fa-globe');
        $('#mapButtonRight i').toggleClass('fa-bars');
        $('#map').toggleClass('swipeTo0px');
        $('#options').toggleClass('swipeTo100');
        //alert("Hello!");
    });
    /*$('body').on('swiperight',function(){
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
    });*/
    $('#body').on('swipeleft',function(){
        $(body).toggleClass('swipeToLeft');
    });
});