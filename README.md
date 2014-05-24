# mb-extend

Super-lightweight inheritance framework for JavaScript.

## Installation

Include mb-extend.js

    <script src='/path/to/mb-extend.js></script>

(Optional) Enable `unsafe` mode, which makes the framework much easier to use, but *may* create unintended side-effects if used with other libraries.

    mb.extend.unsafe()

## Usage

There are no changes to defining normal prototypes/classes

    var Vehicle = function(make, model, wheels, doors) {
        this.make = make;
        this.model = model;
        this.wheels = wheels;
        this.doors = doors;
    };
    Vehicle.prototype.identify = function() {
        return this.make + ' ' + this.model;
    };

### Usafe - unsafe mode

Extending a class:

    var Car = Vehicle.extend(function(make, model) {
        // ...
    });

Calling the parent's constructor

    var Car = Vehicle.extend(function(make, model) {
        this.super(make, model, 4, 4);
    });

### Usage - safe mode

Extending a class:

    var Car = mb.extend(Vehicle, function(make, model) {
        // ...
    });

Calling the parent's constructor

    var Car = mb.extend(Vehicle, function(make, model) {
        mb.extend.super(this, make, model, 4, 4);
    });

## Why Extend?

By extending a class, your subclass is now an instance of both its constructor and its parent's constructor.

    var car = new Car('Honda', 'Accord');

    console.log( car instanceof Car );      // true
    console.log( car instanceof Vehicle );  // true

This means that you will also have access to any methods of the superclass

    var car = new Car('Honda', 'Accord');

    console.log( car.identify() );      // Honda Accord

Any instances of your subclass will also have access to the parent class via `instance.parent`

    var car = new Car('Honda', 'Accord');

    console.log( car.parent == Vehicle );   // true