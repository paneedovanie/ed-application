<template>
    <svg class="logo" width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect class="logo__rect" y="16" width="20" height="13" fill="#27C498"/>
        <rect class="logo__rect" width="20" height="13" fill="#27C498"/>
        <rect class="logo__rect" y="32" width="20" height="13" fill="#27C498"/>
        <path class="logo__half-circle" d="M22.5 0C28.4674 7.11601e-08 34.1903 2.37053 38.4099 6.59009C42.6295 10.8096 45 16.5326 45 22.5C45 28.4673 42.6295 34.1903 38.4099 38.4099C34.1904 42.6294 28.4674 45 22.5001 45L22.5 22.5L22.5" fill="#27C498"/>
    </svg>
</template>

<style lang="scss">
.logo {
    &:hover {
        .logo {
            &__rect {
                animation-name: rect-ani;
                animation-duration: 1s;
            }

            &__half-circle {
                animation-name: half-circle-ani;
                animation-duration: 1s;
            }
        }
    }
}

@keyframes rect-ani {
  0% {width: 20px;}
  20% {width: 0; transform: translateX(24px)}
  80% {width: 0; transform: translateX(24px)}
  0% {width: 20px; transform: translateX(0)}
}

@keyframes half-circle-ani {
  20% {opacity: 1;}
  50% {opacity: 0;}
  80% {opacity: 1;}
}

</style>