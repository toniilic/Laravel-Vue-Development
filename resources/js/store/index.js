import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    images: [],
    error: null
  },
  mutations: {
    SET_IMAGES(state, images) {
      state.images = images;
    },
    ADD_IMAGE(state, image) {
      state.images.push(image);
    },
    UPDATE_IMAGE(state, updatedImage) {
      const index = state.images.findIndex(image => image.id === updatedImage.id);
      if (index !== -1) {
        state.images.splice(index, 1, updatedImage);
      }
    },
    DELETE_IMAGE(state, imageId) {
      state.images = state.images.filter(image => image.id !== imageId);
    },
    SET_ERROR(state, error) {
      state.error = error;
    }
  },
  actions: {
    async fetchImages({ commit }) {
      try {
        const response = await axios.get('/api/images');
        commit('SET_IMAGES', response.data);
      } catch (error) {
        commit('SET_ERROR', 'Failed to fetch images');
        console.error('Error fetching images:', error);
      }
    },
    async saveImage({ commit }, imageData) {
      try {
        const response = await axios.post('/api/images', imageData);
        commit('ADD_IMAGE', response.data);
      } catch (error) {
        commit('SET_ERROR', 'Failed to save image');
        console.error('Error saving image:', error);
        throw error;
      }
    },
    async updateImage({ commit }, { id, imageData }) {
      try {
        const response = await axios.put(`/api/images/${id}`, imageData);
        commit('UPDATE_IMAGE', response.data);
      } catch (error) {
        commit('SET_ERROR', 'Failed to update image');
        console.error('Error updating image:', error);
        throw error;
      }
    },
    async deleteImage({ commit }, id) {
      try {
        await axios.delete(`/api/images/${id}`);
        commit('DELETE_IMAGE', id);
      } catch (error) {
        commit('SET_ERROR', 'Failed to delete image');
        console.error('Error deleting image:', error);
        throw error;
      }
    }
  },
  getters: {
    getAllImages: state => state.images,
    getError: state => state.error
  }
});
