<script setup lang="ts">
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'reka-ui'
</script>

<template>
  <section class="border border-outline/30 bg-surface_container/80 p-6 backdrop-blur-[10px]">
    <TabsRoot default-value="core">
      <TabsList class="mb-4 flex border-b border-primary_fixed_dim/20 pb-2">
        <TabsTrigger
          value="core"
          class="mr-2 border border-primary_fixed_dim/20 px-3 py-1 text-[10px] tracking-[0.18em] text-primary data-[state=active]:bg-primary_fixed_dim data-[state=active]:text-background"
        >
          CORE
        </TabsTrigger>
        <TabsTrigger
          value="memory"
          class="border border-primary_fixed_dim/20 px-3 py-1 text-[10px] tracking-[0.18em] text-primary data-[state=active]:bg-primary_fixed_dim data-[state=active]:text-background"
        >
          MEMORY
        </TabsTrigger>
      </TabsList>
      <TabsContent value="core">
        <UiProgressReadout
          label="CORE_LATENCY"
          value="02.1MS"
          :progress="82"
        />
      </TabsContent>
      <TabsContent value="memory">
        <UiProgressReadout
          label="MEMORY_LOAD"
          value="61%"
          :progress="61"
        />
      </TabsContent>
    </TabsRoot>
  </section>
</template>
