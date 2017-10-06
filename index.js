const express=require('express');
const app=express();
const torrentSearch = new (require('torrent-search-api'))();
const wishmodel=require('./wishlist_model');
torrentSearch.enableProvider('ThePirateBay');


// console.log(torrentSearch.getActiveProviders());
/*
torrentSearch.search('720', 'All', 20)
    .then(torrents => {
        console.log(torrents);
    })
    .catch(err => {
        console.log(err);
    });
*/
let c=0;
app.get('/new',(req,res)=>{
res.json({
 id : ++c
}); });

//get torrent for search to api
app.get('/getTorrent',(req,res)=>{
	// console.log('idhar')
let userid,query,type;

 userid=req.query.id;
 query=req.query.query;
 type=req.query.type;
 // console.log(userid+" "+query + " "+ type);
 // res.send(req.query);
 if(userid===undefined || query === undefined || type=== undefined)
 res.send('one or more parameter of query string is empty');
 else{

    torrentSearch.search(query, type,1)
    .then(torrents =>{
    	if(torrents.length == 0){
    		res.json({ message : 'torrent not available' });

    	  wishlist.insert(userid,type,query,function(err,rows){
                // console.log(rows);
                console.log("Insert successful");
            })



    	}
    	else //currently sending array of torrents and limit is 1
         res.json(torrents);
    })
    .catch(err => {
        console.log(err);
    });
 }

});



app.get('/getWishlist',(req,res)=>{
let userid=req.query.id;


let bag=[];
wishmodel.get(userid)
.then(rows=>{


for(let i=0 ; i < rows.length ; i++){
		let obj={};

		obj.type=rows[i].type;
		obj.query=rows[i].query;
		// console.log(type);
		// console.log(query);
		bag.push(obj);
}
res.json(bag);

}).catch(err=>{
	console.log('line 80 -90 ' + err);
});

})



let port =3000;
app.listen(port,()=>{

console.log('listening on port '+ port);
});
