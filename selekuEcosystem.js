let Ecosystem = (object,component,nativeText)=>{

	allContext.push(Reactivity(object,(args)=>{

		if(typeof args[2] === "string" || typeof args[2] === "number"){

			if(nativeText.match(/\{.*?\}/igm)[0].replace(/\{/igm,"").replace(/\}/igm,"")?.trim() === args[1]?.trim()) component.textContent = nativeText.replace(nativeText.match(/\{.*?\}/igm)[0],args[2]);

		}

		if(args[2] instanceof HTMLElement){

			component.appendChild(args[2]);

		}

	}));

}
