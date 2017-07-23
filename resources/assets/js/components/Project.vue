<template lang="html">
    <div class="project-container">
        
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data: function() {
        return {
            projectId: '',
            project: ''
        }
    },
    mounted() {
        this.projectId = parseInt(document.getElementById('project-id').innerHTML);

        axios.get('/api/projects').then((res) => {
            this.project = res.data[0];
        });
    }
}
</script>

<style lang="css">
</style>
