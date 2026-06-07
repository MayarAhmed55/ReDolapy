<template>
    <div>
        <Header primaryText="Give Your Clothes a" gradientText="Second Life"
            Description="Get outfit recommendations, virtual try-ons, and wardrobe insights tailored to your style. smart.fast.effortless."
            btnCTA="Start Styling" :imageSrc="RecycleImgAsset">
            <a href="#">
                <GradientBorderBtn Description="See How to Recycle" />
            </a>
        </Header>


        <CardsSection sectionTitle="Why Upcycling Matters"
            sectionDescription="Small changes today, big impact tomorrow." Card1Title="Save Water" Card1Description="Upcycling uses significantly less water
            compared to producing entirely new
            textile garments." Card2Title="Save Money" Card2Description="Refresh your personal style and get
more tangible value from the high-
quality clothes you already own." Card3Title="Reduce Waste" Card3Description="Keep clothing out of landfills and
reduce the overall environmental
footprint of the fashion industry.">


            <template #Icon1>
                <Droplets />
            </template>

            <template #Icon2>
                <HandCoins />
            </template>

            <template #Icon3>
                <Leaf />
            </template>


        </CardsSection>



        <ExamplesCards sectionTitle="See What AI Can Create"
            sectionDescription="From old to new — endless creative possibilities." Card1Title="Denim Tote Bag"
            Card1Description="Old Jeans" Card2Title="Denim Tote Bag" Card2Description="Old Jeans"
            Card3Title="Denim Tote Bag" Card3Description="Old Jeans" :imgSrc1="DenimShortAsset" :imgSrc2="DenimBagAsset"
            :imgSrc3="WhiteShirtAsset" :imgSrc4="RecycledWhiteShirtAsset" :imgSrc5="DenimShortAsset"
            :imgSrc6="DenimBagAsset"></ExamplesCards>


        <RoundedIconsSection 
        sectionTitle="How It Works"
        sectionDescription="Three simple steps to transform your clothes and make an impact." 
        step1="1"
        step2="2"
        step3="3" 
        IconTitle1="Upload Your Clothing" 
        IconDescription1="Take photos of items you no longer wear or
use and add them to your digital atelier." 
        IconTitle2="AI Suggests Ideas" 
        IconDescription2="Our AI analyzes your items and generates creative upcycling ideas tailored to your style." 
        IconTitle3="Transform & Reuse" 
        IconDescription3="Bring your new design to life or connect with
creators in our curated marketplace.">

            <template #Icon1>
                <Camera />
            </template>
            
            <template #Icon2>
                <WandSparkles />
            </template>

            <template #Icon3>
                <Shirt />
            </template>


        </RoundedIconsSection>



    </div>
</template>

<script>
import Header from '../components/Header.vue';
import Recycle from '../assets/Recycle.png';
import GradientBorderBtn from '../components/GradientBorderBtn.vue';
import CardsSection from '../components/CardsSection.vue';
import { HandCoins, Sprout, Leaf, Droplets, Camera, WandSparkles, Shirt } from '@lucide/vue';
import ExamplesCards from '../components/ExamplesCards.vue';
import WhiteShirt from '../assets/White blose.png';
import RecycledWhiteShirt from '../assets/Recycled White Blose.png';
import DenimShort from '../assets/Denim Short.png';
import DenimBag from '../assets/Denim Bag.png';
import RoundedIconsSection from '../components/RoundedIconsSection.vue';



export default {
    name: 'AboutRecycle',
    components: {
        Header,
        GradientBorderBtn,
        CardsSection,
        HandCoins,
        Sprout,
        Leaf,
        Droplets,
        ExamplesCards,
        RoundedIconsSection,
        Camera,
        WandSparkles,
        Shirt,

    },
    data() {
        return {
            RecycleImgAsset: Recycle,

            WhiteShirtAsset: WhiteShirt,
            RecycledWhiteShirtAsset: RecycledWhiteShirt,
            DenimShortAsset: DenimShort,
            DenimBagAsset: DenimBag
        };
    }
}
</script>

<style scoped>
@import '../assets/Style.css';
</style>