import {default as Spreadsheet} from '../spreadsheet.js';
import moment from 'moment';
import _ from 'lodash';
export default {
	install(Vue, options) {
		let content = { dishes: null, times: null, kcalColors: null, loaded: false };
		Object.defineProperty(Vue.prototype, '$content', {
		get() {
			return content;
			},
			set(v) {
				content = v;
			}
		});
		content.load = function(){
			//DISHES
			let dishPromise = new Spreadsheet(options.dishesSpreadSheet.spreadsheetId)
			.fetch(options.dishesSpreadSheet.worksheet).then(d => {
				let dishes = d.content.map(d=>{
					return{
						date: moment(d.fecha).startOf('day').unix(),
						active: d.activo.toLowerCase() === 's',
						carousel: d.carrousel.toLowerCase() === 's',
						image: d.imagen,
						kcal: d.kcal,
						order: d.orden,
						dishName: d.plato,
						category: d.tipo,
						timeId: d.servicioid// === 'DESAYUNO'? 0 : d.servicio === 'ALMUERZO'? 1 : 2
					}
				});
				dishes = _.chain(dishes).groupBy('date').value();				
				Object.keys(dishes).map((key)=>{
					dishes[key] = _.chain(dishes[key]).groupBy('timeId').value();
					Object.keys(dishes[key]).map((key2)=>{
						dishes[key][key2] = _.chain(dishes[key][key2]).groupBy('category').value();
					});
				});
				content.dishes = dishes;
				
				localStorage.dishes = JSON.stringify(dishes);				
			}).catch(e => console.log(e.message));

			//TIMES
			let timesPromise = new Spreadsheet(options.timesSpreadSheet.spreadsheetId)
			.fetch(options.timesSpreadSheet.worksheet)
			.then(d => {
				let times = d.content.map(t=>{
					return{
						start: t.inicioservicio,
						color: t.color,
						id: t.id,
						name: t.nombre
					}
				});
				times.sort((a,b)=>{
					return moment(a.start, 'HH:mm')-moment(b.start, 'HH:mm');
				});
				content.times = times;
				localStorage.times = JSON.stringify(times);				
			}).catch(e => console.log(e.message));

			//KCAL COLORS
			let kcalPromise = new Spreadsheet(options.kcalColorSpreadSheet.spreadsheetId)
			.fetch(options.kcalColorSpreadSheet.worksheet)
			.then(d => {
				let colors = d.content.map(t=>{
					return{
						kcal: t.maxkcal,
						color: t.color
					}
				});
				colors.sort((a,b)=>{
					return a.kcal-b.kcal;
				});				
				content.colors = colors;
				localStorage.colors = JSON.stringify(colors);				
			}).catch(e => console.log(e.message));

			return new Promise((resolve, reject)=>{
				Promise.all([dishPromise, timesPromise, kcalPromise]).then(()=>{
					content.loaded = true;
					resolve(true);
				}).catch(e=>{
					reject(e);
				});
			})
		};

		content.loadLocal = function(){
			if(localStorage.dishes && localStorage.times){
				content.dishes = JSON.parse(localStorage.dishes);
				content.times = JSON.parse(localStorage.times);
				content.colors = JSON.parse(localStorage.colors);
				return true;
			}
			return false;			
		}
		content.getDishesForTime = function (time){
			try{
				return content.dishes[moment().startOf('day').unix()][time.id] || {};
			}catch(e){
				return {};
			}
		}
	}
};
