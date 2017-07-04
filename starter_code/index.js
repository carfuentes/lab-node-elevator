const Elevator = require('./elevator.js');
const Person = require('./person.js');


let ascensor= new Elevator();
let Maria= new Person("Maria",3,5);
let Sara= new Person("Sara",4,2);
let Fer= new Person("Fer",1,6);

ascensor.call(Fer);
ascensor.call(Maria);
ascensor.call(Sara);
ascensor.start();
