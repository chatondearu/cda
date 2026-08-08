<script setup lang="ts">
interface Props {
  label?: string
  modelValue?: string
  type?: string
  autocomplete?: string
  placeholder?: string
  required?: boolean
  inputId?: string
}

withDefaults(defineProps<Props>(), {
  label: 'SYS_MSG: ENTER COMMAND',
  modelValue: '',
  type: 'text',
  autocomplete: undefined,
  placeholder: undefined,
  required: false,
  inputId: undefined,
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
    <label
      :for="inputId"
      class="mb-2 block text-[10px] uppercase tracking-[0.22em] text-primary/65"
    >
      {{ label }}
    </label>
    <input
      :id="inputId"
      :value="modelValue"
      :type="type"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      :required="required"
      class="w-full border-0 border-b border-primary_fixed_dim bg-transparent px-0 py-2 text-primary outline-none placeholder:text-primary/30"
      @input="onInput"
    >
  </div>
</template>
