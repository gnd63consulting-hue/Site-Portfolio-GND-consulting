import React from 'react';

type VideoFirstFrameProps = {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
  alt?: string;
  poster?: string; // fallback while generating
};

// Simple in-memory cache to avoid extracting the same frame repeatedly
const firstFrameCache = new Map<string, string>();

export const VideoFirstFrame: React.FC<VideoFirstFrameProps> = ({ src, className, style, width = 320, height = 180, alt, poster }) => {
  const [imageSrc, setImageSrc] = React.useState<string | null>(() => firstFrameCache.get(src) ?? null);
  const [failed, setFailed] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  // Ensure hooks are always called in the same order. This effect only runs logic
  // when the fallback <video> is actually rendered (i.e., when failed === true).
  React.useEffect(() => {
    if (!failed) return;
    const v = videoRef.current;
    if (!v) return;
    const onLoaded = () => {
      try {
        v.currentTime = 0.1;
        v.pause();
      } catch {
        // ignore
      }
    };
    v.addEventListener('loadedmetadata', onLoaded);
    return () => v.removeEventListener('loadedmetadata', onLoaded);
  }, [failed, src]);

  React.useEffect(() => {
    let isMounted = true;
    if (firstFrameCache.has(src)) {
      setImageSrc(firstFrameCache.get(src) || null);
      return;
    }

    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.preload = 'auto';
    video.muted = true;
    (video as any).playsInline = true;
    video.src = src;

    const timeoutId = window.setTimeout(() => {
      // Too slow, fallback to poster
      if (isMounted) setFailed(true);
    }, 7000);

    const handleLoadedData = async () => {
      try {
        // Seek a bit forward to avoid black frames
        const seekTo = 0.1;
        const onSeeked = () => {
          try {
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (!ctx) throw new Error('No 2D context');
            ctx.drawImage(video, 0, 0, width, height);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
            firstFrameCache.set(src, dataUrl);
            if (isMounted) setImageSrc(dataUrl);
          } catch (err) {
            // Likely CORS/tainted canvas, fallback
            if (isMounted) setFailed(true);
          } finally {
            video.removeEventListener('seeked', onSeeked);
            window.clearTimeout(timeoutId);
          }
        };
        video.addEventListener('seeked', onSeeked);
        // Some browsers need play->pause to render a frame
        try {
          await video.play();
        } catch {
          // ignore; muted autoplay may still fail in some contexts
        }
        video.currentTime = seekTo;
        // Pause after scheduling seek
        video.pause();
      } catch {
        if (isMounted) setFailed(true);
        window.clearTimeout(timeoutId);
      }
    };

    const handleError = () => {
      if (isMounted) setFailed(true);
      window.clearTimeout(timeoutId);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);

    return () => {
      isMounted = false;
      window.clearTimeout(timeoutId);
      video.pause();
      video.removeAttribute('src');
      video.load();
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, [src, width, height]);

  if (imageSrc) {
    return (
      <img
        src={imageSrc}
        alt={alt || ''}
        className={className}
        style={style}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
      />
    );
  }

  // New: if canvas extraction failed (CORS), fallback to a paused <video> at ~0.1s
  if (failed) {
    return (
      <video
        ref={videoRef}
        className={className}
        style={style}
        width={width}
        height={height}
        preload="metadata"
        playsInline
        muted
        controls={false}
        crossOrigin="anonymous"
        poster={poster}
      >
        <source src={src} type="video/mp4" />
      </video>
    );
  }

  // Still generating: show poster/placeholder
  return (
    <img
      src={poster || 'data:image/gif;base64,R0lGODlhAQABAAAAACw='}
      alt={alt || ''}
      className={className}
      style={style}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
    />
  );
};

export default VideoFirstFrame;


