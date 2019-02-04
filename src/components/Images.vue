<template>
    <div class="images">
      <carousel class="carousel" v-for="(imageList, index) in separatedImages" :key="index" :navigationEnabled="false" :paginationEnabled="false" :perPage=1 :autoplayTimeout=5000 :autoplay="true" :loop="true">
          <slide class="slide" v-for="(im, index) in imageList" :key="index">
						<div class="image-cont">
							<img class="image" :src="im.image" :alt="im.dishName">
						</div>
						<div class="text-cont">
							<span class="text">{{im.dishName}}</span>
						</div>
						<div class="cal" :style="{'background-color': time.color}">
							<span class="cal-text">{{im.kcal}} Kcal</span>
						</div>
					</slide>
      </carousel>
    </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';

export default {
  name: 'Images',
	props: ['time'],
	components:{
		Carousel,
		Slide
	},
  mounted() {
    this.updateDishes();
  },
  data() {
    return {
      separatedImages: []
    }
  },
  watch: {
		time: function () {
			this.updateDishes();
		}
  },
  methods: {
		updateDishes: function () {		
			let d = this.$content.getDishesForTime(this.time);
			let dishes = [];
			
			Object.keys(d).forEach(function (key) {
				dishes = dishes.concat(d[key].filter(j=>{
				return j.carousel && j.image;}));
			});
			this.separatedImages = [];
			this.separatedImages.push(dishes.filter((v,i) =>{return i % 2==0}));
			this.separatedImages.push(dishes.filter((v,i) =>{return i % 2==1}));
		}
  }
}
</script>

<style scoped>
.images{
  display: flex;
  justify-content: space-around;
  height: 29vh;
}
.carousel{
	width: 50%;
	height: 100%;
}
.slide{
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 100%;
}
.image-cont{
	height: 75%;
	width: 100%;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
}
.image{
	max-width: 100%;
	max-height: 100%;
}
.text-cont{
	align-items: center;
	width: 100%;
	flex-grow: 1;
	display: flex;
	justify-content: center;
}
.text{
	width: 100%;
	height: 100%;
	text-align: center;
	font-size: 200%;
}
.cal{
	border-radius: 50%;
	position: absolute;
	width: 7vw;
	height: 7vw;
	top: 0;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;
}
/deep/ .VueCarousel-wrapper{
	width: 100%;
	height: 100%;
}
/deep/ .VueCarousel-inner{
	width: 100% !important;
	height: 100% !important;
}
</style>


