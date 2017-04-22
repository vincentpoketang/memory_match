//Functionality
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var is_timeout_done = true;
//Stats
var attempts = 0;
var accuracy = 0;
var games_played = 0;
function display_stats(){
    $('.games_played .value').text(games_played);
    $('.matches .value').text(match_counter);
    $('.attempts .value').text(attempts);
    $('.accuracy .value').text(Math.round(accuracy*100)+'%');
}
function reset_stats(){
    accuracy = 0;
    attempts = 0;
    match_counter = 0;
    display_stats();
}

function card_clicked(element){
    //show card face
    $(element).find('.front').before($(element).find('.back'));
    $(element).find('.front').removeClass('transparent');
    if(first_card_clicked===null){ // Add to first_card_clicked if nothing inside
        first_card_clicked = $(element);
    }
    else{ // Add to seond_card_clicked
        second_card_clicked = $(element);
        attempts++;
        if($(first_card_clicked).find('.front').find('img').attr('src') === $(second_card_clicked).find('.front').find('img').attr('src')){ // compare front of two card together and if true match stuff
            match_counter++;
            accuracy = match_counter/attempts;
            first_card_clicked = null;
            second_card_clicked = null;
            display_stats();
            if(match_counter === total_possible_matches){ // check for overall win
                setTimeout(function(){
                    alert("You win!");
                }, 500);
            }
        }
        else{ // Cards does not match, reset stuff
            accuracy = match_counter/attempts;
            display_stats();
            is_timeout_done = false;
            setTimeout(function(){
                $(first_card_clicked).find('.back').before($(first_card_clicked).find('.front'));
                $(second_card_clicked).find('.back').before($(second_card_clicked).find('.front'));
                $(first_card_clicked).find('.front').addClass("transparent");
                $(second_card_clicked).find('.front').addClass("transparent");
                first_card_clicked = null;
                second_card_clicked = null;
                is_timeout_done = true;
            }, 2000);
        }
    }
}
function randomize_cards(){
    var cards = $('.position');
    for(var i = 0; i<cards.length; i++){
        var target = Math.floor(Math.random() * cards.length -1) + 1;
        var target2 = Math.floor(Math.random() * cards.length -1) + 1;
        cards[target].before(cards[target2]);
    }
}
function creating_div_block(front,front_image){
    var positioning_div = $('<div>',{
        class: 'position col-xs-2'
    });
    var card_div = $('<div>',{
        class: 'card'
    });
    var front_div = $('<div>',{
        class: front
    });
    var front_img = $('<img>',{
        src: front_image
    });
    var back_div = $('<div>',{
        class: 'back'
    });
    var back_img = $('<img>',{
        src: 'images/pokemon_back.png'
    });
    back_div.append(back_img);
    front_div.append(front_img);
    card_div.append(front_div,back_div);
    positioning_div.append(card_div);
    $('#game-area').append(positioning_div);
}
function change_border_color(id,color){
    $(id).css("border-color",color);
}
function all_buttons_hover(){
    $('#setting img').mouseover(function(){
        change_border_color(this,'#fff335');
    });
    $('#setting img').mouseout(function(){
        change_border_color(this,'#0b6fa4');
    });
    $('#about img').mouseover(function(){
        change_border_color(this,'#fff335');
    });
    $('#about img').mouseout(function(){
        change_border_color(this,'#0b6fa4');
    });
}
function grass_move_when_hover(){
    var isAnimated = false;
    $('.card').mouseover(function(){
        if(!isAnimated && $(this).find('.front').hasClass('transparent')){
            isAnimated = true;
            $(this).find('.back').animate({ "left": "+=3px"}, "fast" );
            $(this).find('.back').animate({ "left": "-=3px" }, "fast" );
        }
        isAnimated = false;
    })
}
$(document).ready(function(){
    creating_div_block('front height_50px transparent','images/bulbasaur.gif');
    creating_div_block('front height_50px transparent','images/bulbasaur.gif');
    creating_div_block('front transparent','images/charmander.gif');
    creating_div_block('front transparent','images/charmander.gif');
    creating_div_block('front height_50px transparent','images/squirtle.gif');
    creating_div_block('front height_50px transparent','images/squirtle.gif');
    creating_div_block('front transparent','images/chikorita.gif');
    creating_div_block('front transparent','images/chikorita.gif');
    creating_div_block('front height_40px transparent','images/cyndaquil.gif');
    creating_div_block('front height_40px transparent','images/cyndaquil.gif');
    creating_div_block('front transparent','images/totodile.gif');
    creating_div_block('front transparent','images/totodile.gif');
    creating_div_block('front transparent','images/treecko.gif');
    creating_div_block('front transparent','images/treecko.gif');
    creating_div_block('front transparent','images/torchic.gif');
    creating_div_block('front transparent','images/torchic.gif');
    creating_div_block('front transparent','images/mudkip.gif');
    creating_div_block('front transparent','images/mudkip.gif');
    grass_move_when_hover();
    display_stats();
    randomize_cards();
    $('.card').click(function(){
        if($(this).find('.front').hasClass('transparent') && is_timeout_done){
            card_clicked(this);
        }
    });
    all_buttons_hover();
    $('.reset').click(function(){
        if(attempts!==0){
            games_played++;
            reset_stats();
            var cards = $('.card');
            for(var i=0;i<cards.length;i++){
                $(cards[i]).find('.back').before($(cards[i]).find('.front'));
            }
            $('.front').addClass('transparent');
            randomize_cards();
        }
    })
});