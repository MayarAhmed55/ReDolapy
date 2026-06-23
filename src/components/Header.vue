<template>
    <div>
 <!-- <section id="Header" class="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-[5rem]">

            <div id="slogan" class="w-full lg:w-[40%] my-12 lg:my-[5rem] text-center lg:text-start"> 
                <p class="text-5xl font-bold mb-[1rem] PrimaryTxt ">{{ primaryText }}</p>
                <p class="text-5xl gradientColor font-bold mb-[1rem] mx-auto lg:mx-0">{{ gradientText }}</p>
                <p class="w-full lg:w-[60%] mb-[1rem] grayTxt">{{ Description }}</p>

                <div class="flex items-center justify-center lg:justify-start gap-[0.5rem] lg:order-2 md:order-3">
                <button id="StartBtn"><router-link :to="routeTo" class="text-white no-underline">{{ btnCTA }}</router-link></button>
                <slot class="p-0"></slot>
                </div>
            </div>

            <div id="headerImg" class="w-[80%] lg:w-[60%] mt-8 lg:mt-0 lg:order-none md:order-2">
                <img :src="imageSrc" alt="Header Image" class="w-full h-auto">
            </div>

        </section> -->

        <section id="Header" class="my-[3rem] md:my-[5rem] grid grid-cols-1 lg:flex lg:flex-row items-center justify-between gap-10 px-6 lg:px-[5rem] max-w-[1400px] mx-auto">
            
    <div id="slogan" class="w-full lg:w-[45%] text-center lg:text-start order-1"> 
        <p class="text-3xl sm:text-4xl md:text-5xl font-bold mb-[1rem] PrimaryTxt">{{ primaryText }}</p>
        <p class="text-3xl sm:text-4xl md:text-5xl gradientColor font-bold mb-[1rem] mx-auto lg:mx-0">{{ gradientText }}</p>
        <p class=" text-base sm:text-lg leading-relaxed w-full lg:w-full mb-0 grayTxt">{{ Description }}</p>
    </div>

    <div id="headerImg" class="w-[85%] sm:w-[70%] lg:w-[50%] mx-auto lg:mx-0 my-[1.5rem] lg:my-0 order-2 lg:order-3">
        <img :src="imageSrc" alt="Header Image" class="w-full h-auto object-contain">
    </div>

    <div class="w-[75%] m-auto lg:w-[45%] flex flex-col md:flex-row items-stretch md:items-center justify-center lg:justify-start gap-4 order-3 lg:order-2 lg:absolute lg:mt-[25rem]">
        <router-link :to="routeTo" id="StartBtn" class="inline-block text-white no-underline text-center">
            {{ btnCTA }}
        </router-link>
        
        <slot class="p-0"></slot>
    </div>

</section>
    </div>
</template>

<script>
    export default {
        name: 'Header',
        props : {
            primaryText:String,
        gradientText:String,
        Description:String,
        btnCTA:String,
        imageSrc: String,
        routeTo:String
    }
}
</script>

<style scoped>
/* @import '../assets/Style.css'; */
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
</style>