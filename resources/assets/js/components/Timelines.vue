<template lang="html">
    <div>
        <div class="time-lines-container">

            <div class="today-line line-text">
                {{ today }}
            </div>

            <div v-for="year in years" class="year line-text"
            v-bind:style="{
                top: year.daysPassed * space / sliderval + 'rem'
            }">
            {{ year.name }}
            </div>

        </div>
    </div>
</template>

<script>
import { bus } from '../app.js';

export default {
    data: function() {
        return {
            space: 2.6,
            today: (new Date()).toDateString(),
            years: '',
            sliderval: 8
        }
    },
    mounted() {
        this.seventeen = this.daysPassed('2017-01-01');
        this.sixteen = this.daysPassed('2016-01-01');

        this.YearCalc();

        bus.$on('SliderData', sliderval => {
            this.sliderval = sliderval;
        });
    },
    methods: {
        daysPassed: function(year) {
            let oneDay = 24*60*60*1000;
            let currentDay = new Date();
            let endDate = new Date(year);
            let diffInDays = Math.round(Math.abs((currentDay.getTime() - endDate.getTime()) / (oneDay)));

            return diffInDays;
        },
        YearCalc: function() {
            let begin = new Date(2009,12,31);
            let today = new Date();
            let years = this.diff_years(begin, today);
            let yearsObject = [];

            for(let i = 0; i < years.length; i++) {
                let days = this.daysPassed(years[i]+'-01-01');
                let object = {name:years[i],daysPassed:days};
                yearsObject.push(object);
            }

            this.years = yearsObject;
        },
        diff_years: function(dt2, dt1) {
            let first = dt2.getFullYear();
            let second = dt1.getFullYear();
            let arr = Array();

            for(let i = first; i <= second; i++) {
                arr.push(i);
            }

            return arr;
        }
    }
}
</script>

<style lang="css">
.time-lines-container {
}

.line-text {
    font-size: 1.6rem;
    font-weight: bold;
    position: absolute;
    border-bottom: 0.24rem solid #353535;
    padding-bottom: 0.4rem;
    pointer-events: none;
}

.today-line {
    right: 0rem;
    top: -2.9rem;
    text-align: right;
    padding: 0.4rem 0;
    margin: 0 -4rem;
}

.year {
    z-index: 200;
    width: 44rem;
    margin: 0 -4rem 4rem -4rem;
}
</style>
