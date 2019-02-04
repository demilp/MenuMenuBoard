const apiUrl = 'https://spreadsheets.google.com/feeds/list/$SPREADSHEETID$/$SHEETID$/public/basic?alt=json';
function Spreadsheet(id){
	this.id = id;
	this.source = apiUrl.replace('$SPREADSHEETID$', this.id);

	this.fetch = (sheetId)=>{
		return new Promise((resolve, reject)=>{
			sheetId = sheetId || 1;
			let source = this.source.replace('$SHEETID$', sheetId);
			fetch(source).then(response=>{
				response.json().then(sheet=>{
					let data = {};
					data.authors = sheet.feed.author;
					data.title = sheet.feed.title.$t;
					data.updated = sheet.feed.updated.$t;
					let match;
					data.content = sheet.feed.entry.map(entry=>{
						let obj = {};
						let regex = /(\w+):\s([^,]+)/g;
						while (match = regex.exec(entry.content.$t)){
							obj[match[1]] = match[2];
						}
						return obj;
					});
					resolve(data);
				}).catch(e=>{
					reject(e);
				});
			}).catch(e=>{
				reject(e);
			});
		});        
	};
    
}
export default Spreadsheet;