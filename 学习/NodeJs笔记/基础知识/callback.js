//callback test

function doHomework(args, callback){
	console.log(args + 'is doing homework');
	callback();	
}

doHomework('Ming',function onFinished(){
	setTimeout(function(){
	console.log('finished');
	},3000);	
});