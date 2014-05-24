describe('mb-extend', function() {
    var Vehicle = function(make, model, wheels, doors) {
        this.make = make;
        this.model = model;
        this.wheels = wheels;
        this.doors = doors;
    };
    Vehicle.prototype.identify = function() {
        return this.make + ' ' + this.model;
    };

    it('should exist', function() {
        expect(mb.extend).toEqual(jasmine.any(Function));
    });

    describe('unsafe mode', function() {
        it("'unsafeMode' should be false", function() {
            expect(mb.extend.unsafeMode).toBe(false);
        });

        it("should not have a function 'extend' to the Function prototype", function() {
            expect(Function.prototype.extend).not.toEqual(jasmine.any(Function));
        });
    });

    describe('subclasses', function() {
        var Car;

        beforeEach(function(){
            Car = mb.extend(Vehicle, function(){});
        });

        it('should be an instanceof itself', function() {
            var car = new Car('Honda', 'Accord');

            expect(car instanceof Car).toBe(true);
        });

        it('should be an instanceof its parent', function() {
            var car = new Car('Honda', 'Accord');

            expect(car instanceof Vehicle).toBe(true);
        });

        it("should inherit its parent's prototype methods", function() {
            var car = new Car('Honda', 'Accord');

            expect(car.identify).toBeDefined();
        });

        it('should have the parent as a variable called parent', function() {
            var car = new Car('Honda', 'Accord');

            expect(car.parent).toEqual(Vehicle);
        });
    });

    describe('super', function() {
        it('should exist', function() {
            expect(mb.extend.super).toEqual(jasmine.any(Function));
        });

        it('should not exist on the instance prototype', function() {
            var Car = mb.extend(Vehicle, function(make, model) {
                expect(this.super).not.toEqual(jasmine.any(Function));
            });
            new Car('Honda', 'Accord');
        });

        it('should call the parent with the given arguments', function() {
            var Car = mb.extend(Vehicle, function(make, model) {
                mb.extend.super(this, make, model, 4, 4);
            });

            var car = new Car('Honda', 'Accord');

            expect(car.make).toEqual('Honda');
            expect(car.model).toEqual('Accord');
            expect(car.doors).toEqual(4);
            expect(car.wheels).toEqual(4);
        });
    });
});