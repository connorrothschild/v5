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

    ffmpeg(videoPath)
      .frames(1)
      .on("end", () => {
        console.log(`Thumbnail created for ${file}`);
      })
      .on("error", (err) => {
        console.error(`Error processing ${file}:`, err);
      })
      .save(thumbnailPath);
  });
});
