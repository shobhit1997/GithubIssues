const mongoose=require('mongoose');
var Schema=mongoose.Schema;

var RepoSchema = new Schema({
	url:String,
	total_issues:Number,
	issues_24:Number,
	issues_7:Number,
	issues_after_7:Number,
	user_id:String,
	username:String
});

module.exports=mongoose.model('Repo',RepoSchema);

