<template lang="html">
    <div class="container">
        <p class="line-text slider-title">Adjust size of timeline:</p>
        <div class="input-container">
            <p class="line-text">big</p>
            <input v-model.number="sliderval" type="range" id="timeline-range" min="2" max="28" step="0.1">
            <p class="line-text">small</p>
        </div>
    </div>
</template>

<script>
import { bus } from '../app.js';

export default {

    data: function() {
        return {
            sliderval: 8
        }
    },
    watch: {
        sliderval: function(val) {
            this.getSliderValue();
        }
    },
    methods: {
        getSliderValue: function() {
            console.log(this.sliderval);
            bus.$emit('SliderData', this.sliderval);
        }
    }
}
</script>

<style lang="css" scoped>

.container {
    /*background-color: lightgreen;*/
}

.slider-title {
    text-align: center;
}

.line-text {
    position: relative;
    border: 0;
    padding: 0 2rem 1rem 2rem;
}

.input-container {
    width: 80%;
    margin: 0 auto;
    padding: 0.83rem 0.1rem 0 0;
    /*border-left: 0.24rem solid black;
    border-right: 0.24rem solid black;*/
    display: flex;
}

input[type=range] {
  /*height: 0.24rem;*/
  -webkit-appearance: none;
  /*margin: 10px 0;*/
  width: 100%;
  margin: 1.58rem auto;
}
input[type=range]:focus {
  outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
  width: 80%;
  /*height: 0.24rem;*/
  cursor: pointer;
  animate: 0.2s;
  background: #fff;
  /*border-radius: 1px;*/
  /*border: 0.24rem solid #000;*/
}
input[type=range]::-webkit-slider-thumb {
  border: 0.24rem solid #353535;
  height: 3.16rem;
  width: 3.16rem;
  border-radius: 50%;
  background: #FFFFFF;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -0.66rem;
}
input[type=range]:focus::-webkit-slider-runnable-track {
  background: #fff;
}

/* Mozilla */
input[type=range]::-moz-range-track {
  width: 80%;
  /*height: 11px;*/
  cursor: pointer;
  animate: 0.2s;
  background: #fff;
  /*border-radius: 1px;*/
  /*border: 0px solid #010101;*/
}
input[type=range]::-moz-range-thumb {
  border: 0.24rem solid #353535;
  height: 3.16rem;
  width: 3.16rem;
  border-radius: 50%;
  background: #FFFFFF;
  cursor: pointer;
}
input[type=range]:focus::-moz-focus-outer {
    border: 0;
}

/* Microsoft */
input[type=range]::-ms-track {
  width: 80%;
  /*height: 11px;*/
  cursor: pointer;
  animate: 0.2s;
  background: transparent;
  /*border-color: transparent;*/
  color: transparent;
}
input[type=range]::-ms-fill-lower {
  background: #fff;
  /*border: 0px solid #010101;*/
  /*border-radius: 2px;*/
}
input[type=range]::-ms-fill-upper {
  background: #fff;
  /*border: 0px solid #010101;*/
  /*border-radius: 2px;*/
}
input[type=range]::-ms-thumb {
  margin-top: 0.1rem;
  border: 0.24rem solid #353535;
  height: 3.16rem;
  width: 3.16rem;
  border-radius: 50%;
  background: #FFFFFF;
  cursor: pointer;
}
input[type=range]:focus::-ms-fill-lower {
  background: #fff;
}
input[type=range]:focus::-ms-fill-upper {
  background: #fff;
}

</style>
