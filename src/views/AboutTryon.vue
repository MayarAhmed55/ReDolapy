<template>
  <div>
    <Header
      :primaryText="$t('aboutTryon.header_primary')"
      :gradientText="$t('aboutTryon.header_gradient')"
      :Description="$t('aboutTryon.header_description')"
      :btnCTA="$t('aboutTryon.header_cta')"
      :imageSrc="headerImgAsset"
      routeTo="/TryOn"
    >
      <!-- 💡 Localized the description string here -->
      <GradientBorderBtn :Description="$t('aboutTryon.see_how_cta')" routeTo="#HowToTryOn" />
    </Header>

    <CardsSection
      :sectionTitle="$t('aboutTryon.cards_section_title')"
      :sectionDescription="$t('aboutTryon.cards_section_description')"
      :Card1Title="$t('aboutTryon.card1_title')"
      :Card1Description="$t('aboutTryon.card1_description')"
      :Card2Title="$t('aboutTryon.card2_title')"
      :Card2Description="$t('aboutTryon.card2_description')"
      :Card3Title="$t('aboutTryon.card3_title')"
      :Card3Description="$t('aboutTryon.card3_description')"
    >
      <template #Icon1>
        <Sparkles />
      </template>

      <template #Icon2>
        <RulerDimensionLine />
      </template>

      <template #Icon3>
        <Lightbulb />
      </template>
    </CardsSection>

    <div id="HowToTryOn">
      <RoundedIconsSection
        :sectionTitle="$t('aboutTryon.how_it_works_title')"
        :sectionDescription="$t('aboutTryon.how_it_works_description')"
        step1="1"
        step2="2"
        step3="3"
        :IconTitle1="$t('aboutTryon.step1_title')"
        :IconDescription1="$t('aboutTryon.step1_description')"
        :IconTitle2="$t('aboutTryon.step2_title')"
        :IconDescription2="$t('aboutTryon.step2_description')"
        :IconTitle3="$t('aboutTryon.step3_title')"
        :IconDescription3="$t('aboutTryon.step3_description')"
      >
        <template #Icon1>
          <Camera />
        </template>

        <template #Icon2>
          <PersonStanding />
        </template>

        <template #Icon3>
          <WandSparkles />
        </template>
      </RoundedIconsSection>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import TryOn from "../assets/About Try on done.png";
import TryOnDark from "../assets/darkTryon.jpg";

import GradientBorderBtn from "../components/GradientBorderBtn.vue";
import CardsSection from "../components/CardsSection.vue";
import RoundedIconsSection from "../components/RoundedIconsSection.vue";

import {
  Sparkles,
  RulerDimensionLine,
  Lightbulb,
  Camera,
  WandSparkles,
  PersonStanding,
} from "@lucide/vue";

export default {
  name: "AboutTryon",
  components: {
    Header,
    GradientBorderBtn,
    CardsSection,
    RoundedIconsSection,
    Sparkles,
    RulerDimensionLine,
    Lightbulb,
    Camera,
    WandSparkles,
    PersonStanding,
  },
  data() {
    return {
      TryOnImgAsset: TryOn,
      isDark: false,
      observer: null, 

    };
  },
  computed:{
     headerImgAsset() {
      return this.isDark ? TryOnDark : TryOn;
    }
  },
  mounted() {
    this.checkCurrentTheme();

    this.observer = new MutationObserver(() => {
      this.checkCurrentTheme();
    });

    this.observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  },
   methods: {
    checkCurrentTheme() {
      this.isDark = document.documentElement.classList.contains('dark');
    },
  }
};
</script>

<style scoped>
@import "../assets/Style.css";
</style>