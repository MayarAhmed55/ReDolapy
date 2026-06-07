<template>
    <div>
  

        <Header 
        primaryText="Your Personal" 
        gradientText="AI Stylist"
        Description="Get outfit recommendations, virtual try-ons, and wardrobe insights tailored to your style. smart.fast.effortless."
        btnCTA="Start Styling" 
        :imageSrc="headerImgAsset"
        />
        <CardsSection
            sectionTitle="Fashion Intelligence"
            sectionDescription="Built for the next generation of style enthusiasts."

            Card1Title="AI Recommendations"
            Card1Description="Proprietary algorithms that learn your aesthetic and
                        suggest outfits
                        that actually
                        match your personality."

            Card2Title="Try-on"
            Card2Description="Precise body mapping technology ensures you never
                        have to guess your
                        size across
                        different brands again."
            
            Card3Title="Recycle"
            Card3Description="Stay ahead of the curve with
                        real-time analysis of global runway trends filtered through your style lens.">
                    
                    
                        <template #Icon1>
                            <Sparkles />
                        </template>

                        <template #Icon2>
                            <Shirt />
                        </template>
                        
                        <template #Icon3>
                            <Recycle />
                        </template>


                    </CardsSection>




        <section id="StepsSection" class="flex justify-between">
            <div class="StepsImg">
                <img src="../assets/Container.png" class="w-[40rem] h-[30rem]" alt="">
            </div>

            <div id="Steps" class="w-[48%]">
                <p class="font-bold text-4xl PrimaryTxt">Simple, Smart, Seamless</p>
                <div class="step flex ">
                    <div class="stepCircle ">
                        <p>1</p>
                    </div>
                    <div class="">
                        <p class="stepTitle PrimaryTxt">Upload & Sync</p>
                        <p class="Secondary-grayTxt">Upload photos of your current wardrobe or sync with your
                            favorite shopping apps.</p>
                    </div>
                </div>


                <div class="step flex">
                    <div class="stepCircle">
                        <p>2</p>
                    </div>
                    <div class="">
                        <p class="stepTitle PrimaryTxt">Neural Analysis</p>
                        <p class="Secondary-grayTxt">Our AI analyzes color palettes, textures, and silhouettes to build
                            your digital DNA.</p>
                    </div>
                </div>


                <div class="step flex">
                    <div class="stepCircle">
                        <p>3</p>
                    </div>
                    <div class="">
                        <p class="stepTitle PrimaryTxt">Curated Styling</p>
                        <p class="Secondary-grayTxt">Receive personalized daily lookbooks and shopping
                            suggestions that fit your style.</p>
                    </div>
                </div>
            </div>
        </section>


        <section id="Sustainable" class="my-[5rem] flex justify-between ">
            <div class="SustainableImg">
                <img src="../assets/Minimalist recycling bin for sustainable fashion.png" alt="Sustainable Image"
                    class="w-full h-auto rounded-4xl">
            </div>

            <div id="SustainableContent" class="w-[50%]">
                <p class="font-bold text-4xl mb-[1rem] PrimaryTxt">Sustainable Wardrobe</p>
                <p class="text-lg Secondary-grayTxt">AELIA is committed to circular fashion. Our platform doesn't just
                    help you style your
                    clothes—it helps you manage their entire lifecycle. Join our movement to reduce textile waste
                    through smart recycling, reselling, and donation programs.</p>

                <div class="flex gap-4 mt-[2rem] items-center">
                    <div class="RecycleIcon">
                        <Recycle />
                    </div>
                    <div>
                        <p class="font-bold text-2xl PrimaryTxt">Recycle & Renew</p>
                        <p class="Secondary-grayTxt">Easily request a recycling kit for items that have reached the end
                            of their life.</p>
                    </div>
                </div>
                <div class="flex gap-4 mt-[2rem] items-center">
                    <div class="RecycleIcon">
                        <Recycle />
                    </div>
                    <div>
                        <p class="font-bold text-2xl PrimaryTxt">Recycle & Renew</p>
                        <p class="Secondary-grayTxt">Easily request a recycling kit for items that have reached the end
                            of their life.</p>
                    </div>
                </div>

           
                <div class="mt-[4rem]">
                <GradientBorderBtn 
                Description="Learn about Recycling"
                />
                </div>
            </div>
        </section>




        <section id="VTryOn" class=" my-[5rem] flex items-center justify-between px-[5rem]">
            <div id="TryOnTxt" class="TxtGradient w-[40%] my-[5rem]">
                <p class="text-4xl font-bold PrimaryTxt">Your Mirror</p>
                <p class="text-4xl gradientColor font-bold mb-[1rem]">Re Imagined.</p>
                <p class="w-[50%] mb-[1rem] disabledTxt Secondary-grayTxt">The Redolapy Virtual Try-On uses
                    hyper-realistic
                    rendering to show you exactly how clothes will
                    look and drape on your body.</p>

                <button id="TryBtn"><router-link to="/TryOn" class="no-underline">Try On</router-link></button>
            </div>

            <div id="headerImg" class="w-[50%]">
                <img src="../assets/Background.png" alt="TryOn Image" class="w-full h-auto">
            </div>
        </section>


        <section id="PricingSection">
            <p class="w-[fit-content] m-auto mb-[1rem] font-bold text-4xl  PrimaryTxt">ReDolapy Pricing</p>
            <p class="w-[fit-content] m-auto font-medium PrimaryTxt">Choose the plan that fits your fashion journey.</p>

            <div id="PricingCards" class="flex gap-8 justify-center my-[3rem] items-center">

                <div id="FreePricing" class="card flex flex-col justify-center items-center gap-8">
                    <p class="PricingTitle text-4xl font-bold PrimaryTxt">Free Plan</p>
                    <p class="Price font-medium PrimaryTxt"><span class="text-4xl font-bold">$0</span>/month</p>
                    <div class="planFeatures">
                        <p class="flex items-center gap-2 font-medium text-lg PrimaryTxt"><span>
                                <Check />
                            </span> AI Wardrobe Sync</p>
                        <p class="flex items-center gap-2 font-medium text-lg PrimaryTxt"><span>
                                <Check />
                            </span> Daily Look books (3 outfits)</p>
                        <p class="flex items-center gap-2 font-medium text-lg PrimaryTxt"><span>
                                <Check />
                            </span> Basic Virtual Try-On</p>
                    </div>

                    <button id="FreePricingBtn" class=" PricingCardsButton font-semibold text-lg">Get Started</button>
                </div>

                <div id="ProPricing" class="relative card">
                    <div class="card pro-card-inner flex flex-col justify-center items-center gap-8  ">
                        <p class="PricingTitle text-4xl font-bold">Pro Plan</p>
                        <p class="Price font-medium"><span class="text-4xl font-bold">$20</span>/month</p>
                        <div class="planFeatures">
                            <p class="flex items-center gap-2 font-medium text-lg"><span>
                                    <Check />
                                </span>Everything in Essential</p>
                            <p class="flex items-center gap-2 font-medium text-lg"><span>
                                    <Check />
                                </span>Hyper-Realistic Try-On</p>
                            <p class="flex items-center gap-2 font-medium text-lg"><span>
                                    <Check />
                                </span>Unlimited Look books</p>
                            <p class="flex items-center gap-2 font-medium text-lg"><span>
                                    <Check />
                                </span>Personal Style Coaching</p>

                        </div>
                        <button id="ProPricingBtn" class=" PricingCardsButton font-semibold text-lg">Start Free
                            Trial</button>
                    </div>
                </div>
            </div>
        </section>


        <section id="Q&A">
            <p class="text-4xl font-bold mb-[1rem] w-[fit-content] m-auto PrimaryTxt">Frequently Asked Questions</p>

            <div class="w-full max-w-4xl mx-auto flex flex-col gap-6 my-12 px-4">

                <div v-for="(item, index) in accordionItems" :key="index"
                    class="p-[0.2rem] rounded-[1rem] bg-gradient-to-r from-[#FF8E40] via-[#40B9FF] to-[#8ED321] shadow-sm transition-all duration-300">
                    <div class="bg-[#FEFEFE] rounded-[1rem] overflow-hidden">

                        <h2>
                            <button type="button" @click="toggleItem(index)"
                                class="w-full px-10 py-5 flex items-center justify-between text-left font-bold text-xl text-slate-900 select-none focus:outline-none transition-colors duration-200"
                                :class="{ 'bg-slate-50/50': activeIndex === index }">
                                <span class="PrimaryTxt">{{ item.title }}</span>

                                <svg class="w-5 h-5 text-slate-800 transform transition-transform duration-300 ease-in-out"
                                    :class="{ 'rotate-180': activeIndex === index }" fill="none" stroke="currentColor"
                                    stroke-width="2.5" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </button>
                        </h2>

                        <div v-if="activeIndex === index" class="bg-[#FEFEFE]">
                            <div class="mx-8 pt-2 border-t border-slate-100"></div>

                            <div class="px-8 pb-6 pt-3 text-slate-600 font-medium text-base leading-relaxed">
                                <strong v-if="item.strongText" class="text-slate-900 block mb-1">
                                    {{ item.strongText }}
                                </strong>
                                {{ item.bodyText }}
                            </div>
                        </div>

                    </div>

                </div>
            </div>



        </section>

    </div>
