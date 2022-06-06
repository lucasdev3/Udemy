<template>
  <div :class="{'cliente': !this.isPremium, 'cliente-premium': this.isPremium}">
    <h4>Nome: {{ cliente.nome }}</h4>
    <p>Email: {{ cliente.email }}</p>
    <p v-if="showIdade">Idade: {{ cliente.idade }}</p>
    <p v-else>O usuario ocultou a idade</p>
    <button @click="mudarCor($event)">Mudar cor!</button>
  </div>
</template>

<script>

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  data() {
    return {
      isPremium: false
    }
  },
  props: {
    cliente: Object,
    showIdade: Boolean
  }, 
  methods: {
    mudarCor: function($event) {
      console.log("chamando evento!");
      console.log($event)
      return this.isPremium = !this.isPremium
    }
  }
}
</script>

<style scoped>
.cliente {
  background-color: rgb(163, 158, 151);
  max-width: 600px;
}

.cliente-premium {
  background-color: rgb(7, 7, 14);
  color: white;
  max-width: 600px;
  border: 1px solid black;
}
</style>