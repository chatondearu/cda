<script setup lang="ts">
interface Props {
  label?: string
  modelValue?: string
}

withDefaults(defineProps<Props>(), {
  label: 'SYS_MSG: ENTER COMMAND',
  modelValue: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function onInput(event: Event) {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="w-full">
    <label class="mb-2 block text-[10px] uppercase tracking-[0.22em] text-primary/65">
      {{ label }}
    </label>
    <input
      :value="modelValue"
      type="text"
      class="w-full border-0 border-b border-primary_fixed_dim bg-transparent px-0 py-2 text-primary outline-none"
      @input="onInput"
    >
  </div>
</template>
