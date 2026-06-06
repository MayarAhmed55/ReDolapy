<template>
    <div>
        <nav
            class="relative bg-gray-800/50 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10">
            <!-- <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8"> -->
            <div class="relative flex h-16 items-center justify-between">
                <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    <!-- Mobile menu button-->
                    <button type="button" command="--toggle" commandfor="mobile-menu"
                        class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
                        <span class="absolute -inset-0.5"></span>
                        <span class="sr-only">Open main menu</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon"
                            aria-hidden="true" class="size-6 in-aria-expanded:hidden">
                            <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon"
                            aria-hidden="true" class="size-6 not-in-aria-expanded:hidden">
                            <path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>

                <div id="Nav-logo-navigators"
                    class=" gap-60 flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">


                    <div class="flex shrink-0 items-center">
                      <router-link to="/">
                        <img src="../assets//Logo.png" alt="Your Company" class="h-8 w-auto" />
                      </router-link>

                    </div>


                    <div id="Nav-navigators" class=" w-[50%] hidden sm:ml-6 sm:block">
                        <div class="flex space-x-4  justify-between">
                        
                            <!-- --------------------------- -->
                            <router-link to="/" class="nav-link-item">Home</router-link>
                            <router-link to="/TryOn" class="nav-link-item">TryOn</router-link>
                            <router-link to="/Recycle" class="nav-link-item">Recycle</router-link>
                            <a href="#" class="nav-link-item">Pricing</a>
                            <a href="#" class="nav-link-item">About</a>

                        </div>


                    </div>
                </div>
                <div class="">
                    <LangSwitcher />
                </div>
                <div id="Nav-Buttons"
                    class="w-[15%] justify-between absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                    <button class="signBttns" id=logIn>Login</button>
                    <button class="signBttns" id=signUp>Sign up</button>
                </div>
            </div>

            <el-disclosure id="mobile-menu" hidden class="block sm:hidden">
                <div class="space-y-1 px-2 pt-2 pb-3">
                    <a href="#" aria-current="page"
                        class="block rounded-md bg-gray-950/50 px-3 py-2 text-base font-medium text-white">Dashboard</a>
                    <a href="#"
                        class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white">Team</a>
                    <a href="#"
                        class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white">Projects</a>
                    <a href="#"
                        class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white">Calendar</a>
                </div>
            </el-disclosure>
        </nav>

    </div>
</template>

<script>
import LangSwitcher from './LangSwitcher.vue';

export default {
    name: 'Navbar',
    components: {
        LangSwitcher
    }
}
</script>

<style scoped>
@import '../assets/Style.css';

nav {
    background-color: var(--primary-bgc);
    /* box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); */
}

.signBttns {
    border: 0.1em solid;
    border-radius: 0.5em;
    padding: 0.3em 1.5em;
    font-weight: var(--Semi-Bold);
    cursor:pointer;
}

#logIn {
    background-color: var(--primary-bgc);
    border-color: var(--Secondary-Brand-color);
    color: var(--Secondary-Brand-color);

}

#signUp {
    background: var(--Gradient-bgc);
    /* border-color: transparent; */
    padding: 0.4em 1.6em;
    border:none;
    color: white;
}


.nav-link-item {
    position: relative;
    text-decoration: none;
    color: #1e293b;
    font-weight: 500;
    padding: 0.5rem 0;
}

.nav-link-item::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: #8ED321;
    transform: scaleX(0); 
    transform-origin: center;
    transition: transform 0.3s ease-out; 
}

.nav-link-item:hover::after {
    transform: scaleX(1); 
}



</style>