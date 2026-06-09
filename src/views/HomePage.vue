<template>
    <div>



        <Header :primaryText="$t('header.primaryText')" :gradientText="$t('header.gradientText')"
            :Description="$t('header.description')"
            :btnCTA="$t('header.cta')" routeTo="/Tryon" :imageSrc="headerImgAsset" />
        <CardsSection :sectionTitle="$t('features.sectionTitle')"
            :sectionDescription="$t('features.sectionDescription')" :Card1Title="$t('features.aiRecommendations.title')"
            :Card1Description="$t('features.aiRecommendations.description')" :Card2Title="$t('features.tryOn.title')" 
            :Card2Description="$t('features.tryOn.description')" :Card3Title="$t('features.recycle.title')" 
            :Card3Description="$t('features.recycle.description')">

            <template #Icon1>
                <Sparkles />
            </template>

            <template #Icon2>
                <Shirt />
            </template>

            <template #Icon3>
                <Recycle />
            </template>
        </CardsSection>




        <section id="StepsSection" class="flex justify-between">
            <div class="StepsImg">
                <img src="../assets/Container.png" class="w-[40rem] h-[30rem]" :alt="$t('features.sectionTitle')">
            </div>

            <div id="Steps" class="w-[48%]">
                <p class="font-bold text-4xl PrimaryTxt">{{ $t('steps.title') }}</p>
                <div class="step flex ">
                    <div class="stepCircle ">
                        <p>1</p>
                    </div>
                    <div class="">
                        <p class="stepTitle PrimaryTxt">{{ $t('steps.uploadSync.title') }}</p>
                        <p class="Secondary-grayTxt">{{ $t('steps.uploadSync.description') }}</p>
                    </div>
                </div>


                <div class="step flex">
                    <div class="stepCircle">
                        <p>2</p>
                    </div>
                    <div class="">
                        <p class="stepTitle PrimaryTxt">{{ $t('steps.neuralAnalysis.title') }}</p>
                        <p class="Secondary-grayTxt">{{ $t('steps.neuralAnalysis.description') }}</p>
                    </div>
                </div>


                <div class="step flex">
                    <div class="stepCircle">
                        <p>3</p>
                    </div>
                    <div class="">
                        <p class="stepTitle PrimaryTxt">{{ $t('steps.curatedStyling.title') }}</p>
                        <p class="Secondary-grayTxt">{{ $t('steps.curatedStyling.description') }}</p>
                    </div>
                </div>
            </div>
        </section>


        <section id="Sustainable" class="my-[5rem] flex justify-around ">
            <div class="SustainableImg">
                <img src="../assets/Minimalist recycling bin for sustainable fashion.png" :alt="$t('sustainable.title')"
                    class="w-full h-auto rounded-4xl">
            </div>

            <div id="SustainableContent" class="w-[40%]">
                <p class="font-bold text-4xl mb-[1rem] PrimaryTxt">{{ $t('sustainable.title') }}</p>
                <p class="text-lg Secondary-grayTxt">{{ $t('sustainable.description') }}</p>

                <div class="flex gap-4 mt-[2rem] items-center">
                    <div class="RecycleIcon">
                        <Recycle />
                    </div>
                    <div>
                        <p class="font-bold text-2xl PrimaryTxt">{{ $t('sustainable.recycleRenew') }}</p>
                        <p class="Secondary-grayTxt">{{ $t('sustainable.recycleDescription') }}</p>
                    </div>
                </div>
                <div class="flex gap-4 mt-[2rem] items-center">
                    <div class="RecycleIcon">
                        <PersonStanding />
                    </div>
                    <div>
                        <p class="font-bold text-2xl PrimaryTxt">{{ $t('sustainable.learnTryOn') }}</p>
                        <p class="Secondary-grayTxt">{{ $t('tryOnSection.description') }}</p>
                    </div>
                </div>

