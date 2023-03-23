<template>
  <div>
    <h1>Editar Usuário</h1>
    <form v-if="user" @submit.prevent="handleSubmit">
      <div>
        <label for="name">Nome:</label>
        <input type="text" id="name" v-model="user.name" required />
      </div>
      <div>
        <label for="email">E-mail:</label>
        <input type="email" id="email" v-model="user.email" required />
      </div>
      <div>
        <label for="userType">Tipo de Usuário:</label>
        <select id="userType" v-model="user.userType" required>
          <option value="admin">Administrador</option>
          <option value="user">Usuário</option>
        </select>
      </div>
      <button type="submit">Salvar</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
const USER_TOKEN = localStorage.getItem('token')

export default {
  data() {
    return {
      user: null,
    };
  },
  async created() {
    await this.fetchUser();
  },
  methods: {
    async fetchUser() {
      try {
        const response = await axios.get(`http://localhost:8080/users/${this.$route.params.id}`, { headers:  {"Authorization" : `Bearer ${USER_TOKEN}`} });
        this.user = response.data;
      } catch (error) {
        console.error(error);}
    },

    async handleSubmit() {
        try {
            await axios.put(`http://localhost:8080/users/${this.$route.params.id}`, { 
            name: this.user.name,
            email: this.user.email,
            userType: this.user.userType,
        }, { headers:  {"Authorization" : `Bearer ${USER_TOKEN}`} });
    this.$router.push('/users');
    } catch (error) {
    console.error(error);
    }
},
},
};
</script>
