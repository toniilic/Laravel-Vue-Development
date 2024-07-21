<template>
  <div class="image-editor">
    <h2>Image Editor</h2>
    <input type="file" @change="onFileSelected">
    <canvas ref="canvas"></canvas>
    <div class="controls">
      <button @click="applyFilter('grayscale')">Grayscale</button>
      <button @click="applyFilter('sepia')">Sepia</button>
      <button @click="crop">Crop</button>
      <button @click="rotate">Rotate 90°</button>
      <button @click="flip('horizontal')">Flip Horizontal</button>
      <button @click="flip('vertical')">Flip Vertical</button>
      <button @click="reset">Reset</button>
      <div>
        <label for="brightness">Brightness:</label>
        <input id="brightness" type="range" min="0" max="200" v-model="brightness" @input="adjustBrightness">
      </div>
      <button @click="saveImage">Save</button>
    </div>
    <div class="image-list">
      <h3>Your Images</h3>
      <ul>
        <li v-for="image in images" :key="image.id">
          {{ image.name }}
          <button @click="loadImage(image)">Load</button>
          <button @click="deleteImage(image.id)">Delete</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { fabric } from 'fabric';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ImageEditor',
  data() {
    return {
      canvas: null,
      image: null,
      brightness: 100,
      originalImage: null
    }
  },
  computed: {
    ...mapState(['images'])
  },
  mounted() {
    this.canvas = new fabric.Canvas(this.$refs.canvas);
    this.fetchImages();
  },
  methods: {
    ...mapActions(['fetchImages', 'saveImage', 'updateImage', 'deleteImage']),
    onFileSelected(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (f) => {
        fabric.Image.fromURL(f.target.result, (img) => {
          this.canvas.clear();
          this.image = img;
          this.originalImage = img.clone();
          this.canvas.add(img);
          this.canvas.centerObject(img);
          this.canvas.renderAll();
        });
      };

      reader.readAsDataURL(file);
    },
    applyFilter(filter) {
      if (!this.image) return;
      if (filter === 'grayscale') {
        this.image.filters.push(new fabric.Image.filters.Grayscale());
      } else if (filter === 'sepia') {
        this.image.filters.push(new fabric.Image.filters.Sepia());
      }
      this.image.applyFilters();
      this.canvas.renderAll();
    },
    adjustBrightness() {
      if (!this.image) return;
      this.image.filters = this.image.filters.filter(filter => !(filter instanceof fabric.Image.filters.Brightness));
      this.image.filters.push(new fabric.Image.filters.Brightness({
        brightness: (this.brightness - 100) / 100
      }));
      this.image.applyFilters();
      this.canvas.renderAll();
    },
    crop() {
      if (!this.image) return;
      const cropRect = new fabric.Rect({
        width: 200,
        height: 200,
        fill: 'transparent',
        stroke: 'red',
        strokeWidth: 2
      });
      this.canvas.add(cropRect);
      this.canvas.setActiveObject(cropRect);
    },
    rotate() {
      if (!this.image) return;
      this.image.rotate(this.image.angle + 90);
      this.canvas.renderAll();
    },
    flip(direction) {
      if (!this.image) return;
      if (direction === 'horizontal') {
        this.image.set('flipX', !this.image.flipX);
      } else if (direction === 'vertical') {
        this.image.set('flipY', !this.image.flipY);
      }
      this.canvas.renderAll();
    },
    reset() {
      if (!this.originalImage) return;
      this.canvas.clear();
      this.image = this.originalImage.clone();
      this.canvas.add(this.image);
      this.canvas.centerObject(this.image);
      this.brightness = 100;
      this.canvas.renderAll();
    },
    async saveImage() {
      if (!this.image) return;
      try {
        const dataURL = this.canvas.toDataURL({
          format: 'jpeg',
          quality: 0.8
        });
        await this.saveImage({ image: dataURL });
        alert('Image saved successfully!');
      } catch (error) {
        console.error('Error saving image:', error);
        alert('Failed to save image. Please try again.');
      }
    },
    loadImage(image) {
      fabric.Image.fromURL(`/storage/${image.path}`, (img) => {
        this.canvas.clear();
        this.image = img;
        this.originalImage = img.clone();
        this.canvas.add(img);
        this.canvas.centerObject(img);
        this.brightness = 100;
        this.canvas.renderAll();
      });
    }
  }
}
</script>

<style scoped>
.image-editor {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
}
.controls, .image-list {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}
button {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}
button:hover {
  background-color: #45a049;
}
input[type="range"] {
  width: 200px;
}
.image-list ul {
  list-style-type: none;
  padding: 0;
}
.image-list li {
  margin-bottom: 10px;
}
</style>
