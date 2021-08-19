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

class selekuLoop extends HTMLElement{
	constructor(){
		super()
	}
}

class selekuCondition extends HTMLElement{
	constructor(){
		super()
	}
}

customElements.define("s-t",selekuText);
customElements.define("s-l",selekuLoop);
customElements.define("s-if",selekuCondition);