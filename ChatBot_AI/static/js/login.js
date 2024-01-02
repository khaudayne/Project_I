
$('#loginBtn').click(function () {
    var username = $('#inputUser').val();
    var password = $('#inputPassw').val();
    var req = {username : username, password : password}
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:5000/login",
        data: req,
        success: function (data){     
            if(data['data'].length == 0){
                $('#srcTitleDiv span').html(data['msg']);
                $('.fullscreen').css('display', 'flex');
            }else{
                $('.screen').css('display', 'none');
                $('.chatView').css('display', 'block');
                $('#textInput').focus();
                prepareTitleAndUsername(data['data']['username'], data['data']['list_title'])
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

function prepareTitleAndUsername(username, listTitle){
    $('.nameUserLogined').html(username);
    for(var i = 0; i < listTitle.length; i++){
        var buttonHtml = '<button class="listTitleBtn" data-hidden-id='
        buttonHtml += listTitle[i][1] + '>' + listTitle[i][0] + '</button>';
        $('.listTitle').append(buttonHtml);
    }
    $('.listTitleBtn').on("click", function(){
        var hiddenId = $(this).data("hidden-id");
        getContentChatBox(hiddenId)
    });
}

function getContentChatBox(id_title){
    if(id_title == "0"){
        return;
    }
    var req = {id_title: id_title}
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:5000/content",
        data: req,
        success: function (data){     
            console.log(data);
        }
    });
}
