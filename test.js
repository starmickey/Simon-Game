/* var played = 0;
var maxPlay = 0;

var ringingTone = new Audio ("sounds/blue.mp3");
var playBtn = document.getElementById('playbtn');

ringingTone.onplay = function() {
  //played counter
  played++;
};

ringingTone.addEventListener("ended", function() {
  //reset to start point
  ringingTone.currentTime = 0;
  if (played < maxPlay) {
    ringingTone.play();
  } else {
    played = 0;
    maxPlay = 0;
  }
});

playBtn.addEventListener("click", function() {
    maxPlay++;
    ringingTone.play();
}); */


// SECOND

var pattern = [];
var buttons = [$("#one"), $("#two")];
var sounds = [
    new Audio("http://www.noiseaddicts.com/samples_1w72b820/3732.mp3"),
    new Audio("sounds/blue.mp3")
];




buttons.forEach(btn => {
    btn.click(function () {
        let btnNum;

        if (btn.text() === "One") {
            btnNum = 0;
        } else {
            btnNum = 1;
        }
        pattern.push(btnNum);
        (sounds[btnNum]).play();
    });
});

$(document).keypress(function () {
  let btnNum;

  if (condition) {
    
  }
})

