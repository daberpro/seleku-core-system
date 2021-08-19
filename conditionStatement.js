
export let selekuConditionHandler = (element,condition,child,engine)=>{

	let $child = [];

	for(let x of child){

		let xc = engine(x);
		xc.render(element)
		$child.push(xc);

	}

	try{

		if(typeof eval(condition) === "boolean"){

			if(eval(condition)){

				for(let x of child){

					let xc = engine(x);
					xc.render(element)
					$child.push(xc);

				}

			}else{

				for(let x of $child){

					x.destroy();

				}

			}

		}

	}catch(err){

		// do something
		console.log(err.message)

	}

	return {

		update(){

			if(typeof eval(condition) === "boolean"){

				if(eval(condition)){

					for(let x of child){

						let xc = engine(x);
						xc.render(element)
						$child.push(xc);

					}

				}else{

					for(let x of $child){

						x.destroy();

					}

				}

			}

		}

	}

}

