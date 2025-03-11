import * as Tone from "tone";

const getRandomInt = (max) => Math.floor(Math.random() * max);

export default class Song {
    constructor(base, scale, relationScales) {
        this.base = base;
        this.scale = scale;
        this.relationScales = relationScales;
        this.baseSequence = null;
        this.soloLoop = null;
    }

    play() {
        this.playBase();
        this.playSolo();

        Tone.getTransport().start();

        setTimeout(() => {
            this.stop();
        }, 10000);
    }

    playBase() { 
        const synth = new Tone.FMSynth().toDestination();
        const notes = this.base.map(note => `${note}3`);
        this.baseSequence = new Tone.Sequence((time, note) => {
            synth.triggerAttackRelease(note, "8n", time);
        }, notes, "4n");

        this.baseSequence.start(0);
    }

    playSolo() {
        const synth = new Tone.FMSynth().toDestination();

        const getRandomNote = (scale) => {
            if (!scale || scale.length === 0) return "C4";
            const randomIndex = getRandomInt(scale.length);
            const randomOctave = 4 + getRandomInt(2);
            return `${scale[randomIndex]}${randomOctave}`;
        };

        const getScaleFromNote = (note) => {
            return this.relationScales[note] || this.scale;
        };

        let baseIndex = 0;

        this.soloLoop = new Tone.Loop((time) => {
            const baseNote = this.base[baseIndex % this.base.length];
            const scale = getScaleFromNote(baseNote);
            const note = getRandomNote(scale);

            synth.triggerAttackRelease(note, "16n", time);

            baseIndex++;
        }, "8n");

        this.soloLoop.start(0);
    }

    stop() {
        if (this.baseSequence) this.baseSequence.stop();
        if (this.soloLoop) this.soloLoop.stop();
        Tone.getTransport().stop();
    }
}
