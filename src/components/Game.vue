<template>
  <div class="game">
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
                    v-if="floater.type==='1' && floater.active"
                    :key="i"
                    :x="floater.x"
                    :y="floater.y"
                />
                <Booster2 
                    v-if="floater.type==='2' && floater.active"
                    :key="i"
                    :x="floater.x"
                    :y="floater.y"
                />
                <Blocker 
                    v-if="floater.type==='-1' && floater.active"
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
  </div>
</template>

<script>
import Hero from './Hero.vue';
import Floor from './Floor.vue';
import Booster1 from './Booster1.vue';
import Booster2 from './Booster2.vue';
import Blocker from './Blocker.vue';
import Kovak from '../classes/Kovak.js';
const kovak = new Kovak();
export default {
    components: {
        Hero,
        Floor,
        Booster1,
        Booster2,
        Blocker
    },
    data () {
        return {
            heroData: {},
            floors: [],
            floaters: [],
            altitude: 0,
            xLag: 0,
            isDown: false
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
            if(this.isDown){
                this.xLag = this.processEvent(e).clientX - (this.$refs.toucher.getBoundingClientRect().width/2);
                kovak.hero.x += (this.xLag - kovak.hero.x) / 8;
            }
            
        }

    },
    mounted () {
        [...Array(200).keys()].map((item, i) => {
            const xPosition = (i%2) === 1 ? 100 : -100;
            kovak.addFloor(xPosition, -50 * (i + 1), 30);
        });
        [...Array(500).keys()].map((item, i) => {
            const xPosition = ((Math.random() - .5) * 2) * 200;
            kovak.addFloater(xPosition, -20 * (i + 1));
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
            this.altitude = k.altitude;
            
        });
    }
}
</script>

<style>

</style>