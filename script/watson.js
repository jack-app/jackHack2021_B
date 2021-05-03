async function showHaiku(text) {
    var spanText = document.getElementById('messages');

    console.log(spanText);

    var ans = await parce(text);

    spanText.textContent = ans['haiku'][0];
    console.log("haiku at watson.js = " + ans['haiku'][0]);
}

function replace(text) {
    // console.log(test1);
    // console.log(text);
    // var spanText = document.getElementById('messages');
    // spanText.value = text;
    $(function () {
        var element = '<div class="card1">';
        for (let index = 0; index < 3; index++) {
            element += '<div class="card-text' + (index + 1) + '">' +  text[index] + '</div>';
        }
        element+='</div>';
        // 所定の要素に新たな要素とテキストを追加する
        if ($('.card1').length ==0) {
            $('.card-item').html(element);
        }else{
            $('.card1:first').before(element);
        }
        
    });
}


// $(function () {

//     // button要素をクリックしたら発動
//     $('button').click(function () {
//         console.log("jquery is success");
//         var element="";
//         for (let index = 0; index < 3; index++) {
//             element+='<div class="card-item">ららら</div>';
//         }
//         // 所定の要素に新たな要素とテキストを追加する
//         $('.card-container').html(element);
//     });
// });