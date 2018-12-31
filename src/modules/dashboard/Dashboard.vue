<template>
  <div>
    <my-header>{{ $format($t.today, [localTimeString, "Beauti"]) }}</my-header>
    <img
      id="image"
      alt="Test Image"
      src="/images/rose.jpg"
    >
    <video
      id="video"
      autoplay
    ></video>
    <p>{{ frontCamera ? 'Front' : 'Back'}}</p>
    <v-btn
      color="pink"
      dark
      icon
      fab
      @click="startVideo()"
    >
      <v-icon>play_arrow</v-icon>
    </v-btn>
    <v-btn
      color="pink"
      dark
      icon
      fab
      @click="flipCamera()"
    >
      <v-icon>switch_camera</v-icon>
    </v-btn>
    <v-btn
      color="pink"
      dark
      icon
      fab
      @click="pauseVideo()"
    >
      <v-icon>pause</v-icon>
    </v-btn>
    <v-btn
      color="primary"
      dark
      icon
      fab
      @click="capturePic()"
    >
      <v-icon>fiber_manual_record</v-icon>
    </v-btn>
    <pre>{{ result }}</pre>
    <v-fab-transition>
      <v-btn
        v-show="!initButton"
        color="pink"
        dark
        fixed
        bottom
        right
        fab
        @click="call()"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { fireFunctions } from "@/firebase.js";

const LANGUAGES_MAP = {
  today: { vi: "Bây giờ là {0}, {1}", en: "Now is {0}, {1}" }
};

const flowerImage = fireFunctions.httpsCallable("flowerImage");

export default {
  name: "Dashboard",
  data: () => ({
    /** @type {boolean} */
    initButton: true,
    /** @type {MediaStream} */
    stream: null,
    /** @type {tf.FrozenModel} */
    model: null,
    /** @type {string} */
    result: "",
    frontCamera: false
  }),
  computed: {
    ...mapGetters({
      language: "layout/language"
    }),
    $t() {
      return this.$translate(LANGUAGES_MAP, this.language.value);
    },
    localTimeString() {
      return new Date().toLocaleString(this.language.value);
    }
  },
  async mounted() {
    this.initButton = false;
  },
  methods: {
    startVideo() {
      const video = document.getElementById("video");
      navigator.mediaDevices
        .getUserMedia({
          video: {
            facingMode: this.frontCamera ? "user" : "environment",
            frameRate: { ideal: 10, max: 15 }
          }
        })
        .then(stream => {
          this.stream = stream;
          video.srcObject = stream;
        });
    },
    flipCamera() {
      this.frontCamera = !this.frontCamera;
      this.startVideo();
    },
    pauseVideo() {
      if (this.stream) {
        const tracks = this.stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    },
    async capturePic() {
      const vid = document.getElementById("video");
      const canvas = document.createElement("canvas"); // create a canvas
      const ctx = canvas.getContext("2d"); // get its context
      // canvas.width = vid.videoWidth; // set its size to the one of the video
      // canvas.height = vid.videoHeight;
      canvas.width = 224;
      canvas.height = 224;
      ctx.drawImage(vid, 0, 0, 224, 224); // the video
      const blob = await new Promise(resolve => {
        canvas.toBlob(resolve, "image/jpeg"); // request a Blob from the canvas
      });
      const image = document.getElementById("image");
      image.src = URL.createObjectURL(blob);

      const data = canvas.toDataURL();
      const result = await flowerImage({ imageBase64: data });
      console.log("res", result);
      this.result = result.data.result;
    },
    async call() {
      const image = document.getElementById("image");
      const canvas = document.createElement("canvas"); // create a canvas
      const ctx = canvas.getContext("2d"); // get its context
      canvas.width = image.width; // set its size to the one of the video
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0); // the video
      const data = canvas.toDataURL();
      console.log("data", data);
      const result = await flowerImage({ imageBase64: data });
      console.log("res", result);
      this.result = result.data.result;
    }
  },
  beforeDestroy() {
    this.pauseVideo();
  }
};
</script>
