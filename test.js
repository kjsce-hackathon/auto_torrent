const torrentSearch = new (require('torrent-search-api'))();
// console.log(new Date().getTime())

// const wishmodel=require('./wishlist_model');
/*
wishmodel.get(1).then(rows=>{


console.log(rows)
	
})*/
/*wishmodel.insert(3,'video','1080',new Date().getTime()).then(data=>{
	console.log(data);

}).catch(err=>{
	console.log(err);
})*/
torrentSearch.enableProvider('ThePirateBay');

console.log(torrentSearch.getActiveProviders());