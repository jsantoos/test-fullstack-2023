<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="email">E-mail:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Senha:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Entrar</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post('http://localhost:8080/users/login', {
          email: this.email,
          password: this.password,
        });
        this.$store.dispatch('login', { token: response.data.token, userRole: response.data.userRole });
        this.$router.push('/dashboard');
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
