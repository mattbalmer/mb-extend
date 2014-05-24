// Parent class
var Vehicle = function(make, model, wheels, doors) {
    this.make = make;
    this.model = model;
    this.wheels = wheels;
    this.doors = doors;
};
Vehicle.prototype.identify = function() {
    return this.make + ' ' + this.model;
};

// A subclass
var Car = mb.extend(Vehicle, function(make, model) {
    mb.extend.super(this, make, model, 4, 4);
});

// Enable unsafe (awesome) mode
mb.extend.unsafe();

// A subclass
var Truck = Vehicle.extend(function(make, model) {
    this.super(make, model, 4, 2);
});

// Results
var car = new Car('Honda', 'Accord');
var truck = new Truck('Ford', 'Thingy');

console.log( car.identify() );          // Honda Accord
console.log( truck.identify() );        // Ford Thingy

console.log( car instanceof Car );      // true
console.log( car instanceof Truck );    // false
console.log( car instanceof Vehicle );  // true

console.log( truck instanceof Car );    // false
console.log( truck instanceof Truck );  // true
console.log( truck instanceof Vehicle );// true