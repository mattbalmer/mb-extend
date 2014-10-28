(function() {
    // === super ===
    var fnSuper = function(_parent, _this) {
        var args = Array.prototype.slice.call(arguments, 2);

        return _parent.apply(_this, args);
    };

    // === extend ===
    var extend = function(parent, constructor) {
        constructor.prototype = new parent();
        constructor.prototype.parent = parent;
        constructor.parent = parent;

        if(extend.unsafeMode) {
            constructor.prototype.super = function() {
                var _this = this,
                    _parent = _this.parent,
                    _args = Array.prototype.slice.call(arguments, 0);

                _this.parent = _parent.parent;

                var combinedArgs = [_parent, _this].concat(_args);
                return fnSuper.apply(null, combinedArgs);
            };
        }

        return constructor;
    };
    extend.super = function(_this) {
        var _parent = _this.parent,
            _args = Array.prototype.slice.call(arguments, 1);

        _this.parent = _parent.parent;

        var combinedArgs = [_parent, _this].concat(_args);
        return fnSuper.apply(null, combinedArgs);
    };

    // === Overwrites ===
    extend.unsafeMode = false;
    extend.unsafe = function() {
        extend.unsafeMode = true;

        Function.prototype.extend = function(constructor) {
            return extend.call(null, this, constructor);
        };

        Function.prototype.super = function() {
            var args = Array.prototype.slice.call(arguments, 0);

            var combinedArgs = [this].concat(args);
            return fnSuper.apply(null, combinedArgs);
        };
    };

    // === Export ===
    if(typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = extend;
    }
    else {
        window.mb = window.mb || {};
        window.mb.extend = extend;
    }
}());