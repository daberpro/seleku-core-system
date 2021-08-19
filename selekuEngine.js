let regCheck= (args)=>{

	if(/\{.*?\}/igm.test(args?.trim())) return true;
	return false;

}

export let engine = (component) =>{

	let tag = create(component["tagName"].toLowerCase());
	let content = null;
	let child_context = [];

	if(component["content"]){
	
		content = setContent(tag,component["content"]);

	}else{

		content = {content:""}

	};
	
	if(component["attribute"]) setAttribute(tag,component["attribute"],component["content"],component["children"]);
	if(component["children"] && !(component["attribute"]["loop"])) for(let child in component["children"]){

		child_context.push(engine(component["children"][child]));

	}

	for(let $x of child_context){

		$x.render(tag);
		allElement.push($x);

	}

	return {
		element: tag,
		render(target,event){

			target.appendChild(tag);
			if(typeof event === "function") event(tag,content);

			try{

				if(regCheck(content.nativeText)){

					Ecosystem({
						[content.nativeText.match(/\{.*?\}/igm)[0].replace(/\{/igm,"").replace(/\}/igm,"")]: eval(content.nativeText.match(/\{.*?\}/igm)[0].replace(/\{/igm,"").replace(/\}/igm,"")) 
					},
					content.text,
					content.nativeText);

				}

			}catch(err){

				console.warn(err.message);
				content.text.innerHTML += ` <small style="font-size:13px;font-family: sans-serif;color: red;">${err.message}</small>`;
			}

		},
		update(event){

			if(component["attribute"] && component["attribute"]["loop"]) {
				
				setAttribute(tag,component["attribute"],component["content"],component["children"]);
				
				for(let s of allContext){for(let y in s){s[y] = s[y]}}

			}
			if(typeof event === "function") event(tag,content);

		},
		destroy(event){

			if(typeof event === "function") event(tag,content);
			tag.remove();

		}
	}

}
