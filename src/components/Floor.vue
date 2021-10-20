<template>
    <div 
        class="game-element floor"
        :style="coordinates"
    >
        <div :style="dimensions"/>
    </div>
</template>

<script>
import BaseGameElement from './BaseGameElement.js';
export default {
    extends: BaseGameElement,

}
</script>

<style>

</style>