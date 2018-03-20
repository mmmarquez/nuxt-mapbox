<template>
    <aside id="side_nav" class="w-1/6 fixed bg-white pin-t pin-b pin-l z-40" :class="{ 'open':  !navState }" >
        <div class="h-full w-full relative border">
            <button id="nav_button" class="text-green-light font-bold p-0 inline-flex items-center" @click="navClick">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="fill-current w-8 h-8 mr-2 feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>

            <div class="w-full h-full p-4 pl-8">

                <div id="raw_products" class="mt-8">
                    <h3 class="font-bold uppercase text-green-light mb-2">
                        Products
                    </h3>
                <ul class="list-reset">
                    <li class="mb-4">
                        <a href="" class="no-underline text-grey hover:text-orange-light">placeholder</a>
                    </li>
                </ul>
                </div>


                <div id="countries" class="mt-8">
                    <h3 class="font-bold uppercase text-green-light mb-2">
                        Countries
                    </h3>
                <ul class="list-reset">
                    <li class="mb-4" :key="index" v-for="(item, index) in countryData">
                        <a href="" class="no-underline text-grey hover:text-orange-light" @click.prevent="selectCountry(index)">{{item.country}}</a>
                    </li>
                </ul>
                </div>


            </div>


        </div>
    </aside>
</template>

<script>
export default {
  name: "side-nav",
  props: {
    countryData: undefined,
    map: undefined
  },
  data() {
    return {
      navState: false
    };
  },
  methods: {
    navClick() {
      this.navState = !this.navState;
    },
    selectCountry(id) {
      let selectedCountry = id;
      //   console.log(selectedCountry.country);
      setTimeout(x => {
        console.log("selectedCountry");

        this.$store.commit("countryState", { data: id });
      }, 500);
    }
  },
  mounted() {
    console.log(this.$store);
  }
};
</script>


<style>
#side_nav.open {
  transform: translateX(-85%);
  transition: 1s ease transform;
}
#side_nav.open button {
  transform: rotate(180deg);
  transition: 0.5s ease transform;
}

#side_nav button {
  transform: rotate(0deg);
  transition: 0.5s ease transform;
}

#side_nav {
  transform: translateX(0%);
  transition: 1s ease transform;
}

#nav_button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
}
</style>
