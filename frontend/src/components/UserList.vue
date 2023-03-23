<template>
  <div>
    <h1>Lista de Usuários</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <button @click="handleEdit(user.id)">Editar</button>
            <button @click="handleDelete(user.id)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
const USER_TOKEN = localStorage.getItem('token')

export default {
  data() { 
    return {
      users: [],
    };
  },
  async created() {
    await this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:8080/users', { headers:  {"Authorization" : `Bearer ${USER_TOKEN}`} });
        this.users = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    handleEdit(userId) {
      this.$router.push(`/users/${userId}/edit`, { headers:  {"Authorization" : `Bearer ${USER_TOKEN}`} });
    },
    async handleDelete(userId) {
      try {
        await axios.delete(`http://localhost:8080/users/${userId}`, { headers:  {"Authorization" : `Bearer ${USER_TOKEN}`} });
        await this.fetchUsers();
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
