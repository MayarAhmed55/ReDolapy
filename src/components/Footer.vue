<template>
    <div>
        <Section id="Footer" >
            <div class="flex justify-between">
                <div class="w-[25%]">
                    <p class="font-bold text-2xl">ReDolapy</p>
                    <p class="grayTxt">Elevating digital ateliers through artificial
                        intelligence and human creativity.</p>
                    <div class="flex gap-4 mt-4">
                        <Globe />
                        <Share2 />
                        <AtSign />
                    </div>
                </div>

                <div class="w-[25%]">
                    <p class="text-xl font-medium">Platform</p>
                    <p class=" font-medium grayTxt">Style Guide</p>
                    <p class=" font-medium grayTxt">Try On</p>
                    <p class=" font-medium grayTxt">Features</p>
                </div>
                <div class="w-[25%]">
                    <p class="text-xl font-medium">Legal</p>
                    <p class=" font-medium grayTxt">Privacy Policy</p>
                    <p class=" font-medium grayTxt">Terms of Service</p>
                </div>
            </div>
        </Section>
    </div>
</template>

<script>
import { Globe, Share2, AtSign } from '@lucide/vue';

export default {
    name: 'Footer',
    components: {
        Globe,
        Share2,
        AtSign
    }
}
</script>

<style scoped>
@import '../assets/Style.css';

#Footer{
    background-color: #F4F3F5;
    margin-bottom: 3rem;
}

</style>