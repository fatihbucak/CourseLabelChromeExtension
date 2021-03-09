//menuErisimAgaci is used in ninova as a class name for the left side which contains the courses
var leftSide = document.getElementsByClassName("menuErisimAgaci");
if (leftSide.length > 0) {
    //if the left side exist, continue from here
    //scripts contains the course names, there is a script for each courses
    var scripts = leftSide[0].getElementsByTagName("script");
    var courses = leftSide[0].getElementsByTagName("span");
    
    //this loop part is where the course codes are replaced with the course names
    for (var i = 0; i < courses.length; i++) {
        if (scripts[i].innerText.includes("var title")) {
	    //some string manupilations are made to get course name, maybe it could be better to use regex :)
            var parts = scripts[i].innerText.split(";\">");
            var courseName = parts[1].split("</span>")[0];
	    //if the course name is longer than 25, it is not looking good so it is cut after the 25th character (thanks to fatih altinpinar)
            if (courseName.length > 25) {
                courseName = courseName.substring(0, 25)
            }
            courses[i].innerHTML = courseName;
        }
    }

    //course names replacement is over, below code is about hiding unwanted courses (thanks to semih ucan)
    
    //this method is called when the site opened and when the save button clicked
    function hideUncheckeds() {
	//each item represents a course
    	var items = leftSide[0].children[1].children;
        for (var i = 0; i < items.length; i++) {
            var courseCode = items[i].children[1].innerText;
		
	    //when the save button clicked, there are checkboxes next to course codes, this condition checks its existence and removes it
            if (items[i].children[1].children.length > 1) {
            	items[i].children[1].children[1].remove();
            }
	    //if user uncheck the box, the value is set to zero. this condition checks the value and hide the course
            if (localStorage.getItem(courseCode) == "0") {
                items[i].hidden = true;
            }
        }
    }

    //this method is called when the checkbox is clicked, ids is the id of the checkbox, course code is the related courses code obviously
    function checkclick(ids, courseCode) {
        var checkItem = document.getElementById(ids);
        if (checkItem.checked) {
            localStorage.removeItem(courseCode);
        }else {
            localStorage.setItem(courseCode, "0");
        }
    }

    //this method is called when the Edit or Save button is clicked. they are the same button, only its name is changed for every click
    //
    function editBtnClick(){
    	var editBtn = document.getElementById("editLeftSide");
    	if (editBtn.innerText == " Edit") {
		//when the edit is clicked, checkbox is created and added next to course code
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
		//when the save button is clicked
    		editBtn.innerText = " Edit";
    		hideUncheckeds();
    	}
    }
	
    //Edit button is created and added when the site is opened

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

//hiding part is over
//below is about google calendar button

//this map is used to parse due date of the homework
var mounthMap = {"Ocak":"01", "Şubat":"02", "Mart":"03", "Nisan":"04", "Mayıs":"05", "Haziran":"06", "Temmuz":"07", "Ağustos":"08", "Eylül":"09", "Ekim":"10", "Kasım":"11", "Aralık":"12", "January":"01", "February":"02", "March":"03", "April":"04", "May":"05", "June":"06", "july":"07", "August":"08", "September":"09", "October":"10", "November":"11", "December":"12"};

//to prevent that this script runs on a site other that homeworks page, checks the url
var idHWPage = document.URL.includes("Odevler");

var table = document.getElementById("ctl00_ContentPlaceHolder1_gvOdevListesi");


if (table != null && idHWPage) {
    //each rows contains one homework
    var rows = table.children[0].children;

    for (var ind=0; ind < rows.length; ind++) {
	    //for each homework, necessary informations about the google calendar is collected
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
	    //a tag is created and added with the google link
        if (rows[ind].children[0].children[rows[ind].children[0].children.length - 3].tagName == "BR") {
            rows[ind].children[0].children[rows[ind].children[0].children.length - 3].outerHTML = " | <a target=\"_blank\" href=\"" + link + "\">Google Calendar</a> <br>";
        }
    }

}
