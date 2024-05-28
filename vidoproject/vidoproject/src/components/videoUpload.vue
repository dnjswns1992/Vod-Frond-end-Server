<template>
  <div class="container">
    <h1 class="title">Upload Your Video</h1>
    <div class="upload-options">
      <button class="upload-option btn-7" @click="setUploadType('main')">메인 타이틀 등록하기</button>
      <button class="upload-option btn-8" @click="setUploadType('episode')">에피소드 등록하기</button>
    </div>

    <!-- 메인 타이틀 등록 폼 -->
    <form @submit.prevent="mainTitleSubmit" class="form" v-if="uploadType === 'main'">
      <div class="form-group">
        <label for="title" class="label">Title</label>
        <input type="text" id="title" v-model="title" class="input" required>
      </div>

      <div class="form-group">
        <label for="description" class="label">Description</label>
        <textarea id="description" v-model="mainTitleDescription" class="textarea" rows="4" required></textarea>
      </div>

      <div class="form-group">
        <label class="label">Season</label>
        <div class="dropdown" @click="toggleDropdown('season')">
          <div class="dropdown-selected">{{ selectedSeason || 'Select a season' }}</div>
          <div class="dropdown-options" v-if="dropdownOpen.season">
            <div class="dropdown-option" v-for="season in seasons" :key="season" @click="selectSeason(season)">
              {{ season }}
            </div>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="label">Category</label>
        <div class="dropdown" @click="toggleDropdown('category')">
          <div class="dropdown-selected">{{ selectedCategory || 'Select a category' }}</div>
          <div class="dropdown-options" v-if="dropdownOpen.category">
            <div class="dropdown-option" v-for="category in categories" :key="category" @click="selectCategory(category)">
              {{ category }}
            </div>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="label">Type</label>
        <div class="dropdown" @click="toggleDropdown('type')">
          <div class="dropdown-selected">{{ selectedType || 'Select a type' }}</div>
          <div class="dropdown-options" v-if="dropdownOpen.type">
            <div class="dropdown-option" v-for="type in types" :key="type" @click="selectType(type)">
              {{ type }}
            </div>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="image" class="label">Upload Image</label>
        <input type="file" id="image" @change="handleImageUpload" class="input-file" accept="image/*" required>
      </div>
      <div class="form-group">
        <button class="custom-btn btn-1 button" type="submit">메인 타이틀 등록</button>
      </div>
      <div class="progress-bar" v-if="progress > 0">
        <div class="progress" :style="{ width: progress + '%' }"></div>
      </div>
    </form>

    <!-- 에피소드 등록 폼 -->
    <form @submit.prevent="submitForm" class="form" v-if="uploadType === 'episode'">

      <div class="form-group">
        <label for="title" class="label">Title</label>
        <input type="text" id="title" v-model="title" class="input" required>
      </div>

      <div class="form-group">
        <label class="label">Type</label>
        <div class="dropdown" @click="toggleDropdown('type')">
          <div class="dropdown-selected">{{ selectedType || 'Select a type' }}</div>
          <div class="dropdown-options" v-if="dropdownOpen.type">
            <div class="dropdown-option" v-for="type in types" :key="type" @click="selectType(type)">
              {{ type }}
            </div>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="title" class="label">에피소드 번호</label>
        <input type="text" id="title" v-model="episodeNumber" class="input" required>
      </div>
      <div class="form-group">
        <label for="description" class="label">Description</label>
        <textarea id="description" v-model="description" class="textarea" rows="4" required></textarea>
      </div>
      <div class="form-group">
        <label for="video" class="label">Upload Video</label>
        <input type="file" id="video" @change="handleVideoUpload" class="input-file" accept="video/*" required>
      </div>

      <div class="form-group">
        <label for="image" class="label">Upload Image</label>
        <input type="file" id="image" @change="handleImageUpload" class="input-file" accept="image/*" required>
      </div>

      <div class="form-group">
        <button type="submit" class="button">에피소드 등록</button>
      </div>
      <div class="progress-bar" v-if="progress > 0">
        <div class="progress" :style="{ width: progress + '%' }"></div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const episodeNumber = ref('');
const title = ref('');
const mainTitleDescription = ref(''); // Corrected case to match the DTO
const description = ref('');
const selectedCategory = ref('');
const selectedSeason = ref('');
const selectedType = ref('');
const videoFile = ref(null);
const imageFile = ref(null);
const progress = ref(0);
const dropdownOpen = ref({ season: false, category: false, type: false });
const uploadType = ref(null);
const seasons = ref(['season 1', 'season 2', 'season 3', 'season 4', 'season 5']);
const categories = ref(['액션', '로맨스', '잔잔', '추리']);
const types = ref(['애니', '드라마', '영화']);

