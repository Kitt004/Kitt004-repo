// ==UserScript==
// @name         Trello Card Color Changer
// @version      1.0
// @description  Add color backgrounds to Trello cards.
// @author       Kitt004
// @homepageURL  https://github.com/Kitt004
// @include      https://trello.com/*
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// @grant        none
// ==/UserScript==

$(document).ready(function() {

    var darkred   = '#a61c00',
        red       = '#e06666',
        orange    = '#f6b26b',
        yellow    = '#ffd966',
        green     = '#93c47d',
        cyan      = '#45818e',
        blue      = '#6fa8dc',
        darkblue  = '#3d85c6',
        violet    = '#674ea7',
        magenta   = '#a64d79',
        black     = '#333333',
        dark      = '#666666',
        white     = '#ffffff';

    $.expr[":"].contains = $.expr.createPseudo(function(arg) {
        return function( elem ) {
            return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
        };
    });

    $('body').hover(function() {

    console.log('Hey! Trello color cards script is running...');
    console.log('Colors loaded!');
      
        $("textarea:contains('1')")
        .css('color', white)
        .parents('.list').css('background', black)
        .addClass('js-dark-list');
      
        $("textarea:contains('2')")
        .parents('.list').css('background', red);
      
        $("textarea:contains('3')")
        .parents('.list').css('background', orange);
      
        $("textarea:contains('4')")
        .css('color', black)
        .parents('.list').css('background', yellow);
      
        $("textarea:contains('5')")
        .parents('.list').css('background', green);
      
        $("textarea:contains('6')")
        .css('color', white)
        .parents('.list').css('background', darkblue)
        .addClass('js-dark-list');
      
        $("textarea:contains('7')")
        .css('color', white)
        .parents('.list').css('background', violet)
        .addClass('js-dark-list');

        $("textarea:contains('8')")
        .css('color', white)
        .parents('.list').css('background', magenta)
        .addClass('js-dark-list');

        $("textarea:contains('9')")
        .css('color', white)
        .parents('.list').css('background', dark)
        .addClass('js-dark-list');
      
    });

});
