<template>
    <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Little Song</h5>
          <h6 class="card-subtitle mb-2 text-body-secondary">{{base}}</h6>
          <p class="card-text">{{ scale }}</p>
          <button type="button" class="btn btn-primary" @click="playSong">Play Song</button>
        </div>
    </div>
</template>
<script>
import Song from '@/tone/tone';

export default {
    props: ['base', 'scale'],
    data() {
        return {
            tone: new Song(this.base, this.scale),
        }
    },
    methods: {
        playSong() {
            this.tone.play()
        }
    }
}
</script>