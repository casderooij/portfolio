<template lang="html">
    <div class="cms-project-edit-container">
        <h2 class="succes-message" v-show="succesMessage">Updated project {{ project.title }}!</h2>
        <h2 class="succes-message" v-show="removeProject">Are you sure you want to remove {{ project.title }}? <button type="removeProject = false">No</button> <button v-on:click="removeProjectHandler">Yes</button></h2>
        <div class="input-block">
            <label for="project-title">Title:</label>
            <input type="text" name="project-title" v-model="project.title">
        </div>

        <div class="input-block">
            <label for="project-description">Description:</label>
            <div v-for="(description, index) in project.description">
                <textarea name="project-description" v-model="project.description[index]" rows="8" cols="80"></textarea>
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
                <div class="images" v-for="(image, index) in project.images">
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
                    <a v-bind:href="'/cms/image/' + image.id">{{ image.name }}</a>
                </div>
            </div>
        </div>

        <div class="input-block">
            <h2>Upload new image:</h2>
            <input id="imageUpload" type="file" @change="imageUpload">
        </div>

        <div class="input-block">
            <label for="project-video-url">Video url:</label>
            <input type="text" name="project-video-url" v-model="project.video_url">
        </div>

        <div class="input-block">
            <label for="project-startdate">Startdate project (Year-Mo-Da):</label>
            <input type="text" name="project-startdate" v-model="project.startdate">
            <br>
            <label for="project-enddate">Enddate project (Year-Mo-Da):</label>
            <input type="text" name="project-enddate" v-model="project.enddate">
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
            <div class="project-tags" v-for="tag in project.tags">
                <p>{{ tag.name }}</p><button type="button" v-bind:value="tag.id" name="button" v-on:click="removeTag">Remove Tag</button>
            </div>
            <br>
            <div class="project-tags-select">
                <p>Add tags:</p>
                <select multiple v-model="selectedTags">
                    <option v-bind:value="tag.id" v-for="tag in tags">{{ tag.name }}</option>
                </select>
                <button type="button" v-on:click="addTag">Add tags</button>
            </div>
        </div>

        <div class="input-block">
            <button v-on:click="handleForm">Edit Project</button>
        </div>

        <div class="input-block">
            <a v-bind:href="'/project/' + project.id" target="_blank">Check project</a><br><br>
            <a href="/cms" target="_blank">Check project block</a>
        </div>

        <div class="input-block">
            <button v-on:click="removeProject = true">Remove Project</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: ['source', 'projectid'],
    data: function() {
        return {
            succesMessage: false,
            project: '',
            meta: '',
            position: '',
            images: '',
            tags: '',
            selectedTags: [],
            removeProject: false
        }
    },
    mounted() {
        axios.get(this.source).then((res) => {
            this.project = res.data[0];
            this.meta = this.project.meta;
            this.position = this.project.block_position;
        });

        axios.get('/api/images').then((res) => {
            this.images = res.data;
        });

        axios.get('/api/tags').then((res) => {
            this.tags = res.data;
        });
    },
    methods: {
        handleForm() {
            const vm = this;
            axios.post('', {
                project: this.project
            })
            .then(function(response) {
                vm.succesMessage = true;
                console.log(response);
            })
            .catch(function(error) {
                console.log(error);
            });
        },
        addDescriptionParagraph() {
            this.project.description.push("");
        },
        removeDescriptionParagraph() {
            this.project.description.pop();
        },
        addCollaborator() {
            let object = {"name": "", "url": ""};
            this.project.meta.collaboration.push(object);
        },
        removeCollaborator() {
            this.project.meta.collaboration.pop();
        },
        addImage() {
            let object = {"image_file": "", "image_description": ""};
            this.project.images.push(object);
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
        },
        removeTag(e) {
            console.log(e.target.value);
            axios.post('/cms/removetag/' + this.project.id, {
                tag: e.target.value
            })
            .then(function(response) {
                console.log('tag removed')
            })
            .catch(function(error) {
                console.log(error);
            });
        },
        addTag() {
            axios.post('/cms/addtag/' + this.project.id, {
                tags: this.selectedTags
            })
            .then(function(response) {
                console.log('tag is added');
            })
            .catch(function(error) {
                console.log(error);
            });
        },
        removeProjectHandler() {
            axios.post('/cms/project/' + this.project.id + '/remove', {
                removeproject: this.removeProject
            })
            .then(function(response) {
                console.log('project is removed');
            })
            .catch(function(error) {
                console.log(error);
            });
        }
    }
}
</script>

<style lang="css">
    .cms-project-edit-container {
        margin: 1rem 2rem;
    }

    .succes-message {
        padding: 0.5rem 0.8rem;
        background-color: lightgreen;
        display: inline-block;
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
