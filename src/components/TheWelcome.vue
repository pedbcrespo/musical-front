<template>
  <div class="main-div">
    <div class="form-part">
      <div>
        <label for="basic-url" class="form-label">Select Note</label>
        <select v-model="selectedNote" class="form-select form-select-sm" aria-label="Small select example">
          <option v-for="note in notes" :key="note" :value="note">{{ note }}</option>
        </select>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="flexCheckDefault" v-model="isMinor">
          <label class="form-check-label" for="flexCheckDefault">
            Minor
          </label>
        </div>
        <button type="button" class="btn btn-primary" @click="handleSelectNote">Add</button>
      </div>
      <div>
        <label for="basic-url" class="form-label">Selected Notes</label>
        <input type="text" class="form-control" aria-label="Selected Notes" aria-describedby="basic-addon1" disabled :value="getSelectedNotes">
      </div>
      
      <button type="button" class="btn btn-primary" @click="generateScale">Gerar</button>
    </div>

    <div class="song-part" v-if="scale.length > 0">
      <input type="text" class="form-control" aria-label="Scale" aria-describedby="basic-addon1" disabled :value="getGeneratedScale">
      <hr/>
      <play-song :base="selectedNotes" :scale="scale"/>
    </div>
  </div>
</template>

<script>
import ScaleService from '@/service/ScaleService';
import PlaySong from './PlaySong.vue';



export default {
  components: { PlaySong },
  computed: {
    getSelectedNotes() {
      return this.notesToScale.join(', ');
    },
    getGeneratedScale() {
      return this.scale.join(', ');
    }
  },
  data() {
    return {
      service: new ScaleService(),
      notes: [],
      selectedNotes: [],
      notesToScale: [],
      selectedNote: '',
      scale: [],
      isMinor: false,
    }
  },
  mounted() {
    this.service.getNotes().then(res => {
      this.notes = res.data.allNotes;
    });
  },
  methods: {
    handleSelectNote() {
      if (this.selectedNote && !this.selectedNotes.includes(this.selectedNote)) {
        const note = this.isMinor? `${this.selectedNote}m` : this.selectedNote;
        this.notesToScale.push(note);
        this.selectedNotes.push(this.selectedNote);
      }
    },
    generateScale() {
      this.service.getScale(this.notesToScale).then(res => {
        this.scale = res.data.notes;
      });
    }
  }
}
</script>
<style>
.main-div {
  width: 100%;
}
</style>