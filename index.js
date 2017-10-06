const express=require('express');
const app=express();
const torrentSearch = new (require('torrent-search-api'))();

torrentSearch.enableProvider('ThePirateBay');


console.log(torrentSearch.getActiveProviders());
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

    torrentSearch.search(query, type, 10)
    .then(torrents =>{
    	if(torrents.length == 0){
    		res.json({ message : 'torrent not available' });
    	



    	}
    	else
         res.json(torrents);
    })
    .catch(err => {
        console.log(err);
    });
 }

});




let port =3000;
app.listen(port,()=>{

console.log('listening on port '+ port);
});
// console.log(TorrentSearchApi);
// console.log('**********************************************')

// console.log(torrentSearch.getActiveProviders());
// console.log(torrentSearch.getProviders());

// console.log(torrentSearch.getActiveProviders());
//try to finish only one completely i.e TV / movies and automate

/*torrentSearch.search('game of thrones','video',10)
     .then(torrents => {
     	console.log(torrents);
    });*/