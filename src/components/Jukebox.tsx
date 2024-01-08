import { useState, useMemo } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { AnimatePresence, motion } from "framer-motion";
import { easeInOutQuint } from "@/config/eases";

export default function Jukebox({
  controllerIsVisible,
}: {
  controllerIsVisible: boolean;
}) {
  const options = [
    {
      title: "The Kiss of Venus",
      artist: "Dominic Fike",
      id: "L2IJzVAOvaU",
    },
    {
      title: "Doo Wop",
      artist: "JID",
      id: "cnYw1jxtDzI",
    },
    // {
    //   title: "Pattern064",
    //   artist: "Unknown",
    //   id: "2n1YQGT3Vvw",
    // },
    {
      title: "Dreams Tonite",
      artist: "Alvvays",
      id: "ZXu6q-6JKjA",
    },
    {
      title: "Coldhands",
      artist: "Oncle House",
      id: "0Itos0zfA3s",
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
      title: "Jasmine (Demo)",
      artist: "Jai Paul",
      id: "RWQMg56ZVZY",
    },
    {
      title: "Bags",
      artist: "Clairo",
      id: "Da3FBTjOwVM",
    },
  ];

  const [currentVideo, setCurrentVideo] = useState<string | null>(null);
  const currentVideoTitle = useMemo(
    () => options.find((video) => video.id === currentVideo)?.title,
    [currentVideo]
  );

  const [progress, setProgress] = useState(0);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    event.target.playVideo();
    setIsPlaying(true);
    setYoutubePlayerRef(event.target);
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const [youtubePlayerRef, setYoutubePlayerRef] = useState<any>(null);

  const playOrPause = () => {
    if (youtubePlayerRef) {
      const playerState = youtubePlayerRef?.getPlayerState();

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

  const [progressInterval, setProgressInterval] = useState<any>(null);
  const updateProgress = (event: any) => {
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
    const thisVideoIndex = options.indexOf(thisVideo || options[0]);
    const previousVideo = options[thisVideoIndex - 1];
    if (previousVideo) {
      setCurrentVideo(previousVideo.id);
    } else {
      setCurrentVideo(options[options.length - 1].id);
    }
    // playOrPause();
  };

  const nextVideo = () => {
    const thisVideo = options.find((video) => video.id === currentVideo);
    const thisVideoIndex = options.indexOf(thisVideo || options[0]);
    const nextVideo = options[thisVideoIndex + 1];
    if (nextVideo) {
      setCurrentVideo(nextVideo.id);
    } else {
      setCurrentVideo(options[0].id);
    }
    // playOrPause();
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
        className={`${
          controllerIsVisible && isPlaying
            ? "opacity-1 fixed top-1/2 left-1/2 z-30 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 delay-1000"
            : "opacity-0 fixed top-0 left-0 pointer-events-none"
        } transition-opacity duration-1000 ease-in-out rounded-xl overflow-hidden`}
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

      {/* Controller */}
      <div
        className={`${
          controllerIsVisible
            ? "opacity-100 duration-500"
            : "opacity-0 duration-100 pointer-events-none"
        } fixed bottom-0 right-0 z-50 px-4 py-5 transition-opacity ease-in-out`}
        style={{
          transitionDelay: controllerIsVisible ? "2500ms" : "0ms",
        }}
      >
        <AnimatePresence>
          {currentVideo && isPlaying ? (
            <motion.div
              key={currentVideoTitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.25 } }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ ease: easeInOutQuint }}
              // bg-[rgba(0,0,0,.5)]
              className={`rounded-tl-lg overflow-hidden z-50 fixed bottom-0 right-0 flex justify-between items-center w-[max-content] gap-3 px-4 py-5 ${
                isPlaying ? "opacity-100" : "opacity-25"
              } hover:opacity-100`}
              style={{
                transition: "opacity 250ms ease",
              }}
            >
              <div className="flex flex-col gap-1" onClick={playOrPause}>
                <p className="leading-none text-gray-300 text-2xl font-serif font-semibold cursor-pointer">
                  {currentVideoTitle}
                </p>
                <p className="leading-none text-gray-300 text-base font-serif font-light cursor-pointer">
                  by{" "}
                  {options.find((video) => video.id === currentVideo)?.artist}
                </p>
              </div>
              <div className="h-10 flex flex-col justify-center">
                <span
                  className="text-gray-200 leading-none font-light cursor-pointer h-5"
                  onClick={() => {
                    previousVideo();
                  }}
                >
                  &larr;
                </span>
                <span
                  className="text-gray-200 leading-none font-light cursor-pointer h-5"
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
                className="absolute bottom-0 left-0 h-full rounded-tl-lg"
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
        <AnimatePresence>
          {(!currentVideo || !isPlaying) && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.25 } }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ ease: easeInOutQuint }}
              onClick={() => {
                if (!currentVideo) {
                  setCurrentVideo(options[0].id);
                } else {
                  playOrPause();
                }
              }}
              className="leading-none text-white text-2xl font-sans cursor-pointer absolute bottom-0 right-0 z-50 px-4 py-5"
            >
              ♫
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
                />
              </svg> */}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
