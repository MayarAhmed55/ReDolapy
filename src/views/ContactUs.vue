<template>
    <div>
        <section id="Header" class="  flex items-center justify-between px-[1rem]">
            <div id="slogan" class="w-[40%] my-[5rem]">
                <p class="text-5xl font-bold  PrimaryTxt">{{ $t('contact.titlePart1') }} </p>
                <p class="text-5xl gradientColor font-bold ">{{ $t('contact.titlePart2') }}</p>
                <p class="w-[90%] mb-[1rem] grayTxt">{{ $t('contact.description') }}</p>

                <div class="PrimaryTxt">


                    <a class="no-underline block ">
                        <button class="font-semibold gradient-btn-border mb-[1rem]">
                            <div class="gradient-btn-content  flex gap-4">
                                <Mail></Mail>
                                <p>redolapy.admin@gmail.com
                                </p>
                            </div>
                        </button>
                    </a>


                    <button id="aboutRecycle" class="font-semibold gradient-btn-border mb-[1rem] ">
                        <div class="gradient-btn-content gradient-btn-content  flex gap-4">
                            <phone></phone>
                            <p>+20123456789</p>
                        </div>
                    </button>


                    <button id="aboutRecycle" class="font-semibold gradient-btn-border mb-[1rem]">
                        <div class="gradient-btn-content gradient-btn-content  flex gap-4">
                            <Send></Send>
                            <p>+20123456789</p>
                        </div>
                    </button>
                </div>
            </div>




            <div id="MessageForm" class="w-[60%]">


                <form action="">
                    <label class="font-semibold PrimaryTxt" for="">{{ $t('contact.form.nameLabel') }}</label>
                    <input id="cardNumber"
                        class="border-2 border-gray-200 rounded-lg w-full p-[0.8rem] mt-[0.2rem] mb-[1rem]  placeholder:text-gray-400 dark:placeholder:text-zinc-600"
                        type="text" :placeholder="$t('contact.form.namePlaceholder')" />
                    <label class="font-semibold PrimaryTxt" for="">{{ $t('contact.form.emailLabel') }}</label>
                    <input id="Date"
                        class="border-2 border-gray-200 rounded-lg p-[0.8rem] w-[100%] mt-[0.2rem] mb-[1rem]  placeholder:text-gray-400 dark:placeholder:text-zinc-600"
                        type="text" :placeholder="$t('contact.form.emailPlaceholder')" />

                    <label class="font-semibold PrimaryTxt " for="">{{ $t('contact.form.messageLabel') }}</label>

                    <textarea name="" id="" rows="8"
                        class="border-2 border-gray-200 rounded-lg p-[0.8rem] w-[100%] mt-[0.2rem] mb-[2rem] placeholder:text-gray-400 dark:placeholder:text-zinc-600"
                        :placeholder="$t('contact.form.messagePlaceholder')"></textarea>


                    <button id="ProPricingBtn" class=" PricingCardsButton font-semibold text-lg w-[100%] border-none">
                        {{ $t('contact.form.sendButton') }}
                    </button>
                </form>
            </div>

        </section>


    </div>
</template>


<script>
import { Mail, Phone, Send } from '@lucide/vue';

export default {
    name: 'ContactUs',
    components: {
        Mail,
        Phone,
        Send
    },
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

.gradient-btn-border {
    width: 60%;
    border-radius: 0.5em;
    background: linear-gradient(90deg, #40B9FF 0%, #74D6B6 50%, #A6E22E 100%);
    padding: 0.1rem;
    cursor: pointer;
}

.gradient-btn-border {
    width: 60%;
    border-radius: 0.5em;
    background: linear-gradient(90deg, #40B9FF 0%, #74D6B6 50%, #A6E22E 100%);
    padding: 0.1rem;
    cursor: pointer;
}

.gradient-btn-content {
    background-color: var(--primary-bgc);
    border-radius: 0.5rem;
    padding: 0.8rem 1rem;

    align-items: center;
    transition: background-color 0.2s ease;
}

.PricingCardsButton {
    border-radius: 0.5em;
    padding: 0.5em 1.8em;
    justify-self: flex-end;
    border: border-none
}

#ProPricingBtn {
    background-color: var(--Primary-Brand-color);
    color: white;
    cursor: pointer;
}
</style>