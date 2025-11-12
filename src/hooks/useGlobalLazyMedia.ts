import { useEffect } from 'react';

export function useGlobalLazyMedia() {
  useEffect(() => {
    const imgs = Array.from(document.querySelectorAll('img')) as HTMLImageElement[];
    imgs.forEach((img) => {
      if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
      if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
    });

    const videos = Array.from(document.querySelectorAll('video')) as HTMLVideoElement[];
    videos.forEach((v) => {
      if (!v.hasAttribute('preload')) v.setAttribute('preload', 'metadata');
      if (!v.hasAttribute('playsinline')) v.setAttribute('playsinline', '');
      if (!v.muted) v.muted = true;
    });
  }, []);
}


