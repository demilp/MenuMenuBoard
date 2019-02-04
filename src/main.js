import Vue from 'vue';
import App from './App.vue';
import content from './plugins/content';

Vue.use(content, {
	dishesSpreadSheet: {spreadsheetId:'1me2VhEwVjMhCHW1PzWS4EXrU-W-BiDi7s5bgucxWjVk', worksheet:1},
	timesSpreadSheet: {spreadsheetId:'1me2VhEwVjMhCHW1PzWS4EXrU-W-BiDi7s5bgucxWjVk', worksheet:2},
	kcalColorSpreadSheet: {spreadsheetId:'1me2VhEwVjMhCHW1PzWS4EXrU-W-BiDi7s5bgucxWjVk', worksheet:3}
});
Vue.config.productionTip = false;

new Vue({
	render: h => h(App),
}).$mount('#app');
