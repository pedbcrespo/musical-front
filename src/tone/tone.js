import * as Tone from "tone";

const getRandomInt = (max) => Math.floor(Math.random() * max);

export default class Song {
    constructor(base, scale) {
        this.base = base;
        this.scale = scale;
        this.baseSequence = null;
        this.soloLoop = null;
    }

    play() {
        console.log(this.base);
        console.log(this.scale);
        this.playBase();
        this.playSolo();

        Tone.getTransport().start();

        setTimeout(() => {
            this.stop();
        }, 10000);
    }

    playBase() { 
        const synth = new Tone.FMSynth().toDestination();
        const notes = this.base.map(note => `${note}3`)
        this.baseSequence = new Tone.Sequence((time, note) => {
            synth.triggerAttackRelease(note, "8n", time);
        }, notes, "4n");

        this.baseSequence.start(0);
    }

    playSolo() {
        const synth = new Tone.FMSynth().toDestination();
        const getRandomNote = () => {
            const randomIndex = getRandomInt(this.scale.length);
            const randomOcta = 4 + getRandomInt(2);
            return `${this.scale[randomIndex]}${randomOcta}`;
        };

        this.soloLoop = new Tone.Loop((time) => {
            const note = getRandomNote();
            synth.triggerAttackRelease(note, "16n", time);
        }, "8n");

        this.soloLoop.start(0);
    }

    stop() {
        if (this.baseSequence) this.baseSequence.stop();
        if (this.soloLoop) this.soloLoop.stop();
        Tone.getTransport().stop();
    }
}
