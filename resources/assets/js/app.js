/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

window.Vue = require('vue');

Vue.config.devtools = false;
Vue.config.debug = false;
Vue.config.silent = true;

export var bus = new Vue();

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('project-block', require('./components/ProjectBlock.vue'));
Vue.component('timelines', require('./components/Timelines.vue'));
Vue.component('project', require('./components/Project.vue'));
Vue.component('project-add-form', require('./components/ProjectAddForm.vue'));
Vue.component('project-edit-form', require('./components/ProjectEditForm.vue'));
Vue.component('about-block', require('./components/AboutBlock.vue'));
Vue.component('timeline-slider', require('./components/TimelineSlider.vue'));

const app = new Vue({
    el: '#app'
});
