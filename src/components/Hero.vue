<template>
    <div 
        class="game-element hero"
        :style="coordinates"
    >
        <div :style="dimensions"/>
    </div>
</template>

<script>
import BaseGameElement from './BaseGameElement.js';
export default {
    extends: BaseGameElement,
    computed: {
        coordinates() {
            return {
                left: `${this.x}px`,
                top: '50%'
            };
        }
        
    }
}
</script>

<style>

</style>