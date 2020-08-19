<template>
  <div>
    <div v-if="loaded" class="flex justify-center">
      <div class="flex flex-col items-center">
        <CategoryContainer
          v-if="categories"
          v-for="category in categories"
          :key="category.id"
          :category="category"
          :letter="letter"
        />
        <button
          class="mt-20 py-2 w-full text-white hover:text-gray-200 focus:text-gray-300 bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 ease-in duration-75 border rounded-full focus:outline-none"
        >
          Finished
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator'
import CategoryContainer from '@/components/game/CategoryContainer.vue'
import { Category } from '@/core/interfaces/Category'

const game = namespace('game')

@Component
export default class HomePage extends Vue {
  @game.State
  loaded!: boolean

  @game.State
  letter!: string

  @game.State
  categories!: Category[]

  @game.Action
  loadGame!: () => void

  created() {
    this.loadGame()
  }
}
</script>
