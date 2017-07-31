<template>
    <div class="block-container">
            <a class="project-container col" v-for="(project, index) in projects" v-bind:style="{
                    left: project.block_position.block_left / 8 + 'rem',
                    backgroundColor: project.block_position.bg_color,
                    height: project.days * space / 8 + 'rem',
                    top: project.diffInDays * space / sliderval + 'rem',
                    zIndex: project.block_position.block_z_index
                }"
                v-bind:class="'timeline-col-' + project.block_position.block_col"
                v-bind:href="'/project/' + project.id"
                v-bind:id="randomId[index]"
                >
                {{ project.title }}
            </a>
    </div>
</template>

<script>
    import axios from 'axios';
    import { bus } from '../app.js';

    export default {
        props: ['source'],
        data: function() {
            return {
                space: 2.6,
                projects: '',
                today: (new Date()).toLocaleDateString(),
                randomId: '',
                sliderval: 8
            }
        },
        mounted() {
            axios.get(this.source).then((res) => {
                let projects = res.data;
                this.projects = projects;

                let col1 = document.getElementsByClassName('timeline-container')[0].childNodes[1];
                let node = document.createElement('project-block');

                for(let x in projects) {
                    this.daysPassed(projects[x]);
                }
            });

            setInterval(() => {
                this.pickRandomId(this.projects);
            }, 5000);

            bus.$on('SliderData', sliderval => {
                this.sliderval = sliderval;
            });
        },
        methods: {
            daysPassed: function(project) {
                let oneDay = 24*60*60*1000;
                let currentDay = new Date();
                let endDate = new Date(project.enddate);
                let diffInDays = Math.round(Math.abs((currentDay.getTime() - endDate.getTime()) / (oneDay)));

                project['diffInDays'] = diffInDays;
            },
            pickRandomId: function(projects) {
                let idArray = [];

                let randomId = Math.floor(Math.random() * projects.length);

                projects.forEach(function(project, i) {
                    if(i === randomId) {
                        idArray.push('isActive');
                    } else {
                        idArray.push('isNotActive');
                    }
                });

                return this.randomId = idArray;
            }
        }
    }
</script>

<style media="screen">
.project-container {
        font-weight: bold;
        font-size: 2rem;
        min-height: 2rem;
        position: absolute;
        border: solid 0.24rem #353535;
        padding: 0.6rem 1.2rem 1.2rem;
        transition: background-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
    }

.project-container:hover {
    z-index: 101 !important;
    background-color: white !important;
    box-shadow: 0.4rem 0.4rem;
    transform: translate(-0.4rem, -0.4rem);
}

#isActive {
    z-index: 100 !important;
    box-shadow: 0.4rem 0.4rem;
    transform: translate(-0.4rem, -0.4rem);
}
</style>
