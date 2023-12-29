const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");

const videosDir = "./public/videos";
const thumbnailsDir = "./public/images/thumbnails";

fs.readdir(videosDir, (err, files) => {
  if (err) {
    console.error("Error reading the videos directory", err);
    return;
  }

  files.forEach((file) => {
    const videoPath = `${videosDir}/${file}`;
    const thumbnailPath = `${thumbnailsDir}/${file.split(".")[0]}.jpg`;

    ffmpeg.ffprobe(videoPath, (err, metadata) => {
      if (!metadata) {
        console.error(`Error getting metadata for file: ${file}`);
        return;
      }

      console.log(metadata);
      let meta = metadata.streams[0];
      let ratio = meta.display_aspect_ratio.split(":");
      ratio = ratio[0] / ratio[1];
      let width = Math.round(meta.height * ratio);
      let height = meta.height;

      ffmpeg(videoPath).screenshots({
        timestamps: ["0.10"],
        filename: file.split(".")[0] + ".jpg",
        folder: thumbnailsDir,
        size: width + "x" + height,
      });

      // ffmpeg(videoPath)
      //   // Ensure video has an aspect ratio of 1.5
      //   .size(`${width}x${height}`)
      //   .frames(1)
      //   .on("end", () => {
      //     console.log(`Thumbnail created for ${file}`);
      //   })
      //   .on("error", (err) => {
      //     console.error(`Error processing ${file}:`, err);
      //   })
      //   .save(thumbnailPath);
    });
  });
});
