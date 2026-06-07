<template>
    <div class="w-[80%] m-auto" >
        <p class="w-[fit-content] m-auto mb-[1rem] font-bold text-4xl  PrimaryTxt">{{sectionTitle}}</p>
        <p class="w-[fit-content] m-auto font-medium grayTxt mb-[4rem]">{{sectionDescription}}</p>

        <div class="flex justify-between">
            <div class="IconDiv w-[25%] text-center">
                <div class="icon1 w-[fit-content] m-auto">
                    <div class="step absolute -top-2 -left-1 w-[2rem] h-[2rem] rounded-full bg-[#006492] text-white text-base/8">{{ step1 }}</div>
                    <div class="absolute top-1/3 left-1/3"><slot name="Icon1"></slot></div>
                </div>
                    <div class="Content">
                        <p class="font-semibold text-2xl PrimaryTxt mb-[1rem]">{{ IconTitle1 }}</p>    
                        <p class="grayTxt">{{ IconDescription1 }}</p>

                    </div>

            </div>
            <div class="IconDiv w-[25%] text-center">
                <div class="icon2 w-[fit-content] m-auto">
                <div class="step absolute -top-2 -left-1 w-[2rem] h-[2rem] rounded-full bg-[#9A4600] text-white text-base/8">{{ step2 }}
                </div>
               <div class="absolute top-1/3 left-1/3"> <slot name="Icon2"></slot></div>
            </div>
                <div class="Content">
                    <p class="font-semibold text-2xl PrimaryTxt mb-[1rem]">{{ IconTitle2 }}</p>
                    <p class="grayTxt">{{ IconDescription2 }}</p>

                </div>
            </div>
            <div class="IconDiv w-[25%] text-center">
                <div class="icon3 w-[fit-content] m-auto">
                <div class="step absolute -top-2 -left-1 w-[2rem] h-[2rem] rounded-full bg-[#426900] text-white text-base/8">{{ step3 }}
                </div>
               <div class="absolute top-1/3 left-1/3"><slot name="Icon3"></slot></div>
            </div>
                <div class="Content">
                    <p class="font-semibold text-2xl PrimaryTxt mb-[1rem]">{{ IconTitle3 }}</p>
                    <p class="grayTxt">{{ IconDescription3 }}</p>

                </div>
            </div>
        </div>

    </div>
</template>

<script>

    export default {
        name:'RoundedIconsSection',
        components: {
            
            
        },
        props: {
            sectionTitle:String,
            sectionDescription:String,
            step1:String,
            step2:String,
            step3:String,

            IconTitle1:String,
            IconDescription1:String,

            IconTitle2:String,
            IconDescription2:String,

            IconTitle3:String,
            IconDescription3:String,
    }
}
</script>

<style scoped>
@import '../assets/Style.css';

.icon1, .icon2, .icon3{
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    margin-bottom: 2rem;
    position: relative;
}
.icon1{
background-color: var(--Primary-Brand-color);
color: #006492;
}
.icon2{
    background-color: var(--Secondary-Orange-Brand-color);
    color:#9A4600;
}
.icon3{
    background-color: var(--Secondary-Brand-color);
    color:#426900;
}
slot{
    position: absolute;
    top: 50%;
    left: 50%;
}
/* .step{
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background-color:#426900 ;

} */

</style>