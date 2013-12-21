var htmlJS = (function(window) {

    var htmlJS = {},
        getElemCreatorFn,
        getAttrSetterFn,
        document = window.document,
        HTMLElement = window.HTMLElement;

    getElemCreatorFn = function getElemCreatorFn(TAG) {
        return function(attributes) {
            var elem = document.createElement(TAG);
            var attr;

            for (attr in attributes) {
                elem.setAttribute(attr, attributes[attr]);
            }

            var args = Array.prototype.slice.call(arguments);
            args.shift();

            args.forEach(function(argument) {

                if (typeof argument === 'string') {
                    elem.appendChild(
                        document.createTextNode(argument)
                    );
                }

                if (Object.prototype.toString.call(argument) === '[object Array]') {
                    argument.forEach(function(arg) {
                        elem.appendChild(arg);
                    });
                }

                if (argument instanceof HTMLElement) {
                    elem.appendChild(argument);
                }

            });
            return elem;
        };
    };

    ["div", "input", "tr"].forEach(function(elem) {
        htmlJS[elem] = getElemCreatorFn(elem);
    });

    return htmlJS;
    
})(window);
