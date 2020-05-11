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
}
