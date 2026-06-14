<template>
    <div>
    <section class="teamMembers w-[70%] m-auto flex flex-wrap justify-around gap-4">
      <TeamMembers
      name="Basmala Said"
      title="FrontEnd Track"
      link=""
      
      ></TeamMembers>
      <TeamMembers
      name="Mayar Ahmed"
      title="UI/UX Development Track"
      link="https://www.linkedin.com/in/mayar-ahmed-39934925a?utm_source=share_via&utm_content=profile&utm_medium=member_android"
      
      ></TeamMembers>
      <TeamMembers
      name="Mostafa Salah"
      title="FrontEnd Track"
      link=""
      
      ></TeamMembers>
      <TeamMembers
      name="Samira Abdullah "
      title="UI/UX Development Track"
      link="https://www.linkedin.com/in/samira-abdullah?utm_source=share_via&utm_content=profile&utm_medium=member_android"
      
      ></TeamMembers>
      <TeamMembers
      name="Menna Walid"
      title="FrontEnd Track"
      link=""
      
      ></TeamMembers>
      <TeamMembers
      name="Enjy Ahmed"
      title="UI/UX Development Track"
      link=""
      
      ></TeamMembers>
      <TeamMembers
      name="Ahmed Ayoub"
      title="FrontEnd Track"
      link=""
      
      ></TeamMembers>
      <TeamMembers
      name="Hassan Abd elmoniem "
      title="UI/UX Development Track"
      link=""
      
      ></TeamMembers>  
      <TeamMembers
      name="Nouran Sherif"
      title="FrontEnd Track"
      link="https://www.linkedin.com/in/nouran-sherif-46bab929a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
      
      ></TeamMembers>
      <TeamMembers
      name="Kariman Ayman"
      title="FrontEnd Track"
      link="https://www.linkedin.com/in/kariman-ayman-1a6788200?utm_source=share_via&utm_content=profile&utm_medium=member_android"
      
      ></TeamMembers>
        </section>

     

        <section id="Sustainable" class="my-[5rem] flex justify-around flex-wrap ">
            <div class="w-[100%] mb-[2rem]">
  <p id="FeaturesTitle" class="text-5xl font-bold w-[50%] m-auto text-center PrimaryTxt" v-html="$t('sustainable.coreFeaturesTitle')"></p>
  
  <p class="text-center w-[30%] m-auto font-medium grayTxt">
    {{ $t('sustainable.coreFeaturesSubtitle') }}
  </p>
</div>

            <div class="SustainableImg w-[40%]">
                <img src="../assets/Sustainable.png" :alt="$t('sustainable.title')" class="w-full h-auto rounded-4xl" />
            </div>

            <div id="SustainableContent" class="w-[40%]">
               <div class="w-[100%]">
                <p id="FeaturesTitle" class=" text-3xl font-semibold m-auto PrimaryTxt">{{ $t('sustainable.titlePart1') }}</p>
                <p class=" text-3xl font-semibold gradientColor">{{ $t('sustainable.titlePart2') }} </p>
            </div>

                <p class="text-lg Secondary-grayTxt">
                    {{ $t("sustainable.description") }}
                </p>

                <div class="flex gap-4 mt-[2rem] items-center">
                    <div class="RecycleIcon">
                        <Recycle />
                    </div>
                    <div>
                        <p class="font-bold text-2xl PrimaryTxt">
                            {{ $t("sustainable.recycleRenew") }}
                        </p>
                        <p class="Secondary-grayTxt">
                            {{ $t("sustainable.recycleDescription") }}
                        </p>
                    </div>
                </div>
                <div class="flex gap-4 mt-[2rem] items-center">
                    <div class="RecycleIcon">
                        <PersonStanding />
                    </div>
                    <div>
                        <p class="font-bold text-2xl PrimaryTxt">
                            {{ $t("sustainable.learnTryOn") }}
                        </p>
                        <p class="Secondary-grayTxt">
                            {{ $t("tryOnSection.description") }}
                        </p>
                    </div>
                </div>

                <div class="flex justify-around mt-[4rem] items-center">
                    <div class="w-[100%]">
                        <GradientBorderBtn :Description="$t('sustainable.learnRecycling')" routeTo="/AboutRecycle" />
                    </div>
                </div>
            </div>
        </section>


         <section id="VTryOn" class="my-[5rem] flex items-center justify-between px-[5rem]">
      <div id="TryOnTxt" class="TxtGradient w-[40%] my-[5rem]">
        <p class="text-4xl font-bold PrimaryTxt">
          {{ $t("tryOnSection.yourMirror") }}
        </p>
        <p class="text-4xl gradientColor font-bold mb-[1rem]">
          {{ $t("tryOnSection.reimagined") }}
        </p>
        <p class="w-[50%] mb-[1rem] disabledTxt Secondary-grayTxt">
          {{ $t("tryOnSection.description") }}
        </p>

        <div class="w-[100%]">
          <GradientBorderBtn :Description="$t('sustainable.learnTryOn')" routeTo="/AboutTryon" />
        </div>
      </div>

      <div id="headerImg" class="w-[50%]">
        <img src="../assets/Background.png" :alt="$t('tryOnSection.yourMirror')" class="w-full h-auto" />
      </div>
    </section>


        <section id="Q&A" class="mt-[2rem]">
            <p class="text-4xl font-bold mb-[1rem] w-[fit-content] m-auto PrimaryTxt">
                {{ $t('faq.title') }}
            </p>

            <div class="w-full max-w-4xl mx-auto flex flex-col gap-2 my-12 px-4 ">
                <div v-for="(item, index) in $tm('faq.questions')" :key="index"
                    class="p-[0.2rem] rounded-[1rem] bg-gradient-to-r from-[#FF8E40] via-[#40B9FF] to-[#8ED321] shadow-sm transition-all duration-300">
                    <div class="bg-[#FEFEFE] dark:bg-[#0d0d0d] rounded-[1rem] overflow-hidden">
                        <h2>
                            <button type="button" @click="toggleItem(index)"
                                class="w-full px-10 py-5 flex items-center justify-between font-bold text-xl text-slate-900 select-none focus:outline-none transition-colors duration-200"
                                :class="{ 'bg-slate-50/50': activeIndex === index }">
                                <span class="PrimaryTxt text-start">{{ $rt(item.title) }}</span>

                                <svg class="w-5 h-5 text-slate-800 dark:text-white transform transition-transform duration-300 ease-in-out shrink-0 mx-2"
                                    :class="{ 'rotate-180': activeIndex === index }" fill="none" stroke="currentColor"
                                    stroke-width="2.5" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </button>
                        </h2>

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
import { Mail, Phone, Send, PersonStanding, Recycle } from '@lucide/vue';
import GradientBorderBtn from "../components/GradientBorderBtn.vue";
import TeamMembers from '../components/TeamMembers.vue';


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
    components: {
        Mail,
        Phone,
        Send,
        Recycle,
        PersonStanding,
        GradientBorderBtn,
        TeamMembers
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

.PricingCardsButton {
    border: 0.1em solid;
    border-radius: 0.5em;
    padding: 0.5em 1.8em;
    justify-self: flex-end;

}

#ProPricingBtn {
    background-color: var(--Primary-Brand-color);
    color: white;
    cursor: pointer;
}

.RecycleIcon {
    color: var(--Secondary-Brand-color);
}
</style>