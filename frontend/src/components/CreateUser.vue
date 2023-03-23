<template>
  <div>
    <h1>Cadastrar Usuário</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="name">Nome:</label>
        <input type="text" id="name" v-model="name" required />
      </div>
      <div>
        <label for="email">E-mail:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Senha:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div>
        <label for="userType">Tipo de Usuário:</label>
        <select id="userType" v-model="userType" required>
          <option value="admin">Administrador</option>
          <option value="user">Usuário</option>
        </select>
      </div>
      <button type="submit">Cadastrar</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      userType: '',
    };
  },
  methods: {
    async handleSubmit() {
      try {
        await axios.post('http://localhost:8080/users/register', {
          name: this.name,
          email: this.email,
          password: this.password,
          userType: this.userType,
        });
        this.$router.push('/users');
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
