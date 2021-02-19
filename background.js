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

    function hideUncheckeds() {
    	var items = leftSide[0].children[1].children;
        for (var i = 0; i < items.length; i++) {
            var courseCode = items[i].children[1].innerText;
            if (items[i].children[1].children.length > 1) {
            	items[i].children[1].children[1].remove();
            }
            if (localStorage.getItem(courseCode) == "0") {
                items[i].hidden = true;
            }
        }
    }

    function checkclick(ids, courseCode) {
        var checkItem = document.getElementById(ids);
        if (checkItem.checked) {
            localStorage.removeItem(courseCode);
        }else {
            localStorage.setItem(courseCode, "0");
        }
    }

    function editBtnClick(){
    	var editBtn = document.getElementById("editLeftSide");
    	if (editBtn.innerText == " Edit") {
    		editBtn.innerText = " Save";
    		var i, j;
		    var items = leftSide[0].children[1].children;
		    for (var i = 0; i < items.length ; i++){
		    	items[i].hidden = false;
		        var courseCode = items[i].children[1].innerText;
		        var ch = "checked";
		        if (localStorage.getItem(courseCode) == "0"){
		            ch = "";
		        }
                var checkNew = document.createElement('INPUT');
                checkNew.classList = ["checkinput"];
                checkNew.id = "ch" + i;
                checkNew.style = "width:10px; height:10px;"
                checkNew.type = "checkbox";
                checkNew.checked = ch;
                let idd = checkNew.id;
                let code = courseCode;
                checkNew.onclick = function(){
                                        checkclick(idd, code);
                                    }
                items[i].children[1].appendChild(checkNew);
		    }	
    	}else {
    		editBtn.innerText = " Edit";
    		hideUncheckeds();
    	}
    }

    //leftSide[0].children[0].innerHTML = leftSide[0].children[0].innerHTML + " <a id=\"editLeftSide\" style=\"font-size: 11px;\" href=\"javascript:void(0)\" onclick=\"editBtnClick()\">Edit"


    var a = document.createElement('a');
    a.id = "editLeftSide";
    a.style = "font-size: 11px;";
    a.href = "javascript:void(0)";
    a.innerText = " Edit";
    a.onclick = function(){
        editBtnClick();
    }
    leftSide[0].children[0].appendChild(a);
    
    hideUncheckeds();

}

var mounthMap = {"Ocak":"01", "Şubat":"02", "Mart":"03", "Nisan":"04", "Mayıs":"05", "Haziran":"06", "Temmuz":"07", "Ağustos":"08", "Eylül":"09", "Ekim":"10", "Kasım":"11", "Aralık":"12", "January":"01", "February":"02", "March":"03", "April":"04", "May":"05", "June":"06", "july":"07", "August":"08", "September":"09", "October":"10", "November":"11", "December":"12"};

var idHWPage = document.URL.includes("Odevler");

var table = document.getElementById("ctl00_ContentPlaceHolder1_gvOdevListesi");
if (table != null && idHWPage) {

    var rows = table.children[0].children;

    for (var ind=0; ind < rows.length; ind++) {
        hwTitle = rows[ind].innerText.split("\n")[0];
        coursename = rows[ind].innerText.match(/[A-Z]{3,4} \d{3,4}E?/g);
        if (coursename != null) {
            hwTitle = coursename[0] + " " + hwTitle + " Deadline";
        }
        deadlineDate = rows[ind].innerText.match(/\d{2} [a-zA-ZİıĞğÜüŞşÖöÇç]+ \d{4} \d{2}:\d{2}/g)[1];
        day = deadlineDate.match(/\d{2}/g)[0];
        mounthStr = deadlineDate.match(/[a-zA-ZİıĞğÜüŞşÖöÇç]+/g)[0];
        mounth = mounthMap[mounthStr];
        year = deadlineDate.match(/\d{4}/g)[0];
        hour = deadlineDate.match(/\d{2}/g)[3];
        min = deadlineDate.match(/\d{2}/g)[4];

        dateStr = year + mounth + day + "/" + (parseInt(year + mounth + day) + 1);

        link = "https://calendar.google.com/calendar/r/eventedit?text=" + hwTitle.replaceAll(" ", "+") + "&dates=" + dateStr;

        if (rows[ind].children[0].children[rows[ind].children[0].children.length - 3].tagName == "BR") {
            rows[ind].children[0].children[rows[ind].children[0].children.length - 3].outerHTML = " | <a target=\"_blank\" href=\"" + link + "\">Google Calendar</a> <br>";
        }
    }

}
