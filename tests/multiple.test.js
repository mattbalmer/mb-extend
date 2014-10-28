describe('mb-extend (multiple)', function() {

    var Card,
        Land,
        Forest,
        BreedingPool;

    beforeEach(function() {
        mb.extend.unsafe();

        // == Card
        Card = function Card(props) {
            this.props = props;
        };
        Card.prototype.describe = function() {
            return this.props;
        };
        Card.prototype.card = function() {
            return 'is a Card';
        };

        // == Land
        Land = Card.extend(function Land(props) {
            props = props || {};
            props.type = props.type || 'Land';
            this.super(props);
        });
        Land.prototype.land = function() {
            return 'is a Land';
        };

        // == Forest
        Forest = Land.extend(function Forest(props) {
            props = props || {};
            props.name = props.name || 'Forest';
            this.super(props);
        });
        Forest.prototype.forest = function() {
            return 'is a Forest';
        };

        // == BreedingPool
        BreedingPool = Forest.extend(function BreedingPool(props) {
            props = props || {};
            props.colors = props.colors || [ 'Green', 'Black' ];
            this.super(props);
        });
        BreedingPool.prototype.breedingPool = function() {
            return 'is a Breeding Pool';
        };
    });

    describe('basic', function() {
        it('should work at 3 levels', function() {
            var forest = new Forest();

            expect(forest.describe()).toEqual({
                name: 'Forest',
                type: 'Land'
            });
        });

        it('should work at 4 levels', function() {
            var breedingPool = new BreedingPool();

            expect(breedingPool.describe()).toEqual({
                colors: ['Green','Black'],
                name: 'Forest',
                type: 'Land'
            });
        });
    });

    describe('advanced', function() {
        it('should override properties', function() {
            var breedingPool = new BreedingPool({
                type: 'Advanced Land',
                name: 'Breeding Pool'
            });

            expect(breedingPool.describe()).toEqual({
                colors: ['Green','Black'],
                type: 'Advanced Land',
                name: 'Breeding Pool'
            });
        });

        it('should be instanceof', function() {
            var breedingPool = new BreedingPool();

            expect(breedingPool instanceof BreedingPool).toBe(true);
            expect(breedingPool instanceof Forest).toBe(true);
            expect(breedingPool instanceof Land).toBe(true);
            expect(breedingPool instanceof Card).toBe(true);

            expect(breedingPool).toEqual(jasmine.any(BreedingPool));
            expect(breedingPool).toEqual(jasmine.any(Forest));
            expect(breedingPool).toEqual(jasmine.any(Land));
            expect(breedingPool).toEqual(jasmine.any(Card));
        });

        it('should keep all prototypes', function() {
            var breedingPool = new BreedingPool();

            expect(breedingPool.breedingPool()).toEqual('is a Breeding Pool');
            expect(breedingPool.forest()).toEqual('is a Forest');
            expect(breedingPool.land()).toEqual('is a Land');
            expect(breedingPool.card()).toEqual('is a Card');
        });
    });
});