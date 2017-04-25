const sourcepath="htll/"; //manually editing files
const targetpath="xml/";  //do not save this to github
const rules=require("./rules");
const fs=require("fs");
const files=[];
for (var i=1;i<14;i++) {
	files.push(i);
}

const transtag=function(fn){
	var content=fs.readFileSync(sourcepath+fn+".txt","utf8")
				.replace(/\r?\n/g,"\n"); //use linux style linebreaks

	for (var i=0;i<rules.length;i++) {
		content=content.replace(rules[i][0],rules[i][1]);
	}
	const targetfile=targetpath+fn+".xml";
	console.log("writing to "+targetfile)
	fs.writeFileSync(targetfile,"<file>\n"+content+"\n</file>","utf8");
}
files.forEach(transtag);