</template>

<script>
import { Sparkle, Sparkles, Shirt, Recycle, Check } from '@lucide/vue';
import router from '../routers';
import Header from '../components/Header.vue';
import HeaderImage from '../assets/HeaderImage.png';
import GradientBorderBtn from '../components/GradientBorderBtn.vue';
import CardsSection from '../components/CardsSection.vue';


export default {
    name: 'HomePage',
    components: {
        Sparkles,
        Shirt,
        Recycle,
        Check,
        Header,
        GradientBorderBtn,
        CardsSection,
    },

    data() {
        return {

            activeIndex: 0,
            accordionItems: [
                {
                    title: 'How does the AI know my size?',
                    strongText: '',
                    bodyText: 'Our advanced AI analyzer maps your physical body geometry measurements using standard metrics or a quick photo scan to cross-reference fit scales across global retail brands seamlessly.'
                },
                {
                    title: 'Can I use Redolapy with my current clothes?',
                    strongText: '',
                    bodyText: 'Yes! You can take photos of your existing wardrobe pieces, and our digital closet system will instantly catalog them and generate fresh style lookbooks combined with new styling recommendations.'
                },
                {
                    title: 'How does the AI know my size?',
                    strongText: '',
                    bodyText: 'Yes! You can take photos of your existing wardrobe pieces, and our digital closet system will instantly catalog them and generate fresh style lookbooks combined with new styling recommendations.'
                }
            ],
            headerImgAsset: HeaderImage
        };
    },

    methods: {

        toggleItem(index) {
            if (this.activeIndex === index) {
                this.activeIndex = null;
            } else {
                this.activeIndex = index;
            }
        }
    }
};



