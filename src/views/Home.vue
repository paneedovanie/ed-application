<template>
  <div class="home">
    <v-row justify="center">
      <template v-for="(item,i) in services">
        <v-col cols="auto" :key="i" >
          <router-link tag="div" :to="item.path" class="home__card">
            <div class="home__card-shadow"></div>
            <div class="home__card-card">
              <div class="home__card-card__icon">
                <div class="home__card-card__icon-shadow">
                </div>
                <div class="home__card-card__icon-icon">
                  <v-icon v-html="item.icon"></v-icon>
                </div>
              </div>
              <div class="home__card-card__content">
                <div class="home__card-card__content-shadow">
                  <h2 v-text="item.title"></h2>
                  <p v-text="item.description"></p>
                </div>
                <div class="home__card-card__content-content">
                  <h2 v-text="item.title"></h2>
                  <p v-text="item.description"></p>
                </div>
              </div>
            </div>
          </router-link>
        </v-col>
      </template>
    </v-row>
  </div>
</template>

<script>
import ShortLink from '@/models/ShortLink'
import Quotes from '@/models/Quotes'
import CurrencyConverter from '@/models/CurrencyConverter'
import YTDownloader from '@/models/YTDownloader'
import CovidStats from '@/models/CovidStats'
import Play2Earn from '@/models/Play2Earn'

export default {
  name: 'Home',

  data: () => ({
    services: [
      new ShortLink,
      new Quotes,
      new CurrencyConverter,
      new YTDownloader,
      new CovidStats,
      new Play2Earn
    ]
  })
}
</script>
