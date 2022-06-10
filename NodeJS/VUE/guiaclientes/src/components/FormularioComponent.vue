<template>
  <div>
    <h3>Cadastro: </h3>
    <small
        id="nomeErro" v-if="!validatedForm">Nome inválido</small><br>
    <input type="text"
           placeholder="nome"
           v-model="nomeField"> <br>
    <input type="text"
           placeholder="email"
           v-model="emailField"> <br>
    <input type="text"
           placeholder="idade"
           v-model="idadeField"> <br>
    <button @click="cadastrarUsuario">Cadastrar</button>
  </div>
</template>

<script>
export default {
  name: "FormularioComponent",
  data: () => {
    return {
      validatedForm: true,
      nomeField: "",
      emailField: "",
      idadeField: 0,
    }
  },
  props: {
    metodo: Function,
    array: Array
  },
  methods: {
    cadastrarUsuario: function () {

      if (!this.nomeField || !this.emailField || !this.idadeField) {
        return this.validatedForm = false;
      }

      const {array} = this;

      const object = {
        id: Date.now(),
        nome: this.nomeField,
        email: this.emailField,
        idade: this.idadeField
      };
      array.push(object);
      this.nomeField = "";
      this.emailField = "";
      this.idadeField = 0;
      this.validatedForm = true;
    }
  }
}
</script>

<style scoped>
#nomeErro {
  color: red;
}
</style>