const toggleDropdown = (type) => {
  if (type === 'season') {
    dropdownOpen.value.season = !dropdownOpen.value.season;
    dropdownOpen.value.category = false;
    dropdownOpen.value.type = false;
  } else if (type === 'category') {
    dropdownOpen.value.category = !dropdownOpen.value.category;
    dropdownOpen.value.season = false;
    dropdownOpen.value.type = false;
  } else if (type === 'type') {
    dropdownOpen.value.type = !dropdownOpen.value.type;
    dropdownOpen.value.season = false;
    dropdownOpen.value.category = false;
  }
};

const selectSeason = (season) => {
  selectedSeason.value = season;
  dropdownOpen.value.season = false;
};

const selectCategory = (category) => {
  selectedCategory.value = category;
  dropdownOpen.value.category = false;
};

const selectType = (type) => {
  selectedType.value = type;
  dropdownOpen.value.type = false;
};

const setUploadType = (type) => {
  uploadType.value = type;
};

const handleVideoUpload = (event) => {
  videoFile.value = event.target.files[0];
};

const handleImageUpload = (event) => {
  imageFile.value = event.target.files[0];
};

// 에피소드 등록 폼 제출 함수
const submitForm = async () => {
  const formData = new FormData();
  const videoDto = {
    title: title.value,
    episodeNumber: episodeNumber.value,
    description: description.value,
    genre: selectedType.value,  // 장르 선택 추가
  };

  formData.append('videoDto', new Blob([JSON.stringify(videoDto)], { type: "application/json" }));
  formData.append('video', videoFile.value);
  formData.append('Image', imageFile.value);  // 이미지 파일 추가

  try {
    const token = localStorage.getItem("jwt");
    const response = await axios.post('http://localhost:8081/api/file/video/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      },
      onUploadProgress: (progressEvent) => {
        progress.value = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      }
    });
    alert('Upload successful!');
  } catch (error) {
    console.error('Error uploading the file', error);
    alert('Error uploading the file');
  }
};

// 메인 타이틀 등록 폼 제출 함수
const mainTitleSubmit = async () => {
  const formData = new FormData();
  const mainTitleDto = {
    title: title.value,
    season: selectedSeason.value,
    mainTitleDescription: mainTitleDescription.value, // Ensure correct case
    category: selectedCategory.value,
    genre: selectedType.value,
  };

  formData.append('mainTitleDto', new Blob([JSON.stringify(mainTitleDto)], {type: "application/json"}));
  formData.append('Image', imageFile.value);

  try {
    const token = localStorage.getItem("jwt");
    const response = await axios.post('http://localhost:8081/api/mainTitle/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      },
      onUploadProgress: (progressEvent) => {
        progress.value = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      }
    });
    alert('Main Title upload successful!');
  } catch (error) {
    console.error('Error uploading the main title', error);
    alert('Error uploading the main title');
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 28px;
  font-weight: bold;
  color: #333;
}

.upload-options {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.upload-option {
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.upload-option:hover {
  background-color: #0056b3;
}

.form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
}

.label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  color: #555;
}

.input,
.textarea,
.input-file {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

.input:focus,
.textarea:focus,
.input-file:focus {
  border-color: #007bff;
}

.textarea {
  height: 100px;
  resize: vertical;
}

.dropdown {
  position: relative;
  width: 100%;
}

.dropdown-selected {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
  cursor: pointer;
  font-size: 16px;
  color: #555;
}

.dropdown-options {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  max-height: 150px;
  overflow-y: auto;
}

.dropdown-option {
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
  color: #555;
}

.dropdown-option:hover {
  background-color: #f3f3f3;
}

.button {
  padding: 12px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #0056b3;
}

.progress-bar {
  margin-top: 20px;
  width: 100%;
  background-color: #f3f3f3;
  border-radius: 5px;
  overflow: hidden;
}

.progress {
  height: 10px;
  background-color: #4caf50;
  transition: width 0.3s;
}

.btn-1 {
  background: rgb(6, 14, 131);
  background: linear-gradient(0deg, rgba(6, 14, 131, 1) 0%, rgba(12, 25, 180, 1) 100%);
  border: none;
}

.btn-1:hover {
  background: rgb(0, 3, 255);
  background: linear-gradient(0deg, rgba(0, 3, 255, 1) 0%, rgba(2, 126, 251, 1) 100%);
}
</style>
