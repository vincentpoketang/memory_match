var how_many_flipped = 0;
var what_flipped = [];
var finished_card = [];
function if_clicked_two_pokemon(){
    if(how_many_flipped === 2){
        setTimeout(function(){flip_card_back();}, 500);
    }
}
function compare_two_card(/*card_1,card_2*/){

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
