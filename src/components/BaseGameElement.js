export default {
    props: {
        width: Number,
        height: Number,
        x: Number,
        y: Number,
        altitude: Number
    },
    computed: {
        dimensions(){
            return {
                width: `${this.width}px`,
                height: `${this.height}px`
            };
        },
        coordinates() {
            return {
                left: `${this.x}px`,
                top: `${this.y}px`
            };
        }
        
    }
}