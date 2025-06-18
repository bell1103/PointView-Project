import React, { useRef, useEffect, useState } from 'react';

function VideoThumbnail({ videoUrl, defaultImage }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [thumbnail, setThumbnail] = useState(defaultImage);

  useEffect(() => {
    if (!videoUrl) return;

    const video = document.createElement('video');
    video.src = videoUrl;
    video.crossOrigin = 'anonymous';

    video.addEventListener('loadeddata', () => {
      video.currentTime = 1; // seek to 1 second
    });

    video.addEventListener('seeked', () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      setThumbnail(canvas.toDataURL('image/png'));
    });

    video.load();
  }, [videoUrl, defaultImage]);

  return <img src={thumbnail} alt="Video thumbnail" className="video-thumb" />;
}
export default VideoThumbnail;
