let setContent = (tagParent,content)=>{

	let text = document.createElement("s-t");
	text.content = content;

	tagParent.appendChild(text);

	return {
		text,
		nativeText: content
	}

}