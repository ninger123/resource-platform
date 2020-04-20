<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import controllerIndex from './controller'
import applicantIndex from './applicant'

export default {
  name: 'Home',
  components: { applicantIndex, controllerIndex },
  data() {
    return {
      currentRole: 'applicantIndex'
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
    if (this.roles.includes('applicant')) {
      this.currentRole = 'applicantIndex'
    } else if(this.roles.includes('controller')) {
      this.currentRole = 'controllerIndex'
    }
  }
}
</script>
