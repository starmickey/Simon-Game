/* ---- GLOBAL VARIABLES --- */
const WRONG_SOUND_INDEX = 4;

/* States: start showing-pattern repeating-pattern game-over */
var state = "start";

var colors = ["red", "blue", "yellow", "green"];
var keys = ["w", "e", "a", "d"];
var buttons = [$("#red"), $("#blue"), $("#yellow"), $("#green")];

var sounds = [
    new Audio("sounds/red.mp3"),
    new Audio("sounds/blue.mp3"),
    new Audio("sounds/yellow.mp3"),
    new Audio("sounds/green.mp3"),
    new Audio("sounds/wrong.mp3")
];

var pattern;

var repetitionIndex;
var score;
var level;


/* ---- EVENT LISTENERS ---- */

$(document).keydown(function (event) {
    if (state === "start") {
        startGame();
    } else if (state === "repeating-pattern") {
        const key = event.key;

        let isValidKey = false;
        let btnNum;

        for (let i = 0; i < keys.length; i++) {
            if (key === keys[i]) {
                btnNum = i;
                isValidKey = true;
            }
        }

        if (isValidKey) {
            checkRepetition(btnNum);
        }
    }
});

$(document).click(function () {
    if (state === "start") {
        startGame();
    }
});

$(".button").click(function () {
    if (state === "start") {
        startGame();
    }

    if (state === "repeating-pattern") {
        let color = $(this).attr("id");
        let btnNum;

        for (let index = 0; index < colors.length; index++) {
            if (color === colors[index]) {
                btnNum = index;
            }
        }

        checkRepetition(btnNum);
    }
});




/* ---- FUNCTIONS ---- */

function startGame() {
    pattern = [];
    score = 0;
    level = 1;
    repetitionIndex = 0;

    updateStatistics();
    paintButtonsGray(false);
    showPattern();
}

function showPattern() {
    let startDate;

    let newColorNum = Math.floor(Math.random() * 4);
    pattern.push(newColorNum);

    state = "showing-pattern";
    enableButtons(false);
    setTimeout(() => {
        updateInformation("showing-pattern");
    }, 600);

    setTimeout(async () => {
        for (let i = 0; i < pattern.length; i++) {
            startDate = Date.now();
            await pressButton(pattern[i], true);
            while (Date.now < startDate + 1000);
        }
        setTimeout(function () {
            enableButtons(true);
            state = "repeating-pattern";
            updateInformation("repeating-pattern");
            repetitionIndex = 0;
        }, 700);

    }, 1800);
}

function checkRepetition(btnNum) {
    if (btnNum === pattern[repetitionIndex]) {
        pressButton(btnNum, true);
        repetitionIndex++;
        score += 15;

        if (repetitionIndex === pattern.length) {
            updateInformation("great");
            level++;
            setTimeout(() => {
                showPattern();
            }, 600);
        }
        updateStatistics();
    } else {
        pressButton(btnNum, false);
        gameOver();
    }
}

function gameOver() {
    state = "game-over";
    setTimeout(() => {
        updateInformation("game-over");
        paintButtonsGray(true);
    }, 600);

    setTimeout(() => {
        state = "start";
        updateInformation("start");
    }, 2500);
}

function updateInformation(information) {
    let options = ["start", "showing-pattern", "repeating-pattern", "great", "game-over"];

    options.forEach(i => {
        if (i === information) {
            $("#information-" + i).fadeIn();
        } else {
            $("#information-" + i).hide();
        }
    });
}

function updateStatistics() {
    $("#level").text("Level: " + level);
    $("#score").text("Score: " + score);
}

async function pressButton(btnNum, isOk) {
    (buttons[btnNum]).addClass("press");
    if (isOk) {
        await makeSound(btnNum);
    } else {
        await makeSound(WRONG_SOUND_INDEX);
    }
    buttons[btnNum].removeClass("press");
}

function paintButtonsGray(doPaint) {
    if (doPaint) {
        buttons.forEach(btn => { btn.addClass("gray") });
    } else {
        buttons.forEach(btn => { btn.removeClass("gray") });
    }
}

function enableButtons(doEnable) {
    buttons.forEach(btn => { btn.attr("disabled", !doEnable) });

    if (doEnable) {
        buttons.forEach(btn => { btn.addClass("btn") });
    }
}

function makeSound(btnNum) {
    audio = sounds[btnNum];

    return new Promise(res => {
        audio.play();
        audio.onended = res;
    });
}

function isAnySoundPlaying() {
    sounds.forEach(s => {
        if (!s.paused) {
            return true;
        }
    });
    return false;
}