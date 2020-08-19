import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { Store } from 'vuex'
import { HasStore } from '.'
import { Category } from '~/core/interfaces/Category'

@Module({
  name: 'game',
  namespaced: true,
  stateFactory: true,
})
class GameModule extends VuexModule implements HasStore {
  store!: Store<any>

  loaded: boolean = false

  letter: String = '?'

  categories: Category[] = []

  @Mutation
  setLetter(letter: string) {
    this.letter = letter
  }

  @Mutation
  setCategories(categories: Category[]) {
    this.categories = []
    categories.forEach((c) => this.categories.push(c))
  }

  @Mutation
  setLoaded(loaded: boolean) {
    this.loaded = loaded
  }

  @Action
  loadGame() {
    // ftech game data
    this.setLetter('A')
    // fetch categegories
    this.setCategories([
      { id: '1', key: 'state' },
      { id: '2', key: 'anmimal' },
      { id: '3', key: 'name' },
      { id: '4', key: 'celebrity' },
      { id: '5', key: 'programming_language' },
    ])
    this.setLoaded(true)
  }
}

export default GameModule
