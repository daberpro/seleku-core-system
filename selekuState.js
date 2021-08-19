let state = Reactivity({},(args)=>{

	try{


		if(eval(`${args[1]}`) instanceof Array && args[2] instanceof Array){

			for(let x of allElement){

				x.update();

			}

		}else if(!(eval(`${args[1]}`) instanceof Array)){

			if(typeof args[2] === "string"){
				eval(`${args[1]} = "${args[2]}"`);
			}
			else {
				eval(`${args[1]} = "${args[2]}"`);
			}

		}


	}catch(err){

		console.log(err);

	}

	for(let context of allContext){

		if(context.hasOwnProperty(args[1])) context[args[1]] = args[2];

	}

});