// From http://erik.eae.net/archives/2005/06/05/17.53.19/

// Mozilla 1.8 has support for
// indexOf, lastIndexOf, forEach, filter, map, some, every
//
// http://developer-test.mozilla.org/docs/Core_JavaScript_1.5_Reference:Objects:Array:lastIndexOf
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function (obj, fromIndex) {
		if (fromIndex == null) {
			fromIndex = 0;
		} else if (fromIndex < 0) {
			fromIndex = Math.max(0, this.length + fromIndex);
		}
		for (var i = fromIndex; i < this.length; i++) {
			if (this[i] === obj) return i;
		}
		return -1;
	};
}

// http://developer-test.mozilla.org/docs/Core_JavaScript_1.5_Reference:Objects:Array:lastIndexOf
if (!Array.prototype.lastIndexOf) {
	Array.prototype.lastIndexOf = function (obj, fromIndex) {
		if (fromIndex == null) {
			fromIndex = this.length - 1;
		} else if (fromIndex < 0) {
			fromIndex = Math.max(0, this.length + fromIndex);
		}
		for (var i = fromIndex; i >= 0; i--) {
			if (this[i] === obj) return i;
		}
		return -1;
	};
}


// http://developer-test.mozilla.org/docs/Core_JavaScript_1.5_Reference:Objects:Array:forEach
if (!Array.prototype.forEach) {
	Array.prototype.forEach = function (f, obj) {
		var l = this.length;	// must be fixed during loop... see docs
		for (var i = 0; i < l; i++) {
			f.call(obj, this[i], i, this);
		}
	};
}

// http://developer-test.mozilla.org/docs/Core_JavaScript_1.5_Reference:Objects:Array:filter
if (!Array.prototype.filter) {
	Array.prototype.filter = function (f, obj) {
		var l = this.length;	// must be fixed during loop... see docs
		var res = [];
		for (var i = 0; i < l; i++) {
			if (f.call(obj, this[i], i, this)) {
				res.push(this[i]);
			}
		}
		return res;
	};
}

// http://developer-test.mozilla.org/docs/Core_JavaScript_1.5_Reference:Objects:Array:map
if (!Array.prototype.map) {
	Array.prototype.map = function (f, obj) {
		var l = this.length;	// must be fixed during loop... see docs
		var res = [];
		for (var i = 0; i < l; i++) {
			res.push(f.call(obj, this[i], i, this));
		}
		return res;
	};
}

// http://developer-test.mozilla.org/docs/Core_JavaScript_1.5_Reference:Objects:Array:some
if (!Array.prototype.some) {
	Array.prototype.some = function (f, obj) {
		var l = this.length;	// must be fixed during loop... see docs
		for (var i = 0; i < l; i++) {
			if (f.call(obj, this[i], i, this)) return true;
		}
		return false;
	};
}

// http://developer-test.mozilla.org/docs/Core_JavaScript_1.5_Reference:Objects:Array:every
if (!Array.prototype.every) {
	Array.prototype.every = function (f, obj) {
		var l = this.length;	// must be fixed during loop... see docs
		for (var i = 0; i < l; i++) {
			if (!f.call(obj, this[i], i, this)) return false;
		}
		return true;
	};
}

Array.prototype.contains = function (obj) {
	return this.indexOf(obj) != -1;
};

Array.prototype.copy = function (obj) {
	return this.concat();
};

Array.prototype.insertAt = function (obj, i) {
	this.splice(i, 0, obj);
};

Array.prototype.insertBefore = function (obj, obj2) {
	var i = this.indexOf(obj2);
	if (i == -1)
		this.push(obj);
	else
		this.splice(i, 0, obj);
};

Array.prototype.removeAt = function (i) {
	this.splice(i, 1);
};

Array.prototype.remove = function (obj) {
	var i = this.indexOf(obj);
	if (i != -1) this.splice(i, 1);
};

// from https://developer.mozilla.org/En/Core_JavaScript_1.5_Reference/Global_Objects/Array/Reduce
if (!Array.prototype.reduce) {
  Array.prototype.reduce = function(fun /*, initial*/) {
    var len = this.length >>> 0;
    if (typeof fun != "function") throw new TypeError();

    // no value to return if no initial value and an empty array
    if (len == 0 && arguments.length == 1) throw new TypeError();

    var i = 0;
    if (arguments.length >= 2) {
      var rv = arguments[1];
    } else {
      do {
        if (i in this) {
          var rv = this[i++];
          break;
        }

        // if array contains no values, no initial value to return
        if (++i >= len) throw new TypeError();
      } while (true);
    }

    for (; i < len; i++) {
      if (i in this) rv = fun.call(undefined, rv, this[i], i, this);
    }

    return rv;
  };
}

// from https://developer.mozilla.org/En/Core_JavaScript_1.5_Reference/Global_Objects/Array/ReduceRight
if (!Array.prototype.reduceRight) {
  Array.prototype.reduceRight = function(fun /*, initial*/) {
    var i, len, rv;
   
    len = this.length >>> 0;
    if (typeof fun != "function") throw new TypeError();

    // no value to return if no initial value, empty array
    if (len == 0 && arguments.length == 1) throw new TypeError();

    i = len - 1;
    if (arguments.length >= 2) {
      rv = arguments[1];
    } else {
      do {
        if (i in this) {
          rv = this[i--];
          break;
        }

        // if array contains no values, no initial value to return
        if (--i < 0) throw new TypeError();
      } while (true);
    }

    for (; i >= 0; i--) {
      if (i in this) rv = fun.call(undefined, rv, this[i], i, this);
    }

    return rv;
  };
}
