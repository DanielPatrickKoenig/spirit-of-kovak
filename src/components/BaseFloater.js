export default {
    props: {
        x: Number,
        y: Number
    },
    computed: {
        coordinates() {
            return {
                left: `${this.x}px`,
                top: `${this.y}px`
            };
        }
        
    }
}