<template>
  <div class="min-h-screen w-full bg-[#F5F6F7] flex text-[#191B23] font-sans antialiased">
    
    <div class="flex-1  flex-col min-h-screen">
      


      <main class="flex-1 p-8 max-w-[100%] w-full mx-auto flex flex-col gap-8">
        
        <div class="w-full flex items-center justify-between">
          <div class="flex flex-col gap-1 max-w-[354.81px]">
            <h1 class="text-[32px] font-semibold leading-10 tracking-[-0.64px] text-[#191B23]">Add Store</h1>
            <p class="text-[14px] font-normal leading-5 text-[#434654]">Setup and configure a new localized or global deployment endpoint.</p>
          </div>
          <button class="h-11 px-6 bg-[#1550D3] hover:bg-[#1550D3]/90 text-white text-base font-bold rounded-xl transition-all shadow-[0px_10px_15px_-3px_rgba(21,80,211,0.2),0px_4px_6px_-4px_rgba(21,80,211,0.2)]">
            Save Store
          </button>
        </div>

        <form @submit.prevent class="w-full flex flex-col gap-6">
          
          <section class="w-full bg-white border border-[#C3C5D7]/30 rounded-[16px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] p-8 flex flex-col gap-10">
            <div class="w-full flex items-center gap-3">
              <span class="w-5 h-5 bg-[#1550D3] rounded-[4px] shrink-0"></span>
              <h3 class="text-2xl font-medium tracking-[-0.2px] text-[#191B23]">Store Profile</h3>
            </div>

            <div class="w-full flex flex-col gap-[61px]">
              <div class="w-full flex flex-col gap-2">
                <label class="text-[12px] font-medium tracking-[0.24px] text-[#434654] uppercase">Store Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Milan Flagship Digital" 
                  class="w-full h-[50px] bg-[#FAF8FF] border border-[#C3C5D7] rounded-xl px-4 text-base font-normal text-[#191B23] placeholder-[#6B7280] focus:outline-none focus:border-[#1550D3] transition-colors"
                />
              </div>

              <div class="w-full flex flex-col gap-2">
                <label class="text-[12px] font-medium tracking-[0.24px] text-[#434654] uppercase">Description</label>
                <textarea 
                  rows="3"
                  placeholder="Brief overview of the store's focus and target collection..." 
                  class="w-full h-[98px] bg-[#FAF8FF] border border-[#C3C5D7] rounded-xl p-4 text-base font-normal text-[#191B23] placeholder-[#6B7280] focus:outline-none focus:border-[#1550D3] transition-colors resize-none overflow-y-auto"
                ></textarea>
              </div>

              <div class="w-full flex flex-col gap-2">
                <label class="text-[12px] font-medium tracking-[0.24px] text-[#434654] uppercase">Website URL</label>
                <div class="w-full flex h-[50px]">
                  <span class="h-full bg-[#EDEDF8] border border-r-0 border-[#C3C5D7] rounded-s-xl px-4 flex items-center justify-center text-[12px] font-serif text-[#434654] select-none">
                    https://
                  </span>
                  <input 
                    type="text" 
                    placeholder="dolapy.store/milan-flagship" 
                    class="flex-1 h-full bg-[#FAF8FF] border border-[#C3C5D7] rounded-e-xl px-4 text-base font-normal text-[#191B23] placeholder-[#6B7280] focus:outline-none focus:border-[#1550D3] transition-colors"
                  />
                </div>
              </div>
            </div>
          </section>

          <section class="w-full bg-white border border-[#C3C5D7]/30 rounded-[16px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] p-8 flex flex-col gap-6">
            <div class="w-full flex items-center gap-3">
              <span class="w-[18px] h-[18px] bg-[#1550D3] rounded-[4px] shrink-0"></span>
              <h3 class="text-2xl font-medium tracking-[-0.2px] text-[#191B23]">Brand Assets</h3>
            </div>

            <div class="w-full max-w-[459px] flex flex-col gap-3 mx-auto md:mx-0">
              <label class="text-[12px] font-medium tracking-[0.24px] text-[#434654] uppercase">Brand Logo</label>
              
              <div class="w-full h-[130px] bg-[#FAF8FF] border-2 border-dashed border-[#C3C5D7] rounded-xl flex flex-col justify-center items-center gap-2 cursor-pointer hover:bg-[#F3F3FE]/40 transition-colors p-6">
                <div class="w-6 h-[30px] bg-[#737686] opacity-70 rounded-sm"></div>
                <span class="text-[14px] font-normal leading-5 text-[#434654] text-center">
                  Drag and drop or browse asset file
                </span>
              </div>
            </div>
          </section>

        </form>
      </main>
    </div>
  </div>
</template>

<script setup>
// Component composition state architecture parameters can be linked here
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400&family=Geist:wght@400;500;600;700&display=swap');

.font-sans {
  font-family: 'Geist', sans-serif;
}
.font-mono {
  font-family: 'Geist Mono', monospace;
}
</style>