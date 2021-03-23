import {createLocalVue, shallowMount} from '@vue/test-utils'
import CoreuiVue from '@coreui/vue-pro'
import Vuex from 'vuex'

import Toast from '@/core/components/Toast'

const localVue = createLocalVue()
localVue.use(CoreuiVue)
localVue.use(Vuex)

const store = new Vuex.Store({
  state: {
    sidebarShow: 'responsive',
    sidebarMinimize: false,
    asideShow: false,
    darkMode: false
  }
})

describe('Toast.vue', () => {
  it('has a name', () => {
    expect(Toast.name).toBe('Toast')
  })
  it('is Vue instance', () => {
    const wrapper = shallowMount(Toast, { store, localVue })
    expect(wrapper.vm).toBeTruthy()
  })
  it('is Toast', () => {
    const wrapper = shallowMount(Toast, { store, localVue })
    expect(wrapper.findComponent(Toast)).toBeTruthy()
  })
})
