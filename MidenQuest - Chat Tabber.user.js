// ==UserScript==
// @name         MidenQuest - Chat Tabber
// @version      1.0.0
// @description  MidenQuest - Tab through chats
// @author       Bobby
// @include      http://www.midenquest.com/Game.aspx
// @include      http://midenquest.com/Game.aspx
// @grant        GM_xmlhttpRequest
// ==/UserScript==/*

var _Chat = _Chat || {};
_Chat.ShiftKey = false;
_Chat.CurrentTab = 1;
_Chat.Next = 0;

_Chat.NextTab = function (Right) {
    if(Right){ // Tab to the right
        // Kingdom Chat was added out of order. Tabbing left to right -> 1, 2, 5, 3, 4
        if     (_Chat.CurrentTab == 1){_Chat.Next = 2;}
        else if(_Chat.CurrentTab == 2){_Chat.Next = 5;}
        else if(_Chat.CurrentTab == 5){_Chat.Next = 3;}
        else if(_Chat.CurrentTab == 3){_Chat.Next = 4;}
        else if(_Chat.CurrentTab == 4){_Chat.Next = 1;}
        else                          {_Chat.Next = 1;}
    }
    else{ // Tab to the left
        // Kingdom Chat was added out of order. Tabbing right to left -> 4, 3, 5, 2, 1
        if     (_Chat.CurrentTab == 4){_Chat.Next = 3;}
        else if(_Chat.CurrentTab == 3){_Chat.Next = 5;}
        else if(_Chat.CurrentTab == 5){_Chat.Next = 2;}
        else if(_Chat.CurrentTab == 2){_Chat.Next = 1;}
        else if(_Chat.CurrentTab == 1){_Chat.Next = 4;}
        else                          {_Chat.Next = 1;}
    }

    ChangeChatChannel(_Chat.Next);
    _Chat.CurrentTab = _Chat.Next;
};

$(document).on('keyup keydown', function(e){_Chat.ShiftKey = e.shiftKey;}); // Detect shift press

$( document ).keydown(function(e) { // Handle tabbing / shift tabbing
    var keycode = (e.which) ? e.which : e.keyCode;
    
    if(keycode == 9){
        _Chat.NextTab(!_Chat.ShiftKey); // Shift == true, tab left. false -> right
        e.preventDefault();
    }
});

$("#ChatCh1").click(function () {
    if (_Chat.CurrentTab != 1) {
        _Chat.CurrentTab = 1;
        ChangeChatChannel(1);
    }
});
$("#ChatCh2").click(function () {
    if (_Chat.CurrentTab != 2) {
        _Chat.CurrentTab = 2;
        ChangeChatChannel(2);
    }
});
$("#ChatCh3").click(function () {
    if (_Chat.CurrentTab != 3) {
        _Chat.CurrentTab = 3;
        ChangeChatChannel(3);
    }
});
$("#ChatCh4").click(function () {
    if (_Chat.CurrentTab != 4) {
        _Chat.CurrentTab = 4;
        ChangeChatChannel(4);
    }
});
$("#ChatCh5").click(function () {
    if (_Chat.CurrentTab != 5) {
        _Chat.CurrentTab = 5;
        ChangeChatChannel(5);
    }
});
