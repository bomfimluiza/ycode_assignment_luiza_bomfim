import { mount } from '@vue/test-utils'
import LogoutButton from '@/components/LogoutButton.vue'

describe('LogoutButton', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(LogoutButton)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
