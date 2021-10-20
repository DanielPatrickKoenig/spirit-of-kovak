<template>
  <div id="app">
    <Game />
  </div>
</template>

<script>
import Game from './components/Game.vue'

export default {
  name: 'App',
  components: {
    Game
  }
}
</script>

<style lang="scss">
#app{
  position:fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  overflow: hidden;
}
.game{
  width: 0;
  height: 0;
  position: relative;
  left: 50%;
  top: 50%;
}

.game-element{
  width: 0;
  height: 0;
  position: absolute;
  > *{
    transform: translate(-50%, -50%);
  }
  &.hero{
    > div{
      background-color: #cc0000;
    }
  }
  &.floor{
    > *{
      transform: translate(-50%, 0);
    }
    > div{
      background-color: #00cc00;
    }
  }
}
.toucher{
  position:fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
}
.floater{
  
    width: 30px;
    height: 30px;
    // content:'';
    border-radius: 30px;
    transform: translate(-50%, -50%);
  
  &.booster-1{
    // &::after{
      background: #a0733b;
    // }
  }
  &.booster-2{
    // &::after{
      background: #52a3a3;
    // }
  }
  &.blocker{
    // &::after{
      background: #b612b0;
    // }
  }
}
</style>
