<template>
    <div class="stat-header">
        <h1>
            Spirit of Kovak
        </h1>
        <div class="statSection">
            <p class="stat-label">Health</p>
            <StatBar
                :value="health"
                :max="healthMax"
            />
        </div>
        <div class="statSection">
            <p class="stat-label">Points</p>
            <p class="stat-value">{{points}}</p>
        </div>
    </div>
</template>

<script>
import StatBar from './StatBar.vue';
export default {
    components: {
        StatBar
    },
    props: {
        health: {
            type: Number,
            required: true
        },
        healthMax: {
            type: Number,
            required: true
        },
        points: {
            type: Number,
            required: true
        }
    }
}
</script>

<style>

</style>