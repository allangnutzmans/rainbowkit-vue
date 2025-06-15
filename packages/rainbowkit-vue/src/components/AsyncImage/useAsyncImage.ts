import { ref, watchEffect } from 'vue';

export type AsyncImageSrc = () => Promise<string>;

const cachedUrls = new Map<AsyncImageSrc, string>();
const cachedRequestPromises = new Map<AsyncImageSrc, Promise<string | void>>();

async function loadAsyncImage(asyncImage: AsyncImageSrc) {
  const cachedRequestPromise = cachedRequestPromises.get(asyncImage);
  if (cachedRequestPromise) return cachedRequestPromise;

  const load = async () =>
      asyncImage().then((url) => {
        cachedUrls.set(asyncImage, url);
        return url;
      });

  const requestPromise = load().catch(() =>
      load().catch(() => {
        cachedRequestPromises.delete(asyncImage);
      })
  );

  cachedRequestPromises.set(asyncImage, requestPromise);

  return requestPromise;
}

export async function loadImages(...urls: (string | AsyncImageSrc)[]) {
  return Promise.all(
      urls.map(url => (typeof url === 'function' ? loadAsyncImage(url) : url))
  );
}

export function useAsyncImage(url?: string | AsyncImageSrc) {
  const imageSrc = ref<string | undefined>(
      typeof url === 'function' ? cachedUrls.get(url) : url
  );

  watchEffect(() => {
    if (typeof url === 'function' && !cachedUrls.has(url)) {
      loadAsyncImage(url).then(() => {
        imageSrc.value = cachedUrls.get(url);
      });
    } else if (typeof url === 'string') {
      imageSrc.value = url;
    } else {
      imageSrc.value = undefined;
    }
  });

  return imageSrc;
}
