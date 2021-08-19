// menggunakan jsDOM untuk memanipulasi element
const {JSDOM} = require("jsdom");

// engine akan menerima input berupa element
// dan engine akan memecah isi dari element baik itu
// attribut maupun child

const Engine = (element/*element merupakan tag html*/)=>{

	//mengambil root document untuk mengakses element
	let {body} = new JSDOM(element).window.document;

	//mengambil children (element)
	let parent = [...body.children];

	for(let x of parent){

		console.log(x.tagName)

	}

}

Engine("<h1>hello world</h1>")