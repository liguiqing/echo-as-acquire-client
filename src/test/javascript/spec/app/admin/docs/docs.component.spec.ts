import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import EchoDocs from '@/admin/docs/docs.vue';
import EchoDocsClass from '@/admin/docs/docs.component';

import * as config from '@/shared/config/config';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);

describe('EchoDocs', () => {
  let echoDocs: EchoDocsClass;
  let wrapper: Wrapper<EchoDocsClass>;

  beforeEach(() => {
    wrapper = shallowMount<EchoDocsClass>(EchoDocs, {
      i18n,
      localVue
    });
    echoDocs = wrapper.vm;
  });

  it('should be a Vue instance', async () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
