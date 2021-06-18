import { useRef, useEffect } from 'react'
import videojs from "video.js";
import "video.js/dist/video-js.css";

const VideoPlayer = ({ video }) => {
  const videoRef = useRef();

  const { id, url, thumbnailImage } = video;

  useEffect(() => {
    const vjsPlayer = videojs(videoRef.current);

    vjsPlayer.poster(thumbnailImage);
    vjsPlayer.src(url);

    vjsPlayer.on("ended", () => {
      console.log('The video has ended');
    });
  }, [id, thumbnailImage, url]);

  return (
    <div data-vjs-player>
      <video
        controls
        ref={videoRef}
        className="video-js vjs-fluid vjs-big-play-centered"
      ></video>
    </div>
  );
}

export default VideoPlayer;