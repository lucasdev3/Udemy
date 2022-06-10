<template>
  <div id="app">
    <h1>Guia Clientes</h1>
    <div>
      <FormularioComponent :array="this.clientes"></FormularioComponent>
    </div>
    <div v-for="(cliente) in clientes" :key="cliente.id">
      <ClienteComponent :cliente="cliente" @meDelete="deletarUsuario($event)" :showIdade="true"></ClienteComponent>
      <input type="text" v-model="cliente.nome">
      <input type="text" v-model="cliente.email">
      <hr>
    </div>

  </div>
</template>

<script>
import ClienteComponent from './components/ClienteComponent';
import FormularioComponent from './components/FormularioComponent';

export default {
  name: 'App',
  data() {
    return {
      clientes: [
        {
          id: 2,
          nome: "Juvenal Lima",
          email: "Juvenal@teste.com",
          idade: 25
        },
        {
          id: 3,
          nome: "Caio Lima",
          email: "Caio@teste.com",
          idade: 33
        }
        ,
        {
          id: 4,
          nome: "Jose Lima",
          email: "Jose@teste.com",
          idade: 12
        }
        ,
        {
          id: 5,
          nome: "Franklin Lima",
          email: "Franklin@teste.com",
          idade: 65
        }
      ]
    }
  },
  methods: {
    deletarUsuario: function ($event) {
      const id = $event.idCliente;
      this.clientes = this.clientes.filter(cliente => cliente.id !== id);
    }
  },
  components: {
    ClienteComponent,
    FormularioComponent,
    // Produto
  }
}
</script>

<style>

</style>
