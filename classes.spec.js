const { describe, it } = require('mocha');
const { expect } = require('chai');
const {
	figure,
	square,
	TV,
	MyFavoriteTV,
	myTV,
	getRandomBoolean,
	getRandomName,
	Wolf,
	Dog,
	newWolf,
	myDog,
	ourPuppies,
} = require('./classes.js');
const sinon = require("sinon");

describe('Unit 5 - Easy - Classes:', () => {
	describe('Task 1 - Figure', () => {
		it('Verify Figure has property "name"', () => {
			expect(figure).to.have.property('name');
		});
		it('Verify Figure has property "numberOfPoints"', () => {
			expect(figure).to.have.property('numberOfPoints');
		});
		it('Verify Figure has method "getDescription"', () => {
			expect(figure).to.have.property('getDescription');
		});
		it('Verify Figure method "getDescription" returns correct value', () => {
			expect(figure.getDescription()).to.equal(`This is a ${figure.name} with ${figure.numberOfPoints} points`);
		});
	});

	describe('Task 2 - Square', () => {
		it('Verify Square has property "name"', () => {
			expect(square).to.have.property('name');
		});
		it('Verify Square has property "numberOfPoints"', () => {
			expect(square).to.have.property('numberOfPoints');
		});
		it('Verify Square has method "getDescription"', () => {
			expect(square).to.have.property('getDescription');
		});
		it('Verify Square method "getDescription" returns correct value', () => {
			expect(square.getDescription()).to.equal(`This is a ${square.name} with ${square.numberOfPoints} points`);
		});

		it('Verify Square has property "sideLength"', () => {
			expect(square).to.have.property('sideLength');
		});
		it('Verify Square has property "figureArea"', () => {
			expect(square).to.have.property('figureArea');
		});
		it('Verify Square getter "area" and it returns correct value', () => {
			expect(square.area).to.equal(square.figureArea);
		});
	});

	describe('Task 3 - myTV', () => {
		it('Verify MyFavoriteTV class extends TV class', () => {
			const testTV = new MyFavoriteTV('test', 1);
			expect(testTV).to.be.instanceOf(TV);
		});
		it('Verify brand name is hardcoded in myFavoriteTV', () => {
			const testBrandName = 'testBrandName';
			const myNotHardcodedTV = new MyFavoriteTV(testBrandName, 1)

			expect(myNotHardcodedTV.brandName, 'Brand name should not contain any of constructor arguments')
				.to.be.not.equal(testBrandName);
			expect(myNotHardcodedTV.brandName, 'Brand name should be defined / hardcoded')
				.to.be.not.undefined;
		});
		it('Verify method getCommercialName returns the correct string', () => {
			const testString = 'testString';
			const testTV = new MyFavoriteTV(testString, 1);
			const result = testTV.getCommercialName();

			expect(result.split(' '), 'Brand name should not contain any of constructor arguments')
				.to.contain(testString);
		});

		it('Verify isPluggedIn flag is false by default', () => {
			const testTV = new MyFavoriteTV('test', 1);
			expect(testTV.isPluggedIn, 'Expect isPluggedIn flag to be false by default')
				.to.be.equal(false)
		})
		it('Verify method plugIn sets the proper flag', () => {
			const testTV = new MyFavoriteTV('test', 1);
			testTV.plugIn()
			expect(testTV.isPluggedIn, 'Expect isPluggedIn flag to be true after plugIn method is called')
				.to.be.equal(true)
		})
		Array.from([
			{argument: true, isPluggedIn: true},
			{argument: true, isPluggedIn: false},
			{argument: false, isPluggedIn: true},
			{argument: false, isPluggedIn: false},
		]).forEach(testData =>
			it(`Verify method setPowerOn works correct with argument = ${testData.argument} and isPluggedIn state = ${testData.isPluggedIn}`, () => {
				const testTV = new MyFavoriteTV('test', 1);
				if (testData.isPluggedIn) testTV.plugIn()
				testTV.setPowerOn(testData.argument)

				expect(testTV.isPoweredOn, `Expect isPoweredOn flag to be ${testData.argument && testData.isPluggedIn}
				 after setPowerOn method is called with argument ${testData.argument} and method plugIn 
				 ${!testData.isPluggedIn && 'not '}called`)
					.to.be.equal(testData.argument && testData.isPluggedIn)
			})
		)
		Array.from([
			{argument: 1, isPoweredOn: true, numberOfChannels: 1},
			{argument: 1, isPoweredOn: false, numberOfChannels: 1},
			{argument: 2, isPoweredOn: true, numberOfChannels: 1},
			{argument: 0, isPoweredOn: true, numberOfChannels: 2},
			{argument: 15, isPoweredOn: true, numberOfChannels: 50},
		]).forEach(testData =>
			it(`Verify method switchChannel works correct with argument = ${testData.argument} and isPoweredOn state = ${testData.isPoweredOn} while TV has numberOfChannels = ${testData.numberOfChannels}`, () => {
				const testTV = new MyFavoriteTV('test', testData.numberOfChannels);
				testTV.plugIn()
				if (testData.isPoweredOn) testTV.setPowerOn(true)
				testTV.switchChannel(testData.argument)

				const isChannelInRange = testTV.numberOfChannels >= testData.argument && testData.argument > 0;
				const expectedChannelToBeSet = isChannelInRange && testData.isPoweredOn ? testData.argument : 0;
				expect(testTV.activeChannel, `Expect activeChannel to be ${expectedChannelToBeSet}`)
					.to.be.equal(expectedChannelToBeSet)
			})
		)
		it('Verify myTV is instance of MyFavoriteTV class', () => {
			expect(myTV).to.be.instanceOf(MyFavoriteTV);
		});
		it('Verify myTV is plugged in', () => {
			expect(myTV.isPluggedIn).to.be.true;
		});
		it('Verify myTV is powered on', () => {
			expect(myTV.isPoweredOn).to.be.true;
		});
		it('Verify myTV is on 15th channel now', () => {
			expect(myTV.activeChannel).to.be.equal(15);
		});
	});

	describe('Task 4 - Wolves and dogs', () => {
		it('Verify instance of the Dog class is also a Wolf', () => {
			const doggy = new Dog(getRandomBoolean(), getRandomName());
			expect(doggy).to.be.instanceOf(Wolf);
		});
		it('Verify isMale getter returns correct value for boy-puppy', () => {
			const doggy = new Dog(true, getRandomName());
			expect(doggy.isMale).to.be.true;
		});
		it('Verify isMale getter returns correct value for girl-puppy', () => {
			const doggy = new Dog(false, getRandomName());
			expect(doggy.isMale).to.be.false;
		});
		it("Verify Dog class does not have public motherName property", () => {
			const doggy = new Dog(false, getRandomName());
			expect(doggy).to.not.have.property('motherName');
		});
		it('Verify name setter works (Checking via toString method)', () => {
			const doggy = new Dog(true, getRandomName());
			doggy.name = 'test'
			expect(doggy.toString()).to.match(/test/);
		});
		it('Verify #name has a default value = "unnamed puppy" (Checking via toString method)', () => {
			const doggy = new Dog(true, getRandomName());
			expect(doggy.toString()).to.match(/unnamed puppy/);
		});
		it("Verify Dog has inherited hunt method", () => {
			const doggy = new Dog(false, getRandomName());
			expect(doggy).to.respondTo('hunt');
		});
		it("Verify Dog's hunt method overrides Wolfs method", () => {
			const consoleLogSpy = sinon.spy(console, 'log');
			const doggy = new Dog(false, getRandomName());
			doggy.hunt();
			consoleLogSpy.restore();
			expect(consoleLogSpy.getCalls()).to.have.lengthOf(1);
			expect(consoleLogSpy.getCalls()[0].firstArg).to.equal(`unnamed puppy catches a ball.`);
		});
		it("Verify Dog has toString method (isMale=true, name='Trumpy', mothersName='Kitty')", () => {
			const doggy = new Dog(true, 'Kitty');
			doggy.name = 'Trumpy';
			expect(doggy.toString()).to.equal('Hi, I\'m Trumpy, the son of Kitty!');
		});
		it("Verify Dog has toString method (isMale=false, mothersName='Test')", () => {
			const doggy = new Dog(false, 'Test');
			expect(doggy.toString()).to.equal('Hi, I\'m unnamed puppy, the daughter of Test!');
		});
		it("Verify Dog has giveBirth method and it throws an exception once called for unnamed puppy with isMale = true", () => {
			const doggy = new Dog(true, 'Test');
			try{
				doggy.giveBirth(1);
			} catch (e) {
				expect(e.message).to.equal('unnamed puppy can\'t give a birth');
			}
		});
		it("Verify Dog has giveBirth method and it throws an exception once called for Caren with isMale = true", () => {
			const doggy = new Dog(true, 'Test');
			doggy.name = 'Caren';
			try{
				doggy.giveBirth(1);
			} catch (e) {
				expect(e.message).to.equal('Caren can\'t give a birth');
			}
		});
		it("Verify Dog has giveBirth method and it creates a proper number of puppies", () => {
			const doggy = new Dog(false, 'Test');
			const puppies = doggy.giveBirth(10);
			expect(puppies).to.have.length(10);
		});
		it("Verify Dog has giveBirth method: puppies are instance of Dog class", () => {
			const doggy = new Dog(false, 'Test');
			const puppies = doggy.giveBirth(4);
			puppies.forEach(pup => expect(pup).to.be.instanceOf(Dog));
		});
		it("Verify Dog has giveBirth method: puppies have proper mothersName set", () => {
			const doggy = new Dog(false, 'Test');
			doggy.name = 'Caren';
			const puppies = doggy.giveBirth(5);
			puppies.forEach(pup => expect(pup.toString()).to.match(/Caren/));
		});
		it("Verify Dog has giveBirth method: puppies have different isMale flags preset randomly", () => {
			const doggy = new Dog(false, 'Test');
			const puppies = doggy.giveBirth(100);
			expect(puppies.filter(pup => pup.isMale).length).to.be.not.lessThan(1);
			expect(puppies.filter(pup => !pup.isMale).length).to.be.not.lessThan(1);
		});
		it("Verify Dog has inherited method howl", () => {
			const consoleLogSpy = sinon.spy(console, 'log');
			const doggy = new Dog(false, getRandomName());
			doggy.howl();
			consoleLogSpy.restore();
			expect(consoleLogSpy.getCalls()).to.have.lengthOf(1);
			expect(consoleLogSpy.getCalls()[0].firstArg).to.equal(`Howls like a real wolf.`);
		});
		it("Verify newWolf is a wolf", () => {
			expect(newWolf).to.be.instanceOf(Wolf);
		});
		it("Verify myDog is a dog", () => {
			expect(myDog).to.be.instanceOf(Dog);
		});
		it("Verify myDog name is Kitty", () => {
			expect(myDog.toString()).to.match(/Kitty/);
		});
		it("Verify myDog has isMale=false", () => {
			expect(myDog.toString()).to.match(/daughter/);
		});
		it("Verify ourPuppies contains all 20 of our puppies", () => {
			expect(ourPuppies).to.have.length(20);
		});
		it("Verify ourPuppies are puppies", () => {
			ourPuppies.forEach(pup => expect(pup).to.be.instanceOf(Dog));
		});
		it("Verify ourPuppies mother is Kitty", () => {
			ourPuppies.forEach(pup => expect(pup.toString()).to.match(/Kitty/));
		});
	});
});
