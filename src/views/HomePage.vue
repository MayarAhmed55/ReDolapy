<template>
    <div>
        <!-- <router-link to="/login">Login</router-link> -->

        <section id="Header" class=" my-[5rem] flex items-center justify-between px-[5rem]">
            <div id="slogan" class="w-[40%] my-[5rem]">
                <p class="text-5xl font-bold mb-[1rem]">Your Personal</p>
                <p class="text-5xl gradientColor font-bold mb-[1rem]">AI Stylist</p>
                <p class="w-[60%] mb-[1rem] disabledTxt">Get outfit recommendations, virtual try-ons,
                    and wardrobe insights tailored to your style. smart.fast.effortless.</p>

                <button id="StartBtn">Start Styling</button>
            </div>

            <div id="headerImg" class="w-[60%]">
                <img src="../assets/7bc2bd9d-0eb6-4963-8535-1acd00554e3e.png" alt="Header Image" class="w-full h-auto">
            </div>
        </section>

        <section id="Features">
            <p id="FeaturesTitle" class="gradientColor text-5xl font-bold w-[50%] m-auto ">Fashion Intelligence</p>
            <p class=" text-center w-[30%] m-auto mb-[1rem] font-medium">Built for the next generation of style
                enthusiasts.</p>



            <div class="cardsContainer flex gap-8 justify-center my-[3rem]">
                <div class="card ">
                    <div class="Sparkle Icon ">
                        <Sparkles />
                    </div>
                    <p class="serviceTitle">AI Recommendations</p>
                    <p class="serviceDescription">Proprietary algorithms that learn your aesthetic and suggest outfits
                        that actually
                        match your personality.</p>
                </div>

                <div class="card">
                    <div class="TryOn Icon  ">
                        <Shirt />
                    </div>
                    <p class="serviceTitle">Try-on</p>
                    <p class="serviceDescription">Precise body mapping technology ensures you never have to guess your
                        size across
                        different brands again.</p>
                </div>

                <div class="card ">
                    <div class="Recycle Icon ">
                        <Recycle />
                    </div>
                    <p class="serviceTitle">Recycle</p>
                    <p class="serviceDescription">Stay ahead of the curve with
                        real-time analysis of global runway trends filtered through your style lens.</p>
                </div>
            </div>
        </section>


        <section id="StepsSection" class="flex justify-between">
            <div class="StepsImg">
                <img src="../assets/Container.png" class="w-[40rem] h-[30rem]" alt="">
            </div>

            <div id="Steps" class="w-[48%]">
                <p class="font-bold text-4xl">Simple, Smart, Seamless</p>
                <div class="step flex ">
                    <div class="stepCircle ">
                        <p>1</p>
                    </div>
                    <div class="">
                        <p class="stepTitle">Upload & Sync</p>
                        <p>Upload photos of your current wardrobe or sync with your
                            favorite shopping apps.</p>
                    </div>
                </div>


                <div class="step flex">
                    <div class="stepCircle">
                        <p>2</p>
                    </div>
                    <div class="">
                        <p class="stepTitle">Neural Analysis</p>
                        <p>Our AI analyzes color palettes, textures, and silhouettes to build your digital DNA.</p>
                    </div>
                </div>


                <div class="step flex">
                    <div class="stepCircle">
                        <p>3</p>
                    </div>
                    <div class="">
                        <p class="stepTitle">Curated Styling</p>
                        <p>Receive personalized daily lookbooks and shopping
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
                <p class="font-bold text-4xl mb-[1rem]">Sustainable Wardrobe</p>
                <p class="text-lg">AELIA is committed to circular fashion. Our platform doesn't just help you style your
                    clothes—it helps you manage their entire lifecycle. Join our movement to reduce textile waste
                    through smart recycling, reselling, and donation programs.</p>

                <div class="flex gap-4 mt-[2rem] items-center">
                    <div class="RecycleIcon">
                        <Recycle />
                    </div>
                    <div>
                        <p class="font-bold text-2xl">Recycle & Renew</p>
                        <p>Easily request a recycling kit for items that have reached the end
                            of their life.</p>
                    </div>
                </div>
                <div class="flex gap-4 mt-[2rem] items-center">
                    <div class="RecycleIcon">
                        <Recycle />
                    </div>
                    <div>
                        <p class="font-bold text-2xl">Recycle & Renew</p>
                        <p>Easily request a recycling kit for items that have reached the end
                            of their life.</p>
                    </div>
                </div>

                <button id="aboutRecycle" class="font-semibold gradient-btn-border">
                    <div class="gradient-btn-content">

                        Learn about Recycling
                    </div>
                </button>
            </div>
        </section>
    </div>
</template>

<script>
import { Sparkle, Sparkles, Shirt, Recycle } from '@lucide/vue';


export default {
    name: 'HomePage',
    components: {
        Sparkles,
        Shirt,
        Recycle,
    }
}
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

.disabledTxt {
    color: var(--Disabled-Text-color);
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
    /* padding:1.7rem; */
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
    width: 3rem;
    height: 3rem;
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

/* #aboutRecycle {
    width: 100%;
    border-radius: 0.5em;
    margin-top: 3rem;
} */

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
</style>