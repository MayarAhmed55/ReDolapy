<template>
  <div class="min-h-screen bg-[#FAF8FF] font-['Geist',sans-serif] text-[#191B23]">
    <!-- Inbox Content -->
    <div class="px-8 pt-12 pb-24 flex flex-col gap-6">

      <!-- Inbox Table Card -->
      <div class="bg-[#FAF8FF] border border-[#C3C5D7] rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.05)] overflow-hidden">

        <!-- Table Header -->
        <div class="flex items-center h-[41px] bg-[#F3F3FE] border-b border-[#C3C5D7] px-6 gap-0">
          <!-- Checkbox col -->
          <div class="w-12 shrink-0 flex items-center">
            <input type="checkbox" class="w-4 h-4 rounded border border-[#C3C5D7] bg-white cursor-pointer accent-[#1550D3]" />
          </div>
          <!-- Sender col -->
          <div class="w-[200px] shrink-0">
            <span class="text-xs font-bold uppercase tracking-[0.6px] text-[#434654]">Sender</span>
          </div>
          <!-- Subject / Preview col -->
          <div class="flex-1">
            <span class="text-xs font-bold uppercase tracking-[0.6px] text-[#434654]">Subject & Preview</span>
          </div>
          <!-- Time col -->
          <div class="w-[120px] shrink-0 text-right">
            <span class="text-xs font-bold uppercase tracking-[0.6px] text-[#434654]">Received</span>
          </div>
        </div>

        <!-- Inbox Rows -->
        <div class="divide-y divide-[#C3C5D7]">

          <!-- Row 1 — Unread (blue left bar) -->
          <div class="relative flex items-center h-[88px] hover:bg-white/70 transition-colors cursor-pointer group">
            <!-- Unread indicator bar -->
            <div class="absolute left-0 top-0 bottom-0 w-1 bg-[#1550D3] rounded-l"></div>

            <!-- Checkbox -->
            <div class="w-12 pl-6 shrink-0 flex items-center">
              <input type="checkbox" class="w-4 h-4 rounded border border-[#C3C5D7] bg-white cursor-pointer accent-[#1550D3]" />
            </div>

            <!-- Avatar + Name -->
            <div class="w-[200px] shrink-0 flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-[#DCE1FF] flex items-center justify-center shrink-0">
                <span class="text-xs font-bold text-[#003CAD]">BM</span>
              </div>
              <span class="text-base font-bold text-[#191B23] truncate">Boutique Milano</span>
            </div>

            <!-- Subject + Preview -->
            <div class="flex-1 flex flex-col gap-0.5 pr-4">
              <span class="text-base font-bold text-[#191B23] truncate">Wholesale Inquiry: Spring 2024 Collection</span>
              <span class="text-sm text-[#434654] line-clamp-2 leading-5">Hello Dolapy Team, we are interested in stocking your premium minimalist line in our Paris flagship...</span>
            </div>

            <!-- Time + flag -->
            <div class="w-[120px] shrink-0 flex flex-col items-end gap-1 pr-0">
              <span class="text-xs font-bold text-[#1550D3] tracking-[0.24px]">10:42 AM</span>
              <svg class="w-[15px] h-[14px] text-[#737686]" fill="currentColor" viewBox="0 0 15 14">
                <path d="M1 1h8l-2 4 2 4H1V1z"/>
              </svg>
            </div>
          </div>

          <!-- Row 2 — Read -->
          <div class="relative flex items-center h-[89px] hover:bg-white/70 transition-colors cursor-pointer group">
            <!-- Checkbox -->
            <div class="w-12 pl-6 shrink-0 flex items-center">
              <input type="checkbox" class="w-4 h-4 rounded border border-[#C3C5D7] bg-white cursor-pointer accent-[#1550D3]" />
            </div>

            <!-- Avatar + Name -->
            <div class="w-[200px] shrink-0 flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-[#6CF8BB] flex items-center justify-center shrink-0">
                <span class="text-xs font-bold text-[#00714D]">NW</span>
              </div>
              <span class="text-base font-normal text-[#191B23] truncate">Nina Wakefield</span>
            </div>

            <!-- Subject + Preview -->
            <div class="flex-1 flex flex-col gap-0.5 pr-4">
              <span class="text-base font-normal text-[#191B23] truncate">Shipping issue for order #88219</span>
              <span class="text-sm text-[#434654] line-clamp-2 leading-5">The delivery status hasn't updated in 4 days. Can you please check the international customs clearance?</span>
            </div>

            <!-- Time + flag -->
            <div class="w-[120px] shrink-0 flex flex-col items-end gap-1">
              <span class="text-xs font-medium text-[#737686] tracking-[0.24px]">Yesterday</span>
              <svg class="w-[15px] h-[14px] text-[#737686]" fill="currentColor" viewBox="0 0 15 14">
                <path d="M1 1h8l-2 4 2 4H1V1z"/>
              </svg>
            </div>
          </div>

          <!-- Row 3 — Flagged -->
          <div class="relative flex items-center h-[89px] hover:bg-white/70 transition-colors cursor-pointer group">
            <!-- Checkbox -->
            <div class="w-12 pl-6 shrink-0 flex items-center">
              <input type="checkbox" class="w-4 h-4 rounded border border-[#C3C5D7] bg-white cursor-pointer accent-[#1550D3]" />
            </div>

            <!-- Avatar + Name -->
            <div class="w-[200px] shrink-0 flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-[#A36700] flex items-center justify-center shrink-0">
                <span class="text-xs font-bold text-[#FFFBFF]">RL</span>
              </div>
              <span class="text-base font-normal text-[#191B23] truncate">Rowan Leclaire</span>
            </div>

            <!-- Subject + Preview -->
            <div class="flex-1 flex flex-col gap-0.5 pr-4">
              <span class="text-base font-normal text-[#191B23] truncate">Partnership Proposal: Sustainable Textiles</span>
              <span class="text-sm text-[#434654] line-clamp-2 leading-5">We've watched Dolapy's growth and believe our new recycled silk blend fits perfectly with your brand ethos.</span>
            </div>

            <!-- Time + flag (active / blue) -->
            <div class="w-[120px] shrink-0 flex flex-col items-end gap-1">
              <span class="text-xs font-medium text-[#737686] tracking-[0.24px]">Mon</span>
              <!-- Flagged — filled blue -->
              <svg class="w-[15px] h-[14px] text-[#1550D3]" fill="currentColor" viewBox="0 0 15 14">
                <path d="M1 1h8l-2 4 2 4H1V1z"/>
              </svg>
            </div>
          </div>

          <!-- Row 4 — Read -->
          <div class="relative flex items-center h-[89px] hover:bg-white/70 transition-colors cursor-pointer group">
            <!-- Checkbox -->
            <div class="w-12 pl-6 shrink-0 flex items-center">
              <input type="checkbox" class="w-4 h-4 rounded border border-[#C3C5D7] bg-white cursor-pointer accent-[#1550D3]" />
            </div>

            <!-- Avatar + Name -->
            <div class="w-[200px] shrink-0 flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-[#E2E1ED] flex items-center justify-center shrink-0">
                <span class="text-xs font-bold text-[#434654]">ZK</span>
              </div>
              <span class="text-base font-normal text-[#191B23] truncate">Zurich Kiosk</span>
            </div>

            <!-- Subject + Preview -->
            <div class="flex-1 flex flex-col gap-0.5 pr-4">
              <span class="text-base font-normal text-[#191B23] truncate">Return requested for Size 42 Loafers</span>
              <span class="text-sm text-[#434654] leading-5">The fit was slightly different than expected. How do I initiate a return from Zurich?</span>
            </div>

            <!-- Time + flag -->
            <div class="w-[120px] shrink-0 flex flex-col items-end gap-1">
              <span class="text-xs font-medium text-[#737686] tracking-[0.24px]">Sun</span>
              <svg class="w-[15px] h-[14px] text-[#737686]" fill="currentColor" viewBox="0 0 15 14">
                <path d="M1 1h8l-2 4 2 4H1V1z"/>
              </svg>
            </div>
          </div>

        </div>
      </div>
      <!-- /Table Card -->

      <!-- Pagination Footer -->
      <div class="flex items-center justify-between">
        <span class="text-sm text-[#434654]">Showing 4 of 38 messages</span>
        <div class="flex gap-2">
          <button class="w-[25px] h-[30px] flex items-center justify-center border border-[#C3C5D7] rounded-lg hover:bg-[#EDEDF8] transition-colors">
            <svg class="w-[7px] h-3 text-[#434654]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 7 12">
              <path d="M6 1L1 6l5 5"/>
            </svg>
          </button>
          <button class="w-[25px] h-[30px] flex items-center justify-center border border-[#C3C5D7] rounded-lg hover:bg-[#EDEDF8] transition-colors">
            <svg class="w-[7px] h-3 text-[#434654]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 7 12">
              <path d="M1 1l5 5-5 5"/>
            </svg>
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'EmailCenter'
}
</script>