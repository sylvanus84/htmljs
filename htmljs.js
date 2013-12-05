(function() {

	var domJS = {};

  var prop = function(prop) {
  	return function() {
  		return this[prop];
  	}
  }


  ["div", "input", "tr"].forEach(function(elem) {
  	domJS[elem] = getElemCreatorFn(elem);
  });
  
  ["src", "href", "disabled", "type", "value", "id"].forEach(function(attr) {
  	domJS[attr] = getAttrSetterFn(attr);
  });

  function getElemCreatorFn(ELEM) {
  	return function() {
  		var div = document.createElement(ELEM);
  		var argArray = [];
  		var idx = arguments.length;
  		while(idx--){
  			argArray.push(arguments[arguments.length - idx - 1]);
  		}
  		argArray.forEach(function(argument) {
  			if (typeof(argument) !== 'function') {
  				if (Object.prototype.toString.call(argument) === '[object Array]') {
  					argument.forEach(function(elem) {
  						div.appendChild(elem);
  					});
  				} else {
  					div.appendChild(argument);
  				}
  			} else {
  				argument.call(div);
  			}
  		});
  		return div; 
  	}
  }

  function getAttrSetterFn(ATTR) {
  	return function(attr) {
  		if (typeof(attr) == 'function') {
  			return function() {
  				this.setAttribute(ATTR, name.call(JSON.parse(this.getAttribute('_data'))))
  			}
  		} else {
  			return function() {
  				this.setAttribute(ATTR, attr);
  			};
  		}
  	}
  }

  domJS.cls = function(name) {
  	if (typeof(name) == 'function') {
  		return function() {
  			this.className = name.call(JSON.parse(this.getAttribute('_data')));
  		};
  	} else {
  		return function() {
  			this.className = name;
  		};
  	}
  };
	
  domJS.tr_from = function() {
  	
  	var dataObj = arguments[0];
  	var _tr = domJS.tr();
  	_tr.setAttribute('_data', JSON.stringify(dataObj));
  	for (var idx = 1; idx < arguments.length; idx++) {
  		var arg = arguments[idx];
  		if (typeof arg == 'function') {
  			arg.call(_tr);
  		}
  	}
  	
  	return _tr;
  }

	return {
		domJS : domJS
	};
	
})();







		
