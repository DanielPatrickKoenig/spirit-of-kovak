<template>
  <div class="game">
        <div
            class="game-bg"
            :style="{height: `${gameHeight}px`, transform: `translate(-50%, -${gameHeight - altitude}px)`}"
        >

        </div>
        <Hero
            :width="heroData.width"
            :height="heroData.height"
            :x="heroData.x"
        />
        <div :style="{position: 'absolute', top: `${altitude}px`}">
            <Floor 
                v-for="(floor, i) in floors"
                :key="`floor-${i}`"
                :x="floor.x"
                :y="floor.y"
                :width="floor.width"
                :height="floor.height"
                :altitude="altitude"
            />
            <template
                v-for="(floater, i) in floaters"
            >
                <Booster1 
                    v-if="floater.type==='1' && floater.active && displayFloater(floater)"
                    :key="i"
                    :x="floater.x"
                    :y="floater.y"
                />
                <Booster2 
                    v-if="floater.type==='2' && floater.active && displayFloater(floater)"
                    :key="i"
                    :x="floater.x"
                    :y="floater.y"
                />
                <Blocker 
                    v-if="floater.type==='-1' && floater.active && displayFloater(floater)"
                    :key="i"
                    :x="floater.x"
                    :y="floater.y"
                />

            </template>

        </div>
        <div
            ref="toucher"
            class="toucher"
            @mousedown="doJump"
            @touchstart="doJump"
            @mousemove="doLat"
            @touchmove="doLat"
            @mouseup="isDown = false"
            @touchend="isDown = false"
        />
        <StatHeader
            :health="health"
            :healthMax="healthMax" 
            :points="points"
        />
        <ModalWindow
            v-if="gameOver"
        >
            <p>Game Over</p>
            <button @click="playAgain">
                Play Again
            </button>
        </ModalWindow>
  </div>
</template>

<script>
import Hero from './Hero.vue';
import Floor from './Floor.vue';
import Booster1 from './Booster1.vue';
import Booster2 from './Booster2.vue';
import Blocker from './Blocker.vue';
import ModalWindow from './ModalWindow.vue';
import StatHeader from './StatHeader.vue';
import Kovak from '../classes/Kovak.js';
const kovak = new Kovak();
export default {
    components: {
        Hero,
        Floor,
        Booster1,
        Booster2,
        Blocker,
        ModalWindow,
        StatHeader
    },
    data () {
        return {
            heroData: {},
            floors: [],
            floaters: [],
            altitude: 0,
            xLag: 0,
            isDown: false,
            gameOver: false,
            health: 0,
            healthMax: 0,
            points: 0,
            gameHeight: 0
        };
    },
    methods: {
        doJump(){
            this.isDown = true;
            kovak.jump();
        },
        processEvent(e){
            return e.touches ? e.touches[0] : e;
        },
        doLat(e){
            // console.log(this.processEvent(e).clientX);
            e.preventDefault();
            if(this.isDown){
                this.xLag = this.processEvent(e).clientX - (this.$refs.toucher.getBoundingClientRect().width/2);
                kovak.hero.x += (this.xLag - kovak.hero.x) / 8;
            }
            
        },
        playAgain(){
            window.location.reload();
        }

    },
    computed: {
        displayFloater(){
            return floater => {
                return Math.abs(floater.y - this.heroData.y) < 400;
            }
        }
    },
    mounted () {
        this.gameHeight = kovak.shaftHeight;
        const floorCount = 60;
        const floaterCount = 350;
        [...Array(floorCount).keys()].map((item, i) => {
            const xPosition = Math.random() > .5 ? 185 : -185;
            const yPosition = ((kovak.shaftHeight / floorCount) * -1) * (i + 1);
            kovak.addFloor(xPosition, yPosition, 80);
        });
        [...Array(floaterCount).keys()].map((item, i) => {
            const xPosition = ((Math.random() - .5) * 2) * 120;
            const yPosition = ((kovak.shaftHeight / floaterCount) * -1) * (i + 1);
            kovak.addFloater(xPosition, yPosition);
        });
        kovak.setUpdateHandler((k) => {
            this.heroData = {
                x: k.hero.x,
                y: k.hero.y,
                width: k.hero.width,
                height: k.hero.height
            },
            this.floors = k.floors.map(item => {
                return {
                    x: item.x,
                    y: item.y,
                    width: item.width,
                    height: item.height
                }
            });
            this.floaters = k.floaters.map(item => {
                return {
                    x: item.x,
                    y: item.y,
                    active: item.active,
                    type: item.getType()
                }
            });
            this.health = k.health;
            this.healthMax = k.healthMax;
            this.points = k.points;
            this.altitude = k.altitude;
            this.gameOver = k.gameOver;
            
        });
    }
}
</script>

<style>

</style>