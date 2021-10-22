// import gsap from 'gsap';
import jt from 'jstrig';
export default class Kovak{
    constructor(){
        this.gravity = 0;
        this.healthMax = 10;
        this.points = 0;
        this.health = this.healthMax;
        this.minGravity = -20;
        this.maxGravity = 40;
        this.altitude = 0;
        this.dampening = .5;
        this.currentCycle = 0;
        this.running = true;
        this.hero = new Hero(0, 0, 50, 50);
        this.floaters = [];
        this.floors = [new Floor(0, 0, 5000)];
        this.onUpdate = null;
        this.shaftHeight = 10000;
        this.gameOver = false;
        this.paused = false;
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
        if(!this.paused){
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
            
            if(this.onUpdate){
                this.onUpdate(this);
            }
            this.floaters.map(item => item.descend());
            this.checkFloaters();
        }
        
    }
    checkFloaters(){
        // this.floaters.filter(item => item.x + 10);
        this.floaters.filter(item => item.active && jt.distance({x: this.hero.x, y: this.hero.y}, {x: item.x, y: item.y }) < 15)
            .map(item => {
                item.deactivate();
                this.gravity = item.getGravityShift();
                this.health += item.getHealthShift();
                this.points += item.getPointShift();
                return item;
            });
        if(this.health > this.healthMax){
            this.health = this.healthMax;
        }
        if(this.health <= 0){
            this.gameOver = true;
        }
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
        // this.jump();
    }
    addFloor(x, y, width){
        this.floors.push(new Floor(x, y, width));
    }
    addFloater(x, y){
        const intVal = Math.floor(Math.random()*7);
        switch(intVal){
            case 0:
            case 1:
            case 2:{
                this.floaters.push(new Blocker(x, y, this.shaftHeight));
                break;
            }
            case 3:
            case 4:
            case 5:{
                this.floaters.push(new Booster2(x, y, this.shaftHeight));
                break;
            }
            case 6:{
                this.floaters.push(new Booster1(x, y, this.shaftHeight));
                break;
            }
        }
    }
    pause () {
        this.paused = true;
    }
    continue () {
        this.paused = false;
    }
}
class Hero {
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.minX = -180;
        this.maxX = 180;
        this.reversed = false;
    }
    lateral(value){
        this.reversed = value < this.x;
        this.x = value;
        if(this.x > this.maxX){
            this.x = this.maxX;
        }
        if(this.x < this.minX){
            this.x = this.minX;
        }
    }
}
class Floater{
    constructor(x, y, max){
        this.x = x;
        this.y = y;
        this.max = max;
        this.active = true;
    }
    getGravityShift () {
        return 0;
    }
    getHealthShift () {
        return 0;
    }
    getPointShift () {
        return 0;
    }
    getType(){
        return '';
    }
    deactivate(){
        this.active = false;
    }
    descend(){
        this.y+=1;
        if(this.y>0){
            this.y = this.max * -1;
            this.active = true;
        }
    }
    // gravityShift
}
class Booster1 extends Floater{
    getGravityShift () {
        return 15;
    }
    getHealthShift () {
        return 2;
    }
    getPointShift () {
        return 5;
    }
    getType(){
        return '1';
    }
}
class Booster2 extends Floater{
    getGravityShift () {
        return 25;
    }
    getPointShift () {
        return 15;
    }
    getType(){
        return '2';
    }
}
class Blocker extends Floater{
    getGravityShift () {
        return -5;
    }
    getHealthShift () {
        return -1;
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