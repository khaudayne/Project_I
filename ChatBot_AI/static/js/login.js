$(document).ready(function () {
    $('#inputUser').focus()
});
$('#loginBtn').click(function () {
    $('.fullscreen').css('display', 'flex');
});
$('#closePopUpBtn').click(function () {
    $('.fullscreen').css('display', 'none');
});
$('#xBtn').click(function(){
    window.history.back();
});
$('#backBtn').click(function(){
    window.history.back();
});
