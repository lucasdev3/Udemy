<template>
  <div id="app" class="is-desktop">
    <header class="container is-widescreen is-full-fullhd is-desktop" id="header">
      <h1 class="is-size-1">Pokedex</h1>
      <div class="columns is-mobile is-offset-one-quarter">
        <div class="column" id="container-header">
          <input v-model="busca" class="input is-primary" type="text" placeholder="Pesquisar Pokemon pelo nome" id="inputSearch">
          <button class="button is-dark" id="btnBusca" @click="showResultado">Pesquisar</button>
        </div>
      </div>
    </header>
    <div class="columns is-desktop is-mobile is-multiline is-offset-one-quarter">
      <div v-for="(poke, index) in pokemons"
           :key="index"
           class="column is-2">
        <PokemonComponent :num="index + 1"
                          :name="poke.name"
                          :url="poke.url">
        </PokemonComponent>
      </div>
    </div>

  </div>
</template>

<script>

import axios from 'axios';
import PokemonComponent from './components/PokemonComponent';

export default {
  name: 'App',
  data() {
    return {
      pokemons: Array,
      busca: ''
    }
  },
  created: function () {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
        .then((response) => {
          const {results} = response.data;
          this.pokemons = results;
        })
        .catch((error) => {
          console.log(error);
        })
  },
  computed: {
    resultadoBusca: function() {
      if (this.busca === '' || this.busca === ' ') {
        return this.pokemons;
      } else {
        return this.pokemons.filter(pokemon => pokemon.name === this.busca)
      }
    },
    showResultado: function () {
      this.busca = this.resultadoBusca();
      return this.busca
    }
  },
  components: {
    PokemonComponent
  }
}
</script>

<style>
#header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#btnBusca {
  margin-top: 20px;
}

#container-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 30px;
}

#inputSearch {
  width: 600px;
}

</style>
