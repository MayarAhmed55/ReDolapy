<template>
  <div>
    <Header :primaryText="$t('header.primaryText')" :gradientText="$t('header.gradientText')"
      :Description="$t('header.description')" :btnCTA="$t('header.cta')" routeTo="/Tryon" :imageSrc="headerImgAsset" />


    <CardsSection :key="themeKey" :sectionTitle="$t('features.sectionTitle')" :sectionDescription="$t('features.sectionDescription')"
      :Card1Title="$t('features.aiRecommendations.title')"
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
      <div class="StepsImg rounded-xl">
        <img src="../assets/image 9.png" class="w-[40rem] h-[30rem] rounded-xl" :alt="$t('features.sectionTitle')" />
      </div>

      <div id="Steps" class="w-[48%]">
        <p class="font-bold text-4xl PrimaryTxt">{{ $t("steps.title") }}</p>
        <div class="step flex">
          <div class="stepCircle">
            <p>1</p>
          </div>
          <div class="">
            <p class="stepTitle PrimaryTxt">
              {{ $t("steps.uploadSync.title") }}
            </p>
            <p class="Secondary-grayTxt">
              {{ $t("steps.uploadSync.description") }}
            </p>
          </div>
        </div>

        <div class="step flex">
          <div class="stepCircle">
            <p>2</p>
          </div>
          <div class="">
            <p class="stepTitle PrimaryTxt">
              {{ $t("steps.neuralAnalysis.title") }}
            </p>
            <p class="Secondary-grayTxt">
              {{ $t("steps.neuralAnalysis.description") }}
            </p>
          </div>
        </div>

        <div class="step flex">
          <div class="stepCircle">
            <p>3</p>
          </div>
          <div class="">
            <p class="stepTitle PrimaryTxt">
              {{ $t("steps.curatedStyling.title") }}
            </p>
            <p class="Secondary-grayTxt">
              {{ $t("steps.curatedStyling.description") }}
            </p>
          </div>
        </div>
      </div>
    </section>
  

        <section>
          <div class="relative">
           <router-link><span class="absolute top-3 right-1 flex gap-2 text-[#8ED321]">View all <ChevronRight class="text-lg"/> </span></router-link> 
            <p id="FeaturesTitle" class=" text-5xl font-bold m-auto PrimaryTxt flex">Our Brand Partners: </p>
            <p class=" mb-[1rem] font-medium grayTxt">Discover and shop from your favorite fashion Stores with exclusive discounts found only on <Span class="gradientColor">ReDolapy Application.</Span></p>
