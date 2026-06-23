<template>
    <div>
   <section id="Features">
            <p id="FeaturesTitle" class="gradientColor text-3xl sm:text-4xl md:text-5xl font-bold w-full max-w-2xl mx-auto mb-4 text-center ">{{sectionTitle}}</p>
            <p class="w-full max-w-md mx-auto font-medium leading-relaxed grayTxt text-center">{{sectionDescription}}</p>



            <div class="cardsContainer flex flex-col lg:flex-row  gap-8 justify-center items-center my-[3rem] lg:items-stretch px-4">
                <div class="card bg-white dark:bg-[#0d0d0d] md:w-[85%] sm:w-[90%] max-w-[380px] lg:w-[32%] shadow-lg">
                    <div class="Sparkle Icon PrimaryTxt ">
                            <slot name="Icon1"></slot>
                    </div>
                    <p class="serviceTitle PrimaryTxt">{{Card1Title}}</p>
                    <p class="serviceDescription Secondary-grayTxt">{{Card1Description}}</p>
                </div>

                <div class="card  bg-white dark:bg-[#0d0d0d] md:w-[85%] sm:w-[90%] max-w-[380px] lg:w-[32%]shadow-lg">
                    <div class="TryOn Icon  ">
                            <slot name="Icon2"></slot>
                    </div>
                    <p class="serviceTitle PrimaryTxt">{{Card2Title}}</p>
                    <p class="serviceDescription Secondary-grayTxt">{{Card2Description}}</p>
                </div>

                <div class="card  bg-white dark:bg-[#0d0d0d] md:w-[85%] sm:w-[90%] max-w-[380px] lg:w-[32%] shadow-lg">
                    <div class="Recycle Icon ">
                            <slot name="Icon3"></slot>
                    </div>
                    <p class="serviceTitle PrimaryTxt">{{Card3Title}}</p>
                    <p class="serviceDescription Secondary-grayTxt">{{Card3Description}}</p>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: 'CardsSection',
        props:{
            sectionTitle:String,
            sectionDescription:String,

            Card1Title:String,
            Card1Description:String,

            Card2Title:String,
            Card2Description:String,
            
            Card3Title:String,
            Card3Description:String,
            
        },
        components: {
      
        },
        data() {
            return {
            };
        }
    }
</script>

<style scoped >
/* @import '../assets/Style.css'; */
/* @reference "tailwindcss"; */

.card {
    /* width: 32%; */
    border-radius: 1rem;
    padding: 2rem;
    padding-bottom: 4rem;
    /* box-shadow: 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.1), -0.1rem -0.1rem 0.1rem rgba(0, 0, 0, 0.1); */
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
.serviceTitle {
    font-size: 1.5rem;
    font-weight: var(--Bold);
    margin-bottom: 1rem;

}
.Sparkle {
    background-color: #40B9FF40;
    color: var(--Primary-Brand-color);
}

.TryOn {
    background-color: #FEEFE580 ;
    color: var(--Secondary-Orange-Brand-color);

}

.Recycle {
    background-color: #84CC1640;
    color: var(--Secondary-Brand-color);
}


</style>