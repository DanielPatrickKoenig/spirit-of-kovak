<template>
  <div class="game">
        <div
            class="game-bg"
            :style="{height: `${gameHeight}px`, transform: `translate(-50%, -${gameHeight - altitude}px)`}"
        >

        </div>
        <Hero
            :class="{ reversed }"
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
            @keydown.space="onSpace"
            @keydown.left="keys.left = true"
            @keydown.right="keys.right = true"
            @keyup.left="keys.left = false"
            @keyup.right="keys.right = false"
            @keyup.esc="togglePause"
            @mousedown="doJump"
            @touchstart="doJump"
            @touchmove="doLat"
            @mouseup="isDown = false"
            @touchend="isDown = false"
            tabindex="-1"
        >
            <div>
                <p>
                    Tap To Jump
                </p>
                <p>
                    &lt; Drag sideways to move &gt;
                </p>
            </div>
            
        </div>
        <StatHeader
            :health="health"
            :healthMax="healthMax" 
            :points="points"
            @show-info="showInfo"
        />
        <ModalWindow
            v-if="gameOver"
        >
            <p>Game Over</p>
            <button @click="playAgain">
                Play Again
            </button>
        </ModalWindow>
        <ModalWindow
            v-if="showingInfo"
            class="instructions"
        >
            <h2>Spirit of Kovak</h2>
            <div>
                <p>One Fateful October, famed British Rocker, Kovak, plummeted down a spider shaft to his death. It was a terrible loss. The details of his death have long been a controversy. Some say he fell only 200 feet while others claim it was 400. But no one can deny, his spirit lives on. You can share in his spirit by helping him ascend to the heavens. Take heed of the instructions that follow to do your part for the immortal Kovak.</p>
                <div class="directions-icon kovak" />
                <h3>Kovak</h3>
                <p>Control the brave bard as he jumps and moves left to right.</p>
                <div class="grid-col-3">
                    <div class="grid-header"><span>Action</span></div> <div class="grid-header dt-controls"><span>Desktop</span></div> <div class="grid-header mobile-controls"><span>Mobile</span></div>
                    <div>Jump</div> <div class="dt-controls">Space bar</div> <div class="mobile-controls">Tap</div>
                    <div>Move left</div> <div class="dt-controls">Left key</div> <div class="mobile-controls">Swipe left</div>
                    <div>Move right</div> <div class="dt-controls">Right key</div> <div class="mobile-controls">Swipe right</div>
                </div>

                <div class="directions-icon shelf" />
                <h3>Shelves</h3>
                <p>As you ascend, these are safe places to rest.</p>

                <div class="directions-icon note" />
                <h3>Musical Notes</h3>
                <p>Grab one of these for a powerful upward boost and snag some points.</p>

                <div class="directions-icon heart" />
                <h3>Heart</h3>
                <p>If you are low on health these will help, they also provide a small upward boost.</p>  

                <div class="directions-icon spider" />
                <h3>Spider</h3>
                <p>Avoid these, they take your health and send you crashing down.</p>

            </div>
            <button @click="hideInfo">
                Continue
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
const localStorageKey = 'spirit-of-kovak:hasPlayedBefor';
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
            xHero: 0,
            isDown: false,
            gameOver: false,
            health: 0,
            healthMax: 0,
            points: 0,
            gameHeight: 0,
            reversed: false,
            keys: {
                left: false,
                right: false
            },
            showingInfo: false
        };
    },
    methods: {
        doJump(){
            if(!kovak.paused){
                this.isDown = true;
                kovak.jump();
            }
        },
        processEvent(e){
            return e.touches ? e.touches[0] : e;
        },
        doLat(e){
            // console.log(this.processEvent(e).clientX);
            e.preventDefault();
            if(this.isDown && !kovak.paused){
                this.xLag = this.processEvent(e).clientX - (this.$refs.toucher.getBoundingClientRect().width/2);
                this.xHero += (this.xLag - this.xHero) / 8;
                kovak.hero.lateral(this.xHero);
            }
            
        },
        playAgain(){
            window.location.reload();
        },
        onSpace (){
            if(!kovak.paused){
                kovak.jump();
            }
        },
        keyLat(){
            if(!kovak.paused){
                if(this.keys.left){
                    if(this.xHero < kovak.hero.x){
                        this.xHero = kovak.hero.x;
                    }
                    this.xHero += -4;
                    kovak.hero.lateral(this.xHero);
                }
                if(this.keys.right){
                    if(this.xHero > kovak.hero.x){
                        this.xHero = kovak.hero.x;
                    }
                    this.xHero += 4;
                    kovak.hero.lateral(this.xHero);
                }
            }
        },
        showInfo () {
            this.showingInfo = true;
            kovak.pause();
        },
        hideInfo () {
            localStorage.setItem(localStorageKey, 'true');
            this.showingInfo = false;
            kovak.continue();
            this.$refs.toucher.focus();
        },
        togglePause () {
            if(this.showingInfo){
                this.hideInfo();
            }
            else{
                this.showInfo();
            }
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
        this.$refs.toucher.focus();
        this.gameHeight = kovak.shaftHeight;
        const floorCount = 60;
        const floaterCount = 350;
        [...Array(floorCount).keys()].map((i) => {
            const xPosition = Math.random() > .5 ? 185 : -185;
            const yPosition = ((kovak.shaftHeight / floorCount) * -1) * (i + 1);
            kovak.addFloor(xPosition, yPosition, 80);
        });
        [...Array(floaterCount).keys()].map((i) => {
            const xPosition = ((Math.random() - .5) * 2) * 120;
            const yPosition = ((kovak.shaftHeight / floaterCount) * -1) * (i + 1);
            kovak.addFloater(xPosition, yPosition);
        });
        kovak.setUpdateHandler((k) => {
            this.keyLat();
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
            this.reversed = k.hero.reversed;
            
        });
        
        if(!localStorage.getItem(localStorageKey)){
            this.showInfo();
        }
    }
}
</script>

<style>

</style>