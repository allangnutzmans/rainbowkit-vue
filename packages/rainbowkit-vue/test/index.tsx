import { mount } from '@vue/test-utils';
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';

const queryClient = new QueryClient();

export function renderWithProviders(component: any, options: any = {}) {
  return mount(component, {
    global: {
      plugins: [[VueQueryPlugin, { queryClient }]],
      ...options.global,
    },
    ...options,
  });
}
