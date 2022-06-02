<template>
    <div id="look-paper-grade-ad">
        <v-col class="flex justify-space-around" >
            <Pie></Pie>
            <Histogram></Histogram>
            <Bar></Bar>
        </v-col>
    </div>
</template>

<script>
    import Pie from "./Pie.vue";
    import Histogram from "./Histogram.vue";
    import Bar from "./Bar.vue";

    export default {
        components: { Pie, Histogram, Bar},
        data() {
            return {
            };
        },
        created() {
        }
    };
</script>

<style lang="scss" scoped>
    #look-paper-grade-ad{
        .my-chart {
            margin: 0 auto;
        }
    }
</style>
