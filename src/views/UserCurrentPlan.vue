<template>
    <p class="gradientColor font-bold text-4xl  m-auto text-center ">Your Current Plan</p>

    <div v-if="isProUser" id="ProPricing">
        <div class="pro-card-inner">
            <div class="border-b-1 border-gray-300 pb-[0.5rem]">
                <p class="PrimaryTxt font-semibold text-lg">Pro Plan</p>
                <p class="text-sm grayTxt">your current Plan</p>
            </div>

            <div class="border-b-1 border-gray-300 py-[2.5rem] flex justify-between">
                <div class="card w-[48%] bg-white dark:bg-[#0d0d0d]">
                    <p class="font-semibold  PrimaryTxt">Billing</p>
                    <p class="text-sm PrimaryTxt">{{ subscriptionInterval === 'year' ? '$16.19/month' : '$19.99/month'
                        }}</p>
                </div>
                <div class="card  w-[48%] bg-white dark:bg-[#0d0d0d]">
                    <p class="font-semibold PrimaryTxt">Renews</p>
                    <p class="text-sm  PrimaryTxt">{{ renewalDate }}</p>
                </div>
            </div>


            <div class="border-b-1 border-gray-300 py-[2.5rem] ">
                <p class="PrimaryTxt font-semibold text-lg pb-[0.5rem]">Your Benefits</p>
                <p class="text-sm grayTxt flex gap-3">
                    <Check></Check>{{ $t('pricing.pro.features.0') }}
                </p>
                <p class="text-sm grayTxt flex gap-3">
                    <Check></Check>{{ $t('pricing.pro.features.1') }}
                </p>
                <p class="text-sm grayTxt flex gap-3">
                    <Check></Check>{{ $t('pricing.pro.features.2') }}
                </p>
                <p class="text-sm grayTxt flex gap-3">
                    <Check></Check>{{ $t('pricing.pro.features.3') }}
                </p>
            </div>

            <button @click.prevent="showCancelModal = true" id="ProPricingBtn" type="button"
                class="PricingCardsButton font-semibold text-lg w-full rounded-xl transition-transform hover:scale-[1.01] text-white block">
                Cancel Subscription</button>

        </div>

        <div v-if="showCancelModal"
            class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">

            <div
                class="bg-white dark:bg-[#121212] rounded-2xl max-w-[500px] w-full p-8 shadow-2xl border border-gray-100 dark:border-gray-800 text-center space-y-6">

                <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
                    Cancel your Subscription?
                </h3>

                <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed px-2">
                    You’ll keep access to pro plan features until <span
                        class="font-semibold text-gray-800 dark:text-gray-200">Aug 25, 2026</span>. After that, your
                    account will return to the Essential plan.
                </p>

                <div class="flex gap-4 items-center justify-center pt-2">

                    <button @click="showCancelModal = false" type="button"
                        class="flex-1 py-3 px-6 border-2 border-[#8ED321] text-[#8ED321] font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors">
                        keep subscription
                    </button>

                    <button @click="handleCancelSubscription()" type="button"
                        class="flex-1 py-3 px-6 bg-[#FF8A3D] text-white font-semibold rounded-xl hover:scale-[1.01] transition-transform shadow-md hover:bg-[#e2762f]">
                        confirm cancellation
                    </button>

                </div>
            </div>
        </div>

    </div>

    <div v-else id="FreePricing"
        class="card  m-auto  bg-white dark:bg-[#0d0d0d] flex flex-col justify-center items-center gap-8">
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
        </div>

        <!-- <router-link to="/TryOn" id="FreePricingBtn" class="PricingCardsButton font-semibold text-lg">
          {{ $t("pricing.free.button") }}
        </router-link> -->
    </div>
</template>

<script>
import axios from 'axios';

import { Check } from '@lucide/vue';

