<template>
  <div class="container">
    <h1 class="title">Upload Your Video or Audio</h1>
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
        <label for="image" class="label">Main Title Image(이미지 슬라이더)</label>
        <input type="file" id="image" @change="handleMainTitleUpload" class="input-file" accept="image/*" required>
      </div>

      <div class="form-group">
        <label for="image" class="label">Upload HomeTitle</label>
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
      <label class="label">VideoType</label>
      <div class="dropdown" @click="toggleDropdown('videoType')">
        <div class="dropdown-selected">{{ videoType || '비디오 타입을 선택하세요.' }}</div>
        <div class="dropdown-options" v-if="dropdownOpen.videoType">
          <div class="dropdown-option" @click="selectVideoType('main')">main</div>
          <div class="dropdown-option" @click="selectVideoType('prologue')">prologue</div>
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
        <label for="video" class="label">Upload Video or Audio</label>
        <input type="file" id="video" @change="handleVideoUpload" class="input-file" accept="video/*,audio/*,.mkv,.mp3" required>
      </div>

      <div class="form-group">
        <label for="image" class="label">Main Title Image</label>
        <input type="file" id="image" @change="handleImageUpload" class="input-file" accept="image/*" required>
      </div>

      <div class="form-group">
        <label for="subtitle" class="label">Upload Subtitles</label>
        <input type="file" id="subtitle" @change="handleSubtitleUpload" class="input-file" accept=".srt,.vtt">
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
import webSocket from '../assets/webSocket.js';
import {useConfigStore, useUserStore} from "../assets/store.js";

const { createWebSocketConnection } = webSocket;

const episodeNumber = ref('');
const title = ref('');
const mainTitleDescription = ref('');
const description = ref('');
const selectedCategory = ref('');
const selectedSeason = ref('');
const selectedType = ref('');
const videoFile = ref(null);
const imageFile = ref(null);
const progress = ref(0);
const dropdownOpen = ref({ season: false, category: false, type: false , videoType : false });
const uploadType = ref(null);
const seasons = ref(['season 1', 'season 2', 'season 3', 'season 4', 'season 5']);
const categories = ref(['액션', '로맨스', '잔잔', '추리']);
const types = ref(['애니', '드라마', '영화']);
const backServer = useConfigStore();
const mainTitleImage = ref(null);
const subtitleFile = ref(null);
const videoType = ref('');
const userAuthorization = useUserStore()


const selectVideoType = (type) => {
  videoType.value = type;
  dropdownOpen.value.videoType = false;
};

