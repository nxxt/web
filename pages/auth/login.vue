<template>
  <div>
    <input v-model="email" type="email" placeholder="E-Mail" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="login()">Login</button>
    <p>{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator'
import { LoginCredentials } from '~/store/auth'

const auth = namespace('auth')

@Component
export default class HomePage extends Vue {
  email: string = ''

  password: string = ''

  error: string = ''

  @auth.Action
  loginWithEmailAndPassword!: (credentials: LoginCredentials) => Promise<string>

  async login() {
    const res = await this.loginWithEmailAndPassword({
      email: this.email,
      password: this.password,
    })
    switch (res) {
      case 'ok':
        return (this.error = 'Signed In')
      case 'auth/invalid-email':
        return (this.error = "The email address you've entered is invalid.")
      case 'auth/user-disabled':
        return (this.error = 'Your account is disabled.')
      case 'auth/user-not-found':
        return (this.error = 'There is no user with that email address.')
      case 'auth/wrong-password':
        return (this.error = 'The password you entered is invalid.')
    }
  }
}
</script>
