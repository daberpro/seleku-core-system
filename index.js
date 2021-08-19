let myname = "daber"
let showMessage = true;
let showMessageChild = true;
let array = [
{
	nama: "budi"
},
{
	nama: "golang"
},{
	nama: "oxtavio"
}
]

let array2 = ["mangga","apel","jeruk"]

/*
	
	System Name		: Seleku
	System Version	: v1.0.0
	creator			: DaberDev
	email			: daber.coding@gmail.com
	youtube			: https://www.youtube.com/channel/UCFQIEemKcIXhwBYpSYH0HYg

*/

// ================================================
// seleku core system
// create by DaberDev
// ================================================


// selekuText adalah class yang akan menjadi
// constructor untuk membuat tag s-t yaitu tag
// yang akan berfungsi untuk memanipulasi text
class selekuText extends HTMLElement{

	constructor(){
		super();
	}

	set content(content){

		this.innerHTML = content;

	}

	get content(){

		return this.textContent;

	}

}


// seleku loop adalah class untuk membuat 
// tag s-l yang berfungsi untuk membuat each loop
// di dalam seleku
class selekuLoop extends HTMLElement{
	constructor(){
		super()
	}
}

// seleku condition adalah class untuk membuat
// tag s-if yang berfungsi untuk membuat block 
// pengkondisian
class selekuCondition extends HTMLElement{
	constructor(){
		super()
	}
}

// melakukan register setiap class dan element
customElements.define("s-t",selekuText);
customElements.define("s-l",selekuLoop);
customElements.define("s-if",selekuCondition);

// fungsi ini akan membuat tag html dari argument
let create = (tagName)=>{

	return document.createElement(tagName);

}

// fungsi ini akan mengset isi kontent dari tag
// berdasarkan argument content dan kontent akan di set
// ke dalam argument tagParent [HTMLElement]
let setContent = (tagParent,content)=>{

	let text = document.createElement("s-t");
	text.content = content;

	tagParent.appendChild(text);

	return {
		text,
		nativeText: content
	}

}

