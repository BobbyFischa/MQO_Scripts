// ==UserScript==
// @name         MidenQuest - Chat Tabber
// @version      1.0.0
// @description  MidenQuest - Tab through chats
// @author       Ryalane/Bobby
// @include      http://www.midenquest.com/Game.aspx
// @include      http://midenquest.com/Game.aspx
// @grant        GM_xmlhttpRequest
// ==/UserScript==/*

var _Chat = _Chat || {};
_Chat.ShiftKey = false;
_Chat.CurrentTab = 1;

_Chat.NextTab = function (Forward) {
    var NextTab = 1;
    var CurrentTabID = $('.TabSel').prop('id');

    var CurrentTab = CurrentTabID[CurrentTabID.length -1];
    if(CurrentTab < 1 || CurrentTab > 5){
        ChangeChatChannel(1);
        _Chat.CurrentTab = 1;
        console.log('ERROR - CurrentTab < 1 || CurrentTab > 5 ' + CurrentTab);
    }
    else
    {
        if(Forward){
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
        }
        else{
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
        }

        ChangeChatChannel(NextTab);
        _Chat.CurrentTab = NextTab;
    }
};

$(document).on('keyup keydown', function(e){_Chat.ShiftKey = e.shiftKey;}); // Detect shift press

$( document ).keydown(function(e) { // Handle tabbing / shift tabbing
    var keycode = (e.which) ? e.which : e.keyCode;
    if(_Chat.ShiftKey && keycode == 9){
        _Chat.NextTab(false);
        e.preventDefault();
    }
    else if (keycode == 9)
    {
        _Chat.NextTab(true);
        e.preventDefault();
    }
});
