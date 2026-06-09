<template>
    <div>
        <Header :primaryText="$t('aboutRecycle.header_primary')" :gradientText="$t('aboutRecycle.header_gradient')"
            :Description="$t('aboutRecycle.header_description')"
            :btnCTA="$t('aboutRecycle.header_cta')" :imageSrc="RecycleImgAsset" routeTo="/Recycle">
                <GradientBorderBtn :Description="$t('aboutRecycle.btn_see_how_to_recycle')" routeTo="#Examples" />
        </Header>


        <CardsSection :sectionTitle="$t('aboutRecycle.title')"
            :sectionDescription="$t('aboutRecycle.cards_section_description')" :Card1Title="$t('aboutRecycle.saveWater.title')" :Card1Description="$t('aboutRecycle.saveWater.description')"
            :Card2Title="$t('aboutRecycle.saveMoney.title')" :Card2Description="$t('aboutRecycle.saveMoney.description')" :Card3Title="$t('aboutRecycle.reduceWaste.title')" :Card3Description="$t('aboutRecycle.reduceWaste.description')">


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


        
        <ExamplesCards 
        :sectionTitle="$t('aboutRecycle.examples.title')"
        :sectionDescription="$t('aboutRecycle.examples.subtitle')" 
        :Card1Title="$t('aboutRecycle.examples.denimBag')" :Card1Description="$t('aboutRecycle.example1_description')" 
        :Card2Title="$t('aboutRecycle.examples.oldJeans')" :Card2Description="$t('aboutRecycle.example2_description')"
        :Card3Title="$t('aboutRecycle.example3_title')" :Card3Description="$t('aboutRecycle.example3_description')" :imgSrc1="DenimShortAsset" :imgSrc2="DenimBagAsset"
        :imgSrc3="WhiteShirtAsset" :imgSrc4="RecycledWhiteShirtAsset" :imgSrc5="DenimShortAsset"
        :imgSrc6="DenimBagAsset"></ExamplesCards>
        
        <div id="Examples" >
            <RoundedIconsSection 
            :sectionTitle="$t('aboutRecycle.how_it_works_title')"
            :sectionDescription="$t('aboutRecycle.how_it_works_description')" 
            step1="1"
            step2="2"
            step3="3" 
            :IconTitle1="$t('aboutRecycle.uploadProcess.title')" 
            :IconDescription1="$t('aboutRecycle.uploadProcess.description')" 
            :IconTitle2="$t('aboutRecycle.aiSuggests.title')" 
            :IconDescription2="$t('aboutRecycle.aiSuggests.description')" 
            :IconTitle3="$t('aboutRecycle.transformReuse.title')" 
            :IconDescription3="$t('aboutRecycle.transformReuse.description')">
            
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