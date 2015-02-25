$(document).ready(function(){
    $('#globe-button').on('click',function(){
        $('.sidebar-left').toggleClass('left-show');
        $('#menu-button').fadeIn();
    });
    
    $('#menu-button').on('click',function(){
        $('.sidebar-left').toggleClass('left-show');
        $('#menu-button').fadeOut();
    });
    
    $('.sidebar-left').on('swipeleft',function(){
        $('.sidebar-left').removeClass('left-show');
        $('#menu-button').fadeIn();
    });
    
    $('.content').on('swiperight',function(){
        $('.sidebar-left').addClass('left-show');
        $('#menu-button').fadeOut();
    });
});