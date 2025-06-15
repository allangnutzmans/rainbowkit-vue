import { render, fireEvent } from '@testing-library/vue';
import AccountModal from './AccountModal.vue';
import { vi } from 'vitest';

// Mock wagmi and profile composables
vi.mock('@wagmi/vue', () => ({
  useAccount: () => ({ address: { value: '0x123' } }),
  useDisconnect: () => ({ disconnect: vi.fn() }),
}));
vi.mock('../../hooks/useProfile', () => ({
  useProfile: () => ({
    balance: '1.23 ETH',
    ensAvatar: 'avatar.png',
    ensName: 'alice.eth',
  }),
}));

// Mock child components
vi.mock('../Dialog/Dialog.vue', () => ({
  default: {
    name: 'Dialog',
    props: ['open', 'titleId'],
    emits: ['close'],
    template: '<div data-testid="dialog"><slot /></div>',
  },
}));
vi.mock('../Dialog/DialogContent.vue', () => ({
  default: {
    name: 'DialogContent',
    template: '<div data-testid="dialog-content"><slot /></div>',
  },
}));
vi.mock('../ProfileDetails/ProfileDetails.vue', () => ({
  default: {
    name: 'ProfileDetails',
    props: ['address', 'ensAvatar', 'ensName', 'balance', 'onDisconnect'],
    template: '<div data-testid="profile-details">ProfileDetails</div>',
  },
}));

describe('AccountModal', () => {
  it('renders dialog and passes props to ProfileDetails', async () => {
    const { getByTestId } = render(AccountModal, {
      props: { open: true },
    });
    expect(getByTestId('dialog')).toBeTruthy();
    expect(getByTestId('dialog-content')).toBeTruthy();
    expect(getByTestId('profile-details')).toBeTruthy();
  });

  it('emits close when Dialog emits close', async () => {
    const { getByTestId, emitted } = render(AccountModal, {
      props: { open: true },
    });
    await fireEvent(getByTestId('dialog'), new CustomEvent('close'));
    expect(emitted().close).toBeTruthy();
  });
}); 