<template>
  <div>
    <Header :primaryText="$t('header.primaryText')" :gradientText="$t('header.gradientText')"
      :Description="$t('header.description')" :btnCTA="$t('header.cta')" routeTo="/Tryon" :imageSrc="headerImgAsset" />


    <CardsSection :key="themeKey" :sectionTitle="$t('features.sectionTitle')"
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

    <section id="StepsSection" class="flex flex-col lg:flex-row justify-between items-center gap-8 px-4 lg:px-0 my-12">
      <div class="StepsImg  w-full w-auto flex justify-center px-4">
        <img src="../assets/image 9.png" class="w-full max-w-[40rem] h-auto max-h-[30rem] object-cover rounded-xl"
          :alt="$t('features.sectionTitle')" />
      </div>

      <div id="Steps" class="w-full lg:w-[48%] space-y-4 ">
        <p class="font-bold text-3xl md:text-4xl PrimaryTxt text-center lg:text-start">{{ $t("steps.title") }}</p>
        <div class="step flex items-start">
          <div class="stepCircle flex-shrink-0">
            <p>1</p>
          </div>
          <div class="">
            <p class="stepTitle PrimaryTxt">
              {{ $t("steps.uploadSync.title") }}
            </p>
            <p class="Secondary-grayTxt text-sm md:text-base">
              {{ $t("steps.uploadSync.description") }}
            </p>
          </div>
        </div>

        <div class="step flex items-start">
          <div class="stepCircle flex-shrink-0">
            <p>2</p>
          </div>
          <div class="">
            <p class="stepTitle PrimaryTxt">
              {{ $t("steps.neuralAnalysis.title") }}
            </p>
            <p class="Secondary-grayTxt  text-sm md:text-base">
              {{ $t("steps.neuralAnalysis.description") }}
            </p>
          </div>
        </div>

        <div class="step flex">
          <div class="stepCircle flex-shrink-0">
            <p>3</p>
          </div>
          <div class="">
            <p class="stepTitle PrimaryTxt">
              {{ $t("steps.curatedStyling.title") }}
            </p>
            <p class="Secondary-grayTxt text-sm md:text-base">
              {{ $t("steps.curatedStyling.description") }}
            </p>
          </div>
        </div>
      </div>
    </section>


    <!-- <section :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'" class="px-4 lg:px-0">

      <div class="relative flex flex-col items-center lg:items-start text-center lg:text-start md:d-block">

        <router-link to="/Brands">

          <span class="absolute top-3  flex gap-2 text-[#8ED321]" :class="$i18n.locale === 'ar' ? 'left-1' : 'right-1'">

            {{ $t('brands.viewAll') }}

            <ChevronRight class="text-lg" :class="{ 'rotate-180': $i18n.locale === 'ar' }" />

          </span>
          </router-link>

 <p id="FeaturesTitle" class="text-4xl md:text-5xl font-bold  PrimaryTxt flex">
          {{ $t('brands.title') }}
        </p>

        <p class="mb-[1rem] font-medium grayTxt m-2">
          {{ $t('brands.subtitle') }}
          <span class="gradientColor">{{ $t('brands.appName') }}</span>
        </p>
      </div>
      <div class="cardsContainer flex flex-col lg:flex-row gap-6 justify-center my-[3rem] ">

        <div
          class="card bg-white dark:bg-[#0d0d0d] min-h-[25rem] h-auto shadow-lg md:w-[60%]  sm:w-[90%] self-center lg:w-[32%]">
          <div class="flex justify-center items-center m-auto mb-[2rem]">
            <img src="../assets/H&M.jpg" class="h-[10rem] w-[10rem] object-contain" alt="H&M">
          </div>
          <p class="serviceTitle PrimaryTxt">{{ $t('brands.hm.title') }}</p>
          <p class="serviceDescription Secondary-grayTxt">
            {{ $t('brands.hm.description') }}
          </p>
        </div>

        <div
          class="card bg-white dark:bg-[#0d0d0d] min-h-[25rem] h-auto shadow-lg md:w-[60%]  sm:w-[90%] self-center lg:w-[32%]">
          <div class="flex justify-center items-center m-auto mb-[2rem]">
            <img src="../assets/H&M.jpg" class="h-[10rem] w-[10rem] object-contain" alt="H&M">
          </div>
          <p class="serviceTitle PrimaryTxt">{{ $t('brands.hm.title') }}</p>
          <p class="serviceDescription Secondary-grayTxt">
            {{ $t('brands.hm.description') }}
          </p>
        </div>

        <div
          class="card bg-white dark:bg-[#0d0d0d] min-h-[25rem] h-auto shadow-lg md:w-[60%]  sm:w-[90%]  self-center  lg:w-[32%]">
          <div class="flex justify-center items-center m-auto mb-[2rem]">
            <img src="../assets/H&M.jpg" class="h-[10rem] w-[10rem] object-contain" alt="H&M">
            <ArrowRight :class="{ 'rotate-180': $i18n.locale === 'ar' }" />
            <img :src="imgSrc6" alt="">
          </div>
          <p class="serviceTitle PrimaryTxt">{{ $t('brands.hm.title') }}</p>
          <p class="serviceDescription Secondary-grayTxt">
            {{ $t('brands.hm.description') }}
          </p>
        </div>
        </div>
    </section> -->

    <section :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'" class="px-4 lg:px-0">

      <div
        class="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-4 w-full  border-zinc-100 dark:border-zinc-800 pb-4 mb-6">

        <div class="flex flex-col items-center lg:items-start text-center lg:text-start">
          <h2 id="FeaturesTitle" class="text-3xl md:text-4xl lg:text-5xl font-bold PrimaryTxt mb-2">
            {{ $t('brands.title') }}
          </h2>
          <p class="font-medium grayTxt text-sm md:text-base">
            {{ $t('brands.subtitle') }}
            <span class="gradientColor">{{ $t('brands.appName') }}</span>
          </p>
        </div>

        <div class="flex justify-center lg:justify-end shrink-0 mt-2 lg:mt-0">
          <router-link to="/Brands" class="no-underline hover:underline">
            <span class="flex items-center gap-2 text-[#8ED321] font-semibold text-sm sm:text-base">
              {{ $t('brands.viewAll') }}
              <ChevronRight class="text-lg transition-transform duration-200"
                :class="{ 'rotate-180': $i18n.locale === 'ar' }" />
            </span>
          </router-link>
        </div>

      </div>

      <div class="cardsContainer flex flex-col lg:flex-row gap-6 justify-center my-[3rem]">

        <div
          class="card bg-white dark:bg-[#0d0d0d] min-h-[25rem] h-auto shadow-lg p-6 rounded-3xl border border-zinc-100 dark:border-zinc-800 w-full sm:w-[90%] md:w-[60%] lg:w-[32%] self-center">
          <div class="flex justify-center items-center mx-auto mb-6">
            <img src="../assets/H&M.jpg" class="h-40 w-40 object-contain" alt="H&M">
          </div>
          <p class="serviceTitle text-xl font-bold PrimaryTxt mb-2 text-center">{{ $t('brands.hm.title') }}</p>
          <p class="serviceDescription text-sm Secondary-grayTxt text-center leading-relaxed">
            {{ $t('brands.hm.description') }}
          </p>
        </div>

        <div
          class="card bg-white dark:bg-[#0d0d0d] min-h-[25rem] h-auto shadow-lg p-6 rounded-3xl border border-zinc-100 dark:border-zinc-800 w-full sm:w-[90%] md:w-[60%] lg:w-[32%] self-center">
          <div class="flex justify-center items-center mx-auto mb-6">
            <img src="../assets/H&M.jpg" class="h-40 w-40 object-contain" alt="H&M">
          </div>
          <p class="serviceTitle text-xl font-bold PrimaryTxt mb-2 text-center">{{ $t('brands.hm.title') }}</p>
          <p class="serviceDescription text-sm Secondary-grayTxt text-center leading-relaxed">
            {{ $t('brands.hm.description') }}
          </p>
        </div>

        <div
          class="card bg-white dark:bg-[#0d0d0d] min-h-[25rem] h-auto shadow-lg p-6 rounded-3xl border border-zinc-100 dark:border-zinc-800 w-full sm:w-[90%] md:w-[60%] lg:w-[32%] self-center">
          <div class="flex justify-center items-center mx-auto mb-6">
            <img src="../assets/H&M.jpg" class="h-40 w-40 object-contain" alt="H&M">
          </div>
          <p class="serviceTitle text-xl font-bold PrimaryTxt mb-2 text-center">{{ $t('brands.hm.title') }}</p>
          <p class="serviceDescription text-sm Secondary-grayTxt text-center leading-relaxed">
            {{ $t('brands.hm.description') }}
          </p>
        </div>

      </div>
    </section>





    <section id="PricingSection">
      <p class="w-fit m-auto mb-[1rem] font-bold text-3xl md:text-4xl gradientColor PrimaryTxt">
        {{ $t("pricing.title") }}
      </p>
      <p class="w-fit m-auto font-medium PrimaryTxt text-center text-sm md:text-base">
        {{ $t("pricing.subtitle") }}
      </p>


      <div
        class="flex items-center bg-white dark:bg-[#0d0d0d]  p-1.5 rounded-full w-full max-w-[320px] m-auto shadow-inner my-6">
        <button @click="isYearly = false" type="button"
          :class="['flex-1 py-2 text-sm font-semibold rounded-full transition-all duration-300 text-center', !isYearly ? 'bg-white text-black shadow-md' : 'text-gray-500']">
          {{ $t('pricing.monthlyToggle') }}
        </button>

        <button @click="isYearly = true" type="button"
          :class="['flex-1 py-2 text-sm font-semibold rounded-full transition-all duration-300 text-center', isYearly ? 'bg-white text-black shadow-md' : 'text-gray-500']">
          {{ $t('pricing.yearlyToggle') }}
        </button>
      </div>

      <div id="PricingCards"
        class="flex flex-column flex-wrap lg:flex-row lg:flex-nowrap  gap-8 justify-center items-center my-[3rem] max-w-[1000px] m-auto">

        <div id="FreePricing"
          class="card  bg-white dark:bg-[#0d0d0d] flex flex-col  justify-center  items-center gap-8 w-[50%] lg:w-[48%] min-w-[320px] max-w-[380px] !px-6">
          <p class="PricingTitle text-4xl font-bold PrimaryTxt">
            {{ $t("pricing.free.name") }}
          </p>
          <p class="Price font-medium PrimaryTxt">
            <span class="text-4xl font-bold">{{ $t("pricing.free.price") }}</span>
            {{ $t("pricing.free.priceUnit") }}
          </p>
          <div class="planFeatures">
            <p class="flex items-center gap-2 font-medium text-lg PrimaryTxt mb-1">
              <span class="text-[#8ED321]">
                <CircleCheckBig />
              </span>
              {{ $t("pricing.free.features.0") }}
            </p>
            <p class="flex items-center gap-2 font-medium text-lg PrimaryTxt mb-1">
              <span class="text-[#8ED321]">
                <CircleCheckBig />
              </span>
              {{ $t("pricing.free.features.1") }}
            </p>
            <p class="flex items-center gap-2 font-medium text-lg PrimaryTxt mb-1">
              <span class="text-[#8ED321]">
                <CircleCheckBig />
              </span>
              {{ $t("pricing.free.features.2") }}
            </p>
            <p class="flex items-center gap-2 font-medium text-lg PrimaryTxt mb-1">
              <span class="text-[#8ED321]">
                <CircleCheckBig />
              </span>
              {{ $t("pricing.free.features.3") }}
            </p>
            <p class="flex items-center gap-2 font-medium text-lg PrimaryTxt mb-1">
              <span class="text-[#8ED321]">
                <CircleCheckBig />
              </span>
              {{ $t("pricing.free.features.4") }}
            </p>
            <p class="flex items-center gap-2 font-medium text-lg PrimaryTxt mb-1">
              <span class="text-[#8ED321]">
                <CircleCheckBig />
              </span>
              {{ $t("pricing.free.features.5") }}
            </p>
          </div>
        </div>

        <GradientCard :cardTitle="$t('pricing.pro.name')" :Price="isYearly ? '$12.19' : '$16.99'"
          :permonth="$t('pricing.pro.priceUnit')" :firstPoint="$t('pricing.pro.features.0')"
          :secondPoint="$t('pricing.pro.features.1')" :thirdPoint="$t('pricing.pro.features.2')"
          :fourthPoint="$t('pricing.pro.features.3')" :fifthPoint="$t('pricing.pro.features.4')"
          :buttonContent="isProcessing ? 'Connecting to Stripe...' : $t('pricing.pro.button')"
          @click.self="handleSubscriptionSubmit" :disabled="isProcessing">

          <template #AdditionalFeatures>
            <div class="w-full text-sm space-y-2 border-t pt-4 border-gray-200 PrimaryTxt text-start">
              <div class="flex justify-between">
                <span>{{ isYearly ? 'Annual Subscription' : 'Monthly Subscription' }}</span>
                <span>{{ isYearly ? '$146.28' : '$16.99' }}</span>
              </div>
              <div class="flex justify-between text-green-500">
                <span>{{ $t('pricing.earlyBirdDiscount') }}</span>
                <span>{{ isYearly ? '-$30.00' : '-$5.00' }}</span>
              </div>
              <div class="flex justify-between">
                <span>{{ $t('pricing.estimatedTax') }}</span>
                <span>{{ isYearly ? '$10.80' : '$1.20' }}</span>
              </div>
              <div class="flex justify-between font-bold text-base border-t pt-2 mt-2 border-dashed border-gray-300">
                <span>{{ $t('pricing.dueToday') }}</span>
                <span>{{ isYearly ? '$127' : '$13.19' }}</span>
              </div>
            </div>
          </template>

          <template #AdditionalInfo>
            <p class="text-[10px] text-gray-400 max-w-[240px] text-center mt-2 leading-tight">
              {{ $t('pricing.footerConsent') }} </p>
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
import axios from 'axios';
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
      themeKey: 0,
      navLinks: [
        { to: "/TryOn", label: "TryOn", mobileLabel: "Try-On" }
      ],
      isYearly: false,
      activeIndex: null,
      isProcessing: false,
      isDark: false,
      monthlyPriceId: 'price_1TgioI2VU1wC4JSCeQu0umZH',
      yearlyPriceId: 'price_1ThEW22VU1wC4JSClcfYI7uK',


    }
  },
  setup() {
    function openAuthModal(mode = "signup") {
      authModalMode.value = mode;
      isAuthModalOpen.value = true;
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


    async handleSubscriptionSubmit() {
      if (this.isProcessing) return;
      this.isProcessing = true;

      try {
        const userToken = localStorage.getItem('token');
        if (!userToken) {
          alert("Please log in to continue.");
          this.isProcessing = false;
          return;
        }

        const base64Url = userToken.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const tokenPayload = JSON.parse(window.atob(base64));

        const rawId = tokenPayload.id || tokenPayload._id;
        const cleanUserId = rawId ? rawId.trim() : '';

        const backendPayload = {
          userId: cleanUserId,
          user_id: cleanUserId,
          id: cleanUserId,
          plan: 'pro',

          interval: this.isYearly ? 'year' : 'month',

          // success_url: 'http://localhost:5173/pricing?success=true',
          // cancel_url: 'http://localhost:5173/pricing?canceled=true'
          success_url: window.location.origin + '/pricing?success=true',
          cancel_url: window.location.origin + '/pricing?canceled=true'

        };

        console.log("Sending clean, structured backend payload:", backendPayload);

        const response = await axios.post(
          'http://localhost:5000/api/payments/create-checkout-session',
          backendPayload,
          {
            headers: {
              Authorization: `Bearer ${userToken}`
            }
          }
        );

        if (response.data && response.data.url) {
          window.location.href = response.data.url;
        } else {
          console.warn("Backend response format issue:", response.data);
          alert("Session generated, but redirect URL could not be parsed.");
        }

      } catch (error) {
        console.error("Outbound billing pipeline failure:", error);

        console.log("SERVER ERROR RESPONSE DATA:", error.response?.data);

        alert(error.response?.data?.message || 'Server processing error.');
      } finally {
        this.isProcessing = false;
      }
    }
  },


  toggleItem(index) {
    if (this.activeIndex === index) {
      this.activeIndex = null;
    } else {
      this.activeIndex = index;
    }
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
  /* width: 32%; */
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
  background-color: #40b9ff40;
  color: var(--Primary-Brand-color);
}

.TryOn {
  background-color: #feefe5;
  color: var(--Secondary-Orange-Brand-color);
  background-color: #feefe5;
  color: var(--Secondary-Orange-Brand-color);
}

.Recycle {
  background-color: #84cc1640;
  color: var(--Secondary-Brand-color);
  background-color: #84cc1640;
  color: var(--Secondary-Brand-color);
}

.RecycleIcon {
  color: var(--Secondary-Brand-color);
  color: var(--Secondary-Brand-color);
}

.serviceDescription {
  color: var(--Secondary-Text-color);
  color: var(--Secondary-Text-color);
}

.serviceTitle {
  font-size: 1.5rem;
  font-weight: var(--Bold);
  margin-bottom: 1rem;
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
  display: flex;
  margin-top: 2rem;
}

.stepTitle {
  font-size: 1.25rem;
  font-weight: var(--Bold);
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  font-weight: var(--Bold);
  margin-bottom: 0.5rem;
}
</style>
