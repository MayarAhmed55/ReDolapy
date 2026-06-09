<template>
  <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-10" @close="$emit('close')">
      <!-- Backdrop -->
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-900/60 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="relative">
              <LoginSignup
                v-if="view === 'auth'"
                :mode="mode"
                @switch-mode="$emit('switch-mode', $event)"
                @submit="$emit('submit', $event)"
                @forgot-password="view = 'forgot'"
                @close="$emit('close')"
              />
              <ForgotPassword
                v-else
                @back-to-login="view = 'auth'"
                @reset-success="$emit('close')"
              />
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { ref, watch } from "vue";
import LoginSignup from "./login-signUp.vue";
import ForgotPassword from "./forgot-password.vue";

export default {
  name: "AuthModal",
  components: { Dialog, DialogPanel, TransitionChild, TransitionRoot, LoginSignup, ForgotPassword },
  props: {
    open: { type: Boolean, required: true },
    mode: { type: String, default: "login" },
  },
  emits: ["close", "switch-mode", "submit"],
  setup(props) {
    const view = ref("auth"); // 'auth' | 'forgot'

    // Reset to auth view after modal closes
    watch(() => props.open, (val) => {
      if (!val) setTimeout(() => { view.value = "auth"; }, 300);
    });

    return { view };
  },
};
</script>

<style scoped>
</style>