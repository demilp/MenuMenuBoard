<template>
    <div class="dishes">
      <div v-for="(categories, key) in categoriesLists" :key=key class="categoryColumn">
        <div v-for="(category, key) in categories" :key=key class="category">
          <div class="category-top">
            <div class="category-title" :style="{'background-color': time.color}">{{key}}</div>
            <span class="category-kcal">Kcal</span>
          </div>
          <ul>
            <li v-for="(dish, index) in category" :key=index class="dish">
              <span  class="dish-text">{{dish.dishName}}</span>
              <div class="kcal-cont"><div class="kcal-circle" :style="{'background-color': colorFromKcal(dish.kcal)}"></div><span class="kcal-text">{{dish.kcal}}</span></div>              
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Dishes',
  props: ['time'],
  mounted() {
    this.updateDishes();
  },
  data() {
    return {
       categories: {},
       categoriesLists: []
    }
  },
  watch: {
		time: function () {
			this.updateDishes();
		}
  },
  methods: {
		updateDishes: function () {
      this.categories = this.$content.getDishesForTime(this.time);
      this.categoriesLists = [{}, {}];      
      Object.keys(this.categories).forEach(function (key, i) {
				if(i % 2 == 0){
          this.categoriesLists[0][key] = this.categories[key];
        }else{
          this.categoriesLists[1][key] = this.categories[key];
        }
      }, this);
      console.log(this.categoriesLists);
      
    },
    colorFromKcal: function (kcal) {
      for (let index = this.$content.colors.length - 1; index >= 0; index--) {        
        if(this.$content.colors[index].kcal < kcal){
          return this.$content.colors[index].color;
        }
      }
      return 'black';
    }
  }
}
</script>

<style scoped>
.dishes{
  display: flex;
  /*height: 41.5vh;*/
  flex-grow: 1;
  flex-direction: row;
  width: 100%;
}
.categoryColumn{
  width: 50%;
  display: flex;
  flex-direction: column;
  padding: 0 4% 0 2%;
}
:nth-last-child().categoryColumn:nth-child(1){
  border: 10px dashed gray;
}
.category{
  width: 100%;
  margin-bottom: 20%;
}
.category-top{
  height: 3vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  vertical-align: middle;
}
.category-kcal{
  font-size: 200%;
}
.category-title{
  font-size: 200%;
  width: 75%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 2%;
  color: white;
}
ul{
  list-style-type: none;
  padding: 0;
}
.dish{
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  font-size: 200%;
  margin: 5% 0;
}
.kcal-cont{
  width: 17.5%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.kcal-circle{
  border-radius: 50%;
  width: 20px;
  height: 20px;
  background-color: red;
}
.kcal-text{
  
}
</style>

