// import gsap from 'gsap';
import jt from 'jstrig';
export default class Kovak{
    constructor(){
        this.gravity = 0;
        this.minGravity = -20;
        this.maxGravity = 40;
        this.altitude = 0;
        this.dampening = .5;
        this.currentCycle = 0;
        this.running = true;
        this.hero = new Hero(0, 0, 10, 20);
        this.floaters = [];
        this.floors = [new Floor(0, 0, 5000)];
        this.onUpdate = null;
        this.cycle();
    }
    cycle(){
        this.update();
        setTimeout(() => {
            if(this.running){
                this.cycle();
            }
        }, 30);

        // gsap.TweenLite.to(updater, 1, {n: 1, onComplete: this.cycle, onUpdate: this.update});
    }
    update(){
        this.currentCycle++;
        if(!this.canJump()){
            this.gravity -= this.dampening;
            this.altitude += this.gravity;
            this.hero.y = this.altitude * -1;
        }
        if(this.gravity < this.minGravity){
            this.gravity = this.minGravity;
        }
        if(this.gravity > this.maxGravity){
            this.gravity = this.maxGravity;
        }
        
        console.log(this.gravity);
        if(this.onUpdate){
            this.onUpdate(this);
        }
        this.checkFloaters();
    }
    checkFloaters(){
        console.log(this.floaters);
        // this.floaters.filter(item => item.x + 10);
        this.floaters.filter(item => item.active && jt.distance({x: this.hero.x, y: this.hero.y}, {x: item.x, y: item.y }) < 15)
            .map(item => {
                item.deactivate();
                this.gravity = item.getGravityShift();
                return item;
            });
    }
    hardStop(){
        this.gravity = 0;
    }
    canJump () {
        const filteredFloors = this.floors.filter(item => item.didLand(this.hero, this.gravity));
        if(filteredFloors.length){
            this.altitude = (filteredFloors[0].y*-1) + (this.hero.height/2);
        }
        return filteredFloors.length;
    }
    jump(){
        if(this.canJump()){
            this.gravity = 10;
        }
    }
    setUpdateHandler(handler){
        this.onUpdate = handler;
        this.onUpdate(this);
        this.jump();
    }
    addFloor(x, y, width){
        this.floors.push(new Floor(x, y, width));
    }
    addFloater(x, y){
        const intVal = Math.floor(Math.random()*3);
        switch(intVal){
            case 0:{
                this.floaters.push(new Booster1(x, y));
                break;
            }
            case 1:{
                this.floaters.push(new Booster2(x, y));
                break;
            }
            case 2:{
                this.floaters.push(new Blocker(x, y));
                break;
            }
        }
    }
}
class Hero {
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}
class Floater{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.active = true;
    }
    getGravityShift () {
        return 0;
    }
    getType(){
        return '';
    }
    deactivate(){
        this.active = false;
    }
    // gravityShift
}
class Booster1 extends Floater{
    getGravityShift () {
        return 15;
    }
    getType(){
        return '1';
    }
}
class Booster2 extends Floater{
    getGravityShift () {
        return 25;
    }
    getType(){
        return '2';
    }
}
class Blocker extends Floater{
    getGravityShift () {
        return -5;
    }
    getType(){
        return '-1';
    }
}
class Floor{
    constructor(x, y, width){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = 40;
    }
    didLand(hero, gravity){
        const falling = gravity <= 0;
        const isInside = hero.x > this.x - (this.width / 2)
                        && hero.x < this.x + (this.width / 2)
                        && hero.y + (hero.height / 2) > this.y
                        && hero.y + (hero.height / 2) < this.y + this.height;
        return falling && isInside;
    }
}