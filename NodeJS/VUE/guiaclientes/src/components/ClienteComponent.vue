<template>
  <div :class="{'cliente': !this.isPremium, 'cliente-premium': this.isPremium}">
    <h4>Nome: {{ cliente.nome }}</h4>
    <p>Email: {{ cliente.email }}</p>
    <p>Idade: {{ cliente.idade }}</p>

    <button @click="mudarCor($event)">Mudar cor!</button>
    <button @click="emitirEventoDelete">Deletar</button>
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
    },
    emitirEventoDelete: function () {
      console.log("Emitindo do filho");
      this.$emit("meDelete", {idCliente: this.cliente.id, curso:"Formação Node.js", emPromocao: true, component: this, isPremium: this.isPremium});
    },
    testar: function () {
      console.log('testando ');
      alert('Deletando usuario: ' + this.cliente.nome);
    }
  },
  filters: {
    processarEmail: function (value) {
      return value.toUpperCase();
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