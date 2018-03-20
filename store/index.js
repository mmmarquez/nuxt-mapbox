export const state = () => ({
  selectedCountry: 0,
  test: []
});

export const mutations = {
  mobileState(state, data) {
    state.mobileState = !state.mobileState;
  },
  countryState(state, data) {
    console.log("yum!", data);
    state.selectedCountry = data.data;
  }
};

export const actions = {
  // async LOAD_DATA({ commit }, dataUrl) {
  //   const response = await axios.get(dataUrl);
  //   const data = response.data;
  //   commit('setData', data);
  // }
};
