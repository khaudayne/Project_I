$(document).ready(function () {
    $('#inputUser').focus()
});
$('#loginBtn').click(function () {
    var username = $('#inputUser').val();
    var password = $('#inputPassw').val();
    var repassword = $('#reinputPassw').val();
    if(password != repassword){
        $('#srcTitleDiv span').html("Mật khẩu lặp lại không chính xác!");
        $('.fullscreen').css('display', 'flex');
        return;
    }
    var req = {"username" : username, "password" : password}
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:5000/register",
        data: req,
        success: function (data){     
            if(data['data'].length == 0){
                $('#srcTitleDiv span').html(data['msg']);
                $('.fullscreen').css('display', 'flex');
            }else{
                alert("Đăng ký thành công!");
                window.location.href = "http://127.0.0.1:5500/Python_exeee/ChatBot_AI/templates/index.html";
            }
        }
    });
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