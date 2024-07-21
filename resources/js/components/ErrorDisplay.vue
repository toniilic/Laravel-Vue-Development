<template>
  <div v-if="error" class="error-display">
    {{ error }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ErrorDisplay',
  computed: {
    ...mapGetters(['getError'])
  }
}
</script>

<style scoped>
.error-display {
  background-color: #ffcccc;
  color: #cc0000;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  text-align: center;
}
</style>
