import { useState, useEffect, useMemo } from "react";
import YouTube, { YouTubeProps } from "react-youtube";

export default function Example() {
  const options = [
    {
      title: "The Kiss of Venus",
      artist: "Dominic Fike",
      id: "L2IJzVAOvaU",
    },
    {
      title: "Dreams Tonite",
      artist: "Alvvays",
      id: "ZXu6q-6JKjA",
    },
    {
      title: "That I Miss You",
      artist: "Vansire",
      id: "CG-Qco4zs_s",
    },
    {
      title: "Show Me How",
      artist: "Men I Trust",
      id: "OZRYzH0Q0pU",
    },
    {
      title: "WUSYANAME",
      artist: "Tyler, The Creator",
      id: "NJea386275c",
    },
    {
      title: "Freelance",
      artist: "Toro y Moi",
      id: "Jm6hDWBZXc4",
    },
    {
      title: "グッドバイ",
      artist: "toe",
      id: "e1pZIfretEs",
    },
    {
      title: "Bad Habit",
      artist: "Steve Lacy",
      id: "VF-FGf_ZZiI",
    },
    {
      title: "Peroxide",
      artist: "Ecco2k",
      id: "Rs_kavGKeHI",
    },
    {
      title: "Danielle",
      artist: "Fred again..",
      id: "gVBcX1Sd228",
    },
    {
      title: "Always",
      artist: "Babygirl",
      id: "xzksOwHDkUQ",
    },
    {
      title: "Victim",
      artist: "Drain Gang",
      id: "HDajKZ3ytdY",
    },
    {
      title: "Kyoto",
      artist: "Phoebe Bridgers",
      id: "Tw0zYd0eIlk",
    },
    {
      title: "Jackie",
      artist: "Yves Tumor",
      id: "bQpaWvPFx8A",
    },
    {
      title: "Bags",
      artist: "Clairo",
      id: "Da3FBTjOwVM",
    },
  ];

  const [currentVideo, setCurrentVideo] = useState(null);
  const currentVideoTitle = useMemo(
    () => options.find((video) => video.id === currentVideo)?.title,
    [currentVideo]
  );

  const [progress, setProgress] = useState(0);

  const [youtubePlayerRef, setYoutubePlayerRef] = useState(null);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    event.target.playVideo();
    setIsPlaying(true);
    setYoutubePlayerRef(event.target);
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const playOrPause = () => {
    if (youtubePlayerRef) {
      const playerState = youtubePlayerRef.getPlayerState();

      if (playerState === 1) {
        youtubePlayerRef.pauseVideo();
        setIsPlaying(false);
      } else {
        youtubePlayerRef.playVideo();
        setIsPlaying(true);
      }
    }
  };

  const opts: YouTubeProps["opts"] = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  const [videoEndedThrottle, setVideoEndedThrottle] = useState(true);

  const [progressInterval, setProgressInterval] = useState(null);
  const updateProgress = (event) => {
    if (progressInterval) {
      clearInterval(progressInterval);
    }

    const interval = setInterval(() => {
      const duration = event.target.getDuration();
      const currentTime = event.target.getCurrentTime();
      const progress = (currentTime / duration) * 100;
      setProgress(progress);
    }, 100);
    setProgressInterval(interval);
  };

  const previousVideo = () => {
    const thisVideo = options.find((video) => video.id === currentVideo);
    const thisVideoIndex = options.indexOf(thisVideo);
    const previousVideo = options[thisVideoIndex - 1];
    if (previousVideo) {
      setCurrentVideo(previousVideo.id);
    } else {
      setCurrentVideo(options[options.length - 1].id);
    }
    playOrPause();
  };

  const nextVideo = () => {
    const thisVideo = options.find((video) => video.id === currentVideo);
    const thisVideoIndex = options.indexOf(thisVideo);
    const nextVideo = options[thisVideoIndex + 1];
    if (nextVideo) {
      setCurrentVideo(nextVideo.id);
    } else {
      setCurrentVideo(options[0].id);
    }
    playOrPause();
  };

  const onStateChange: YouTubeProps["onStateChange"] = (event) => {
    if (event.data === 0) {
      if (videoEndedThrottle) {
        nextVideo();
        setVideoEndedThrottle(false);
        setTimeout(function () {
          setVideoEndedThrottle(true);
        }, 100);
      }
    }

    if (event.data === 1) {
      updateProgress(event);
    }

    if (event.data === 3) {
      // setPlayerIsReady(false);
    }
  };

  return (
    <>
      <div
        className="opacity-0 fixed top-0 left-0 pointer-events-none"
        key={currentVideo}
      >
        {currentVideo && (
          <YouTube
            videoId={currentVideo}
            opts={opts}
            onReady={onPlayerReady}
            onStateChange={onStateChange}
          />
        )}
      </div>

      {/* Previous and Next */}
      <div
        className={`rounded-l-lg bg-[rgba(255,255,255,.5)] overflow-hidden z-50 fixed bottom-24 right-0 flex justify-between items-center w-[max-content] gap-3 px-4 py-5 ${
          isPlaying ? "opacity-100" : "opacity-25"
        } hover:opacity-100`}
        style={{
          transition: "opacity 250ms ease",
        }}
      >
        {currentVideo ? (
          <>
            <div className="flex flex-col gap-1" onClick={playOrPause}>
              <p className="leading-none text-gray-700 text-2xl font-serif font-semibold cursor-pointer">
                {currentVideoTitle}
              </p>
              <p className="leading-none text-gray-700 text-base font-serif font-light cursor-pointer">
                by {options.find((video) => video.id === currentVideo)?.artist}
              </p>
            </div>
            <div className="h-10 flex flex-col justify-center">
              <span
                className="text-gray-700 leading-none font-light cursor-pointer h-5"
                onClick={() => {
                  previousVideo();
                }}
              >
                &larr;
              </span>
              <span
                className="text-gray-700 leading-none font-light cursor-pointer h-5"
                onClick={() => {
                  nextVideo();
                }}
              >
                &rarr;
              </span>
            </div>
            <span
              style={{
                width: `${progress}%`,
                backgroundColor: `rgba(0,0,0,.2)`,
                zIndex: -1,
              }}
              className="absolute bottom-0 left-0 h-full rounded-l-lg"
            />
          </>
        ) : (
          <p
            onClick={() => {
              setCurrentVideo(options[0].id);
            }}
            className="leading-none text-black text-2xl font-serif font-semibold cursor-pointer"
          >
            Jam with me
          </p>
        )}
      </div>
    </>
  );
}
