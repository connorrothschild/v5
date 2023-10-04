import React, { useState, useEffect, useCallback } from "react";
import Option from "./Option";
import Script from "next/script";

const OptionsPage = () => {
  const [currentVideo, setCurrentVideo] = useState();
  const [currentVideoTitle, setCurrentVideoTitle] = useState();
  const [styles, setStyles] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const [anyHovered, setAnyHovered] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [closedViaX, setClosedViaX] = useState(false);

  useEffect(() => {
    setExpanded(expanded);
  }, [expanded]);

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

  useEffect(() => {
    setCurrentVideoTitle(
      currentVideo
        ? options.find((video) => video.id === currentVideo).title
        : null
    );
  }, [currentVideo]);

  const [playerIsReady, setPlayerIsReady] = useState(false);

  //   const onStateChange = useCallback((event) => {
  //     alert("yo");
  //     if (event.data === 0) {
  //       if (videoEndedThrottle) {
  //         nextVideo();
  //         setVideoEndedThrottle(false);
  //         setTimeout(function () {
  //           setVideoEndedThrottle(true);
  //         }, 100);
  //       }
  //     }

  //     if (event.data === 1) {
  //       updateProgress();
  //       setPlayerIsReady(true);
  //     }

  //     if (event.data === 3) {
  //       setPlayerIsReady(false);
  //     }
  //   }, []);

  const [progress, setProgress] = useState(0);
  const [youTubePlayer, setYouTubePlayer] = useState();
  const kickoff = () => {
    const onReady = () => {
      setPlayerIsReady(true);
    };

    const updateProgress = (e) => {
      if (!youTubePlayer) return;
      console.log(e);
      setInterval(() => {
        const currentTime = youTubePlayer?.getCurrentTime();
        const duration = youTubePlayer?.getDuration();
        const progress = (currentTime / duration) * 100;
        console.log("trig");
        setProgress(progress);
      }, 1000);
    };

    const onStateChange = (event) => {
      if (!youTubePlayer) return;
      console.log(event);
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
        setPlayerIsReady(true);
        updateProgress();
      }

      if (event.data === 3) {
        setPlayerIsReady(false);
      }
    };

    const onYouTubePlayerAPIReady = () => {
      const yt = new YT.Player("player", {
        playerVars: {
          controls: 0,
          modestbranding: 1,
          playsinline: 1,
          disablekb: 1,
          iv_load_policy: 3,
        },
        events: {
          onReady: onReady,
          onStateChange: onStateChange,
          onError: onError,
        },
      });
      setYouTubePlayer(yt);
    };

    window.onYouTubePlayerAPIReady = onYouTubePlayerAPIReady;
    console.log("cretaed");

    return () => {
      // Clean up the YouTube player here if necessary
    };
  };

  useEffect(() => {
    kickoff();
  }, []);

  useEffect(() => {
    if (currentVideo && youTubePlayer) {
      youTubePlayer.loadVideoById({ videoId: currentVideo });
    }
  }, [currentVideo, youTubePlayer]);

  const [paused, setPaused] = useState(false);

  const playOrPause = (paused) => {
    if (!youTubePlayer) return;
    if (paused) {
      youTubePlayer.pauseVideo();
    } else {
      youTubePlayer.playVideo();
    }
  };

  useEffect(() => {
    playOrPause(paused);
  }, [paused]);

  const nextVideo = () => {
    const thisVideo = options.find((video) => video.id === currentVideo);
    const thisVideoIndex = options.indexOf(thisVideo);
    const nextVideo = options[thisVideoIndex + 1];
    if (nextVideo) {
      setCurrentVideo(nextVideo.id);
    } else {
      setCurrentVideo(options[0].id);
    }
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
  };

  const [videoEndedThrottle, setVideoEndedThrottle] = useState(true);

  const onError = () => {};

  return (
    <>
      <Script src="https://www.youtube.com/iframe_api" />
      <div
        className={`fixed z-10 flex flex-col items-start justify-center ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } bg-primary-color transition-opacity duration-500 ease-in-out h-screen overflow-y-auto`}
        style={{ height: "100vh", width: "100vw" }}
      >
        <div
          className={`video ${
            playerIsReady && currentVideo && !paused ? "playing" : ""
          }`}
        >
          <div id="player" />
        </div>
        {/* <ul
          className="flex flex-col justify-start w-full h-full py-20"
          onMouseLeave={() => {
            setHovered(null);
            setAnyHovered(false);
          }}
        >
          {options.map((option) => (
            <Option
              key={option.id}
              expanded={expanded}
              setExpanded={setExpanded}
              anyHovered={anyHovered}
              setAnyHovered={setAnyHovered}
              hovered={hovered}
              setHovered={setHovered}
              closedViaX={closedViaX}
              currentVideo={currentVideo}
              setCurrentVideo={setCurrentVideo}
              paused={paused}
              setPaused={setPaused}
              id={option.id}
              title={option.title}
              artist={option.artist}
            />
          ))}
        </ul> */}

        {/* Previous and Next */}
        <div className="fixed bottom-12 right-0 flex justify-between items-center w-[max-content] gap-4 px-8">
          <span
            className="text-white text-2xl font-bold"
            onClick={() => {
              previousVideo();
            }}
          >
            &larr;
          </span>
          <p className="text-white text-2xl font-serif font-semibold">
            {currentVideoTitle || "Play"}
          </p>

          <span
            style={{
              width: `${progress}%`,
              backgroundColor: `white`,
            }}
            className="absolute top-0 left-0 h-1"
          />

          <span
            className="text-white text-2xl font-bold"
            onClick={() => {
              nextVideo();
            }}
          >
            &rarr;
          </span>
        </div>
      </div>
    </>
  );
};

export default OptionsPage;