export default {
    name: 'UserCurrentPlan',
    components: {
        Check

    },
    data() {
        return {
            showCancelModal: false,
            isProUser: false,
            subscriptionInterval: 'month',
            isPageLoading: true,
            isProcessing: false,
            renewalDate: '⏳ Loading...',
        }
    },
    async mounted() {
        await this.fetchUserSubscriptionDetails();

        // this.isPageLoading = false;
        // this.isProUser = false; // Set to false if you want to test the Free Tier look!
        // this.subscriptionInterval = 'month'; // Test changing this to 'year' to check pricing text
        // this.renewalDate = 'Aug 25, 2026';

    },

    methods: {
        async fetchUserSubscriptionDetails() {
            this.isPageLoading = true;
            try {
                const userToken = localStorage.getItem('token');
                if (!userToken) {
                    this.isProUser = false;
                    return;
                }

                const base64Url = userToken.split('.')[1];
                const tokenPayload = JSON.parse(window.atob(base64Url.replace(/-/g, '+').replace(/_/g, '/')));
                const cleanUserId = (tokenPayload.id || tokenPayload._id || '').trim();

                const response = await axios.post('http://localhost:5000/api/payments/sync-subscription', {
                    userId: cleanUserId
                }, {
                    headers: { Authorization: `Bearer ${userToken}` }
                });

                if (response.data && response.data.subscriptionStatus === 'active') {
                    this.isProUser = true;
                    this.subscriptionInterval = response.data.subscriptionInterval || 'month';
                    this.renewalDate = response.data.renewalDate || 'Aug 25, 2026';
                } else {
                    this.isProUser = false;
                }
            } catch (error) {
                console.error("Failed to map subscription status metadata:", error);
                this.isProUser = false;
            } finally {
                this.isPageLoading = false;
            }
        },

        async handleCancelSubscription() {
            if (this.isProcessing) return;
            this.isProcessing = true;
            setTimeout(() => {
    alert("Subscription canceled successfully. (MOCK TEST)");
    this.isProcessing = false;
    this.showCancelModal = false;
    
    // This should instantly toggle your page view from the Pro card back to the Free Plan card!
    this.isProUser = false; 
  }, 1500); //

            try {
                const userToken = localStorage.getItem('token');
                const base64Url = userToken.split('.')[1];
                const tokenPayload = JSON.parse(window.atob(base64Url.replace(/-/g, '+').replace(/_/g, '/')));
                const cleanUserId = (tokenPayload.id || tokenPayload._id || '').trim();

                const response = await axios.post('http://localhost:5000/api/payments/cancel-subscription', {
                    userId: cleanUserId
                }, {
                    headers: { Authorization: `Bearer ${userToken}` }
                });

                if (response.data.success) {
                    alert("Subscription canceled successfully.");
                    this.showCancelModal = false;
                    this.isProUser = false;
                }
            } catch (error) {
                console.error("Cancellation endpoint failure:", error);
                alert(error.response?.data?.message || "Failed to cancel core subscription profile.");
            } finally {
                this.isProcessing = false;
            }
        }
    }

}
</script>

<style scoped>
.card {
    width: 48%;
    border-radius: 0.5em;
    padding: 0.5rem;
}

#FreePricing{
   width: 30%;
    border-radius: 0.5em;
    padding: 3rem 1rem;
}


.gradientColor {
    background: var(--Gradient-bgc);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-fill-color: transparent;
    width: fit-content;
    line-height: 1.3;
    padding-bottom: 1.5em;
    padding-top: 1.5em;
}

#ProPricing {
    width: 50%;
    margin: auto;
    background-color: var(--primary-bgc);
    padding: 0.3rem;
    background: linear-gradient(135deg, #FF8E40 0%, #40B9FF 50%, #8ED321 100%);
    border-radius: 1rem;
    position: relative;
}

.pro-card-inner {
    background-color: var(--primary-bgc, #FEFEFE);
    border-radius: 1rem;
    width: 100%;
    height: 100%;
    padding: 2rem;

}

#ProPricingBtn {
    background-color: var(--Secondary-Orange-Brand-color);
    border-color: var(--Secondary-Orange-Brand-color);
    color: white;
    cursor: pointer;
}

.PricingCardsButton {
    border: 0.1em solid;
    border-radius: 0.5em;
    padding: 0.5em 1.8em;
    justify-self: flex-end;
    margin-top: 2rem;

}
</style>