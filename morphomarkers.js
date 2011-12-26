// Main Menu functions
// This is also a good template for writing imagejs modules.
// The main thing is to keep your code within a function call and not generate global variables.
// use instead imagejs.modules[yourModule]

imagejs.msg('morphomarkers v0.1 loaded'); // to notify via console and div#msg

(function(){
	var menu={
		Start:function(){console.log('Morphomarker acquisition started')},
		End:function(){console.log('Morphomarker acquisition ended')}
	}
	var name= 'Morphomarkers v0.1';
	imagejs.menu(menu,name);
})()