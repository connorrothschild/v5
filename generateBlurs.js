const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const thumbnailsDir = "public/images/thumbnails";
const compressedDir = "public/images/blurs";

fs.readdir(thumbnailsDir, (err, files) => {
  if (err) {
    console.error("Error reading the thumbnails directory", err);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(thumbnailsDir, file);
    const compressedFilePath = path.join(compressedDir, file);

    sharp(filePath)
      .blur(10)
      .jpeg({ quality: 10 }) // Adjust quality for compression. Lower means more compression
      .toFile(compressedFilePath, (err) => {
        if (err) {
          console.error(`Error creating compressed image for ${file}:`, err);
        } else {
          console.log(`Compressed image created for ${file}`);
        }
      });
  });
});
