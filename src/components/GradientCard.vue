<template>


  <div>
    <div id="ProPricing" class="relative ">
          
          <div class="pro-card-inner flex flex-col justify-between items-center gap-6">
              
              <div class=" bg-[#FF8E40] self-start text-white  text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full z-10">
                Popular
              </div>
        <div class="text-center PrimaryTxt dark:text-white">
          <p class="PricingTitle text-4xl font-bold mb-2 ">{{ cardTitle }}</p>
          <p class="Price font-medium">
            <span class="text-4xl font-bold ">{{ Price }}</span>{{ permonth }}
          </p>
        </div>

        <div class="planFeatures text-start w-full PrimaryTxt dark:text-white">
          <p class="flex items-center gap-2 font-medium text-base mb-2">
            <span class="text-[#8ED321] flex-shrink-0"><CircleCheckBig /></span>
            <span>{{ firstPoint }}</span>
          </p>
          <p class="flex items-center gap-2 font-medium text-base mb-2">
            <span class="text-[#8ED321] flex-shrink-0"><CircleCheckBig /></span>
            <span>{{ secondPoint }}</span>
          </p>
          <p class="flex items-center gap-2 font-medium text-base mb-2">
            <span class="text-[#8ED321] flex-shrink-0"><CircleCheckBig /></span>
            <span>{{ thirdPoint }}</span>
          </p>
          <p class="flex items-center gap-2 font-medium text-base mb-2">
            <span class="text-[#8ED321] flex-shrink-0"><CircleCheckBig /></span>
            <span>{{ fourthPoint }}</span>
          </p>
        </div>

        <div class="w-full">
          <slot name="AdditionalFeatures"></slot>
        </div>

        <button id="ProPricingBtn" class="PricingCardsButton font-semibold text-lg w-full py-3 rounded-xl transition-transform hover:scale-[1.01]">
          <router-link to="/pricing" class="no-underline block text-white w-full h-full">
            {{ buttonContent }}
          </router-link>
        </button>

        <div class="w-full flex justify-center">
          <slot name="AdditionalInfo"></slot>
        </div>

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
    margin-top: 4rem;

}

</style>