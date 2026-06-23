<template>
    <div>
        <section id="Header"
            class="  flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 px-4 sm:px-8 md:px-[3rem] lg:px-[5rem] max-w-[1400px] mx-auto">

            <div id="slogan"
                class="sm:w-p[90%] md:w-[80%] md:m-auto lg:w-[35%] flex flex-col items-center lg:items-start text-center lg:text-start my-[5rem]">
                <p class="text-3xl sm:text-4xl md:text-5xl font-bold  PrimaryTxt">{{ $t('contact.titlePart1') }} </p>
                <p class="text-3xl sm:text-4xl md:text-5xl gradientColor font-bold ">{{ $t('contact.titlePart2') }}</p>
                <p class="w-full mb-[1rem] grayTxt text-sm sm:text-base leading-relaxed">{{ $t('contact.description') }}
                </p>

                <div class="PrimaryTxt md:text-center   sm:w-fit flex flex-col gap-1">
                    <a class="no-underline block w-full">
                        <button class="font-semibold gradient-btn-border mb-[1rem]  w-full text-start">
                            <div class="gradient-btn-content  flex gap-4 items-center">
                                <Mail class="flex-shrink-0"></Mail>
                                <p class=" text-sm sm:text-base">redolapy.admin@gmail.com
                                </p>
                            </div>
                        </button>
                    </a>


                    <button id="aboutRecycle" class="font-semibold gradient-btn-border mb-[1rem] ">
                        <div class="gradient-btn-content gradient-btn-content  flex gap-4">
                            <phone></phone>
                            <p>+20123456789</p>
                        </div>
                    </button>


                    <button id="aboutRecycle" class="font-semibold gradient-btn-border mb-[1rem]">
                        <div class="gradient-btn-content gradient-btn-content  flex gap-4">
                            <Send></Send>
                            <p>+20123456789</p>
                        </div>
                    </button>
                </div>
            </div>

            <div id="MessageForm" class="sm:w-[80%] lg:w-[60%]">


                <form @submit.prevent="submitForm">
                    <label class="font-semibold PrimaryTxt" for="">{{ $t('contact.form.nameLabel') }}</label>
                    <input id="nameInput" v-model="formInput.name"
                        class="border-2 border-gray-200 rounded-lg w-full p-[0.8rem] mt-[0.2rem] mb-[1rem] placeholder:text-gray-400 dark:placeholder:text-zinc-600 autofill:shadow-[inset_0_0_0_1000px_#161616] autofill:[-webkit-text-fill-color:white]"
                        type="text" :placeholder="$t('contact.form.namePlaceholder')" required />
                    <label class="font-semibold PrimaryTxt" for="">{{ $t('contact.form.emailLabel') }}</label>
                    <input id="emailInput" v-model="formInput.email"
                        class="border-2 border-gray-200 rounded-lg p-[0.8rem] w-[100%] mt-[0.2rem] mb-[1rem] bg-transparent text-zinc-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-600 autofill:shadow-[inset_0_0_0_1000px_#161616] autofill:[-webkit-text-fill-color:white]"
                        type="email" :placeholder="$t('contact.form.emailPlaceholder')" required />

                    <label class="font-semibold PrimaryTxt " for="">{{ $t('contact.form.messageLabel') }}</label>

                    <textarea name="" id="" rows="8" v-model="formInput.message"
                        class="border-2 border-gray-200 rounded-lg p-[0.8rem] w-[100%] mt-[0.2rem] mb-[2rem] text-zinc-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-600 autofill:shadow-[inset_0_0_0_1000px_#161616] autofill:[-webkit-text-fill-color:white]"
                        :placeholder="$t('contact.form.messagePlaceholder')" required></textarea>


                    <button id="ProPricingBtn" class=" PricingCardsButton font-semibold text-lg w-[100%] border-none "
                        type="submit" :disabled="isSubmitting" :style="{ opacity: isSubmitting ? '0.4' : '1' }">
                        {{ isSubmitting ? 'Sending...' : $t('contact.form.sendButton') }}
                    </button>
                </form>
            </div>

        </section>


    </div>
</template>


<script>
import { Mail, Phone, Send } from '@lucide/vue';
import axios from 'axios';
import API_BASE from '../config/api.js';

export default {
    name: 'ContactUs',
    components: {
        Mail,
        Phone,
        Send
    },
    data() {
        return {
            formInput: {
                name: '',
                email: '',
                message: ''
            },
            isSubmitting: false
        };
    },
    methods: {
        async submitForm() {
            if (!this.formInput.name || !this.formInput.email || !this.formInput.message) {
                alert("Please fill in all fields.");
                return;
            }
            this.isSubmitting = true;
            try {
                const response = await axios.post(`${API_BASE}/contact`, this.formInput);

                if (response.status === 201 || response.status === 200) {
                    alert('Message sent successfully to us!');

                    this.formInput.name = '';
                    this.formInput.email = '';
                    this.formInput.message = '';
                }

            } catch (error) {
                console.error("API Error:", error);
                alert('Failed to send message. Please check your connection.');
            } finally {
                this.isSubmitting = false;
            }


        }
    }
}

</script>

<style scoped>
/* @import '../assets/Style.css'; */


.gradientColor {
    background: var(--Gradient-bgc);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-fill-color: transparent;
    width: fit-content;
    line-height: 1.3;
    padding-bottom: 0.15em;
}

.gradient-btn-border {
    border-radius: 0.5em;
    background: linear-gradient(90deg, #40B9FF 0%, #74D6B6 50%, #A6E22E 100%);
    padding: 0.1rem;
    cursor: pointer;
}


.gradient-btn-content {
    background-color: var(--primary-bgc);
    border-radius: 0.5rem;
    padding: 0.8rem 1rem;

    align-items: center;
    transition: background-color 0.2s ease;
}

.PricingCardsButton {
    border-radius: 0.5em;
    padding: 0.5em 1.8em;
    justify-self: flex-end;
    border: border-none
}

#ProPricingBtn {
    background-color: var(--Primary-Brand-color);
    color: white;
    cursor: pointer;
    transition: opacity 0.2s ease;
}

#ProPricingBtn:disabled {
    opacity: 0.4 !important;
    cursor: not-allowed;
}
</style>