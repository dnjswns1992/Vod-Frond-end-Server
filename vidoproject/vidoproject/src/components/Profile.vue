<template>
  <div class="container">
    <div class="sidebar">
      <div class="profile-summary">
        <img class="ml-16"
            src="https://i.namu.wiki/i/eFb4WQiCqn_eR20aTLkki2_mdvVS6qGirWP9tbtTBHZn35yQ6Wo_MjB1UVNFviZqBemJp2J0mgyq0bzS-SawZNtCsMcOYQG7oi0wM9Y3ezqmejyUSH6Q1XhqrmumYvxTI69m2DjX8NGBw-4J_ntITw.webp" alt="Profile Image">
        <h2>{{userStore.user.nickName}}</h2>
        <p v-if="userStore.user.provider === 'google'">구글 로그인</p>
      </div>
      <nav>
        <ul>
          <li><a href="#">My Profile</a></li>
          <li><a href="#">Security</a></li>
          <li><a href="#">Manage History</a></li>
        </ul>
      </nav>
    </div>
    <div class="main-content">
      <div class="profile-header">
        <img src="https://i.namu.wiki/i/eFb4WQiCqn_eR20aTLkki2_mdvVS6qGirWP9tbtTBHZn35yQ6Wo_MjB1UVNFviZqBemJp2J0mgyq0bzS-SawZNtCsMcOYQG7oi0wM9Y3ezqmejyUSH6Q1XhqrmumYvxTI69m2DjX8NGBw-4J_ntITw.webp" alt="Profile Image">
        <div class="profile-details">
          <p v-if="userStore.user.provider === 'google'">구글 로그인</p>
          <p>{{userStore.user.email}}</p>
          <button class="change-button">Change</button>
        </div>
      </div>
      <div class="profile-info">
        <div class="info-item">
          <span>휴대전화:</span>
          <div class="info-value">+82 10-3***-0***</div>
          <button class="edit-button">Edit</button>
        </div>
        <div class="info-item">
          <span>추가 이메일:</span>
          <div class="info-value">th******@n*******8.com</div>
          <button class="edit-button">Edit</button>
        </div>
        <div class="info-item">
          <span>추가 이메일:</span>
          <div class="info-value">ws******@n*******8.com</div>
          <button class="edit-button">Edit</button>
        </div>
      </div>
      <div class="preferences">
        <h3>Agree to receive promotional messages</h3>
        <label><input type="checkbox"> Mobile phone</label>
        <label><input type="checkbox"> Email</label>
      </div>
      <div class="notifications">
        <h3>Receive notifications on post actions</h3>
        <label><input type="checkbox"> Mobile phone(Message)</label>
      </div>
      <div class="additional-info">
        <h3>Additional info</h3>
        <button class="view-button">Manage shipping addresses</button>
        <button class="view-button">Personal information access history</button>
      </div>
      <div class="delete-section">
        <button class="delete-button">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup>

import {useUserStore} from "../assets/store.js";
import {onMounted} from "vue";
const userStore = useUserStore(); // Pinia 스토어 사용

onMounted(() => {
  userStore.fetchUserProfile(); // 사용자 프로필 데이터 가져오기
  console.log(userStore.user);

});
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f8f9fa;
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
}

.sidebar {
  width: 250px;
  background-color: #fff;
  padding: 20px;
  border-right: 1px solid #e0e0e0;
}

.profile-summary {
  text-align: center;
}

.profile-summary img {
  border-radius: 50%;
  width: 80px;
  height: 80px;
}

.profile-summary h2 {
  margin: 10px 0 5px 0;
  font-size: 18px;
  color: #333;
}

.profile-summary p {
  color: #666;
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 20px 0 0 0;
}

nav ul li {
  margin-bottom: 10px;
}

nav ul li a {
  color: #007bff;
  text-decoration: none;
}

nav ul li a:hover {
  text-decoration: underline;
}

.main-content {
  flex: 1;
  background-color: #fff;
  padding: 20px;
  border-left: 1px solid #e0e0e0;
}

.profile-header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.profile-header img {
  border-radius: 50%;
  width: 80px;
  height: 80px;
  margin-right: 20px;
}

.profile-details {
  flex: 1;
}

.profile-details h2 {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.profile-details p {
  margin: 5px 0;
  color: #666;
}

.change-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.change-button:hover {
  background-color: #0056b3;
}

.profile-info .info-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.profile-info .info-item span {
  flex: 0 0 100px;
  font-size: 14px;
  color: #666;
}

.profile-info .info-value {
  flex: 1;
  font-size: 14px;
  color: #333;
}

.edit-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.edit-button:hover {
  background-color: #0056b3;
}

.preferences,
.notifications,
.additional-info {
  border-top: 1px solid #e0e0e0;
  padding-top: 20px;
  margin-top: 20px;
}

.preferences h3,
.notifications h3,
.additional-info h3 {
  margin: 0 0 10px 0;
  font-size: 16px;
  color: #333;
}

.preferences label,
.notifications label {
  display: block;
  margin-bottom: 10px;
}

.view-button {
  display: block;
  margin-bottom: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.view-button:hover {
  background-color: #0056b3;
}

.delete-section {
  border-top: 1px solid #e0e0e0;
  padding-top: 20px;
  margin-top: 20px;
  text-align: right;
}

.delete-button {
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #c82333;
}
</style>