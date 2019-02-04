<template>
  <div id="app">
    <Loader v-if="!content.loaded"/>
    <Menu v-else/>
  </div>
</template>

<script>
import Loader from './components/Loader.vue'
import Menu from './components/Menu.vue'

export default {
  name: 'app',
  data() {
    return{
      content: this.$content,
    }
  },
  mounted() {

  },
  components: {
    Loader,
    Menu
  },
  methods:{
    
  }
}
</script>

<style>
html, body {
	height: 100vh;
	width: 100vw;
	margin: 0;
}
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
