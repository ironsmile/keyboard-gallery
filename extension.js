
PREV = 1
NEXT = 2

keyup_dispatcher = function (e) {
    var code = false;
    if (!e) var e = window.event;
    if (e.keyCode) code = e.keyCode;
    else if (e.which) code = e.which;
    if(!code || (code != 37 && code != 39)) return;
    code = (code == 37) ? PREV : NEXT;
    if (keyup_trigger) {
        keyup_trigger(code);
    }
}

keyup_trigger = function (pos) {}

trekearth = function (e) {    
    var cls = (e == PREV) ? "prev-photo" : "next-photo";
    var els = document.getElementsByClassName(cls);
    for(var i=0; i < els.length; i++){
      if(els[i].tagName && els[i].tagName.toLowerCase() == "a"){
        window.location = els[i].href;
        break;
      }
    }
}

xkcd = function (e) {
    var links = document.getElementsByTagName('a');    
    for(var i=0; i < links.length; i++){
        if (links[i].attributes.accesskey) {
            var v = links[i].attributes.accesskey.value;
            if ((v == 'n' && e == NEXT) || (v == 'p' && e == PREV)) {
                window.location = links[i].href;
                break;
            }
        } 
    }
}

questionable_content = function (e) {
    var links = document.getElementById('comicnav').getElementsByTagName('a');
    for (var i=0; i < links.length; i++) {
        var lvalue = links[i].innerHTML;
        if ((lvalue.match(/previous/i) && e == PREV) || (lvalue.match(/next/i) && e == NEXT)) {
            window.location = links[i].href;
            break;
        }
    }
}

order_of_the_stick = function (e) {
    var links = document.getElementsByTagName('a');
    for (var i=0; i < links.length; i++) {
        if (!links[i].children.length || !links[i].children[0].tagName.match(/img/i)) {
            continue;
        }
        var img = links[i].children[0];
        var lvalue = (img.attributes.alt) ? img.attributes.alt.value : "";
        if ((lvalue.match(/previous/i) && e == PREV) || (lvalue.match(/next/i) && e == NEXT)) {
            window.location = links[i].href;
            break;
        }
    }
}

imdb = function (e) {
    $('a.btn.secondary.small').each(function(i, l){
	l = $(l);
	if ((l.html().match(/prev/i) && e == PREV) || (l.html().match(/next/i) && e == NEXT)) {
	    window.location = l.attr('href');
	    return;
	}
    });
}

romantically_apocalyptic = function (e) {
	
	var btn = [];
	
	if (e == NEXT) {
		btn = $('a[title="Go to next page"]');
	} else if (e == PREV) {
		btn = $('a[title="Go to previous page"]')
	}
	
	if (btn.length > 0) {
		window.location = btn.attr('href');
	}
	
}

here = window.location.href;

if (here.match(/trekearth.+\/gallery/)) {
    
    document.body.onkeyup = keyup_dispatcher;
	keyup_trigger = trekearth;
	
} else if (here.match(/https?:\/\/(www\.)?xkcd\.com/)) {

    document.body.onkeyup = keyup_dispatcher;
	keyup_trigger = xkcd;
	
} else if (here.match(/questionablecontent/)) {

    document.body.onkeyup = keyup_dispatcher;
    keyup_trigger = questionable_content;
    
} else if (here.match(/giantitp\.com\/comics/)) {
    
    document.body.onkeyup = keyup_dispatcher;
    keyup_trigger = order_of_the_stick;
        
} else if (here.match(/imdb\.com\/media/)) {
    
    document.body.onkeyup = keyup_dispatcher;
    keyup_trigger = imdb;
    
} else if (here.match(/https?:\/\/(www\.)?romanticallyapocalyptic\.com/)) {
	
	document.body.onkeyup = keyup_dispatcher;
    keyup_trigger = romantically_apocalyptic;

}
