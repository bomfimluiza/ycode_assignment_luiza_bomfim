import { mount } from '@vue/test-utils'
import AccountDetails from '@/components/AccountDetails.vue'

describe('AccountDetails', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(AccountDetails)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
