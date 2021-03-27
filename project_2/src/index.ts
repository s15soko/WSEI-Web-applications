import Keyboard from "./Keyboard.js";
import Recorder, { RecorderState } from "./Recorder.js";
import DefaultKeyboardMapper from "./mappers/DefaultKeyboardMapper.js";
import Player from "./Player.js";

const recorder = new Recorder();
const keyboard = new Keyboard();
keyboard.load();
const player = new Player(recorder, keyboard);

//

function onKeyPress(event: KeyboardEvent)
{
    let key = String(event.key).toLocaleLowerCase();
    let time = event.timeStamp;

    let mapper = DefaultKeyboardMapper.getMapper();
    if(key in mapper) {
        keyboard.setKey(mapper[key]);
        keyboard.play();

        recorder.push(mapper[key], time);
    }
}

function onClick(event: Event)
{
    let target = <HTMLElement> event.target;
    let soundKey: (string | undefined) = target.dataset.sound;
    let time = event.timeStamp;
    
    if(soundKey != undefined) {
        keyboard.setKey(soundKey);
        keyboard.play();

        recorder.push(soundKey, time);
    }
}

//

let keyboardPanel = document.getElementById("keyboardPanel");
let recordBtn = document.getElementById("recordBtn");
let stopBtn = document.getElementById("stopBtn");
let playBtn = document.getElementById("playBtn");

//

if(keyboardPanel != null) {
    let keys = keyboardPanel.querySelectorAll(".keyboardKey");

    keys?.forEach(key => {
        key.addEventListener("click", onClick);
    });
}

document.addEventListener("keypress", onKeyPress);

recordBtn?.addEventListener("click", function(event) {
    if(recorder.state == RecorderState.WAITING) {
        console.log("RECORD BTN!");
        recorder.clearChannel();
        recorder.state = RecorderState.RECORDING;
    }
});
stopBtn?.addEventListener("click", function(event) {
    if(recorder.state == RecorderState.RECORDING) {
        console.log("STOP BTN!");
        recorder.state = RecorderState.WAITING;
    }
});
playBtn?.addEventListener("click", function(event) {
    if(recorder.state == RecorderState.WAITING) {
        console.log("PLAY BTN!");
        player.play();
    }
});