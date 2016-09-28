const Ksanapos=require("ksana-corpus/ksanapos");
const {createCorpus,makeKPos}=require("ksana-corpus-builder");
const fs=require("fs");
const sourcepath="./";
const files=["j13.txt"];

const options={inputFormat:"htll",bits:[4,9,9,6],autoStart:true,textOnly:true}; //set textOnly not to build inverted
const corpus=createCorpus("j13",options);
const onTag=function(tag){
	const first=tag[0], payload=tag.substr(1);
	if (first==="~") {
		const r=payload.split(".");
		const vol=parseInt(r[0],10)-1;
		const page=parseInt(r[1],10)-1;
		const kpos=this.makeKPos( vol, page, 0,0);
		this.newLine(kpos, this.tPos);
	} else if (first==="^") {
		this.putField("toc",payload);
	} else if (first==="#") {

	} else if (first==="@") {

	} else {
		throw "unknown tag "+tag;
	}
}

corpus.setHandlers(
	{}, //open tag handlers
	{},  //end tag handlers
	{onTag}  //other handlers
);

files.forEach(fn=>corpus.addFile(sourcepath+fn));

corpus.writeKDB("j13.cor",function(byteswritten){
	console.log(byteswritten,"bytes written")
});
//console.log(corpus.romable.buildROM({date:(new Date()).toString()}));
console.log(corpus.totalPosting,corpus.tPos);
