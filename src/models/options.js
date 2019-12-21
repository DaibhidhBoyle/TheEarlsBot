const tmi = require('tmi.js');



const Options = function (){
	this.options= {
		debug: true
	};
	this.connection= {
		cluster: "aws",
		reconnect: true
	};
	this.identity= {
		username: null,
		password: null
	};
	this.channels= [null]
	};



module.exports = Options;
