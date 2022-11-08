let star = document.getElementById('stars');
let moon = document.getElementById('moon');
let mountains3 = document.getElementById('mountains3');
let mountains4 = document.getElementById('mountains4');
let river = document.getElementById('river');
let boat = document.getElementById('boat');
let adhmoh = document.querySelector('.adhm');
window.onscroll = function() {
    let value = scrollY;
   star.style.left = value + 'px';
   moon.style.top = value *3 +'px';
   mountains3.style.top = value *2 +'px';
   mountains4.style.top = value * 1.5 + 'px';
   river.style.top = value + 'px';
    boat.style.top = value +'px';
    boat.style.left = value*3 +'px';
    adhmoh.style.fontSize = value+'px';
    if(scrollY >= 85){
        adhmoh.style.fontSize = 85 + 'px';
        adhmoh.style.position = 'fixed';
        if(scrollY >= 284){
            adhmoh.style.display = 'none';
        }else{
            adhmoh.style.display = 'block';
        }
        if(scrollY >= 241){
            document.querySelector('.top-container').style.background = 'linear-gradient(#309c9a, #7b39b9)';
        }else{
            document.querySelector('.top-container').style.background = 'linear-gradient(#200016, #10001f)';
        }
    }

}   
