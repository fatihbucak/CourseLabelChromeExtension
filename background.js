var leftSide = document.getElementsByClassName("menuErisimAgaci");
if (leftSide.length > 0) {
    var scripts = leftSide[0].getElementsByTagName("script");
    var courses = leftSide[0].getElementsByTagName("span");
    for (var i = 0; i < courses.length; i++) {
        if (scripts[i].innerText.includes("var title")) {
            var parts = scripts[i].innerText.split(";\">");
            var courseName = parts[1].split("</span>")[0];
            if (courseName.length > 25) {
                courseName = courseName.substring(0, 25)
            }
            courses[i].innerHTML = courseName;
        }
    }
    var i, j;
	//var unwanteds = ["BLG 335E", "BLG 336E", "BLG 354E", "BLG 433E", "BLG 453E", "BLG 500", "DAN 301"];
	//unwanteds array contains the code of the courses which should be hidden for you
	var unwanteds = [];
	var leftSide = document.getElementsByClassName("menuErisimAgaci");

	for (i=0; i<leftSide.item(0).getElementsByTagName("li").length; i++){
		for(j = 0; j<unwanteds.length; j++){
			if(leftSide.item(0).getElementsByTagName("li").item(i).innerHTML.includes(unwanteds[j])){
				leftSide.item(0).getElementsByTagName("li").item(i).remove();
			}
		}
	}
}
