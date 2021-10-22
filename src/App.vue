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
@import url('https://fonts.googleapis.com/css2?family=MedievalSharp&display=swap');
button{
  background-color: #000000;
  color: #ffcc00;
  font-family: 'MedievalSharp', cursive;
  border: none;
  font-size: 16px;
  box-shadow: 0 0 0 1px #ae1212;
  padding: 8px;
  border-radius: 4px;
}
body{
  background-color: #000000;
  font-family: 'MedievalSharp', cursive;
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
    &.reversed{
      transform: scale(-1, 1);
    }
    > div{
      background-repeat: no-repeat;
      background-size: contain;
      background-position: bottom center;
      background-image: url('https://danielpatrickkoenig.github.io/spirit-of-kovak/public/bard.png');
    }
  }
  &.floor{
    > *{
      transform: translate(-50%, 0);
    }
    > div{
      background-image: url('https://danielpatrickkoenig.github.io/spirit-of-kovak/public/floor.png');
      background-size: contain;
    }
  }
}
.toucher{
  position:fixed;
  top:0;
  left: 0;
  right:0;
  bottom:0;
  > div{
    position:absolute;
    height: 120px;
    left: 0;
    right:0;
    bottom:0;
    background-color: #ffcc00;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    pointer-events: none;
    > p{
      font-size: 20px;
    }
    @media only screen and (min-width: 768px) {
      display: none;
    }
  }
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
      background-image: url('https://danielpatrickkoenig.github.io/spirit-of-kovak/public/heart.png');
      
    // }
  }
  &.booster-2{
    // &::after{
      background-image: url('https://danielpatrickkoenig.github.io/spirit-of-kovak/public/note.png');
    // }
  }
  &.blocker{
    // &::after{
      background-image: url('https://danielpatrickkoenig.github.io/spirit-of-kovak/public/spider.png');
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
  .info{
    font-family: 'Times New Roman', Times, serif;
    font-style: italic;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 36px;
    box-shadow: 0 0 0 2px #000000;
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
    max-height: 80%;
    overflow: auto;
    > * {
      margin: 16px;
    }
  }
}
.game-bg{
  background-image: url('https://danielpatrickkoenig.github.io/spirit-of-kovak/public/dirt_row.png');
  opacity: .7;
  width: 800px;
}
.instructions{
  h2{
    font-size: 72px;
  }
  p, h3{
    margin: 4px 0;
  }
  .grid-col-3{
    margin: 0 auto;
    display: inline-grid;
    font-size: 10px;
    grid-template-columns: 60px 60px 60px;
    grid-gap: 0;
    > div{
      height: 25px;
      display:flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0 0 0 1px #000000;
      background-color: #cccccc;
      &.grid-header{
        position: relative;
        font-weight: bold;
        color: #ffffff;
        > span{
          position: relative;
        }
        &::before{
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          content: '';
          background-color: rgba(0,0,0,.4);
        }
      }
      &.dt-controls{
        background-color: #cda401
      }
      &.mobile-controls{
        background-color: #01bfcd
      }
    }
  }
  .directions-icon{
    height: 44px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    margin-top: 16px;
    &.kovak{
      background-image: url('https://danielpatrickkoenig.github.io/spirit-of-kovak/public/bard.png');
    }
    &.shelf{
      background-image: url('https://danielpatrickkoenig.github.io/spirit-of-kovak/public/floor.png');
    }
    &.heart{
      background-image: url('https://danielpatrickkoenig.github.io/spirit-of-kovak/public/heart.png');
    }
    &.note{
      background-image: url('https://danielpatrickkoenig.github.io/spirit-of-kovak/public/note.png');
    }
    &.spider{
      background-image: url('https://danielpatrickkoenig.github.io/spirit-of-kovak/public/spider.png');
    }
  }
}
</style>
