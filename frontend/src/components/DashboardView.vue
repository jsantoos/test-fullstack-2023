<template>
  <div>
    <h1>Dashboard</h1>
    <div v-if="serverInfo">
      <h2>Informações do Servidor</h2>
      <div>
        <strong>Processador:</strong>
        <pre>{{ serverInfo.processador[0].model }}</pre>
      </div>
      <div>
        <strong>Memória Total:</strong>
        <pre>{{ serverInfo.memória.total }} bytes</pre>
      </div>
      <div>
        <strong>Memória Livre:</strong>
        <pre>{{ serverInfo.memória.livre }} bytes</pre>
      </div>
      <div>
        <strong>Memória Utilizada:</strong>
        <pre>{{ serverInfo.memória.utilizada }} bytes</pre>
      </div>
      <div>
        <strong>Disco:</strong>
        <pre>{{ serverInfo.disco }} bytes</pre>
      </div>
      <div>
        <strong>Interfaces de Rede:</strong>
        <pre>{{ JSON.stringify(serverInfo.interfacesIP, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      serverInfo: null,
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:8080/server-info');
      this.serverInfo = response.data;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
