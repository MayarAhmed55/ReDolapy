<template>
    <div>
 <div id="ProPricing" class="relative ">
                    <div class=" pro-card-inner flex flex-col justify-center items-center gap-8 ">
                        <p class="PricingTitle text-4xl font-bold">{{ cardTitle }}</p>
                        <p class="Price font-medium"><span class="text-4xl font-bold">{{ Price }}</span>{{ permonth }}</p>
                        <div class="planFeatures">
                            <p class="flex items-center gap-2 font-medium text-lg mb-1"><span class="text-[#8ED321]">
                                    <CircleCheckBig />
                                </span>{{ firstPoint }}</p>
                            <p class="flex items-center gap-2 font-medium text-lg  mb-1"><span class="text-[#8ED321]">
                                    <CircleCheckBig />
                                </span>{{ secondPoint }}</p>
                            <p class="flex items-center gap-2 font-medium text-lg  mb-1"><span class="text-[#8ED321]">
                                    <CircleCheckBig />
                                </span>{{thirdPoint}}</p>
                            <p class="flex items-center gap-2 font-medium text-lg  mb-1"><span class="text-[#8ED321]">
                                    <CircleCheckBig />
                                </span>{{ fourthPoint }}</p>

                        </div>
                        <div class="w-full space-y-3">
                            <slot name="AdditionalFeatures"></slot>
                        </div>
                        <button id="ProPricingBtn" class=" PricingCardsButton font-semibold text-lg"> <router-link
                                to="/pricing" class="no-underline">{{ buttonContent }}</router-link></button>

                                <slot name="AdditionalInfo"></slot>
                    </div>
                </div>
    </div>
</template>

<script>
import { CircleCheckBig } from '@lucide/vue';

export default {
        components:{
            CircleCheckBig
        },
        props:{
            cardTitle:String,
            Price:String,

            firstPoint:String,
            secondPoint:String,
            thirdPoint:String,
            fourthPoint:String,

            buttonContent:String,
            permonth:String
           
        },
        data(){
            return{
        }
    }
    }
</script>

<style scoped>
@import '../assets/Style.css';

#ProPricing {
    background-color: var(--primary-bgc);
    padding: 0.5rem;
    background: linear-gradient(135deg, #FF8E40 0%, #40B9FF 50%, #8ED321 100%);
    border-radius: 1rem;
    position: relative;
}
.pro-card-inner {
    background-color: var(--primary-bgc, #FEFEFE);
    border-radius: 1rem;
    width: 100%;
    height: 100%;
    padding: 5rem;

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
    margin-top: 4rem;

}

</style>