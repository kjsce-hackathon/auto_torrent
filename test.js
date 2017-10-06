const wishmodel=require('./wishlist_model');
/*
wishmodel.get(1).then(rows=>{


console.log(rows)
	
})*/
wishmodel.insert(3,'video','1080').then(data=>{
	console.log(data);

})