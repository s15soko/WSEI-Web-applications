interface IAudios {
    [key: string]: HTMLAudioElement;
} 

interface IMapper {
    [key: string]: string;
}

class Keyboard
{
    audios: IAudios = {};
    key: (string | null) = null;

    load(): void
    {
        let keyTypes = ["boom", "clap", "hihat", "kick", "openhat", "ride", "snare", "tink", "tom"];
        let audios: IAudios  = {};

        keyTypes.forEach(keyType => {
            let sound: (HTMLAudioElement | null) = document.querySelector(`[data-sound="${keyType}"]`);

            if(sound != null) {
                audios[keyType] = sound;
            }
        });

        this.audios = audios;
    }

    setKey(key: string) {
        this.key = key;
    }

    play()
    {
        if(this.key != null && (this.key in this.audios)) {
            (this.audios[this.key]).play();
        }
    }
}

class DefaultKeyboardMapper
{
    static getMapper(): IMapper
    {
        return {
            '1': "boom",
            '2': "clap",
            '3': "hihat",
            '4': "kick",
            '5': "openhat",
            '6': "ride",
            '7': "snare",
            '8': "tink",
            '9': "tom",
        };
    }
}

const keyboard = new Keyboard();
keyboard.load();

function onKeyPress(event: KeyboardEvent)
{
    let key = String(event.key).toLocaleLowerCase();
    let time = event.timeStamp;

    let mapper = DefaultKeyboardMapper.getMapper();
    if(key in mapper) {
        keyboard.setKey(mapper[key]);
        keyboard.play();
    }
}

function onClick(event: Event)
{
    let target = <HTMLElement> event.target;
    let soundKey: (string | undefined) = target.dataset.sound;
    
    if(soundKey != undefined) {
        keyboard.setKey(soundKey);
        keyboard.play();
    }
}

//

let keyboardPanel = document.getElementById("keyboardPanel");
if(keyboardPanel != null) {
    let keys = keyboardPanel.querySelectorAll(".keyboardKey");
    if(keys != null) {
        keys.forEach(key => {
            key.addEventListener("click", onClick);
        });
    }
}

document.addEventListener("keypress", onKeyPress);