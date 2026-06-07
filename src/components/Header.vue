<template>
    <div>
 <section id="Header" class="  flex items-center justify-between px-[5rem]">
            <div id="slogan" class="w-[40%] my-[5rem]">
                <p class="text-5xl font-bold mb-[1rem] PrimaryTxt">{{ primaryText }}</p>
                <p class="text-5xl gradientColor font-bold mb-[1rem]">{{ gradientText }}</p>
                <p class="w-[60%] mb-[1rem] grayTxt">{{ Description }}</p>

                <div class="flex items-center gap-[0.5rem]">
                <button id="StartBtn"><router-link to="/TryOn" class="text-white no-underline">{{ btnCTA }}</router-link></button>
                <slot class="p-0"></slot>
                </div>
            </div>

            <div id="headerImg" class="w-[60%]">
                <img :src="imageSrc" alt="Header Image" class="w-full h-auto">
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
        imageSrc: String
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