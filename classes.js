const Chance = require('chance');
const chance = new Chance();

/**
- Чому клас виник?
- Що таке конструктор
- Методи і проперті
- Приватні проперті
- статичні методи
- getters/setters
- наслідування
- !! разні конструктори
- this
 */

const state = { healthpoints: 100, experience: 100, dateCreated: '20.11.2025Z00:00' };
const state2 = { healthpoints: 100, experience: 150, dateCreated: '20.11.2025Z10:00' };

class State {
    #dateCreated;
    
    // singleton
    static #instance; //
    static get instance(){
        if (!this.#instance) this.#instance = new State(100, 100);
        return this.#instance;
    }
    
    constructor(healthpoints, experience) {
        this.healthpoints = healthpoints;
        this.experience = experience;
        this.#dateCreated = new Date().toUTCString(); // TODO recheck on the method
    }

    gainExperience(amount) {
        this.experience += amount;
    } 

    changeHealthPoints(amount) {
        this.healthpoints += amount;
    }

    get dateCreated() {
        if (new Date().getDate() % 2 === 1) return new Error('!!!');
        return this.#dateCreated;
    }

    set dateCreated(date) {
        throw new Error('Readonly!!!');
    }

    toString() {
        return `HP:${this.healthpoints}, XP:${this.experience}, date:${this.#dateCreated}`;
    }
}

// const something = new State(100, 100);
// something.dateCreated = '20.11.2025Z10:00';
// console.log(something.toString());
// something.gainExperience(30);
// something.changeHealthPoints(-10);
// something.dateCreated;
// something.experience;
// console.log(something.toString());
// console.log(something.prop);

/**
 * Additional Reading:
 *
 * https://uk.javascript.info/classes
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
 * https://javascript.info/class
 * https://javascript.info/class-inheritance
 */

/**
 * Level - Easy
 * Task - 1 - Part 1 (verification will work only once Part 2 is implemented)
 * Implement class Figure with:
 * 1) properties name and numberOfPoints
 * 2) constructor should get numberOfPoints and name
 * 3) method getDescription - 'This is a ${name} with ${numberOfPoints} points'
 */
// enter your code here
class Figure {
}
/**
 * Level - Easy
 * Task - 1 - Part 2
 * Create an instance of a class Figure
 */
let figure; // enter your code here

/**
 * Level - Easy
 * Task - 2 - Part 1 (verification will work only once Part 2 is implemented)
 * Implement class Square that extends Figure with:
 * 1) property sideLength and figureArea
 * 2) constructor should additionally get sideLength and calculate figureArea
 * 3) getter method area that returns property figureArea
 */
// enter your code here

/**
 * Level - Easy
 * Task - 2 - Part 2
 * Create an instance of a class Square
 */
let square; // enter your code here

/**
 * Level - Normal
 * Task - 3 - Part 1 (verification will work only once Part 2 is implemented)
 * Here you can see an implementation of TV class, lets extend it!
 * Implement class myTV that extends TV with:
 * - hardcoded brand name, so we don't need to pass it via constructor every time.
 * Constructor of MyFavoriteTV should get only modelName: string and numberOfChannels: number.
 * - method getCommercialName which should return string '{brand} {model}'
 * - method plugIn which will set isPluggedIn to true
 * - method setPowerOn() which should take an argument boolean, so when we call setPowerOn(true), TV should be powered
 * on (isPoweredOn = true) in case it's isPluggedIn === true. Same for setPowerOn(false), it should change isPoweredOn
 * with the same check
 * - method switchChannel which should take a number as an argument and set activeChannel accordingly with 2 checks:
 *      - if TV is powered on
 *      - if specified channel number fits 0 < channel <= numberOfChannels
 * */

class TV {
    constructor(brandName, modelName, numberOfChannels) {
        this.brandName = brandName;
        this.modelName = modelName;
        this.numberOfChannels = numberOfChannels;
        this.isPoweredOn = false;
        this.isPluggedIn = false;
        this.activeChannel = 0;
    }
}

class MyFavoriteTV extends TV {
    constructor() {
        super("Samsung", modelName, numberOfChannels);
    }

