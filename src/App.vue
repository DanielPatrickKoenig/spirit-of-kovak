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
body{
  background-color: #000000;
}
p, h1, h2, h3{
  padding: 0;
  margin: 0;
}
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
      background-image: url('/floor.png');
      background-size: contain;
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
  background-repeat: no-repeat;
  background-size: contain;
  background-position: bottom center;
  width: 30px;
  height: 30px;
  // content:'';
  border-radius: 30px;
  transform: translate(-50%, -50%);
  
  &.booster-1{
    // &::after{
      background-image: url('/heart.png');
      
    // }
  }
  &.booster-2{
    // &::after{
      background-image: url('/note.png');
    // }
  }
  &.blocker{
    // &::after{
      background-image: url('/spider.png');
    // }
  }
}
.stat-header{
  position: fixed;
  width: 360px;
  max-width: 100%;
  left: 50%;
  top: 0;
  transform: translate(-50%, 0);
  background-color: #eeeeee;
  > *{
    margin: 8px;
  }
  h1{
    font-size: 16px;
    text-align: center;
  }
  display: flex;
  justify-content: space-between;
  .stat-label{
    font-size: 11px;
  }
  .stat-value{
    font-size: 16px;
  }
}
.stat-bar{
  width: 120px;
  height: 5px;
  border-radius: 5px;
  overflow: hidden;
  background-color: #cccccc;
  > div{
    height: 100%;
    background-color: #cc0000;
  }
}
.modal-outer{
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,.8);
  display: flex;
  justify-content: center;
  align-items: center;
  .modal-inner{
    background-color: #ffffff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    width: 300px;
    > * {
      margin: 16px;
    }
  }
}
.game-bg{
  background-image: url('/dirt_row.png');
  width: 800px;
}
</style>
