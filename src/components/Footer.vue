<template>
    <div>
        <Section id="Footer">
            <div class="flex justify-between flex-wrap gap-8">
                <div class="w-full md:w-[25%]">
                    <p class="font-bold text-3xl gradientColor">{{ $t('footer.brandName') }}</p>
                    <p class="grayTxt mt-2">{{ $t('footer.tagline') }}</p>
                    <div class="flex gap-4 mt-4 blueTxt">
                        <Globe class="cursor-pointer hover:opacity-80 transition-opacity" />
                        <Share2 class="cursor-pointer hover:opacity-80 transition-opacity" />
                        <AtSign class="cursor-pointer hover:opacity-80 transition-opacity" />
                    </div>
                </div>

                <div class="w-full md:w-[25%]">
                    <p class="text-xl font-medium blueTxt mb-2">{{ $t('footer.platform') }}</p>
                    <p class="font-medium grayTxt py-1 cursor-pointer hover:underline">{{ $t('footer.styleGuide') }}</p>
                    <p class="font-medium grayTxt py-1 cursor-pointer hover:underline">{{ $t('footer.tryOn') }}</p>
                    <p class="font-medium grayTxt py-1 cursor-pointer hover:underline">{{ $t('footer.features') }}</p>
                </div>

                <div class="w-full md:w-[25%]">
                    <p class="text-xl font-medium blueTxt mb-2">{{ $t('footer.ContactUs') }}</p>
                    
                    <div class="flex gap-4 my-[1rem] items-center">
                        <Phone class="grayTxt w-5 h-5"></Phone>
                        <p class="grayTxt font-semibold dir-ltr">+20123456789</p>
                    </div>

                    <div class="flex gap-4 my-[1rem] items-center">
                        <Mail class="grayTxt w-5 h-5"></Mail>
                        <p class="grayTxt font-semibold">ReDolapy@gmail.com</p>
                    </div>

                    <div class="flex gap-4 my-[1rem] items-center">
                        <Send class="grayTxt w-5 h-5"></Send>
                        <p class="grayTxt font-semibold">{{ $t('footer.telegram') }}</p>
                    </div>

                    <p class="font-semibold mt-[2rem] text-sm grayTxt">
                        {{ $t('footer.copyright') }}
                    </p>
                </div>
            </div>
        </Section>
    </div>
</template>

<script>
import { Globe, Share2, AtSign, Phone, Mail, Send } from '@lucide/vue';

export default {
    name: 'Footer',
    components: {
        Globe,
        Share2,
        AtSign,
        Phone,
        Mail,
        Send
    }
}
</script>

<style scoped>
@import '../assets/Style.css';

#Footer {
    /* background-color: #F4F3F5; */
    margin-bottom: 3rem;
    padding: 3rem 2rem; /* Added padding to give elements space */
}

/* Forces phone numbers to maintain correct layout configuration regardless of page direction */
.dir-ltr {
    direction: ltr;
    unicode-bidi: embed;
}
</style>