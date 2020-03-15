<template>
    <div>
        <b-button
        variant="primary"
        @click="fileView"
        class="col-md-offset-11 col-md-1"
        style="margin:5px"
        >원본파일보기</b-button
      >
      <b-button
        variant="primary"
        @click="resizeFileView"
        class="col-md-offset-11 col-md-1"
        style="margin:5px"
        >리사이즈파일보기</b-button
      >
      <img id="myimg" src="">
    </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/firestore";
import { mapState } from "vuex";

export default {
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState({
        user: state => state.auth.user,
        isAuthenticated: state => state.auth.isAuthenticated
        })
    },
    methods: {
        async fileView(){
                   
            var storage = firebase.storage();

            // Create a storage reference from our storage service
            var storageRef = storage.ref();
            console.log(storageRef,"storageRef")
            // Create a child reference
            var imageRef = storageRef.child('image');
            console.log(imageRef,"imagesRef")
            var spaceRef = storageRef.child('image/2020-02-29.png');
            console.log(spaceRef,"spaceRef");

            console.log(spaceRef.fullPath,"경로")
            console.log(spaceRef.name,"이름")
            console.log(spaceRef.bucket,"버킷")

            storageRef.child('image/2020-02-29.png').getDownloadURL().then(function(url) {
            // `url` is the download URL for 'images/stars.jpg'

        // var xhr = new XMLHttpRequest();
        // xhr.responseType = 'blob';
        // // xhr.onload = function(event) {
        // //   var blob = xhr.response;
        // // };
        // xhr.open('GET', url);
        // xhr.send();

            // Or inserted into an <img> element:
            var img = document.getElementById('myimg');
            img.src = url;
            console.log(url,"url")
            }).catch(function(error) {
            switch (error.code) {
                case 'storage/object-not-found':
                // File doesn't exist
                break;

                case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;

                case 'storage/canceled':
                // User canceled the upload
                break;

                

                case 'storage/unknown':
                // Unknown error occurred, inspect the server response
                break;
            }
            })
        },
        async resizeFileView(){
            var storage = firebase.storage();

            // Create a storage reference from our storage service
            var storageRef = storage.ref();
            storageRef.child('image/2020-02-29_400x400.png').getDownloadURL().then(function(url) {
            // `url` is the download URL for 'images/stars.jpg'

            // Or inserted into an <img> element:
            var img = document.getElementById('myimg');
            img.src = url;
            console.log(url,"url")
            }).catch(function(error) {
            switch (error.code) {
                case 'storage/object-not-found':
                // File doesn't exist
                break;

                case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;

                case 'storage/canceled':
                // User canceled the upload
                break;

                

                case 'storage/unknown':
                // Unknown error occurred, inspect the server response
                break;
            }
            })
        }
    }
     

}
</script>

<style>

</style>