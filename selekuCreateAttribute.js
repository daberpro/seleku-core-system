let setAttribute = (tagParent,attribute,inner,child)=>{

	for(let attr in attribute){

		if(tagParent.tagName.toLowerCase().trim() === "s-if" && attribute.hasOwnProperty(attr) && attr.trim() === "condition"){

			selekuConditionHandler()

		}

		if(attribute.hasOwnProperty(attr) && attr.trim() === "loop"){

			selekuLooping(attribute[attr][0],inner,tagParent,child);

		}else if(attribute.hasOwnProperty(attr)){

			tagParent.setAttribute(attr,attribute[attr]);

		}

	}

}