import { ref, onMounted, onUnmounted } from 'vue';
import { debounce } from '../utils/debounce';

export function useWindowSize() {
  const windowSize = ref({
    width: undefined as number | undefined,
    height: undefined as number | undefined,
  });

  onMounted(() => {
    const handleResize = debounce(() => {
      windowSize.value = {
        height: window.innerHeight,
        width: window.innerWidth,
      };
    }, 500);
    window.addEventListener('resize', handleResize);
    handleResize();
    onUnmounted(() => {
      window.removeEventListener('resize', handleResize);
    });
  });

  return windowSize;
}
