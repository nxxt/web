import { VuexModule, Module, Action, Mutation } from 'vuex-module-decorators'
import { Store } from 'vuex'
import { HasStore } from '.'
import { Account, AuthData } from '~/core/interfaces/Account'

export interface LoginCredentials {
  email: string
  password: string
}

@Module({
  name: 'auth',
  namespaced: true,
  stateFactory: true,
})
class AuthModule extends VuexModule implements HasStore {
  store!: Store<any>

  authData?: AuthData
  account?: Account

  @Mutation
  setAuthData(authData?: AuthData) {
    this.authData = authData
  }

  @Mutation
  setAccount(account?: Account) {
    this.account = account
  }

  @Action
  async loginWithEmailAndPassword({
    email,
    password,
  }: LoginCredentials): Promise<string> {
    try {
      const { user } = await this.store.$fireAuth.signInWithEmailAndPassword(
        email,
        password
      )
      if (!user) {
        return 'undefined-user'
      }
      const token = await user?.getIdToken(false)
      if (!token) {
        return 'undefined-token'
      }

      // Apply Auth Data
      this.setAuthData({
        token,
        refreshToken: user.refreshToken,
      })
      // Apply account data
      this.setAccount({
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        displayName: user.displayName,
        photoURL: user.photoURL,
      })

      return 'ok'
    } catch (e) {
      return e.code
    }
  }
}

export default AuthModule
