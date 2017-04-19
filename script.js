//Functionality
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
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
    $(element).find('.front').removeClass('transparent');
    if(first_card_clicked===null){
        first_card_clicked = $(element);
    }
    else{
        second_card_clicked = $(element);
        attempts++;
        if($(first_card_clicked).find('.front').find('img').attr('src') === $(second_card_clicked).find('.front').find('img').attr('src')){
            match_counter++;
            accuracy = match_counter/attempts;
            first_card_clicked = null;
            second_card_clicked = null;
            display_stats();
            if(match_counter === total_possible_matches){
                setTimeout(function(){
                    alert("You win!");
                }, 500);
            }
        }
        else{
            accuracy = match_counter/attempts;
            display_stats();
            setTimeout(function(){
                $(first_card_clicked).find('.front').addClass("transparent");
                $(second_card_clicked).find('.front').addClass("transparent");
                first_card_clicked = null;
                second_card_clicked = null;
            }, 1000);
        }
    }
}
$(document).ready(function(){
    display_stats();
    $('.card').click(function(){
        card_clicked(this);
    });
    $('.reset').click(function(){
        games_played++;
        reset_stats();
        $('.front').addClass('transparent');
    })
});