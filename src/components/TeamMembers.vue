<template>
    <div class="no-underline block w-full md:max-w-[460px] lg:max-w-[400px]">
        <button class="font-semibold gradient-btn-border w-[100%]">
            <div class="gradient-btn-content flex flex-col sm:flex-row gap-5 items-center p-4 sm:p-6">
                <img class="rounded-[50%] w-[5rem] h-[5rem] flex-shrink-0 object-cover" src="../assets/person 1.png" alt="">

                <div class="memberInfo text-start sm:text-start flex flex-col gap-3 flex-grow w-full ">
                    <div>
                    <p class="PrimaryTxt text-lg md:text-xl ">{{name}}</p>
                    <p class="font-medium grayTxt text-sm md:text-base ">{{title}}</p>
                    </div>
                    <div class="gradient-btn-border w-fit text-white flex px-[0.5rem] mx-auto sm:mx-0 ">
                         <a :href="link" class="font-medium flex items-center gap-2 " target="_blank">Linkedin Profile </a>
                        <ChevronRight/>
                    </div>
                </div>
            </div>
        </button>
    </div>
</template>

<script>
import { ChevronRight } from '@lucide/vue';

export default {
    name: 'TeamMembers',
    props: {
        name: String,
        title: String,
        link:String, 
        routeTo: {
            type: String,
            default: '#'
        },
    },
    components: {
        ChevronRight

    },
    computed: {
        isAnchorLink() {
            return this.routeTo && this.routeTo.startsWith('#');
        }
    },
    methods: {
        handleScroll(event) {
            event.preventDefault();

            const targetElement = document.querySelector(this.routeTo);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });

                window.history.pushState(null, null, this.routeTo);
            }
        }
    }
}
</script>

<style scoped>
@import '../assets/Style.css';

.gradient-btn-border {
    /* width: 100%; */
    border-radius: 0.5em;
    background: linear-gradient(90deg, #40B9FF 0%, #8ED321 100%);
    padding: 0.2rem;
    cursor: pointer;
}

.gradient-btn-content {
    background-color: var(--primary-bgc);
    border-radius: 0.5rem;
    padding: 0.8rem 1.8rem;
    align-items: center;
    /* justify-content: center; */
    transition: background-color 0.2s ease;
}
</style>