const toggleDropdown = (type) => {
  dropdownOpen.value[type] = !dropdownOpen.value[type];
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

const handleMainTitleUpload = (event) => {
  mainTitleImage.value = event.target.files[0];
};

const handleSubtitleUpload = (event) => {
  subtitleFile.value = event.target.files[0];
};
const submitForm = async () => {
  if (!videoFile.value) {
    alert('파일을 선택하십시오.');
    return;
  }
  if(!userAuthorization.ROLE === 'ROLE_ADMIN') {
    alert("권한이 없습니다.");
    await router.push("/");
  }


  try {
    const token = localStorage.getItem("jwt");
    const filename = videoFile.value.name; // 인코딩 없이 원본 파일 이름 사용

    console.log("Starting multipart upload for:", filename);

    // Create multipart upload
    const createResponse = await axios.get(`${backServer.backUrl}/api/s3/create-multipart-upload`, {
      params: { fileName: encodeURIComponent(filename) }, // 여기는 인코딩된 파일 이름 사용
      headers: { 'Authorization': `Bearer ${token}` }
    });

    console.log("Multipart upload created:", createResponse.data);

    const { uploadId } = createResponse.data;
    const partSize = 5 * 1024 * 1024; // 5MB
    const parts = [];

    for (let start = 0, partNumber = 1; start < videoFile.value.size; start += partSize, partNumber++) {
      const end = Math.min(start + partSize, videoFile.value.size);
      const partBlob = videoFile.value.slice(start, end);

      // Get presigned URL for the part
      const presignPartResponse = await axios.get(`${backServer.backUrl}/api/s3/generate-presigned-url`, {
        params: { fileName: encodeURIComponent(filename), partNumber: partNumber, uploadId: uploadId }, // 여기도 인코딩된 파일 이름 사용
        headers: { 'Authorization': `Bearer ${token}` }
      });

      console.log(`Presigned URL for part ${partNumber}:`, presignPartResponse.data);

      const partPresignedUrl = presignPartResponse.data;
      const uploadResponse = await fetch(partPresignedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/octet-stream',
        },
        body: partBlob
      });

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        console.error(`Error uploading part ${partNumber}:`, errorText);
        throw new Error(`Part upload failed: ${errorText}`);
      }

      console.log(`Part ${partNumber} uploaded successfully.`);

      // Get and check ETag value
      let eTag = uploadResponse.headers.get('ETag');
      console.log(`ETag for part ${partNumber}:`, eTag); // ETag 값 로그 출력
      if (eTag) {
        eTag = eTag.replace(/"/g, ''); // Remove any double quotes from the ETag
        parts.push({ ETag: eTag, PartNumber: partNumber });
      } else {
        console.error(`ETag is null for part ${partNumber}`);
        alert(`ETag is null for part ${partNumber}`);
        throw new Error(`ETag is null for part ${partNumber}`);
      }

      // Update progress
      progress.value = Math.round((start + partSize) / videoFile.value.size * 100);
    }

    console.log("All parts uploaded, completing multipart upload.");
    console.log('Completed parts:', parts); // completedParts 로그 출력

    // Complete multipart upload
    await axios.post(`${backServer.backUrl}/api/s3/complete-multipart-upload`, {
      fileName: encodeURIComponent(filename), // 여기도 인코딩된 파일 이름 사용
      uploadId: uploadId,
      completedParts: parts
    }, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    // Generate the full video URL
    const bucketUrl = "https://videoserver-static-files.s3.ap-northeast-2.amazonaws.com/";
    const encodedFilename = encodeURIComponent(filename); // 인코딩된 파일 이름 사용
    const videoUrl = `${bucketUrl}${encodedFilename}`; // 인코딩된 파일 이름 사용

    // Upload metadata and files
    const videoDto = {
      title: title.value,
      episodeNumber: episodeNumber.value,
      ImageUrl: '', // Set this after uploading the image
      videoUrl: videoUrl,
      description: description.value,
      genre: selectedType.value,
      videoType : videoType.value,
    };

    const formData = new FormData();
    formData.append('videoDto', new Blob([JSON.stringify(videoDto)], { type: "application/json" }));
    formData.append('Image', imageFile.value);
    if (subtitleFile.value) {
      formData.append('subtitle', subtitleFile.value);
    }

    await axios.post(`${backServer.backUrl}/api/file/video/save-metadata`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
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

  if(!userAuthorization.ROLE === 'ROLE_ADMIN') {
    alert("권한이 없습니다.");
    await router.push("/");
  }

  const formData = new FormData();
  const mainTitleDto = {
    title: title.value,
    season: selectedSeason.value,
    mainTitleDescription: mainTitleDescription.value,
    category: selectedCategory.value,
    genre: selectedType.value,
  };

  formData.append('mainTitleDto', new Blob([JSON.stringify(mainTitleDto)], { type: "application/json" }));
  formData.append('Image', imageFile.value);
  formData.append('mainTitleImage', mainTitleImage.value);

  try {
    const token = localStorage.getItem("jwt");
    const response = await axios.post(`${backServer.backUrl}/api/mainTitle/upload`, formData, {
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

// 유니크한 세션 ID 생성 함수
const generateSessionId = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};
console.log("퍼센트",progress);
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