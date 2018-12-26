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
    <v-btn
      color="primary"
      dark
      @click="predict()"
    >Predict</v-btn>
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
import * as tf from "@tensorflow/tfjs";
import { loadFrozenModel } from "@tensorflow/tfjs-converter";
import { fireFunctions } from "@/firebase.js";

const MODEL_URL =
  process.env.VUE_APP_ROOT_URL + "/models/tensorflowjs_model.pb";
const WEIGHTS_URL =
  process.env.VUE_APP_ROOT_URL + "/models/weights_manifest.json";

const LANGUAGES_MAP = {
  today: { vi: "Bây giờ là {0}, {1}", en: "Now is {0}, {1}" }
};

const flowerImage = fireFunctions.httpsCallable("flowerImage");

function getTopKClasses(logits, topK) {
  const predictions = tf.tidy(() => {
    return tf.softmax(logits);
  });

  const values = predictions.dataSync();
  predictions.dispose();

  let predictionList = [];
  for (let i = 0; i < values.length; i++) {
    predictionList.push({ value: values[i], index: i });
  }
  predictionList = predictionList
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, topK);

  return predictionList.map(x => {
    return { label: x.index, value: x.value };
  });
}

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
    result: ""
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
    try {
      this.model = await loadFrozenModel(MODEL_URL, WEIGHTS_URL);
    } catch (error) {
      console.log("Unable to load model", error);
    }
    // const image = document.getElementById("image");
    // model.execute({ input: tf.fromPixels(image) });
  },
  methods: {
    startVideo() {
      const video = document.getElementById("video");
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.stream = stream;
        video.srcObject = stream;
      });
    },
    pauseVideo() {
      const tracks = this.stream.getTracks();
      tracks.forEach(track => track.stop());
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
    predict() {
      if (this.model) {
        const image = document.getElementById("image");
        // const pixels = tf
        //   .reshape(tf.fromPixels(image), [1, 224, 224, 3])
        //   .asType("float32");
        // const result = this.model.predict(pixels);
        // const topK = getTopKClasses(result, 5);
        // console.log("result", result.print());
        // console.log("topK", topK);
      } else {
        console.log("No model found");
      }
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
