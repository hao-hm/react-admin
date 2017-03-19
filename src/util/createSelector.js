export default function (module){
  return {
    getCurrentMode: (state) => state[module].mode,
    getCurrentItem: (state) => state[module].current,
    getData: (state) => state[module].data,
    getLoading: (state) => state[module].loading,
    getError: (state) => state[module].error,
    getSearch: (state) => state[module].search
  }
}