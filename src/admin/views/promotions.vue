<template>
  <div class="min-h-screen bg-[#FAF8FF] font-['Inter',sans-serif] text-[#191B23]">

    <!-- Main Content -->
    <div class="flex flex-col gap-8 p-8">

      <!-- Page Header -->
      <div class="flex items-end justify-between">
        <div class="flex flex-col gap-1">
          <h2 class="text-[32px] font-semibold leading-10 tracking-[-0.64px]">Promotions</h2>
          <p class="text-sm text-[#434654]">Manage global and store-level promotions, approvals, and scheduling.</p>
        </div>
        <button class="flex items-center gap-2 px-6 py-3 bg-[#4F7CFF] text-white text-base font-bold rounded-2xl hover:bg-[#3c6aed] transition-colors shadow-[0_10px_15px_-3px_rgba(21,80,211,0.2),0_4px_6px_-4px_rgba(21,80,211,0.2)]">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
          Create New Promotion
        </button>
      </div>

      <!-- Layout -->
      <div class="flex gap-6 items-start">

        <!-- Left Column -->
        <div class="flex flex-col gap-6 flex-1 min-w-0">

          <!-- Section Header -->
          <div class="flex items-center gap-2">
            <h3 class="text-xl font-medium leading-7 tracking-[-0.2px]">Store Proposals</h3>
            <span class="px-3 py-0.5 bg-[rgba(21,80,211,0.1)] rounded-full text-[10px] font-bold tracking-[0.5px] uppercase text-[#1550D3]">Pending Review</span>
          </div>

          <!-- Proposals Grid -->
          <div class="grid grid-cols-2 gap-4">

            <!-- Card 1 -->
            <div class="flex flex-col gap-4 p-6 bg-[#FAF8FF] border border-[#E5E7EB] rounded-2xl">
              <div class="flex items-start justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-[#EDEDF8] rounded-lg flex items-center justify-center shrink-0">
                    <svg class="w-[18px] h-4 text-[#434654]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M3 9l1-5h16l1 5M3 9h18M3 9v11h18V9"/></svg>
                  </div>
                  <div>
                    <p class="text-base font-bold text-[#191B23]">Notting Hill</p>
                    <p class="text-[10px] font-bold uppercase tracking-[-0.25px] text-[#434654]">Flagship Store</p>
                  </div>
                </div>
                <span class="px-2 py-0.5 bg-[#FFDDB8] rounded text-[10px] font-bold text-[#2A1700]">Pending</span>
              </div>
              <div>
                <p class="text-sm font-bold text-[#1550D3]">In-Store Flash Sale: 15%</p>
                <p class="text-xs font-medium text-[#434654] tracking-[0.24px] leading-4 mt-1">Store seeks approval for a weekend clearance of previous season footwear.</p>
              </div>
              <div class="flex gap-2">
                <button class="flex-1 py-[8.5px] bg-[#1550D3] text-white text-xs font-bold tracking-[0.24px] rounded-lg hover:bg-[#1240b8] transition-colors">Approve</button>
                <button class="px-4 py-2 border border-[#E5E7EB] text-xs font-bold text-[#191B23] rounded-lg hover:bg-gray-50 transition-colors">Decline</button>
              </div>
            </div>

            <!-- Card 2 -->
            <div class="flex flex-col gap-4 p-6 bg-[#FAF8FF] border border-[#E5E7EB] rounded-2xl">
              <div class="flex items-start justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-[#EDEDF8] rounded-lg flex items-center justify-center shrink-0">
                    <svg class="w-[18px] h-4 text-[#434654]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M3 9l1-5h16l1 5M3 9h18M3 9v11h18V9"/></svg>
                  </div>
                  <div>
                    <p class="text-base font-bold text-[#191B23]">Mayfair VIP</p>
                    <p class="text-[10px] font-bold uppercase tracking-[-0.25px] text-[#434654]">Luxury Boutique</p>
                  </div>
                </div>
                <span class="px-2 py-0.5 bg-[#FFDDB8] rounded text-[10px] font-bold text-[#2A1700]">Pending</span>
              </div>
              <div>
                <p class="text-sm font-bold text-[#1550D3]">VIP Private Event: 20%</p>
                <p class="text-xs font-medium text-[#434654] tracking-[0.24px] leading-4 mt-1">Exclusive discount for top-tier clientele attending the trunk show.</p>
              </div>
              <div class="flex gap-2">
                <button class="flex-1 py-[8.5px] bg-[#1550D3] text-white text-xs font-bold tracking-[0.24px] rounded-lg hover:bg-[#1240b8] transition-colors">Approve</button>
                <button class="px-4 py-2 border border-[#E5E7EB] text-xs font-bold text-[#191B23] rounded-lg hover:bg-gray-50 transition-colors">Decline</button>
              </div>
            </div>

          </div>

          <!-- History Table Card -->
          <div class="bg-[#FAF8FF] border border-[#E5E7EB] rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.05)] overflow-hidden">

            <!-- Card Header -->
            <div class="flex items-center justify-between px-6 py-5 bg-white border-b border-[#E5E7EB]">
              <div>
                <h3 class="text-lg font-bold text-[#191B23]">Promotion History</h3>
                <p class="text-xs font-medium text-[#434654] tracking-[0.24px] mt-0.5">All past and active promotions across the network</p>
              </div>
              <div class="flex gap-2">
                <button class="flex items-center gap-2 px-3 py-1.5 border border-[#E5E7EB] rounded-lg text-xs font-medium text-[#191B23] hover:bg-gray-50 transition-colors">
                  <svg class="w-3.5 h-2.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M7 12h10M10 18h4"/></svg>
                  Filter
                </button>
                <button class="flex items-center gap-2 px-3 py-1.5 border border-[#E5E7EB] rounded-lg text-xs font-medium text-[#191B23] hover:bg-gray-50 transition-colors">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"/></svg>
                  Export
                </button>
              </div>
            </div>

            <!-- Table Head -->
            <div class="flex bg-[#EDEDF8] border-b border-[#E5E7EB]">
              <div class="w-[200px] shrink-0 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.5px] text-[#434654]">Promotion Name</div>
              <div class="w-[160px] shrink-0 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.5px] text-[#434654]">Assigned To</div>
              <div class="w-[160px] shrink-0 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.5px] text-[#434654]">Date Range</div>
              <div class="w-[130px] shrink-0 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.5px] text-[#434654]">Status</div>
              <div class="flex-1 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.5px] text-[#434654] text-right">Actions</div>
            </div>

            <!-- Table Body -->
            <div class="divide-y divide-[#E5E7EB]">

              <div class="flex items-center hover:bg-white/60 transition-colors">
                <div class="w-[200px] shrink-0 px-6 py-4">
                  <p class="text-sm font-bold text-[#191B23]">Spring Refresh 10%</p>
                  <p class="text-[11px] text-[#434654]">Percentage Discount</p>
                </div>
                <div class="w-[160px] shrink-0 px-6 py-4 flex items-center gap-2">
                  <div class="w-6 h-6 rounded-full bg-[#3C6BED] flex items-center justify-center text-[10px] font-bold text-[#FFFBFF] shrink-0">JR</div>
                  <span class="text-sm text-[#191B23]">Janelle R.</span>
                </div>
                <div class="w-[160px] shrink-0 px-6 py-4 text-sm text-[#434654]">Mar 1–15</div>
                <div class="w-[130px] shrink-0 px-6 py-4">
                  <span class="px-2 py-0.5 bg-[#E2E1ED] rounded text-[11px] font-bold text-[#434654]">Expired</span>
                </div>
                <div class="flex-1 px-6 py-4 flex justify-end">
                  <button class="w-7 h-7 rounded-full flex items-center justify-center text-[#434654] text-lg leading-none hover:bg-[#EDEDF8] transition-colors">⋮</button>
                </div>
              </div>

              <div class="flex items-center hover:bg-white/60 transition-colors">
                <div class="w-[200px] shrink-0 px-6 py-4">
                  <p class="text-sm font-bold text-[#191B23]">London Pop-up Special</p>
                  <p class="text-[11px] text-[#434654]">Flash Sale</p>
                </div>
                <div class="w-[160px] shrink-0 px-6 py-4 flex items-center gap-2">
                  <div class="w-6 h-6 rounded-full bg-[#EDEDF8] flex items-center justify-center text-[10px] font-bold text-[#434654] shrink-0">TS</div>
                  <span class="text-sm text-[#191B23]">Tom S.</span>
                </div>
                <div class="w-[160px] shrink-0 px-6 py-4 text-sm text-[#434654]">Apr 5–7</div>
                <div class="w-[130px] shrink-0 px-6 py-4">
                  <span class="px-2 py-0.5 bg-[#6CF8BB] rounded text-[11px] font-bold text-[#191B23]">Active</span>
                </div>
                <div class="flex-1 px-6 py-4 flex justify-end">
                  <button class="w-7 h-7 rounded-full flex items-center justify-center text-[#434654] text-lg leading-none hover:bg-[#EDEDF8] transition-colors">⋮</button>
                </div>
              </div>

              <div class="flex items-center hover:bg-white/60 transition-colors">
                <div class="w-[200px] shrink-0 px-6 py-4">
                  <p class="text-sm font-bold text-[#191B23]">Welcome Gift Card</p>
                  <p class="text-[11px] text-[#434654]">Fixed Amount</p>
                </div>
                <div class="w-[160px] shrink-0 px-6 py-4 flex items-center gap-2">
                  <div class="w-6 h-6 rounded-full bg-[#3C6BED] flex items-center justify-center text-[10px] font-bold text-[#FFFBFF] shrink-0">MK</div>
                  <span class="text-sm text-[#191B23]">Maya K.</span>
                </div>
                <div class="w-[160px] shrink-0 px-6 py-4 text-sm text-[#434654]">Ongoing</div>
                <div class="w-[130px] shrink-0 px-6 py-4">
                  <span class="px-2 py-0.5 bg-[#6CF8BB] rounded text-[11px] font-bold text-[#191B23]">Active</span>
                </div>
                <div class="flex-1 px-6 py-4 flex justify-end">
                  <button class="w-7 h-7 rounded-full flex items-center justify-center text-[#434654] text-lg leading-none hover:bg-[#EDEDF8] transition-colors">⋮</button>
                </div>
              </div>

            </div>

            <!-- Table Footer -->
            <div class="flex items-center justify-between px-6 py-4 bg-[#F3F3FE] border-t border-[#E5E7EB]">
              <span class="text-xs font-medium text-[#434654] tracking-[0.24px]">Showing 3 of 12 promotions</span>
              <div class="flex gap-2">
                <button class="px-3 py-1 border border-[#E5E7EB] rounded text-sm text-[#191B23] hover:bg-gray-50 transition-colors">‹</button>
                <button class="px-3 py-1 border border-[#E5E7EB] rounded text-sm text-[#191B23] hover:bg-gray-50 transition-colors">›</button>
              </div>
            </div>

          </div>

        </div>
        <!-- /Left Column -->

        <!-- Right Sidebar -->
        <div class="flex flex-col gap-6 w-[296px] shrink-0">

          <!-- Active Highlights -->
          <div class="flex flex-col gap-6 p-6 bg-[#FAF8FF] border border-[#E5E7EB] rounded-2xl">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-bold text-[#191B23]">Active Highlights</h3>
              <svg class="w-[22px] h-[21px] text-[#1550D3]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M13 2L4.09 12.96A1 1 0 005 14h6l-1 8 8.91-10.96A1 1 0 0019 10h-6l1-8z"/></svg>
            </div>
            <div class="flex flex-col gap-4">
              <div class="flex flex-col gap-1 p-4 bg-[#EDEDF8] rounded-2xl">
                <span class="text-[10px] font-bold uppercase text-[#434654]">Global Admin Offer</span>
                <span class="text-base font-bold text-[#191B23]">Summer Sale 20% Off</span>
                <div class="flex items-center justify-between pt-1">
                  <span class="text-xs font-bold text-[#006C49] tracking-[0.24px]">● Live now</span>
                  <button class="text-xs font-bold text-[#1550D3] hover:underline">Edit</button>
                </div>
              </div>
              <div class="flex flex-col gap-1 p-4 bg-[#EDEDF8] rounded-2xl">
                <span class="text-[10px] font-bold uppercase text-[#434654]">Regional Store Offer</span>
                <span class="text-base font-bold text-[#191B23]">Luxury Tier Loyalty</span>
                <div class="flex items-center justify-between pt-1">
                  <span class="text-xs font-bold text-[#006C49] tracking-[0.24px]">● Live now</span>
                  <button class="text-xs font-bold text-[#1550D3] hover:underline">Edit</button>
                </div>
              </div>
            </div>
            <button class="w-full py-3 border border-[#1550D3] rounded-2xl text-sm font-bold text-[#1550D3] hover:bg-[rgba(21,80,211,0.05)] transition-colors">
              View All Active Promotions
            </button>
          </div>

          <!-- Scheduled Queue -->
          <div class="flex flex-col gap-6 p-6 bg-[#FAF8FF] border border-[#E5E7EB] rounded-2xl">
            <h3 class="text-lg font-bold text-[#191B23]">Scheduled Queue</h3>
            <div class="flex flex-col gap-6">
              <div class="flex gap-4 pb-6 border-b border-[#E5E7EB]">
                <div class="w-12 h-12 bg-[#E7E7F2] rounded-2xl flex flex-col items-center justify-center shrink-0">
                  <span class="text-[10px] font-bold uppercase text-[#434654] leading-none">JUL</span>
                  <span class="text-base font-bold text-[#191B23]">4</span>
                </div>
                <div class="flex flex-col gap-1">
                  <span class="text-base font-bold text-[#191B23]">Fashion Week Blitz</span>
                  <span class="text-xs font-medium text-[#434654] tracking-[0.24px]">Admin Created · Global</span>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="w-12 h-12 bg-[#E7E7F2] rounded-2xl flex flex-col items-center justify-center shrink-0">
                  <span class="text-[10px] font-bold uppercase text-[#434654] leading-none">AUG</span>
                  <span class="text-base font-bold text-[#191B23]">18</span>
                </div>
                <div class="flex flex-col gap-1">
                  <span class="text-base font-bold text-[#191B23]">Fall Launch Promo</span>
                  <span class="text-xs font-medium text-[#434654] tracking-[0.24px]">Store Proposal · Pending</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Policy Card -->
          <div class="relative flex flex-col p-6 bg-[#1550D3] rounded-2xl overflow-hidden">
            <div class="absolute w-40 h-40 -right-10 -bottom-10 bg-white/10 blur-[32px] rounded-full pointer-events-none"></div>
            <div class="relative z-10 flex flex-col gap-4">
              <div class="flex items-center gap-2">
                <svg class="w-[17px] h-[17px] text-white shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg>
                <span class="text-base font-bold text-white uppercase tracking-[0.8px]">Promotion Policy</span>
              </div>
              <p class="text-base text-white leading-[26px]">
                Stores can propose up to 2 regional flash sales per month. HQ approval is required for any discount exceeding 15%.
              </p>
              <button class="w-full py-2 px-4 bg-white text-[#1550D3] text-base font-bold rounded-lg hover:bg-blue-50 transition-colors">
                Read Full Policy
              </button>
            </div>
          </div>

        </div>
        <!-- /Sidebar -->

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PromotionsManagement'
}
</script>