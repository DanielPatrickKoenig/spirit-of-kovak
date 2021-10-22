<template>
    <div class="mobile-tracker">
        <div 
            class="mobile-dragger"
            @touchstart="startDrag"
            :style="{left: `${position}px`}"
            @touchmove="moveDrag"
            @touchend="endDrag"
        >
            <slot>Drag Me</slot>
        </div>
        <div 
            v-if="dragging"
            class="mobile-overlay" 
            @touchmove="moveDrag"
            @touchend="endDrag"
        />
        <a
            class="jump-button"
            @click="jumpClicked"
        >
            Jump
        </a>
        
    </div>
</template>

<script>
export default {
    data(){
        return {
            dragging: false,
            position: 0,
        }
    },
    methods: {
        processEvent(e){
            return e.touches ? e.touches[0] : e;
        },
        startDrag(e){
            e.preventDefault();
            this.dragging = true;
            this.$emit('dragger-tapped');  
        },
        moveDrag(e){
            
            if(this.dragging){
                e.preventDefault();
                const pe = this.processEvent(e);
                this.position = pe.clientX;
                this.$emit('dragger-moved', this.position);
                
            }
            
        },
        endDrag(){
            this.dragging = false;
        },
        jumpClicked(){
            this.$emit('dragger-tapped');
        }
    },
    mounted () {
        this.position = window.innerWidth / 2;
    }
}
</script>

<style>

</style>