<div class="flex justify-around mt-[4rem] items-center">
                <div class=" w-[100%]">
                    <GradientBorderBtn :Description="$t('sustainable.learnRecycling')" routeTo="/AboutRecycle" />
                </div>
            </div>
        </div>
    </section>

    


        <section id="VTryOn" class=" my-[5rem] flex items-center justify-between px-[5rem]">
            <div id="TryOnTxt" class="TxtGradient w-[40%] my-[5rem]">
                <p class="text-4xl font-bold PrimaryTxt">{{ $t('tryOnSection.yourMirror') }}</p>
                <p class="text-4xl gradientColor font-bold mb-[1rem]">{{ $t('tryOnSection.reimagined') }}</p>
                <p class="w-[50%] mb-[1rem] disabledTxt Secondary-grayTxt">{{ $t('tryOnSection.description') }}</p>
                
                
                <div class=" w-[100%]">
                   <GradientBorderBtn :Description="$t('sustainable.learnTryOn')" routeTo="/AboutTryon" />
               </div>
            </div>

            <div id="headerImg" class="w-[50%]">
                <img src="../assets/Background.png" :alt="$t('tryOnSection.yourMirror')" class="w-full h-auto">
            </div>
        </section>


        <section id="PricingSection">
            <p class="w-[fit-content] m-auto mb-[1rem] font-bold text-4xl  PrimaryTxt">{{ $t('pricing.title') }}</p>
            <p class="w-[fit-content] m-auto font-medium PrimaryTxt">{{ $t('pricing.subtitle') }}</p>

            <div id="PricingCards" class="flex gap-8 justify-center my-[3rem] items-center">

                <div id="FreePricing" class="card flex flex-col justify-center items-center gap-8">
                    <p class="PricingTitle text-4xl font-bold PrimaryTxt">{{ $t('pricing.free.name') }}</p>
                    <p class="Price font-medium PrimaryTxt"><span class="text-4xl font-bold">{{ $t('pricing.free.price') }}</span>{{ $t('pricing.free.priceUnit') }}</p>
                    <div class="planFeatures">
                        <p class="flex items-center gap-2 font-medium text-lg PrimaryTxt  mb-1"><span class="text-[#8ED321]">
                                <CircleCheckBig />
                            </span> {{ $t('pricing.free.features.0') }}</p>
                        <p class="flex items-center gap-2 font-medium text-lg PrimaryTxt  mb-1"><span class="text-[#8ED321]">
                                <CircleCheckBig />
                            </span> {{ $t('pricing.free.features.1') }}</p>
                        <p class="flex items-center gap-2 font-medium text-lg PrimaryTxt  mb-1"><span class="text-[#8ED321]">
                                <CircleCheckBig />
                            </span> {{ $t('pricing.free.features.2') }}</p>
                    </div>

                    <button id="FreePricingBtn" class=" PricingCardsButton font-semibold text-lg">{{ $t('pricing.free.button') }}</button>
                </div>

               
                <GradientCard
                    :cardTitle="$t('pricing.pro.name')"
                    :Price="$t('pricing.pro.price')"
                    :firstPoint="$t('pricing.pro.features.0')"
                    :secondPoint="$t('pricing.pro.features.1')"
                    :thirdPoint="$t('pricing.pro.features.2')"
                    :fourthPoint="$t('pricing.pro.features.3')"
                    :buttonContent="$t('pricing.pro.button')"
                    :permonth="$t('pricing.pro.priceUnit')"
            ></GradientCard>


            </div>
        </section>



         <!-- <section id="Q&A">
            <p class="text-4xl font-bold mb-[1rem] w-[fit-content] m-auto PrimaryTxt">Frequently Asked Questions</p>

            <div class="w-full max-w-4xl mx-auto flex flex-col gap-6 my-12 px-4">

                <div v-for="(item, index) in accordionItems" :key="index"
                    class="p-[0.2rem] rounded-[1rem] bg-gradient-to-r from-[#FF8E40] via-[#40B9FF] to-[#8ED321] shadow-sm transition-all duration-300">
                    <div class="bg-[#FEFEFE] rounded-[1rem] overflow-hidden">

                        <h2>
                            <button type="button" @click="toggleItem(index)"
                                class="w-full px-10 py-5 flex items-center justify-between text-left font-bold text-xl text-slate-900 select-none focus:outline-none transition-colors duration-200"
                                :class="{ 'bg-slate-50/50': activeIndex === index }">
                                <span class="PrimaryTxt">{{ item.title }}</span>

                                <svg class="w-5 h-5 text-slate-800 transform transition-transform duration-300 ease-in-out"
                                    :class="{ 'rotate-180': activeIndex === index }" fill="none" stroke="currentColor"
                                    stroke-width="2.5" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </button>
                        </h2>

                        <div v-if="activeIndex === index" class="bg-[#FEFEFE]">
                            <div class="mx-8 pt-2 border-t border-slate-100"></div>

                            <div class="px-8 pb-6 pt-3 text-slate-600 font-medium text-base leading-relaxed">
                                <strong v-if="item.strongText" class="text-slate-900 block mb-1">
                                    {{ item.strongText }}
                                </strong>
                                {{ item.bodyText }}
                            </div>
                        </div>

                    </div>

                </div>
            </div>



        </section> -->

        
        <section id="Q&A">
    <!-- 💡 Dynamic Section Title -->
    <p class="text-4xl font-bold mb-[1rem] w-[fit-content] m-auto PrimaryTxt">
      {{ $t('faq.title') }}
    </p>

    <div class="w-full max-w-4xl mx-auto flex flex-col gap-6 my-12 px-4">
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
import { Sparkles, Shirt, Recycle, CircleCheckBig ,PersonStanding } from '@lucide/vue';
import Header from '../components/Header.vue';
import HeaderImage from '../assets/HeaderImage.png';
import GradientBorderBtn from '../components/GradientBorderBtn.vue';
import CardsSection from '../components/CardsSection.vue';
import GradientCard from '../components/GradientCard.vue';


