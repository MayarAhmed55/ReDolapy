<template>
    <div class="dahNav bg-white">
<!-- <input type="text" > -->
<Searchbar placeholder="Search global database...">
    <slot class=""><Search></Search></slot>
</Searchbar>
    </div>
</template>

<script>
import Searchbar from './Search.vue';
import { Search } from '@lucide/vue';

    export default {
        name:'Navbar',
        components:{
            Searchbar,
            Search

        }
     
    }
</script>

<style scoped>
#dashNav{
    /* background-color:; */
}
</style>