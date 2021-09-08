import Vue from 'vue'
export default {
  startLoad() {
    const requireComponent = require.context('../global/', false, /\.vue$/);
    requireComponent.keys().forEach(fileName => {
      let config = requireComponent(fileName)
      console.log(fileName)
      let component = fileName.split("/").pop().replace(/\.\w+$/, '');
      Vue.component(component, config.default || config)
    })
  }
}

