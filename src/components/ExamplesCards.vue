<template>
    <div>
        <section>
            <p id="FeaturesTitle" class=" text-3xl sm:text-4xl md:text-5xl font-bold max-w-2xl m-auto text-center mb-4 PrimaryTxt">{{ sectionTitle }}</p>
            <p class="w-full max-w-md mx-auto font-medium leading-relaxed grayTxt text-center">{{ sectionDescription }}
            </p>



            <div class="cardsContainer flex flex-col md:flex-row flex-wrap gap-8 justify-center my-[3rem] px-6">


                <div
                    class="card  m-auto  sm:w-[90%] md:w-[60%] lg:w-[33%] flex flex-col items-center text-center bg-white dark:bg-[#0d0d0d] pt-8 pb-6 px-6 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden">

                    <div
                        class="relative block w-full flex flex-row justify-center items-center gap-4 mb-6 mt-0 clear-both">

                        <div
                            class="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 shadow-inner">
                            <img :src="imgSrc1" alt="" class="w-full h-full object-cover m-0 p-0 block">
                        </div>

                        <div class="shrink-0 text-zinc-400 dark:text-zinc-500 flex items-center justify-center">
                            <ArrowRight class="w-6 h-6 m-0" />
                        </div>

                        <div
                            class="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 shadow-inner">
                            <img :src="imgSrc2" alt="" class="w-full h-full object-cover m-0 p-0 block">
                        </div>

                    </div>

                    <p class="serviceTitle text-xl font-bold PrimaryTxt mb-2 w-full block">{{ Card1Title }}</p>
                    <p class="serviceDescription text-sm Secondary-grayTxt max-w-[280px] leading-relaxed w-full block">
                        {{ Card1Description }}</p>

                </div>
                <div
                    class="card  sm:w-[90%] md:w-[60%] m-auto lg:w-[30%] flex flex-col items-center text-center bg-white dark:bg-[#0d0d0d] p-6 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
                    <div class="flex justify-center items-center gap-4 mb-4 w-full">
                        <div
                            class="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center shrink-0 shadow-inner">
                            <img :src="imgSrc3" alt="" class="w-full h-full object-cover">
                        </div>

                        <div class="shrink-0 text-zinc-400 dark:text-zinc-600">
                            <ArrowRight />
                        </div>

                        <div
                            class="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center shrink-0 shadow-inner">
                            <img :src="imgSrc4" alt="" class="w-full h-full object-cover">
                        </div>
                    </div>

                    <p class="serviceTitle text-xl font-semibold PrimaryTxt mb-1">{{ Card2Title }}</p>
                    <p class="serviceDescription text-sm Secondary-grayTxt max-w-[280px]">{{ Card2Description }}</p>
                </div>

                <div
                    class="card  sm:w-[90%] md:w-[60%] m-auto lg:w-[30%] flex flex-col items-center text-center bg-white dark:bg-[#0d0d0d] p-6 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
                    <div class="flex justify-center items-center gap-4 mb-4 w-full">
                        <div
                            class="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center shrink-0 shadow-inner">
                            <img :src="imgSrc5" alt="" class="w-full h-full object-cover">
                        </div>

                        <div class="shrink-0 text-zinc-400 dark:text-zinc-600">
                            <ArrowRight />
                        </div>

                        <div
                            class="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center shrink-0 shadow-inner">
                            <img :src="imgSrc6" alt="" class="w-full h-full object-cover">
                        </div>
                    </div>

                    <p class="serviceTitle text-xl font-semibold PrimaryTxt mb-1">{{ Card3Title }}</p>
                    <p class="serviceDescription text-sm Secondary-grayTxt max-w-[280px]">{{ Card3Description }}</p>
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
    props: {
        sectionTitle: String,
        sectionDescription: String,


        Card1Title: String,
        Card1Description: String,

        Card2Title: String,
        Card2Description: String,

        Card3Title: String,
        Card3Description: String,

        imgSrc1: String,
        imgSrc2: String,
        imgSrc3: String,
        imgSrc4: String,
        imgSrc5: String,
        imgSrc6: String,
    }
}
</script>

<style scoped>
@import '../assets/Style.css';

.card {
    /* background-color: white; */
    border-radius: 1em;
    /* padding: 2rem; */
    box-shadow: 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.1), -0.1rem -0.1rem 0.1rem rgba(0, 0, 0, 0.1);
}

.serviceTitle {
    font-size: 1rem;
    margin-bottom: 1rem;
    color: var(--Primary-Brand-color);



}
</style>