</div>


            <div class="cardsContainer flex gap-8 justify-center my-[3rem]">
                <div class="card bg-white dark:bg-[#0d0d0d] h-[25rem] shadow-lg">
                 <div class="flex justify-between items-center gap-4 w-[fit-content] m-auto mb-[2rem]">
                    <img src="../assets/H&M.jpg" class="h-[10rem] w-[10rem] mb-[1rem]"  alt="">
                 </div>
                 <p class="serviceTitle PrimaryTxt">H&M</p>
                    <p class="serviceDescription Secondary-grayTxt  ">Discover your Favorite Items in H&M and get the discount on what you love from the Application</p>
                </div>

                <div class="card bg-white dark:bg-[#0d0d0d] h-[25rem] shadow-xl">
                   <div class="flex justify-between items-center gap-4 w-[fit-content] m-auto mb-[2rem]">
                    <img src="../assets/H&M.jpg" class="h-[10rem] w-[10rem]" alt="">
                 </div>
                 <p class="serviceTitle PrimaryTxt">H&M</p>
                    <p class="serviceDescription Secondary-grayTxt  ">Discover your Favorite Items in H&M and get the discount on what you love from the Application</p>
                </div>

                <div class="card bg-white dark:bg-[#0d0d0d] h-[25rem] shadow-lg">
                 <div class="flex justify-between items-center gap-4 w-[fit-content] m-auto mb-[2rem]">
                    <img src="../assets/H&M.jpg" class="h-[10rem] w-[10rem]" alt="">
                    <ArrowRight/>
                    <img :src="imgSrc6" alt="">
                 </div>
                 <p class="serviceTitle PrimaryTxt">H&M</p>
                    <p class="serviceDescription Secondary-grayTxt ">Discover your Favorite Items in H&M and get the discount on what you love from the Application</p>
                </div>
            </div>
        </section>
 
    <section id="PricingSection">
    <p class="w-[fit-content] m-auto mb-[1rem] font-bold text-4xl gradientColor PrimaryTxt">
      {{ $t("pricing.title") }}
    </p>
    <p class="w-[fit-content] m-auto font-medium PrimaryTxt">
      {{ $t("pricing.subtitle") }}
    </p>


    <div class="flex items-center bg-white dark:bg-[#0d0d0d]  p-1.5 rounded-full w-full max-w-[320px] m-auto shadow-inner my-6">
  <button 
    @click="isYearly = false"
    type="button"
    :class="['flex-1 py-2 text-sm font-semibold rounded-full transition-all duration-300 text-center', !isYearly ? 'bg-white text-black shadow-md' : 'text-gray-500']"
  >
    {{ $t('pricing.monthlyToggle') }}
  </button>
  
  <button 
    @click="isYearly = true"
    type="button"
    :class="['flex-1 py-2 text-sm font-semibold rounded-full transition-all duration-300 text-center', isYearly ? 'bg-white text-black shadow-md' : 'text-gray-500']"
  >
    {{ $t('pricing.yearlyToggle') }}
  </button>
</div>

    <div id="PricingCards" class="flex gap-8 justify-center my-[3rem] items-center">
      
      <div id="FreePricing" class="card  bg-white dark:bg-[#0d0d0d] flex flex-col justify-center items-center gap-8">
        <p class="PricingTitle text-4xl font-bold PrimaryTxt">
          {{ $t("pricing.free.name") }}
        </p>
        <p class="Price font-medium PrimaryTxt">
          <span class="text-4xl font-bold">{{ $t("pricing.free.price") }}</span>
          {{ $t("pricing.free.priceUnit") }}
        </p>
        <div class="planFeatures">
          <p class="flex items-center gap-2 font-medium text-lg PrimaryTxt mb-1">
            <span class="text-[#8ED321]"><CircleCheckBig /></span>
            {{ $t("pricing.free.features.0") }}
          </p>
          <p class="flex items-center gap-2 font-medium text-lg PrimaryTxt mb-1">
            <span class="text-[#8ED321]"><CircleCheckBig /></span>
            {{ $t("pricing.free.features.1") }}
          </p>
          <p class="flex items-center gap-2 font-medium text-lg PrimaryTxt mb-1">
            <span class="text-[#8ED321]"><CircleCheckBig /></span>
            {{ $t("pricing.free.features.2") }}
          </p>
        </div>

        <!-- <router-link to="/TryOn" id="FreePricingBtn" class="PricingCardsButton font-semibold text-lg">
          {{ $t("pricing.free.button") }}
        </router-link> -->
      </div>

      <GradientCard 
        :cardTitle="$t('pricing.pro.name')" 
        :Price="isYearly ? '$16.19' : '$19.99'"
        :permonth="$t('pricing.pro.priceUnit')"
        :firstPoint="$t('pricing.pro.features.0')" 
        :secondPoint="$t('pricing.pro.features.1')"
        :thirdPoint="$t('pricing.pro.features.2')" 
        :fourthPoint="$t('pricing.pro.features.3')"
        :buttonContent="$t('pricing.pro.button')"
      >
        <template #AdditionalFeatures>
          <div class="w-full text-sm space-y-2 border-t pt-4 border-gray-200 PrimaryTxt text-start">
            <div class="flex justify-between">
              <span>{{ isYearly ? 'Annual Subscription' : 'Monthly Subscription' }}</span>
              <span>{{ isYearly ? '$143.88' : '$19.99' }}</span>
            </div>
            <div class="flex justify-between text-green-500">
              <span>Early Bird Discount</span>
              <span>{{ isYearly ? '-$30.00' : '-$5.00' }}</span>
            </div>
            <div class="flex justify-between">
              <span>Estimated Tax</span>
              <span>{{ isYearly ? '$10.80' : '$1.20' }}</span>
            </div>
            <div class="flex justify-between font-bold text-base border-t pt-2 mt-2 border-dashed border-gray-300">
              <span>Due today</span>
              <span>{{ isYearly ? '$124.68' : '$16.19' }}</span>
            </div>
          </div>
        </template>

        <template #AdditionalInfo>
          <p class="text-[10px] text-gray-400 max-w-[240px] text-center mt-2 leading-tight">
            By subscribing, you agree to ReDolapy's Terms of Service and Privacy Policy.
          </p>
        </template>
      </GradientCard>

    </div>
  </section>
   
  </div>
