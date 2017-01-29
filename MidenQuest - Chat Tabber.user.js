// ==UserScript==
// @name         MidenQuest - Chat Tabber
// @namespace    https://github.com/BobbyFischa/MQO_Scripts.git
// @version      1.0.0
// @description  MidenQuest - Tab through chats
// @author       Ryalane/Bobby
// @include      http://www.midenquest.com/Game.aspx
// @include      http://midenquest.com/Game.aspx
// @grant        GM_xmlhttpRequest
// ==/UserScript==/*

var _Chat = _Chat || {};
_Chat.MessageHistory = [];
_Chat.MessageHistoryLength = 0;
_Chat.TabNames = ["Public", "Help", "Kingdom", "Recruit", "Trade"];
_Chat.UnreadMessages = [0, 0, 0, 0, 0];
_Chat.CurrentTab = 0;
_Chat.ShiftKey = false;

_Chat.ResetTab = function (tabID) {
    _Chat.UnreadMessages[tabID - 1] = 0;
    var TabText = $('#ChatName' + tabID).text();
    $('#ChatName' + tabID).text(_Chat.TabNames[tabID - 1]);
};

_Chat.Clear = function () {
    $('#ChatLog').empty();
};

_Chat.NextTab = function () {
    var CurrentTabID = $('.TabSel').prop('id');
    var CurrentTab = CurrentTabID[CurrentTabID.length -1];
    var NextTab;

    // Kingdom Chat was added out of order. Tabbing left to right -> 1, 2, 5, 3, 4
    if (CurrentTab == 1){
        NextTab = 2;
    }
    else if(CurrentTab == 2){
        NextTab = 5;
    }
    else if(CurrentTab == 5){
        NextTab = 3;
    }
    else if(CurrentTab == 3){
        NextTab = 4;
    }
    else if(CurrentTab == 4){
        NextTab = 1;
    }
    else{ // Seems to get stuck in trade/public sometimes. This will reset the tab to public
        NextTab = 1;
    }
    
    ChangeChatChannel(NextTab);
    _Chat.Clear();
    _Chat.ResetTab(NextTab);
    _Chat.CurrentTab = NextTab;
};

_Chat.PrevTab = function () {
    var CurrentTabID = $('.TabSel').prop('id');
    var CurrentTab = CurrentTabID[CurrentTabID.length -1];
    var NextTab;

    // Kingdom Chat was added out of order. Tabbing right to left -> 4, 3, 5, 2, 1
    if (CurrentTab == 4){
        NextTab = 3;
    }
    else if(CurrentTab == 3){
        NextTab = 5;
    }
    else if(CurrentTab == 5){
        NextTab = 2;
    }
    else if(CurrentTab == 2){
        NextTab = 1;
    }
    else if(CurrentTab == 1){
        NextTab = 4;
    }
    else{
        NextTab = 1;
    }
    
    ChangeChatChannel(NextTab);
    _Chat.Clear();
    _Chat.ResetTab(NextTab);
    _Chat.CurrentTab = NextTab;
};

$(document).on('keyup keydown', function(e){_Chat.ShiftKey = e.shiftKey;}); // Detect shift press

$( document ).keydown(function(e) {
    var keycode = (e.which) ? e.which : e.keyCode;
    if(_Chat.ShiftKey && keycode == 9){
        _Chat.PrevTab();
        e.preventDefault();
    }
    else if (keycode == 9)
    {
        _Chat.NextTab();
        e.preventDefault();
    }
});

$("#ChatCh1").click(function () {
    if (_Chat.CurrentTab != 1) {
        _Chat.CurrentTab = 1;
        ChangeChatChannel(1);
        _Chat.Clear();
        _Chat.ResetTab(1);
    }
});
$("#ChatCh2").click(function () {
    if (_Chat.CurrentTab != 2) {
        _Chat.CurrentTab = 2;
        ChangeChatChannel(2);
        _Chat.Clear();
        _Chat.ResetTab(2);
    }
});
$("#ChatCh3").click(function () {
    if (_Chat.CurrentTab != 3) {
        _Chat.CurrentTab = 3;
        ChangeChatChannel(3);
        _Chat.Clear();
        _Chat.ResetTab(3);
    }
});
$("#ChatCh4").click(function () {
    if (_Chat.CurrentTab != 4) {
        _Chat.CurrentTab = 4;
        ChangeChatChannel(4);
        _Chat.Clear();
        _Chat.ResetTab(4);
    }
});
$("#ChatCh5").click(function () {
    if (_Chat.CurrentTab != 5) {
        _Chat.CurrentTab = 5;
        ChangeChatChannel(5);
        _Chat.Clear();
        _Chat.ResetTab(5);
    }
});