export default {
    name: 'HomePage',
    components: {
        Sparkles,
        Shirt,
        Recycle,
        CircleCheckBig,
        Header,
        GradientBorderBtn,
        CardsSection,
        GradientCard,
        PersonStanding
    },
      data() {
        return {

            activeIndex: null,
            // accordionItems: [
            //     {
            //         title: 'How does the AI know my size?',
            //         strongText: '',
            //         bodyText: 'Our advanced AI analyzer maps your physical body geometry measurements using standard metrics or a quick photo scan to cross-reference fit scales across global retail brands seamlessly.'
            //     },
            //     {
            //         title: 'Can I use Redolapy with my current clothes?',
            //         strongText: '',
            //         bodyText: 'Yes! You can take photos of your existing wardrobe pieces, and our digital closet system will instantly catalog them and generate fresh style lookbooks combined with new styling recommendations.'
            //     },
            //     {
            //         title: 'How does the AI know my size?',
            //         strongText: '',
            //         bodyText: 'Yes! You can take photos of your existing wardrobe pieces, and our digital closet system will instantly catalog them and generate fresh style lookbooks combined with new styling recommendations.'
            //     }
            // ],
            headerImgAsset: HeaderImage
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
};



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

.card {
    width: 32%;
    background-color: white;
    border-radius: 1em;
    padding: 2rem;
    padding-bottom: 4rem;
    box-shadow: 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.1), -0.1rem -0.1rem 0.1rem rgba(0, 0, 0, 0.1);
}

.Icon {
    width: 5rem;
    height: 5rem;
    margin-bottom: 2rem;
    border-radius: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
}

.Sparkle {
    background-color: #40B9FF40;
    color: var(--Primary-Brand-color);
}

.TryOn {
    background-color: #FEEFE5;
    color: var(--Secondary-Orange-Brand-color);

}

.Recycle {
    background-color: #84CC1640;
    color: var(--Secondary-Brand-color);
}

.RecycleIcon {
    color: var(--Secondary-Brand-color);
}

.serviceDescription {
    color: var(--Secondary-Text-color);
}

.serviceTitle {
    font-size: 1.5rem;
    font-weight: var(--Bold);
    margin-bottom: 1rem;

}

.stepCircle {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background-color: var(--Secondary-Orange-Brand-color);
    color: white;
    line-height: 3rem;
    margin: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: var(--Semi-Bold);
    margin-right: 1.5rem;
}

.step {
    display: flex;
    margin-top: 2rem;
}

.stepTitle {
    font-size: 1.25rem;
    font-weight: var(--Bold);
    margin-bottom: 0.5rem;
}


.gradient-btn-content {
    background-color: var(--primary-bgc);
    border-radius: 0.5rem;
    padding: 1rem 2rem;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease;
}

.gradient-btn-border {
    width: 100%;
    border-radius: 0.5em;
    margin-top: 3rem;

    background: linear-gradient(90deg, #8ED321 0%, #40B9FF 50%, #FF8E40 100%);
    padding: 0.2rem;
    cursor: pointer;
}

.PricingCardsButton {
    border: 0.1em solid;
    border-radius: 0.5em;
    padding: 0.5em 1.8em;
    justify-self: flex-end;
    margin-top: 4rem;

}

#FreePricingBtn {
    background-color: white;
    border-color: var(--Secondary-Brand-color);
    cursor: pointer;
}

/* #ProPricingBtn {
    background-color: var(--Secondary-Orange-Brand-color);
    border-color: var(--Secondary-Orange-Brand-color);
    color: white;
    cursor: pointer;
} */

/* #ProPricing {
    background-color: var(--primary-bgc);
    padding: 0.5rem;
    background: linear-gradient(135deg, #FF8E40 0%, #40B9FF 50%, #8ED321 100%);
    border-radius: 1rem;
    position: relative;
} */
/* 
.pro-card-inner {
    background-color: var(--primary-bgc, #FEFEFE);
    border-radius: 1rem;
    width: 100%;
    height: 100%;
} */
</style>
