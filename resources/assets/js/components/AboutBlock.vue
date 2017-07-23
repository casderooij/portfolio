<template lang="html">

    <div>
        <input type="text" v-model="about.name">
        <input type="text" v-model="about.photo">

        <div v-for="(text, index) in about.text">
            <textarea v-model="about.text[index]" rows="8" cols="80"></textarea>
        </div>
        <button v-on:click="addTextParagraph">Add text</button>
        <button v-on:click="removeTextParagraph">Remove text</button>

        <div v-for="(social, index) in about.social">
            <input type="text" v-model="social.socialmedia">
            <input type="text" v-model="social.url">
        </div>
        <button v-on:click="addSocial">Add Social platform</button>
        <button v-on:click="removeSocial">Remove social platform</button>

        <input type="text" v-model="about.email">

        <button v-on:click="handleAboutForm">Edit About</button>
    </div>

</template>

<script>
import axios from 'axios';

export default {
    data: function() {
        return {
            about: ''
        }
    },
    mounted() {
        const vm = this;
        axios.get('/api/about')
        .then(function(response) {
            vm.about = response.data[0];
        })
        .catch(function(error) {
            console.log(error);
        });
    },
    methods: {
        handleAboutForm() {
            const vm = this;
            axios.post('/cms/about', {
                about: this.about
            })
            .then(function(response) {
                console.log(response);
            })
            .catch(function(error) {
                console.log(error);
            });
        },
        addTextParagraph() {
            this.about.text.push("");
        },
        removeTextParagraph() {
            this.about.text.pop();
        },
        addSocial() {
            let object = {"socialmedia": "", "url": ""};
            this.about.social.push(object);
        },
        removeSocial() {
            this.about.social.pop();
        }
    }
}
</script>

<style lang="css">
</style>
