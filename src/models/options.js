const tmi = require('tmi.js');



const Options = function (username1, password1, channel1){
	this.options= {
		debug: true
	};
	this.connection= {
		cluster: "aws",
		reconnect: true
	};
	this.identity= {
		username: username1,
		password: password1
	};
	this.channels= [channel1]
	};



module.exports = Options;
