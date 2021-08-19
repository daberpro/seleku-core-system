let Reactivity = (object,callback)=>{

	return new Proxy(object,{
		set(...args){

			callback(args.slice(0,args.length-1));

			// untuk menghandle error 
			return true;

		}
	});

}