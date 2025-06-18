import { ref } from 'vue';
import type { ResponsiveValue } from '../../css/sprinkles.css';

const showBalance = ref<ResponsiveValue<boolean> | undefined>(undefined);

// TODO: PROBLABLY THER IS NO NEED TO USE A HOOK FOR THIS JUST A GLOBAL VARIABLE
// LOOK FOR OTHER COMPOSABLES THAT ARE LIKE THIS AND SEE IF THEY CAN BE REFACTORED

export function useShowBalance() {
  return {
    showBalance,
    setShowBalance: (val: ResponsiveValue<boolean>) => (showBalance.value = val),
  };
} 