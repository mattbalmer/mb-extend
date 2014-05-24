(function() {
    // === extend ===
    var extend = function(parent, constructor) {
        constructor.prototype = new parent();
        constructor.prototype.parent = parent;
        constructor.prototype.constructor = constructor;

        if(extend.unsafeMode) {
            constructor.prototype.super = function() {
                this.parent.apply(this, arguments);
            };
        }

        return constructor;
    };
    extend.super = function(instance) {
        var args = Array.prototype.slice.call(arguments, 1);
        instance.parent.apply(instance, args);
    };
    extend.unsafe = function() {
        extend.unsafeMode = true;
        Function.prototype.extend = function(constructor) {
            return extend.call(null, this, constructor);
        };
    };
    extend.unsafeMode = false;

    // === Export ===
    if(typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = extend;
    }
    else {
        window.mb = window.mb || {};
        window.mb.extend = extend;
    }
}());