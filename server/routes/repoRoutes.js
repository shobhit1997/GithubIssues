const express=require('express');
const Repo= require('../.././app/models/repo');
const router=express.Router();
var github = require('octonode');
var client = github.client();
router.route('/search')
	.post(async function(req,res){
		var url=req.body.url;
		var ar=url.split('/');
		var l=ar.length;
		var repoName=ar[l-1];
		var username=ar[l-2];
		var link=username+'/'+repoName; 
		try{
			var user_id=await getUserId(username);
			var total_issues=await getTotal(link);
			var issues_24=await getWithin24(link);
			var issues_7=await getWithin7(link);
			var issues_after_7= total_issues - issues_24 - issues_7;

			var repo=await Repo.findOne({url});
			if(!repo){
				repo=new Repo({username,user_id,url});
			}
			repo.total_issues=total_issues;
			repo.issues_after_7=issues_after_7;
			repo.issues_24=issues_24;
			repo.issues_7=issues_7;
			await repo.save();
			res.send(repo);
		}
		catch(e){
			console.log(e);
		}

	});



router.route('/history')
	.get(async function(req,res){
		try{
			var repos=await Repo.find();
			res.send(repos);
		}
		catch(e){
			console.log(e);
		}

	});


async function getUserId(username){
	try{
		var body=await client.getAsync('/users/'+username);
		return body[1].id;
	}catch(e){
		console.log(e);
	}	
}
async function getWithin24(repo){

	var ghsearch = client.search();
	var date1=new Date(new Date().getTime()-24*60*60*1000).toISOString();
	date1=date1.substring(0,date1.indexOf('.'))+'Z';
	var date2=new Date().toISOString();
	date2=date2.substring(0,date2.indexOf('.'))+'Z';

	try{

		var issues=await ghsearch.issuesAsync({
			q:'repo:'+repo+'+type:issue+state:open+created:'+date1+'..'+date2,
			sort: 'created',
			order: 'asc'
			});
		return issues[0].total_count;
	}
	catch(e){
		console.log(e);
	}

}
async function getTotal(repo){
	var ghsearch = client.search();
	try{

		var issues=await ghsearch.issuesAsync({
			q:'repo:'+repo+'+type:issue+state:open',
			sort: 'created',
			order: 'asc'
			});
		return issues[0].total_count;
	}
	catch(e){
		console.log(e);
	}
}
async function getWithin7(repo){
	var ghsearch = client.search();
	var date1=new Date(new Date().getTime()-24*60*60*1000).toISOString();
	date1=date1.substring(0,date1.indexOf('.'))+'Z';
	var date2=new Date(new Date().getTime()-7*24*60*60*1000).toISOString();
	date2=date2.substring(0,date2.indexOf('.'))+'Z';

	try{

		var issues=await ghsearch.issuesAsync({
			q:'repo:'+repo+'+type:issue+state:open+created:'+date2+'..'+date1,
			sort: 'created',
			order: 'asc'
			});
		return issues[0].total_count;
	}
	catch(e){
		console.log(e);
	}
}

module.exports=router;