const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const thumbnailsDir = "public/images/screens";
const compressedDir = "public/images/blurred-screens";

fs.readdir(thumbnailsDir, (err, files) => {
  if (err) {
    console.error("Error reading the thumbnails directory", err);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(thumbnailsDir, file);
    const compressedFilePath = path.join(compressedDir, file);

    sharp(filePath)
      .webp({ quality: 70 })
      .blur(100)
      .toFile(compressedFilePath, (err) => {
        if (err) {
          console.error(`Error creating compressed image for ${file}:`, err);
        } else {
          console.log(`Compressed image created for ${file}`);
        }
      });
  });
});
