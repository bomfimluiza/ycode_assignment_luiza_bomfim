import { mount } from '@vue/test-utils'
import NewTransaction from '@/components/NewTransaction.vue'

const fakeTransaction = {
  from: 456,
  to: 123,
  details: "fake transaction 2",
  amount: "10"
};

describe('NewTransaction', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(NewTransaction)
    expect(wrapper.isVueInstance()).toBeTruthy()
  });

  it("calls onSubmit when click on submit", () => {
    const wrapper = mount(NewTransaction)
    const stub = jest.fn();
    wrapper.setMethods({ onSubmit: stub });

    const el = wrapper.find("#submit").trigger("submit");
    expect(stub).toBeCalled();
  });
})
