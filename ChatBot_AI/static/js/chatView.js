// Viết lại xử lý bằng hàm trim() cho các dataset!
$(document).ready(function () {
    updateWindowDimensions();
    $('#textInput').attr('placeholder', "Ask something!\nType >>?help to get support from system!");
    $('#inputUser').focus();
});

function getBotResponse() {
    $('#textInput').attr('readonly', true);
    $('#textInput').attr('placeholder', "Give me a second!");
    var rawText = $("#textInput").val();
    var userHtml = '<div class="userText">';
    var brHtml = '<div >';
    var concatData = rawText.split('\n');
    rawText = "";
    var index = 0;
    while (concatData[index].trim() == "") {
        index++;
    }
    brHtml += concatData[index].trim();
    rawText += concatData[index].trim();
    index++;
    for (; index < concatData.length; index++) {
        if (concatData[index].trim() != "") {
            brHtml += '<br>' + concatData[index].trim();
            rawText += "\n" + concatData[index].trim();
        }
    }
    brHtml += '</div>';
    userHtml += brHtml;
    userHtml += '</div>';
    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById('chatbox').scrollIntoView({ block: 'end', behavior: 'smooth' });


    // data = "hehe";
    // if(rawText == ">>?help"){
    //     data = "This is a notice that: help from system!"
    // }
    // var botHtml = '<div class="botText">';
    // var brHtml = '<div >';
    // var concatData = data.split('\n');
    // var index = 0;
    // while (concatData[index].trim() == "") {
    //     index++;
    // }
    // brHtml += concatData[index].trim();
    // index++;
    // for (; index < concatData.length; index++) {
    //     if (concatData[index].trim() != "") {
    //         brHtml += '<br>' + concatData[index].trim();
    //     }
    // }
    // brHtml += '</div>';
    // botHtml += brHtml;
    // botHtml += '</div>';
    // $("#chatbox").append(botHtml);
    // document.getElementById('chatbox').scrollIntoView({ block: 'end', behavior: 'smooth' });
    // $('#textInput').attr('readonly', false);
    // $('#textInput').attr('placeholder', "Ask something!\nType >>?help to get support from system!");
    if(rawText != ">>?help"){
        var req = {msg : rawText};
        $.ajax({
            type: "GET",
            url: "http://127.0.0.1:5000/get",
            data: req,
            success: function (data) {
                pullRespon(data);
            }
        });
    }else{
        var data = "This is guideline from system!";
        pullRespon(data);
    }
    $('#textInput').focus();
}
$("#buttonInput").click(function () {
    if ($("#textInput").val() == '') {
        return
    }
    getBotResponse();
})


$("#openUserDivBtn").click(function () {
    if ($("#openUserDivBtn").text() == ">") {
        $(".userDivChatView").css("left", "0px");
        $("#openUserDivBtn").css("left", "230px");
        $("#openUserDivBtn span").text("<");
    } else {
        $(".userDivChatView").css("left", "-220px");
        $("#openUserDivBtn").css("left", "10px");
        $("#openUserDivBtn span").text(">");
    }
})
function updateWindowDimensions() {
    if (window.innerWidth <= 1150) {
        $("#openUserDivBtn span").text(">");
        $(".userDivChatView").css("left", "-220px");
        $("#openUserDivBtn").css({
            'left': '10px',
            "display": "flex"
        });
        $(".title").css({
            'left': '0',
            'width': '100%',
            'justify-content': 'center',
            'padding-left': '0px',
        });
    } else {

        $("#openUserDivBtn").css({
            'left': '10px',
            "display": "none"
        });
        $(".userDivChatView").css("left", "0px");
        $(".title").css({
            'left': '220px',
            'width': 'calc(100% - 250px)',
            'padding-left': '20px',
            'justify-content': 'start'
        });
    }
}

function pullRespon(data){
    var botHtml = '<div class="botText">';
    var brHtml = '<div >';
    var concatData = data.split('\n');
    var index = 0;
    while (concatData[index].trim() == "") {
        index++;
    }
    brHtml += concatData[index].trim();
    index++;
    for (; index < concatData.length; index++) {
        if (concatData[index].trim() != "") {
            brHtml += '<br>' + concatData[index].trim();
        }
    }
    brHtml += '</div>';
    botHtml += brHtml;
    botHtml += '</div>';
    $("#chatbox").append(botHtml);
    document.getElementById('chatbox').scrollIntoView({ block: 'end', behavior: 'smooth' });
    $('#textInput').attr('readonly', false);
    $('#textInput').attr('placeholder', "Ask something!\nType >>?help to get support from system!");
}
window.addEventListener("resize", updateWindowDimensions);