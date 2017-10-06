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
let query,type;

// userid=req.query.id;
query=req.query.query;
type=req.query.type;
// console.log(userid+" "+query + " "+ type);
// res.send(req.query);
if(query === undefined || type=== undefined)
	res.send('one or more parameter of query string is empty');
else{

	torrentSearch.search(query, type,1)
	.then(torrents =>{
		if(torrents.length == 0)
			res.json({ message : 'torrent not available' });
		else //currently sending array of torrents and limit is 1
		res.json(torrents);
			// res.json({ message : 'torrent not available' });
	})
	.catch(err => {

		console.log(err);
		res.send('line 45 -50 error');
	});
}

});




app.get('/getWishlist',(req,res)=>{
	let userid=req.query.id;


	let bag=[];
	wishmodel.get(userid).then(rows=>{


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

app.get('addWishlist',(req,res)=>{
	let query,type,userid;

	userid=req.query.id;
	query=req.query.query;
	type=req.query.type;
	if(userid===undefined || query === undefined || type=== undefined)
		res.send('one or more parameter of query string is empty');
	else{
		wishmodel.insert(userid,type,query).then(data=>{

	res.json({message : 'inserted successful'});
	}).catch(err=>{
      res.json({message : 'insertion failed'});
    });
  }

});

app.get("/checkAvailable",(req,res)=>{
    let userid= req.query.id;
    wishmodel.get(userid).then(rows=>{
    	let bag=[],promises=[];

        for(let i=0 ; i < rows.length ; i++){
            let query,type;
            // console.log(rows[i]);
            query=rows[i].query;
            type=rows[i].type;
            promises.push(torrentSearch.search(query, type,1));
          
        }
        Promise.all(promises).then(data=>{
        	data.forEach(sab=>{
        		bag.push(sab[0]);
        	})

          res.json(bag);
       })

    }).catch(err=>{
    	res.send('error in getting wishlist  for user '+userid);
    });
});

let port =3000;
app.listen(port,()=>{

	console.log('listening on port '+ port);
});
