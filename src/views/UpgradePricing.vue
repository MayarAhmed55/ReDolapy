<template>
    <div>
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
          @click="handleSubscriptionSubmit" :disabled="isProcessing">

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
        import {CircleCheckBig} from "@lucide/vue";
        import axios from 'axios';
        import API_BASE from '../config/api.js';
        // import GradientBorderBtn from "../components/GradientBorderBtn.vue";
        import CardsSection from "../components/CardsSection.vue";
        import GradientCard from "../components/GradientCard.vue";
        import { isAuthModalOpen, authModalMode } from "../authState.js";
        // import { ChevronRight } from '@lucide/vue';

export default {
  name: "UpgradePricing",
  data() {
    return {
      themeKey: 0,
    //   navLinks: [
    //     { to: "/TryOn", label: "TryOn", mobileLabel: "Try-On" }
    //   ],
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
    CircleCheckBig,
    // GradientBorderBtn,
    // CardsSection,
    GradientCard,
  },

  beforeUnmount() {
    if (this.themeObserver) this.themeObserver.disconnect();
  },

//   computed: {
//     faqItems() {
//       return this.$t("faq.questions") || [];
//     },
//     headerImgAsset() {
//       return this.isDark ? HeaderImageDark : HeaderImage;
//     }
//   },

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

          success_url: window.location.origin + '/pricing?success=true',
          cancel_url: window.location.origin + '/pricing?canceled=true'

        };

        console.log("Sending clean, structured backend payload:", backendPayload);

        const response = await axios.post(
          `${API_BASE}/payments/create-checkout-session`,
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


};
</script>

<style scoped>
.card {
  /* width: 32%; */
  border-radius: 1em;
  padding: 2rem;
  padding-bottom: 4rem;
  /* box-shadow:
    0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.1),
    -0.1rem -0.1rem 0.1rem rgba(0, 0, 0, 0.1); */
}
</style>