import { ref } from 'vue';

export const isAuthModalOpen = ref(false);
export const authModalMode = ref('login');

export function triggerLoginModal() {
  authModalMode.value = 'login';
  isAuthModalOpen.value = true;
}