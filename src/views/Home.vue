<template>
  <div class="home">
    <v-row>
      <v-col cols="12" md="6">
        <template v-for="(item,i) in services">
          <router-link tag="div" :to="item.path" class="home__card" :key="i">
            <v-row>
              <v-col cols="auto">
                <div class="home__card__icon">
                  <v-icon v-html="item.icon"></v-icon>
                </div>
              </v-col>
              <v-col class="ml-0">
                <div class="home__card__content">
                  <h2 v-text="item.title"></h2>
                  <p v-text="item.description"></p>
                </div>
              </v-col>
            </v-row>
          </router-link>
        </template>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ShortLink from '@/models/ShortLink'
// import FreeMessage from '@/models/FreeMessage'
import CurrencyConverter from '@/models/CurrencyConverter'

export default {
  name: 'Home',

  data: () => ({
    services: [
      new ShortLink,
      // new FreeMessage,
      new CurrencyConverter
    ]
  })
}
</script>
