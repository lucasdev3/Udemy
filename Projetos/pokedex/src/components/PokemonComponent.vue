<template>
  <div>
    <div class="card">
      <div class="card-image">
        <figure>
          <img v-if="isFront" :src="pokemon.front"
               alt="Placeholder image">
          <img v-else :src="pokemon.back"
               alt="Placeholder image">
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">{{ num }} - {{ name[0].toUpperCase() + name.substring(1) }}</p>
            <p class="subtitle is-6">Tipo: {{ pokemon.type }}</p>
          </div>
        </div>
        <div class="content">
          <button class="button is-primary" @click="mudarSprite">Mudar Sprite</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  created: function () {
    axios.get(this.url)
        .then((response) => {
          const {data} = response;
          // console.log(data);
          this.pokemon.type = data.types[0].type.name
          this.pokemon.front = data.sprites.front_default
          this.pokemon.back = data.sprites.back_default
          this.currentImg = this.pokemon.front;
          // console.log(this.pokemon.back)
        })
        .catch((error) => {
          console.log(error);
        })
  },
  data() {
    return {
      isFront: true,
      currentImg: '',
      pokemon: {
        type: '',
        front: '',
        back: ''
      }
    }
  },
  props: {
    num: Number,
    name: String,
    url: String
  },
  methods: {
    mudarSprite: function () {
      this.isFront = !this.isFront;
    }
  }
}
</script>
<style scoped>

</style>