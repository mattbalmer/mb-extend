describe('mb-extend (unsafe)', function() {
    var Vehicle = function(make, model, wheels, doors) {
        this.make = make;
        this.model = model;
        this.wheels = wheels;
        this.doors = doors;
    };
    Vehicle.prototype.identify = function() {
        return this.make + ' ' + this.model;
    };

    beforeEach(function() {
        mb.extend.unsafe();
    });

    describe('unsafe mode', function() {
        it("should add a function 'extend' to the Function prototype", function() {
            expect(Function.prototype.extend).toEqual(jasmine.any(Function));
        });

        it("should set 'unsafeMode' to true", function() {
            expect(mb.extend.unsafeMode).toBe(true);
        });
    });

    describe('subclasses', function() {
        var Car;

        beforeEach(function() {
            Car = Vehicle.extend(function(){});
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
        it('should exist on the constructor prototype', function() {
            var Car = Vehicle.extend(function() {
                expect(this.super).toEqual(jasmine.any(Function));
            });
            new Car('Honda', 'Accord');
        });

        it('should call the parent with the given arguments', function() {
            var Car = Vehicle.extend(function(make, model) {
                this.super(make, model, 4, 4);
            });

            var car = new Car('Honda', 'Accord');

            expect(car.make).toEqual('Honda');
            expect(car.model).toEqual('Accord');
            expect(car.doors).toEqual(4);
            expect(car.wheels).toEqual(4);
        });
    });
});