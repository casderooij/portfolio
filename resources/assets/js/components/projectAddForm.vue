<template lang="html">
    <div class="cms-project-edit-container">
        <div class="input-block">
            <label for="project-title">Title:</label>
            <input type="text" name="project-title" v-model="title">
        </div>

        <div class="input-block">
            <label for="project-description">Description:</label>
            <div v-for="(description, index) in descriptions">
                <textarea name="project-description" v-model="descriptions[index]" rows="8" cols="80"></textarea>
            </div>
            <button v-on:click="addDescriptionParagraph" class="add-description-paragraph">Add paragraph</button>
            <button v-on:click="removeDescriptionParagraph" class="remove-description-paragraph">Remove paragraph</button>
        </div>

        <div class="input-block">
            <p>Collaboration:</p>
            <div class="collaboration" v-for="(collaborator, index) in meta.collaboration">
                <label for="project-collaboration">name:</label>
                <input type="text" name="project-collaboration-name" v-model="collaborator.name">
                <label for="project-collaboration">website:</label>
                <input type="text" name="project-collaboration-name" v-model="collaborator.url">
            </div>
            <button v-on:click="addCollaborator" class="add-collaborator">Add collaborator</button>
            <button v-on:click="removeCollaborator" class="remove-collaborator">Remove collaborator</button>

            <label for="project-location">Location:</label>
            <input type="text" name="project-location" v-model="meta.location">
        </div>

        <div class="input-block images-block">
            <div class="image-set-container">
                <div class="images" v-for="(image, index) in projectImages">
                    <label for="project-image">Image:</label>
                    <div class="project-image-thumb" v-if="image.image_file">
                        <img v-bind:src="'/' + image.image_file" alt="">
                    </div>
                    <label for="project-image-name">Image name:</label>
                    <input type="text" name="project-image-name" v-model="image.image_file">
                    <label for="project-image-description">Image description:</label>
                    <input type="text" name="project-image-description" v-model="image.image_description">
                </div>
                <button v-on:click="addImage" class="add-collaborator">Add image</button>
                <button v-on:click="removeImage" class="remove-collaborator">Remove image</button>
            </div>
            <div class="image-select-container">
                <h2>Images on server:</h2>
                <div class="images" v-for="image in images">
                    <a v-bind:href="'/cms/image/' + image.id" target="_blank">{{ image.name }}</a>
                </div>
            </div>
        </div>

        <div class="input-block">
            <h2>Upload new image:</h2>
            <input id="imageUpload" type="file" @change="imageUpload">
        </div>

        <div class="input-block">
            <label for="project-video-url">Video url:</label>
            <input type="text" name="project-video-url" v-model="video_url">
        </div>

        <div class="input-block">
            <label for="project-startdate">Startdate project (Year-Mo-Da):</label>
            <input type="text" name="project-startdate" v-model="startdate">
            <br>
            <label for="project-enddate">Enddate project (Year-Mo-Da):</label>
            <input type="text" name="project-enddate" v-model="enddate">
        </div>

        <div class="input-block">
            <label for="project-block-col">Block column:</label>
            <input type="text" name="project-block-col" v-model="position.block_col">
            <br>
            <label for="project-block-zindex">Block z-index:</label>
            <input type="text" name="project-block-zindex" v-model="position.block_z_index">
            <br>
            <label for="project-block-left">Block left location:</label>
            <input type="text" name="project-block-left" v-model="position.block_left">
            <br>
            <label for="project-block-color">Block background color:</label>
            <input type="color" name="project-block-color" v-model="position.bg_color">
        </div>

        <div class="input-block">
            <button v-on:click="addHandleForm">Add Project</button>
        </div>

        <div class="input-block">
            <a href="/cms" target="_blank">Check project block</a>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data: function() {
        return {
            title: '',
            descriptions: [],
            meta: {
                collaboration: [],
                location: ''
            },
            projectImages: [],
            video_url: 'none',
            startdate: '',
            enddate: '',
            position: {
                block_col: '',
                block_z_index: '',
                block_left: '',
                bg_color: ''
            },

            project: '',
            images: '',
        }
    },
    mounted() {
        axios.get('/api/images').then((res) => {
            this.images = res.data;
        });
    },
    methods: {
        addHandleForm() {
            axios.post('/cms/project/new', {
                title: this.title,
                description: this.descriptions,
                meta: this.meta,
                images: this.projectImages,
                video_url: this.video_url,
                startdate: this.startdate,
                enddate: this.enddate,
                block_position: this.position,
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        addDescriptionParagraph() {
            this.descriptions.push("");
        },
        removeDescriptionParagraph() {
            this.descriptions.pop();
        },
        addCollaborator() {
            let object = {"name": "", "url": ""};
            this.meta.collaboration.push(object);
        },
        removeCollaborator() {
            this.meta.collaboration.pop();
        },
        addImage() {
            let object = {"image_file": "", "image_description": ""};
            this.projectImages.push(object);
        },
        removeImage() {
            this.project.images.pop();
        },
        imageUpload(e) {
            let fileName = e.target.value.split('\\').slice().pop();

            let fileReader = new FileReader();

            fileReader.readAsDataURL(e.target.files[0]);
            fileReader.onload = (e) => {
                axios.post('/cms/imageupload', {
                    image: e.target.result,
                    name: fileName
                })
                .then(function(response) {
                    console.log('image uploaded');
                })
                .catch(function(error) {
                    console.log(error);
                });
            }
        }
    }
}
</script>

<style lang="css">
    .cms-project-edit-container {
        margin: 1rem 2rem;
    }

    .input-block {
        margin: 2rem 0;
        padding: 1rem 0;
    }

    label {
        display: block;
        font-size: 1.2rem;
        font-weight: bold;
    }

    input {
        font-size: 1.2rem;
        border: none;
        border-bottom: 1px solid #353535;
        margin: 0.5rem 0;
        display: block;
    }

    textarea {
        display: block;
        margin: 1rem 0;
        font-size: 1.2rem;
    }

    .project-image-thumb {
    }

    img {
        width: 10rem;
    }

    .images-block {
        display: flex;
    }

    .images-set-container {
    }

    .image-select-container {
        padding: 0 5rem;
    }

    p {
        font-size: 1.2rem;
        font-weight: bold;
    }

    a {
        font-size: 1.2rem;
        font-weight: bold;
    }
</style>
