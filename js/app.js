
(function () {
    "use strict";
	
    var list = (".student-list > li");
    var listOfStudents = document.querySelectorAll(list);

    var displayTotal = 10;
    var students = document.querySelectorAll(list).length;
    var studentTotals = Math.ceil(students / displayTotal);
    var defaultPage = 1;
    var students = document.getElementsByClassName("student-list");
    var displayStatus = true;
    function showStudent(displayTotal, defaultPage) {
        var toStudents = displayTotal * defaultPage;
        var fromStudents = toStudents - displayTotal;
        for (var i = 0; i < listOfStudents.length; i++) {
            i >= fromStudents && i < toStudents ? fadeIn(listOfStudents[i]) : listOfStudents[i].style.display = "none";
        }
    }
    // calculate page amount
    function pagination(studentTotals) {
        document.getElementById('pagination-list').innerHTML = '';
        for(let j = 1; j < studentTotals + 1; j++) {
            document.getElementById("pagination-list").innerHTML += "<li><a href='#'>" + j + "</a></li>";
        }
        if(document.querySelector('#pagination-list li:first-child > a')) {
            document.querySelector('#pagination-list li:first-child > a').className += 'active';
        }
    }
    // hide original and reveal paginated list
    function startStudent(studentTotals, displayTotal, defaultPage) {
        for (var i = 0; i < listOfStudents.length; i++) {
            listOfStudents[i].style.display = "none";
        }
        pagination(studentTotals);
        showStudent(displayTotal, defaultPage);
    }
    // click listener
    function paginationClick(displayStatus) {
        var elements = document.querySelectorAll("#pagination-list li > a");
        for (var k = 0; k < elements.length; k++) {
            elements[k].addEventListener('click', function(e) {
                for (var m = 0; m < elements.length; m++) {
                    elements[m].classList.remove("active");
                }
                defaultPage = e.target.textContent || e.text.innerText;
                e.target.classList ? e.target.classList.add('active') : e.target.className += ' active';

                if(displayStatus == true) {
                    showStudent(displayTotal, defaultPage);
                } else {
                    var found_elements = showSearch(displayTotal, defaultPage);
                    var el = document.querySelectorAll("#pagination-list li > a");
                    for (var m = 0; m < el.length; m++) {
                        el[m].classList.remove("active");
                    }
                    document.querySelector('#pagination-list li:nth-child('+e.target.innerHTML+') > a').className += 'active';
                }
            }, true);
        }
    }
    
	// calls
    startStudent(studentTotals, displayTotal, defaultPage);
    paginationClick(displayStatus);
    // key^listener
    search_input.addEventListener("keyup", function(a) {
        defaultPage = 1;
        var found_elements = showSearch(displayTotal, defaultPage);
        // If nothing found
        if(document.querySelector('#pagination-list').innerHTML == '') {
            document.querySelector('#pagination-list').innerHTML += 'Please try again. <a href="' + window.location.host + '">home page</a>';
        }
        // If value == '', show default
        if(a.target.value == '') {
            showStudent(displayTotal, defaultPage);
        }
    });
    // transitions
    function fadeIn(el, display){
        el.style.opacity = 0;
        el.style.display = display || "block";
        (function fade() {
            var val = parseFloat(el.style.opacity);
            if (!((val += .03) > 1)) {
                el.style.opacity = val;
                requestAnimationFrame(fade);
            }
        })();
    }
    function fadeOut(el){
        el.style.opacity = 1;
        (function fade() {
            if ((el.style.opacity -= .1) < 0) {
                el.style.display = "none";
            } else {
                requestAnimationFrame(fade);
            }
        })();
    }
}());