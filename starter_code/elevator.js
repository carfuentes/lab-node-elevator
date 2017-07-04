class Elevator {
  constructor(){
    this.direction="up";
    this.floor      = 0;
    this.MAXFLOOR   = 10;
    this.requests   = [];
    this.passengers=[];
    this.waitingList =[];
    this.interval=0;
  }

  start() {
    this.interval= setInterval(()=>
    this.update(),1000);
  }
  //stop(interval) { setTimeout(()=> clearInterval(interval), 3000); }
  stops() { if (this.requests.length===0) {clearInterval(this.interval);} }


  update() {
    this._passengersEnter();
    this._passengersLeave();
    this.changeDirection();
    this.moves();
    this.log();
    console.log(this.requests);
    this.stops();
  }

  _passengersEnter() {
    for (let element of this.waitingList) {
      if (element.originFloor === this.floor) {
        console.log(`${element.name} has enter the elevator`);
        this.requests.push(element.destinationFloor);
        this.passengers.push(element);
        this.requests.splice(this.requests.indexOf(element.originFloor),1);
        this.waitingList.splice(this.waitingList.indexOf(element),1);
      }
    }
  }
  _passengersLeave() {
    for (let element of this.passengers) {
    if (element.destinationFloor === this.floor) {
      console.log(`${element.name} has left the elevator`);
      this.requests.splice(this.requests.indexOf(element.destinationFloor),1);
      this.passengers.splice(this.passengers.indexOf(element),1);
    }
  }
}

  floorUp() {
    let up= this.floor+1;
    if (up > this.MAXFLOOR) {
      this.floor =this.MAXFLOOR;
    } else {
      this.floor=up;
    }
  }

  floorDown() {
    let down= this.floor-1;
    if (down < 0) {
      this.floor =0;
    } else {
      this.floor=down;
    }
  }

  moves() {
    switch(this.direction) {
      case "up":
      this.floorUp();
      break;
      case "down":
      this.floorDown();
      break;
    }

  }

  call(person) {
  this.waitingList.push(person);
  this.requests.push(person.originFloor);
}

  log() {
  let names= this.passengers.map((element)=> element.name);
  console.log(`Direction: ${this.direction} | Floor: ${this.floor} | Passengers: ${names}`);
}

changeDirection() {
  for (let request of this.requests) {
    if (request < this.floor) {
      this.direction="down";
    } else if (request > this.floor) {
      this.direction="up";
    }
  }
}

}


module.exports = Elevator;