// ini adalah fungsi untuk menghandle class selekuCondition
// dan memanipulasi tag s-if
let selekuConditionHandler = (element,condition,child,engine,props)=>{

	let $child = [];

	try{

		if(typeof eval(condition) === "boolean"){

			if(eval(condition)){

				for(let x of child){

					let xc = engine(x,props);
					xc.render(element);
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
		props,
		update(){

			if(typeof eval(condition) === "boolean"){

				if(eval(condition) === true){

					for(let x of child){

						let xc = engine(x,props);
						xc.render(element);
						// xc.update();
						$child.push(xc);

					}

				}else{

					for(let x of $child){

						x.destroy();

					}

				}

				for(let s of allContext){for(let y in s){s[y] = s[y]}}

			}

		},
		target: condition

	}

}

// fungsi ini adalah fungsi untuk menghandle class selekuLooping
// dan memanipulasi tag s-l
let selekuLoopingHandler = (args,parents,inner,children)=>{

	let token = args[0].split(" ");

	let parent = engine({
		tagName: "s-l",
		attribute: {},
		children: [],
		content: ""
	});

	let allProps = {};

	// console.log(token[2])

	// mengambil props dari token
	try{

		eval(`

			allProps = {
				${token[0]}: []
			}

			let countOfIndex = 0;

			let ${token[3]} = 0;

			for(let ${token[0]} of ${token[2]}){

				${token[3]}++;
				countOfIndex++;

				if(countOfIndex >= children.length){

					countOfIndex = 0;

					let $child = engine(children[countOfIndex],[{[token[0]]: ${token[0]},$$type: "loop",[token[3]]: ${token[3]}}]);
					$child.render(parent.element);

				}

			}

		`);

		parent.render(parents);
	

	}catch(err){

		throw err;

	}

	return {

		update(){

			parent.destroy();

			parent = engine({
				tagName: "s-l",
				attribute: {},
				children: [],
				content: ""
			});

			eval(`

				allProps = {
					${token[0]}: []
				}

				let countOfIndex = 0;

				let ${token[3]} = 0;

				for(let ${token[0]} of ${token[2]}){

					${token[3]}++;
					countOfIndex++;

					if(countOfIndex >= children.length){

						countOfIndex = 0;

						let $child = engine(children[countOfIndex],[{[token[0]]: ${token[0]},$$type: "loop",[token[3]]: ${token[3]}}]);
						$child.render(parent.element);

					}

				}

			`);

			parent.render(parents);
			for(let s of allContext){for(let y in s){s[y] = s[y]}}

		},
		target: token[2]

	}

}


// fungsi ini adalah fungsi untuk mengset attribute 
// pada argument TagParent dan di dalam fungsi ini
// beberapa tag yang memiliki attribute khusus seperti loop & condition
// akan di handle

// jadi di sini jembatan antara seleku element dengan bentukan VDOM 
let setAttribute = (tagParent,attribute,inner,child,props)=>{

	for(let attr in attribute){

		if(tagParent.tagName?.toLowerCase().trim() === "s-if" && attribute.hasOwnProperty(attr) && attr.trim() === "condition"){

			allArrayOfCondition.push(selekuConditionHandler(tagParent,attribute[attr][0],child,engine,props));

		}

		if(attribute.hasOwnProperty(attr) && attr.trim() === "loop"){

			allArrayOfLooping.push(selekuLoopingHandler(attribute[attr],tagParent,inner,child));

		}else if(attribute.hasOwnProperty(attr) && !(attribute.hasOwnProperty(attr) && attr.trim() === "condition")){

			tagParent.setAttribute(attr,attribute[attr]);

		}

	}

}


// fungsi ini erfungsi untuk membuat reaktivitas dan 
// memgembalikan nya dengan menjalankan callback function
let Reactivity = (object,callback)=>{

	return new Proxy(object,{
		set(...args){

			callback(args.slice(0,args.length-1));

			// untuk menghandle error 
			return true;

		}
	});

}

// variabel di bawah ini adalah variabel untuk Core System seleku
// note: jangan di ubah sedikit pun variabel di bawah ini
let allContext = [];
let allElement = [];
let allArrayOfLooping = [];
let allArrayOfCondition = [];


// fungsi ini berfungsi untuk melakukan regular expression
// pada setiap {} di dalam content html
let regCheck= (args)=>{

	if(/\{.*?\}/igm.test(args?.trim())) return true;
	return false;

}


// fungsi ini berfungsi untuk membuat ekosistem yang akan
// membuat lifecycle pafa setiap component
let Ecosystem = (object,component,nativeText,props)=>{

	let obj = {}

	let {
		$$type 
	} = props;

	for(let g of object){

		obj = {...obj,...g}

	}

	
	allContext.push(Reactivity(obj,(args)=>{

		if(typeof args[2] === "string" || typeof args[2] === "number"){

			if($$type === "loop" && eval(`nativeText.match(/\{${args[1].replace(/\{/igm,"").replace(/\}/igm,"")}.*?\}/igm)?.[0].replace(/\{/igm,"").replace(/\}/igm,"")?.trim()`) === args[1]?.trim().replace(/\{/igm,"").replace(/\}/igm,"")){
			
				nativeText = nativeText.replace(eval(`nativeText.match(/\{${args[1].replace(/\{/igm,"").replace(/\}/igm,"")}.*?\}/igm)[0]`),args[2]);
				component.textContent = nativeText

			}else if(eval(`nativeText.match(/\{${args[1].replace(/\{/igm,"").replace(/\}/igm,"")}.*?\}/igm)?.[0].replace(/\{/igm,"").replace(/\}/igm,"")?.trim()`) === args[1]?.trim().replace(/\{/igm,"").replace(/\}/igm,"")){

				component.textContent = nativeText.replace(eval(`nativeText.match(/\{${args[1].replace(/\{/igm,"").replace(/\}/igm,"")}.*?\}/igm)[0]`),args[2]);

			}

		}

		if(args[2] instanceof HTMLElement){

			component.appendChild(args[2]);

		}

	}));

}

// ini adalah fungsi utama dari seleku
// fungsi engine akan membuat constructor yang 
// sudah di manipulasi dan di berikan handler
// sehingga kembailan nya merupakan seleku component
let engine = (component,props) =>{

	let arrayPropObject = [];

	if(props?.length){

		let count = 0;

		for(let prop of props){

			if(prop instanceof Object && prop.hasOwnProperty("$$type") && prop["$$type"] === "loop"){

				arrayPropObject.push({
					index: count,
					name: Object.keys(prop).filter((e)=> e !== "$$type")
				});

			}
			// else{

			// 	arrayPropObject.push({
			// 		index: count,
			// 		name: Object.keys(prop).filter((e)=> e !== "$$type")
			// 	});

			// }

			count++;

		}

	}

	let getPropOfObjectLoop = ()=>{

		let stringOfPropObject = "";

		for(let $$x of arrayPropObject){

			 stringOfPropObject += `let ${$$x.name[0]}  = props[${$$x.index}]["${$$x.name[0]}"];let ${$$x.name[1]} = props[${$$x.index}]["${$$x.name[1]}"]`;

		}

		return stringOfPropObject;

	}

	let tag = create(component["tagName"].toLowerCase());
	let content = null;
	let child_context = [];

	if(component["content"]){
	
		content = setContent(tag,component["content"]);

	}else{

		content = {content:""}

	};
	
	if(component["attribute"]){
	
		setAttribute(tag,component["attribute"],component["content"],component["children"],props);

	}
	
	if(component["children"] && !(component["attribute"]["loop"]) && !(component["attribute"]["condition"])) for(let child in component["children"]){

		child_context.push(engine(component["children"][child],props));

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

					
					let allctx = [...content.nativeText.match(/\{.*?\}/igm)];

					let allState = [];

					for(let $$x of allctx){

						allState.push({
							[$$x]: eval(`(()=>{

								${getPropOfObjectLoop()}


								return eval($$x.replace(/\{/igm,"").replace(/\}/igm,""))

							})()`)
						})

					}

					// console.log(allState)

					Ecosystem(
						allState,
						content.text,
						content.nativeText,
						{$$type: (()=>{

							let result = "";

							if(props) for(let x of props){

								if(x instanceof Object && x.hasOwnProperty("$$type") && x["$$type"] === "loop"){

									result = "loop";

									break;

								}

							}

							return result;

						})()}
					);

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

// variabel ini merupakan variabel yang akan menghandle
// untuk state dan props 
let state = Reactivity({},(args)=>{

	for(let context of allContext){

		if(context.hasOwnProperty(`{${args[1]}}`)) context[`{${args[1]}}`] = args[2];

		else if(context.hasOwnProperty(args[1])) context[args[1]] = args[2];

	}

	try{

		if(typeof args[2] === "string"){
			eval(`${args[1]} = "${args[2]}"`);
		}
		else if(typeof args[2] !== "boolean"){
			eval(`${args[1]} = args[2]`);
		}

		if(eval(`${args[1]}`) instanceof Array && args[2] instanceof Array){

			for(let x of allArrayOfLooping){

				x.update();

			}

		}else if(typeof eval(`${args[1]}`) === "boolean" && typeof args[2] === "boolean"){

			// melakukan pengupdate-an untuk kodisi element
			

			if(eval(`${args[1]}`) !== args[2]){

				 eval(`${args[1]} = args[2]`);

				 for(let conditionalElement of allArrayOfCondition){

					// melakukan updat terhadap boolean yang sama
					if(args[1] === conditionalElement.target) conditionalElement.update(conditionalElement.props);

				}
			}

		}


	}catch(err){

		// console.log(err);

	}

});

// ================================================
// seleku core system
// create by DaberDev
// ================================================

let card = engine({
	tagName: "div",
	attribute:{
		"class": ["card p-10"]
	},
	children: [

		{
			tagName: "h1",
			content: "i made by seleku"
		},
		{
			tagName: "s-if",
			attribute:{
				condition: ["showMessage"]
			},
			children:[
				{
					tagName: "h2",
					content: "hello guys"
				},
				{
					tagName: "s-if",
					attribute:{
						condition: ["showMessageChild"]
					},
					children: [
						{
							tagName: "b",
							content: "hahah"
						}
					]
				}
			]
		}

	]
});


let app = {
	tagName: "DIV",
	content: "hello world ",
	attribute: {
		"class": ["box pl-10"],
		id: ["app"]
	},
	children: [
		{
			tagName: "h1",
			content: "i am {myname}",
		},
		{
			tagName: "b",
			content: "list of daber friends : "
		},
		{
			tagName: "div",
			content: "looping",
			children: [
				{
					tagName: "div",
					attribute: {
						id: ["a"]
					},
					children: [
						{
							tagName: "s-if",
							attribute: {
								condition: ["showMessage"]
							},
							children:[
								{
									tagName: "small",
									children: [],
									attribute: {},
									content: " nicee {index}"
								}
							],
							content: " {x.nama} jago "
						}
					],
					content: "{index}. {x.nama} teman {myname}"
				}
			],
			attribute:{
				loop: ["x in array index"],
				id: ["loop"]
			}
		}
	]
}

let main = engine(app);
main.render(document.body);


card.render(document.body);
state.myname = "daber"
// state.array = array;

let $$main = ()=>{

	let key = [];

	for(let ctx of allContext){

		key = [...key,...Object.keys(ctx)];

	}

	key = key.filter((e,index) =>{

		return key.indexOf(e) === index

	})

	let loopContext = ()=>{

		let text = "";

		for(let k of key){

			text += `ctx["${k}"] = ctx["${k}"];`;

		}

		return text;

	}

	
	eval(`

		for(let ctx of allContext){

			${loopContext()}

		}

	`);

}

// menginisialisasi sistem
window.onload = $$main;