</script>

<style scoped>
@import '../assets/Style.css';

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

.card {
    width: 32%;
    background-color: white;
    border-radius: 1em;
    padding: 2rem;
    padding-bottom: 4rem;
    box-shadow: 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.1), -0.1rem -0.1rem 0.1rem rgba(0, 0, 0, 0.1);
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

.Sparkle {
    background-color: #40B9FF40;
    color: var(--Primary-Brand-color);
}

.TryOn {
    background-color: #FEEFE5;
    color: var(--Secondary-Orange-Brand-color);

}

.Recycle {
    background-color: #84CC1640;
    color: var(--Secondary-Brand-color);
}

.RecycleIcon {
    color: var(--Secondary-Brand-color);
}

.serviceDescription {
    color: var(--Secondary-Text-color);
}

.serviceTitle {
    font-size: 1.5rem;
    font-weight: var(--Bold);
    margin-bottom: 1rem;

}

.stepCircle {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background-color: var(--Secondary-Orange-Brand-color);
    color: white;
    line-height: 3rem;
    margin: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: var(--Semi-Bold);
    margin-right: 1.5rem;
}

.step {
    display: flex;
    margin-top: 2rem;
}

.stepTitle {
    font-size: 1.25rem;
    font-weight: var(--Bold);
    margin-bottom: 0.5rem;
}


.gradient-btn-content {
    background-color: var(--primary-bgc);
    border-radius: 0.5rem;
    padding: 1rem 2rem;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease;
}

.gradient-btn-border {
    width: 100%;
    border-radius: 0.5em;
    margin-top: 3rem;

    background: linear-gradient(90deg, #8ED321 0%, #40B9FF 50%, #FF8E40 100%);
    padding: 0.2rem;
    cursor: pointer;
}

.PricingCardsButton {
    border: 0.1em solid;
    border-radius: 0.5em;
    padding: 0.5em 1.8em;
    justify-self: flex-end;
    margin-top: 4rem;

}

#FreePricingBtn {
    background-color: white;
    border-color: var(--Secondary-Brand-color);
    cursor: pointer;
}

#ProPricingBtn {
    background-color: var(--Secondary-Orange-Brand-color);
    border-color: var(--Secondary-Orange-Brand-color);
    color: white;
    cursor: pointer;
}

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
}
</style>

