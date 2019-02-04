<template>
    <div class="menu">
        <Header :time="currentTime"/>
        <Images :time="currentTime"/>
        <Dishes :time="currentTime"/>
    </div>
</template>

<script>
import Header from './Header.vue'
import Images from './Images.vue'
import Dishes from './Dishes.vue'
import moment from 'moment';

export default {
  name: 'app',
  components: {
    Header,
    Images,
    Dishes
	},
	data(){
		return{
			currentTime: this.getCurrentTime()
		}
	},
  methods:{
    getCurrentTime: function(){			
			let t = this.$content.times[this.$content.times.length - 1];
			let now = moment();
			for (let index = 0; index < this.$content.times.length; index++) {
				let c = moment(this.$content.times[index].start, 'HH:mm');
				if(c - now < 0){
					t = this.$content.times[index];
				}
			}
			return t;
		},
		getNextCurrentTime: function(){
			let now = moment();
			for (let index = 0; index < this.$content.times.length; index++) {
				let c = moment(this.$content.times[index].start, 'HH:mm');
				if(c - now > 0){
					return this.$content.times[index];
				}
			}
			return this.$content.times[0];
		},
		nextTime(){
			this.currentTime = this.getCurrentTime();
			let now = moment();
			let timeToNext = moment(this.getNextCurrentTime().start, 'HH::mm').unix()-now.unix();
			setTimeout(this.nextTime, timeToNext * 1000);
		}
	},
	mounted(){
		this.nextTime();
	}
}
</script>

<style scoped>
.menu{
	width: 100%;
	height: 100%;
	overflow: hidden;
	display: flex;
	flex-direction: column;
}
</style>
