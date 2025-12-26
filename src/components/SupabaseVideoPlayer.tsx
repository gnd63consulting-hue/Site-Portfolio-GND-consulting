import React, { useRef, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { getSupabaseFileUrl } from '../lib/supabase';

interface SupabaseVideoPlayerProps {
  fileName: string;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  bucket?: string;
}

export function SupabaseVideoPlayer({ 
  fileName, 
  isOpen, 
  onClose, 
  title,
  bucket = 'portfolio-videos' // bucket par défaut
}: SupabaseVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  const videoUrl = getSupabaseFileUrl(bucket, fileName);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.load();
    }
  }, [isOpen, fileName]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!isFullscreen) {
        videoRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const time = parseFloat(e.target.value);
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="relative w-full max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white text-xl font-bold">{title || 'Vidéo GND Consulting'}</h3>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-red-500/20 hover:bg-red-500/30 rounded-full flex items-center justify-center transition-all duration-300 border border-red-500/30"
          >
            <X className="w-5 h-5 text-red-400" />
          </button>
        </div>

        {/* Video Container */}
        <div className="glass rounded-2xl overflow-hidden border border-[#20C2A3]/30 shadow-[0_0_50px_rgba(32,194,163,0.3)] bg-black relative group">
          <video
            ref={videoRef}
            className="w-full aspect-video"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            controls={false}
            preload="metadata"
          >
            <source src={videoUrl} type="video/mp4" />
            <source src={videoUrl} type="video/mp4" />
            Votre navigateur ne supporte pas la lecture vidéo.
          </video>

          {/* Contrôles personnalisés */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {/* Barre de progression */}
            <div className="mb-4">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #20C2A3 0%, #20C2A3 ${(currentTime / duration) * 100}%, #4B5563 ${(currentTime / duration) * 100}%, #4B5563 100%)`
                }}
              />
            </div>

            {/* Contrôles */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 bg-[#20C2A3]/20 hover:bg-[#20C2A3]/40 rounded-full flex items-center justify-center transition-all duration-300 border border-[#20C2A3]/30"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-[#20C2A3]" />
                  ) : (
                    <Play className="w-5 h-5 text-[#20C2A3] ml-0.5" />
                  )}
                </button>

                <button
                  onClick={toggleMute}
                  className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-white" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-white" />
                  )}
                </button>

                <div className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>

              <button
                onClick={toggleFullscreen}
                className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300"
              >
                <Maximize className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Play button overlay */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={togglePlay}
                className="w-20 h-20 bg-[#20C2A3]/90 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-[#20C2A3]"
              >
                <Play className="w-8 h-8 text-black ml-1" />
              </button>
            </div>
          )}
        </div>

        {/* Effet de lueur */}
        <div className="absolute -inset-4 bg-gradient-to-r from-[#20C2A3]/20 via-blue-500/20 to-[#20C2A3]/20 rounded-3xl blur-xl opacity-50 animate-pulse -z-10"></div>
      </div>
    </div>
  );
}