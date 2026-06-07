<template>
    <div>
         <button id="aboutRecycle" class="font-semibold gradient-btn-border">
                    <router-link to="/AboutRecycle" class="no-underline">
                        <div class="gradient-btn-content">
                            {{Description}}
                        </div>
                    </router-link>
                </button>
    </div>
</template>

<script>
    export default {
        name:'GradientBorderBtn',
        props: {
            Description:String
        }
    }
</script>

<style scoped>
@import '../assets/Style.css';

.gradient-btn-border {
    width: 100%;
    border-radius: 0.5em;

    background: linear-gradient(90deg, #8ED321 0%, #40B9FF 50%, #FF8E40 100%);
    padding: 0.2rem;
    cursor: pointer;
}
.gradient-btn-content {
    background-color: var(--primary-bgc);
    border-radius: 0.5rem;
    padding: 0.8rem 1.8rem;

    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease;
}

</style>