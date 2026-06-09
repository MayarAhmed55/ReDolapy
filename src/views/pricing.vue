<template>
    <Section class="flex justify-around">
        <div class="creditInfo card w-[40%]">
            <div class="creditInfoTitle flex gap-2 items-center w-[80%] m-auto">
                <ArrowLeft />
                <p class="text-3xl font-bold">{{ $t('pricing.completeSubscription') }}</p>
                <!-- <ArrowLeft /> -->
            </div>
            <div class="form mt-[3rem] w-[90%] mx-auto">
                <p class="text-2xl font-bold">{{ $t('pricing.paymentMethod') }}</p>
                <form action="">
                    <input id="cardNumber" class="border-2 border-gray-200 rounded-lg w-full p-[0.8rem] my-[2rem]" type="text" :placeholder="$t('pricing.cardNumber')" />
                    <div class="flex justify-between gap-4">
                        <input id="Date" class="border-2 border-gray-200 rounded-lg p-[0.8rem] w-[49%]" type="text" :placeholder="$t('pricing.dateFormat')" />
                        <input id="CVV" class="border-2 border-gray-200 rounded-lg p-[0.8rem] w-[49%]" type="text" :placeholder="$t('pricing.cvv')" />
                    </div>
                    <div class="form-check mt-[2rem]">
                        <label class="form-check-label inline-flex items-center gap-2">
                            <input type="checkbox" class="form-check-input" name="" id="" value="checkedValue" />
                            {{ $t('pricing.savePayment') }}
                        </label>
                    </div>
                </form>
            </div>
        </div>

        <div class="ProSubscription w-[40%]">
            <GradientCard
                :cardTitle="$t('pricing.pro.name')"
                :Price="$t('pricing.pro.price')"
                :firstPoint="$t('pricing.pro.features.0')"
                :secondPoint="$t('pricing.pro.features.1')"
                :thirdPoint="$t('pricing.pro.features.2')"
                :fourthPoint="$t('pricing.pro.features.3')"
                :buttonContent="$t('pricing.pro.button')"
                :permonth="$t('pricing.pro.priceUnit')"
            >
                <template #AdditionalFeatures>
                    <div>
                        <div class="flex justify-between w-[100%]">
                            <p class="Secondary-grayTxt font-semibold">{{ $t('pricing.monthly') }}</p>
                            <p class="Secondary-grayTxt font-semibold">{{ $t('pricing.monthlyPrice') }}</p>
                        </div>
                        <div class="flex justify-between w-[100%]">
                            <p class="greenTxt font-semibold">{{ $t('pricing.earlyBirdDiscount') }}</p>
                            <p class="greenTxt font-semibold">{{ $t('pricing.discountAmount') }}</p>
                        </div>
                        <div class="flex justify-between w-[100%]">
                            <p class="Secondary-grayTxt font-semibold">{{ $t('pricing.estimatedTax') }}</p>
                            <p class="Secondary-grayTxt font-semibold">{{ $t('pricing.taxAmount') }}</p>
                        </div>
                        <div class="flex justify-between w-[100%] mt-[2rem]">
                            <p class="Secondary-grayTxt text-2xl font-bold">{{ $t('pricing.dueToday') }}</p>
                            <p class="Secondary-grayTxt text-2xl font-bold">{{ $t('pricing.dueTodayValue') }}</p>
                        </div>
                    </div>
                </template>

                <template #AdditionalInfo>
                    <p class="grayTxt text-center">{{ $t('pricing.terms') }}</p>
                </template>
            </GradientCard>
        </div>
    </Section>
</template>

<script>
import GradientCard from '../components/GradientCard.vue';
import { ArrowLeft } from '@lucide/vue';


export default {
    name: 'pricing',
    components: {
        GradientCard,
        ArrowLeft

    }
}
</script>

<style scoped>
@import '../assets/Style.css';

.card {
    /* width: 32%; */
    background-color: white;
    border-radius: 1em;
    padding-top: 1rem;
    padding-bottom:3rem;
    height: fit-content;
    box-shadow: 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.1), -0.1rem -0.1rem 0.1rem rgba(0, 0, 0, 0.1);
}
</style>