<template>
    <div class="header">
      <div class="logo">
				<img src="" alt="">
			</div>
      <div class="time-bg" :style="{'background-color': time.color}">
				<span class="time-text">{{time.name}}</span>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Header',
  props: ['time'],
  mounted() {
    
  },
  data() {
    return {
      
    }
  }
}
</script>

<style scoped>
.header{
  display: flex;
  justify-content: space-between;
  height: 12.5vh;
}
.time-bg{
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 300%;
}
</style>

