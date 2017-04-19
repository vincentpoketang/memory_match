/*var how_many_flipped = 0;
var what_flipped = [];
var finished_card = [];
function if_clicked_two_pokemon(){
    if(how_many_flipped === 2){
        setTimeout(function(){flip_card_back();}, 500);
    }
}
function compare_two_card(*//*card_1,card_2*//*){

}
function flip_card_back(){
    $(what_flipped[0]).toggleClass('transparent');
    $(what_flipped[1]).toggleClass('transparent');
    how_many_flipped = 0;
    what_flipped = [];
}
$(document).ready(function(){
    $('.back').click(function () {
        console.log(this);
        $(this).toggleClass('transparent');
        how_many_flipped++;
        what_flipped.push(this);
        if_clicked_two_pokemon();
    })
});
*/
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;
function card_clicked(element){
    //show card face
    $(element).find('.back').toggleClass('transparent');
    if(first_card_clicked===null){
        first_card_clicked = $(element);
    }
    else{
        second_card_clicked = $(element);
        console.log("1");
        console.log($(first_card_clicked).find('.front').find('img').attr('src'));
        console.log("2");
        console.log($(second_card_clicked).find('.front').find('img').attr('src'));
        console.log($(first_card_clicked).find('.front').find('img').attr('src') === $(second_card_clicked).find('.front').find('img').attr('src'))
        if($(first_card_clicked).find('.front').find('img').attr('src') === $(second_card_clicked).find('.front').find('img').attr('src')){
            match_counter++;
            first_card_clicked = null;
            second_card_clicked = null;
            if(match_counter === total_possible_matches){
                console.log("You win!");
            }
        }
        else{
            setTimeout(function(){
                console.log($(first_card_clicked).find('.front'),$(second_card_clicked).find('.front'));
                $(first_card_clicked).find('.back').toggleClass("transparent");
                $(second_card_clicked).find('.back').toggleClass("transparent");
                first_card_clicked = null;
                second_card_clicked = null;
            }, 1000);
        }
    }
}
$(document).ready(function(){
    $('.card').click(function(){
        card_clicked(this);
    })
});