    getCommercialName() {
        return `${this.brandName} ${this.modelName}`;
    }
    plugIn() {
        this.isPluggedIn = true;
    }
    setPowerOn(isPoweredOn) {
        if (this.isPluggedIn) {
            this.isPoweredOn = isPoweredOn;
        }
    }
    switchChannel(channelNumber) {
        if (this.isPoweredOn && channelNumber > 0 && channelNumber <= this.numberOfChannels) {
            this.activeChannel = channelNumber;
        }
    }
}

/**
 * Level - Normal
 * Task - 3 - Part 2
 * Here lets play with TV we implemented!
 * Create an instance of your {myFavoriteBrand}TV class
 * Plug it in
 * Turn it on
 * switch to 15th channel, its Friends series there at the moment!
 * enjoy!
 * */
let myTV = new MyFavoriteTV('model1', 150);
myTV.plugIn();
myTV.setPowerOn(true);
myTV.switchChannel(15);
console.log(myTV.activeChannel);



const getRandomBoolean = () => chance.bool();
const getRandomName = () => chance.name();

/**
 * Level - Normal
 * Task - 4 - Part 1
 * Here you can see an implementation of Wolf class, lets extend it!
 * Implement class Dog that extends Wolf with:
 * - #isMale: boolean private property, which should be set inside of constructor initially
 * - #name: string private property, which should be preset with string "unnamed puppy" by default
 * - #motherName: string private property, which should be set inside of constructor initially
 *
 * - getter method isMale should return current #isMale state
 * - setter method name (name: string) should set current #name
 *
 * - hunt method should override existing wolf's hunt with just typing `${this.#name} catches a ball.` to console.
 * - giveBirth(numberOfPuppies: number): Dog[] should override existing method from Wolf class. It should take number of
 * puppies, return array of new Dog objects. isMale should be defined randomly using getRandomBoolean function,
 * #motherName of puppies should contain this.#name of a Dog who gives a birth. In case we call this method and
 * this.#isMale === true for parent dog, `${this.#name} can't give a birth` error should be thrown.
 * - toString(): string method should return a string saying `Hi, I'm ${this.#name}, the son of ${this.#motherName}!`,
 * or 'daughter' should be used in case Dog's isMale === false.
 * */

class Wolf {
    hunt() {
        console.log('Wolf hunts.');
    }
    howl() {
        console.log('Howls like a real wolf.');
    }
    giveBirth(numberOfCubs) {
        const cubs = []
        while (cubs.length < numberOfCubs) {
            cubs.push(new Wolf(getRandomBoolean()));
        }
        return cubs;
    }
    toString() {
        return "Hi, I'm kinda wolf!";
    }
}

class Dog {
    // place for your code
    // todo: dont forget to extend Wolf class ^^
}

/**
 * Level - Normal
 * Task - 4 - Part 2
 * Let's create a real wolf, but do it carefully and assign to newWolf variable.
 * Let's also create a dog with isMale = false and set any valid mothersName you like, save this Dog to myDog variable.
 * Set a name "Kitty" for your new dog.
 * Please create 20 puppies and save them to the ourPuppies array. Kitty should be their mother.
 * Please set names you like (or random names from getRandomName) to all puppies we have in ourPuppies variable
 * */
let newWolf;

let myDog;

const ourPuppies = [];
/**
 * Additional tasks from codewars.com:
 *
 * https://www.codewars.com/kata/597c684822bc9388f600010f
 * https://www.codewars.com/kata/547274e24481cfc469000416
 * https://www.codewars.com/kata/55a14aa4817efe41c20000bc
 * https://www.codewars.com/kata/53f0f358b9cb376eca001079
 * https://www.codewars.com/kata/56f935002e6c0d55fa000d92
 * https://www.codewars.com/kata/577bd8d4ae2807c64b00045b
 */

module.exports = {
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
};
