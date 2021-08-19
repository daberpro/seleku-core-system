let selekuLooping = (payload,inner,parent,child)=>{

	let token = payload.split(" ");
	parent.innerHTML = "";

	allArrayOfLooping.push(token[2]);

	eval(`let ${token[3]} = 0;if(token[1]?.trim() === "in") for(let ${token[0]} of eval(token[2])){

		${token[3]}++

		let componentLoop = engine({
			tagName: "s-l",
			content: inner.replace(inner?.match(/\{${token[0]}*\}/gim)?.[0],eval(inner?.match(/\{${token[0]}*\}/gim)?.[0].replace(/\{/igm,"").replace(/\}/igm,""))),
		});

		if(child instanceof Array && child[0] instanceof Object) for(let $xcomponent of child){

			let children = engine({
				tagName: $xcomponent?.tagName,
				nativeText:$xcomponent?.content,
				content: $xcomponent?.content?.replace($xcomponent.content?.match(/\{${token[0]}.*?\}/gim)?.[0],eval($xcomponent.content?.match(/\{${token[0]}.*?\}/gim)?.[0].replace(/\{/igm,"").replace(/\}/igm,"")))
				.replace($xcomponent.content?.match(/\{${token?.[3]}\}/gim)?.[0],eval($xcomponent.content?.match(/\{${token?.[3]}\}/gim)?.[0].replace(/\{/igm,"").replace(/\}/igm,""))),
				attribute: $xcomponent?.attribute,
				children: $xcomponent?.children
			})

			children.render(componentLoop.element);

		}

		componentLoop.render(parent);


	}`);

}