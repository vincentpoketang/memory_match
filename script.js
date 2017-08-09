//Functionality
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 18;
var match_counter = 0;
var is_timeout_done = true;
var music_on = true;
//Stats
var attempts = 0;
var accuracy = 0;
var games_played = 0;
function display_stats(){
    $('#games_played .value').text(games_played);
    $('#matches .value').text(match_counter);
    $('#attempts .value').text(attempts);
    $('#accuracy .value').text(Math.round(accuracy*100)+'%');
}
function reset_stats(){
    accuracy = 0;
    attempts = 0;
    match_counter = 0;
    display_stats();
}
function play_audio_sounds(audio_filename){
    var audio = new Audio(audio_filename+'.mp3');
    audio.play();
}
function card_clicked(element){
    //show card face
    $(element).find('.front').before($(element).find('.back'));
    $(element).find('.front').removeClass('transparent');
    if(first_card_clicked===null){ // Add to first_card_clicked if nothing inside
        first_card_clicked = $(element);
    }
    else{ // Add to second_card_clicked
        second_card_clicked = $(element);
        attempts++;
        if($(first_card_clicked).find('.front').find('img').attr('src') === $(second_card_clicked).find('.front').find('img').attr('src')){ // compare front of two card together and if true match stuff
            match_counter++;
            accuracy = match_counter/attempts;
            switch_img_of_matched_pokemon(first_card_clicked,second_card_clicked);
            if(pokemon_evolution_chart[$(first_card_clicked).find('.front').find('img').attr('src')]===undefined && pokemon_evolution_chart[$(second_card_clicked).find('.front').find('img').attr('src')]===undefined){
                var first_card_clicked_parent = $(first_card_clicked).parent();
                var second_card_clicked_parent = $(second_card_clicked).parent();
                first_card_clicked_parent.removeClass('unevolved').addClass('evolved');
                second_card_clicked_parent.removeClass('unevolved').addClass('evolved');
                is_timeout_done = false;
                setTimeout(function(){
                    if(match_counter !== total_possible_matches){
                        move_evolved_pokemon_to_end(first_card_clicked_parent,second_card_clicked_parent);
                        randomize_cards();
                        $('#info-box').append('<br>Every Pokemon ran into a different grass!');
                    }
                    is_timeout_done = true;
                }, 1000);
            }
            first_card_clicked = null;
            second_card_clicked = null;
            display_stats();
            if(match_counter === total_possible_matches){ // check for overall win
                $('#info-box').text("You win!");
                play_audio_sounds('winning-music');
            }
        }
        else{ // Cards does not match, reset stuff
            $('#info-box').text("That's not the same Pokemon!");
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
                $('#info-box').append("<br>They both ran back into their grass!");
                is_timeout_done = true;
            }, 2000);
        }
    }
}
function randomize_cards(){
    var cards = $('.unevolved');
    for(var i = 0; i<cards.length; i++){
        var target = Math.floor(Math.random() * cards.length -1) + 1;
        var target2 = Math.floor(Math.random() * cards.length -1) + 1;
        document.getElementById('game-area').insertBefore(cards[target2],cards[target]);
    }
}
function creating_div_block(front_image){
    var positioning_div = $('<div>',{
        class: 'position unevolved col-xs-2'
    });
    var card_div = $('<div>',{
        class: 'card'
    });
    var front_div = $('<div>',{
        class: 'front transparent'
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
function grass_move_when_hover(){
    var isAnimated = false;
    $('.card').mouseover(function(){
        if(!isAnimated && $(this).find('.front').hasClass('transparent')){
            if(music_on){
                play_audio_sounds('rustling-grass');
            }
            isAnimated = true;
            $(this).find('.back').animate({ "left": "+=3px"}, "fast" );
            $(this).find('.back').animate({ "left": "-=3px" }, "fast" );
        }
        isAnimated = false;
    });
}
function move_evolved_pokemon_to_end(first_card, second_card){
    $('#game-area').append(first_card,second_card);
    $('.evolved:nth-child(1)').empty();
    $('.evolved:nth-child(2)').empty();
}
function switch_img_of_matched_pokemon(first_card,second_card){ // Pretty much evolution function
    var card_img = $(first_card).find('.front').find('img').attr('src');
    var pre_evolution_card_img = card_img;
    // Change first and second card image to evolved state
    $(first_card).find('.front').find('img').attr('src', pokemon_evolution_chart[card_img]);
    $(second_card).find('.front').find('img').attr('src', pokemon_evolution_chart[card_img]);
    // Change height for evolution
    card_img = $(first_card).find('.front').find('img').attr('src');
    $('#info-box').text(pokemon_list[pre_evolution_card_img] +" evolved into " + pokemon_list[card_img] + "!");
    if(pokemon_evolution_chart[card_img] !== undefined) {
        is_timeout_done = false;
        setTimeout(function(){
            $(first_card).find('.front').addClass('transparent');
            $(second_card).find('.front').addClass('transparent');
            randomize_cards();
            $('#info-box').append("<br>Every Pokemon ran into a different grass!");
            is_timeout_done = true;
        },2000);
    }
}
//Music
function audio_off(){
    $('.fa-volume-off').removeClass('clicked');
    $('.fa-volume-up').addClass('clicked');
    $('#background-music').trigger('pause');
    music_on = false;
}
function audio_on(){
    $('.fa-volume-up').removeClass('clicked');
    $('.fa-volume-off').addClass('clicked');
    $('#background-music').trigger('play');
    music_on = true;
}
function addingPokemonDiv(){
    for(var i = 0; i<pokemon_first_evolution.length; i++){
        creating_div_block(pokemon_first_evolution[i]);
        creating_div_block(pokemon_first_evolution[i]);
    }
    grass_move_when_hover();
    display_stats();
    randomize_cards();
    $('.card').click(function(){
        if($(this).find('.front').hasClass('transparent') && is_timeout_done){
            card_clicked(this);
        }
    });
}
$(document).ready(function(){
    addingPokemonDiv();
    $('.reset').click(function(){
        if(attempts!==0){
            games_played++;
            reset_stats();
            $('#game-area').empty();
            addingPokemonDiv();
            first_card_clicked = null;
            $('#info-box').text("Welcome to Pokemon Memory Match! Find a matched set of Pokemon and try to catch them all!");
            $('.front').addClass('transparent');
            randomize_cards();
        }
    });
});