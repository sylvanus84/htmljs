var htmlJs = (function(window) {

    var htmlJs = {},
        document = window.document,
        HTMLElement = window.HTMLElement;

    var tags = ["a","abbr","acronym","address","applet","area","article","aside","audio","b","base","basefont","bdi","bdo","big","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","command","datalist","dd","del","details","dfn","dialog","dir","div","dl","dt","em","embed","fieldset","figcaption","figure","font","footer","form","frame", "frameset","h1","head","header","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","map","mark","menu","meta","meter","nav","noframes","noscript","object","ol","optgroup","option","output","p","param","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strike","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","tt","u","ul","var","video","wbr"];

    var appender = function(argument, elem) {

        if (typeof argument === 'string') {
            elem.appendChild(document.createTextNode(argument));
        }

        if (Object.prototype.toString.call(argument) === '[object Array]') {
            argument.forEach(function(arg) {
                appender(arg, elem);
            });
        }

        if (argument instanceof HTMLElement) {
            elem.appendChild(argument);
        }

    };

    var getElemCreatorFn = function getElemCreatorFn(TAG) {
        return function() {
            var elem = document.createElement(TAG);

            var args = Array.prototype.slice.call(arguments);
            var first = args[0];

            if (Object.prototype.toString.call(first) === '[object Object]') {
                for (var attr in first) {
                    elem.setAttribute(attr, first[attr]);
                }
                args.shift();
            }

            args.forEach(function(argument) {
                appender(argument, elem);
            });

            return elem;
        };
    };

    tags.forEach(function(elem) {
        htmlJs[elem] = getElemCreatorFn(elem);
    });

    htmlJs.interlace = function(str, array) {
        var interlaced = [];
        for (var idx = 0, len = array.length; idx < len; idx++) {
            if (idx < len - 1) {
                interlaced.push(array[idx], str);
            } else {
                interlaced.push(array[idx]);
            }
        }
        return interlaced;
    };

    return htmlJs;
    
})(window);
