<template>
    <div class="no-underline block w-[40%]">
        <button class="font-semibold gradient-btn-border p-[0.2rem] w-[100%]">
            <div class="gradient-btn-content flex gap-5 items-center">
                <img class="rounded-[50%] w-[5rem] h-[5rem]" src="../assets/person 1.png" alt="">

                <div class="memberInfo text-start text-start flex flex-col gap-3 flex-grow ">
                    <div>
                    <p class="PrimaryTxt">{{name}}</p>
                    <p class="font-medium grayTxt">{{title}}</p>
                    </div>
                    <div class="gradient-btn-border w-fit text-white flex px-[1rem] py-[0.2rem]">
                         <a :href="link" class=" font-medium items-center gap-2 " target="_blank">Linkedin Profile </a>
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
    /* padding: 0.2rem; */
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