<template>
  <div class="mt-10">
    <p class="text-gray-700 uppercase text-sm mb-1 tracking-wider">
      {{ category.key }}
    </p>
    <div
      :class="[
        'border rounded-full px-4 py-1 text-xl',
        invalid ? 'border-red-500' : '',
      ]"
    >
      <input
        type="text"
        :placeholder="letter"
        v-model="input"
        class="text-gray-900 focus:outline-none"
        @input="validateInput()"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Category } from '@/core/interfaces/Category'

@Component({
  name: 'CategoryContainer',
})
export default class CategoryContainer extends Vue {
  @Prop({ type: Object, required: true }) readonly category!: Category
  @Prop({ type: String, required: true }) readonly letter!: string

  input: string = ''

  invalid: boolean = false

  validateInput() {
    console.log(this.input)
    this.invalid = !this.input
      .toLowerCase()
      .startsWith(this.letter.toLowerCase())
  }
}
</script>
