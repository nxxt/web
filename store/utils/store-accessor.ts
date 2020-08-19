import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import AuthModule from '~/store/auth'
import GameModule from '../game'

let authStore: AuthModule
let gameStore: GameModule

function initialiseStores(store: Store<any>): void {
  authStore = getModule(AuthModule, store)
  gameStore = getModule(GameModule, store)
}

export { initialiseStores, authStore, gameStore }
