<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import controllerIndex from './controller'

export default {
  name: 'Home',
  components: { controllerIndex },
  data() {
    return {
      currentRole: 'controllerIndex'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  methods: {
  },
  created() {
    if(this.roles.includes('controller')) {
      this.currentRole = 'controllerIndex'
    }
  }
}
</script>
