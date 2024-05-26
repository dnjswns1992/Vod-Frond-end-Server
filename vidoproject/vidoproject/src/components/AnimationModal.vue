<template>
  <div v-if="visible" class="modal-backdrop" @click.self="close">
    <div class="modal-content">
      <slot></slot>
      <button @click="close" class="close-button">Close</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  visible: Boolean
});

const emits = defineEmits(['close']);

const close = () => {
  emits('close');
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8); /* 어두운 배경으로 변경 */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px; /* 모서리 둥글게 */
  width: 600px; /* 너비 조정 */
  max-width: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); /* 그림자 추가 */
  animation: fadeIn 0.3s ease; /* 페이드 인 애니메이션 */
}

.close-button {
  margin-top: 20px;
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease; /* 버튼 호버 애니메이션 */
}

.close-button:hover {
  background: #0056b3;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
