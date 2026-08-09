<script setup lang="ts">
interface Props {
  columns?: string[]
  rows: (string | number)[][]
  caption?: string
}

defineProps<Props>()
</script>

<template>
  <div class="inline-flex flex-col border border-primary/30 bg-surface_container_lowest font-mono text-[9px] uppercase tracking-widest">
    <span
      v-if="caption"
      class="border-b border-primary/20 px-2 py-1 text-primary/40"
    >{{ caption }}</span>
    <table class="border-collapse">
      <thead v-if="columns?.length">
        <tr>
          <th
            v-for="(column, index) in columns"
            :key="index"
            class="border-b border-r border-primary/20 px-2 py-1 text-left font-normal text-primary/50 last:border-r-0"
          >
            {{ column }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in rows"
          :key="rowIndex"
          class="border-t border-primary/10 first:border-t-0"
        >
          <td
            v-for="(cell, cellIndex) in row"
            :key="cellIndex"
            class="border-r border-primary/10 px-2 py-1 text-primary last:border-r-0"
          >
            {{ cell }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
