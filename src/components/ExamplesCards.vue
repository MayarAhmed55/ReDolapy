<template>
    <div>
          <section id="Features">
            <p id="FeaturesTitle" class=" text-5xl font-bold w-[fit-content] m-auto PrimaryTxt">{{sectionTitle}}</p>
            <p class=" text-center w-[30%] m-auto mb-[1rem] font-medium grayTxt">{{sectionDescription}}</p>



            <div class="cardsContainer flex gap-8 justify-center my-[3rem]">
                <div class="card ">
                 <div class="flex justify-between items-center gap-4 w-[fit-content] m-auto mb-[1rem]">
                    <img :src="imgSrc1" alt="">
                    <ArrowRight/>
                    <img :src="imgSrc2" alt="">
                 </div>
                    <p class="serviceDescription Secondary-grayTxt w-[fit-content] m-auto ">{{Card1Description}}</p>
                    <p class="serviceTitle PrimaryTxt w-[fit-content] m-auto">{{Card1Title}}</p>
                </div>

                <div class="card">
                   <div class="flex justify-between items-center gap-4 w-[fit-content] m-auto mb-[1rem]">
                    <img :src="imgSrc3" alt="">
                    <ArrowRight/>
                    <img :src="imgSrc4" alt="">
                 </div>
                    <p class="serviceDescription Secondary-grayTxt w-[fit-content] m-auto ">{{Card2Description}}</p>
                    <p class="serviceTitle PrimaryTxt w-[fit-content] m-auto">{{Card2Title}}</p>
                </div>

                <div class="card Secondary-grayTxt">
                 <div class="flex justify-between items-center gap-4 w-[fit-content] m-auto mb-[1rem]">
                    <img :src="imgSrc5" alt="">
                    <ArrowRight/>
                    <img :src="imgSrc6" alt="">
                 </div>
                    <p class="serviceDescription Secondary-grayTxt w-[fit-content] m-auto">{{Card3Description}}</p>
                    <p class="serviceTitle PrimaryTxt w-[fit-content] m-auto">{{Card3Title}}</p>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { ArrowRight } from '@lucide/vue';

    export default {
        name: 'ExamplesCards',
        components: {
            ArrowRight,
            
        },
        props:{
            sectionTitle:String,
            sectionDescription:String,

            
            Card1Title:String,
            Card1Description:String,

            Card2Title:String,
            Card2Description:String,
            
            Card3Title:String,
            Card3Description:String,

            imgSrc1:String,
            imgSrc2:String,
            imgSrc3:String,
            imgSrc4:String,
            imgSrc5:String,
            imgSrc6:String,
        }
    }
</script>

<style scoped>
@import '../assets/Style.css';

.card {
    width: 32%;
    background-color: white;
    border-radius: 1em;
    padding: 2rem;
    box-shadow: 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.1), -0.1rem -0.1rem 0.1rem rgba(0, 0, 0, 0.1);
}
.serviceTitle {
    font-size: 1rem;
    margin-bottom: 1rem;
    color:var(--Primary-Brand-color);



}


</style>