</template>

<script>
import {
  Sparkles,
  Shirt,
  Recycle,
  CircleCheckBig,
  PersonStanding,
} from "@lucide/vue";
import Header from "../components/Header.vue";
import HeaderImage from "../assets/HeaderImage.png";
import HeaderImageDark from "../assets/HeaderImageDark.png"
import GradientBorderBtn from "../components/GradientBorderBtn.vue";
import CardsSection from "../components/CardsSection.vue";
import GradientCard from "../components/GradientCard.vue";
import { isAuthModalOpen, authModalMode } from "../authState.js";
import { ChevronRight } from '@lucide/vue';


export default {
  name: "HomePage",
  data() {
    return {
      themeKey:0 ,
      navLinks: [
        { to: "/TryOn", label: "TryOn", mobileLabel: "Try-On" }
      ],
      isYearly: false ,
      activeIndex: null,
      // headerImgAsset: HeaderImage,
      isDark: false, // Fallback local tracker


    }
  },
  setup() {
    function openAuthModal(mode = "signup") {
      authModalMode.value = mode; // Set it to 'signup' or 'login'
      isAuthModalOpen.value = true; // Open the modal!
    }

    return { openAuthModal };
  },
  mounted() {
    this.checkCurrentTheme();
    this.themeObserver = new MutationObserver(() => this.checkCurrentTheme());
    this.themeObserver.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
  },

  components: {
    Sparkles,
    Shirt,
    Recycle,
    CircleCheckBig,
    Header,
    GradientBorderBtn,
    CardsSection,
    GradientCard,
    PersonStanding,
    ChevronRight
  },
  // data() {
  //   return {
  //     activeIndex: null,
  
  //     headerImgAsset: HeaderImage,
  //   };
  // },

beforeUnmount() {
    if (this.themeObserver) this.themeObserver.disconnect();
  },

  computed: {
    faqItems() {
      return this.$t("faq.questions") || [];
    },
    headerImgAsset() {
      return this.isDark ? HeaderImageDark : HeaderImage;
    }
  },

  methods: {
  checkCurrentTheme() {
      this.isDark = document.documentElement.classList.contains('dark');
    },

    toggleItem(index) {
      if (this.activeIndex === index) {
        this.activeIndex = null;
      } else {
        this.activeIndex = index;
      }
    },
  },
};
</script>

<style scoped>
/* @import "../assets/Style.css"; */

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
  border-radius: 1em;
  padding: 2rem;
  padding-bottom: 4rem;
  /* box-shadow:
    0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.1),
    -0.1rem -0.1rem 0.1rem rgba(0, 0, 0, 0.1); */
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
  background-color: #40b9ff40;
  color: var(--Primary-Brand-color);
}

.TryOn {
  background-color: #feefe5;
  color: var(--Secondary-Orange-Brand-color);
}

.Recycle {
  background-color: #84cc1640;
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

  background: linear-gradient(90deg, #8ed321 0%, #40b9ff 50%, #ff8e40 100%);
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

</style>
