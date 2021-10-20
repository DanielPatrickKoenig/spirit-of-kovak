<template>
    <div class="stat-bar">
        <div :style="{width: `${(value/max)*100}%`}"/>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Number,
            required: true
        },
        max: {
            type: Number,
            required: true
        }
        
    }
}
</script>

<style>

</style>