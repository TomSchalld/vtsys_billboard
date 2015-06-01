function $(id) {
    return document.getElementById(id);
}

function getHttpRequest(url) {
    var xmlhttp = null;
    // Mozilla
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    // IE
    else if (window.ActiveXObject) {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
   
    xmlhttp.open("GET", url, true);
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState != 4) {
            $('posters').innerHTML = 'Seite wird geladen ...';
        }
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            $('posters').innerHTML = xmlhttp.responseText;
        }
    }
    xmlhttp.send(null);
}

function postHttpRequest(url) {
    // TO BE IMPLEMENTED!!!
	//getHttpRequest(url);
}

function putHttpRequest(url, id) {
    // TO BE IMPLEMENTED!!!
}

function deleteHttpRequest(url, id) {
    // TO BE IMPLEMENTED!!!
}