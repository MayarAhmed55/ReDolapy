<template>
    <div>
        <section id="Header" class="  flex items-center justify-between px-[5rem]">
            <div id="slogan" class="w-[40%] my-[5rem]">
                <p class="text-5xl font-bold  PrimaryTxt">Contact </p>
                <p class="text-5xl gradientColor font-bold ">ReDolapy Team</p>
                <p class="w-[90%] mb-[1rem] grayTxt">Have a question, partnership idea, or just want to say hi? Drop us
                    a message and we'll get back to you as soon as possible.</p>
                <!-- 
                <div class="flex items-center gap-[0.5rem]">
                <button id="StartBtn"><router-link :to="routeTo" class="text-white no-underline">{{ btnCTA }}</router-link></button>
                <slot class="p-0"></slot>
                </div> -->


                <div>
                    <!-- <a v-if="isAnchorLink" :href="routeTo" class="no-underline block" @click="handleScroll">
                        <button :id="id" class="font-semibold gradient-btn-border">
                            <div class="gradient-btn-content">
                                {{ Description }}
                            </div>
                        </button>
                    </a> -->

                    <a class="no-underline block">
                        <button class="font-semibold gradient-btn-border mb-[1rem]">
                            <div class="gradient-btn-content  flex gap-4">
                                <Mail></Mail>
                                <p>redolapy.admin@gmail.com
</p>
                            </div>
                        </button>
                    </a>


                    <button id="aboutRecycle" class="font-semibold gradient-btn-border mb-[1rem]">
            <!-- <router-link :to="routeTo" class="no-underline"> -->
                <div class="gradient-btn-content gradient-btn-content  flex gap-4">
                    <phone></phone>
                    <p>+20123456789</p>
                </div>
            <!-- </router-link> -->
        </button>

        
                    <button id="aboutRecycle" class="font-semibold gradient-btn-border mb-[1rem]">
            <!-- <router-link :to="routeTo" class="no-underline"> -->
                <div class="gradient-btn-content gradient-btn-content  flex gap-4">
                   <Send></Send>
                    <p>+20123456789</p>
                </div>
            <!-- </router-link> -->
        </button>
                </div>
            </div>




            <div id="MessageForm" class="w-[60%]">
                <!-- <img :src="imageSrc" alt="Header Image" class="w-full h-auto"> -->
                 <!-- <form action="">
                     <input type="text" placeholder="Name">
                    </form> -->
                    
                    <form action="">
                      <label class="font-semibold" for="">Name</label>
                    <input id="cardNumber" class="border-2 border-gray-200 rounded-lg w-full p-[0.8rem] mt-[0.2rem] mb-[1rem]" type="text" placeholder="name" />
                    <!-- <div class="flex justify-between gap-4"> -->
                      <label class="font-semibold" for="">Email</label>
                        <input id="Date" class="border-2 border-gray-200 rounded-lg p-[0.8rem] w-[100%] mt-[0.2rem] mb-[1rem]" type="text" placeholder="user@gmail.com" />
                     
                        <label class="font-semibold" for="">Message</label>
                        
                        <textarea name="" id="" rows="8" class="border-2 border-gray-200 rounded-lg p-[0.8rem] w-[100%] mt-[0.2rem] mb-[2rem]" placeholder="write your message here"></textarea>
                   

                         <button id="ProPricingBtn" class=" PricingCardsButton font-semibold text-lg w-[100%]"> 
                              Send
                            </button>
                </form>
            </div>

        </section>



          <section id="Q&A" class="mt-[2rem]">
    <!-- 💡 Dynamic Section Title -->
    <p class="text-4xl font-bold mb-[1rem] w-[fit-content] m-auto PrimaryTxt">
      {{ $t('faq.title') }}
    </p>

    <div class="w-full max-w-4xl mx-auto flex flex-col gap-2 my-12 px-4">
      <!-- 💡 $tm pulls the questions array dynamically from Translation.js -->
      <div 
        v-for="(item, index) in $tm('faq.questions')" 
        :key="index"
        class="p-[0.2rem] rounded-[1rem] bg-gradient-to-r from-[#FF8E40] via-[#40B9FF] to-[#8ED321] shadow-sm transition-all duration-300"
      >
        <div class="bg-[#FEFEFE] rounded-[1rem] overflow-hidden">
          <h2>
            <!-- 💡 Text direction will auto-align to right/left based on language direction -->
            <button 
              type="button" 
              @click="toggleItem(index)"
              class="w-full px-10 py-5 flex items-center justify-between font-bold text-xl text-slate-900 select-none focus:outline-none transition-colors duration-200"
              :class="{ 'bg-slate-50/50': activeIndex === index }"
            >
              <!-- 💡 $rt safely compiles the localized runtime string data -->
              <span class="PrimaryTxt text-start">{{ $rt(item.title) }}</span>

              <!-- Dynamic Arrow Icon -->
              <svg 
                class="w-5 h-5 text-slate-800 transform transition-transform duration-300 ease-in-out shrink-0 mx-2"
                :class="{ 'rotate-180': activeIndex === index }" 
                fill="none" 
                stroke="currentColor"
                stroke-width="2.5" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
          </h2>

          <!-- Accordion Content Panel -->
          <div v-if="activeIndex === index" class="bg-[#FEFEFE]">
            <div class="mx-8 pt-2 border-t border-slate-100"></div>
            <div class="px-8 pb-6 pt-3 text-slate-600 font-medium text-base leading-relaxed text-start">
              {{ $rt(item.answer) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
    </div>
</template>

<script>
import { Mail , Phone , Send } from '@lucide/vue';

export default {
    name: 'AboutUS',
    props: {
        primaryText: String,
        gradientText: String,
        Description: String,
        btnCTA: String,
        imageSrc: String,
        routeTo: String
    },
    components:{
        Mail,
        Phone,
        Send
    },
      data() {
        return {

            activeIndex: null,
        };
    },


    computed: {
        faqItems() {
            return this.$t('faq.questions') || [];
        }
    },

    methods: {

        toggleItem(index) {
            if (this.activeIndex === index) {
                this.activeIndex = null;
            } else {
                this.activeIndex = index;
            }
        }
    }
}
</script>

<style scoped>
@import '../assets/Style.css';

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

#TryBtn {
    border-radius: 0.5em;
    padding: 0.8em 4em;
    font-weight: var(--Semi-Bold);
    cursor: pointer;
    background: var(--Primary-Brand-color);
    color: white;

}

#StartBtn {
    border-radius: 0.5em;
    padding: 0.8em 1.8em;
    font-weight: var(--Semi-Bold);
    cursor: pointer;
    background: var(--Gradient-bgc);
    border-color: transparent;
    color: white;
    box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.1);

}

.gradient-btn-border {
    width: 60%;
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
    /* justify-content: center; */
    transition: background-color 0.2s ease;
}
.PricingCardsButton {
    border: 0.1em solid;
    border-radius: 0.5em;
    padding: 0.5em 1.8em;
    justify-self: flex-end;
    /* margin-top: 4rem; */

}
#ProPricingBtn {
    background-color: var(--Primary-Brand-color);
    /* border-color: var(--Secondary-Orange-Brand-color); */
    color: white;
    cursor: pointer;
}
</style>