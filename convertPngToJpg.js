const fs = require("fs").promises;
const path = require("path");
const Sharp = require("sharp");

async function convertPNGtoJPG(directoryPath) {
  try {
    // Read all files in the directory
    const files = await fs.readdir(directoryPath);

    // Filter for PNG files
    const pngFiles = files.filter((file) =>
      file.toLowerCase().endsWith(".png")
    );

    console.log(`Found ${pngFiles.length} PNG files to convert`);

    // Process each PNG file
    for (const pngFile of pngFiles) {
      const pngPath = path.join(directoryPath, pngFile);
      const jpgPath = path.join(
        directoryPath,
        `${path.parse(pngFile).name}.jpg`
      );

      try {
        await Sharp(pngPath)
          .jpeg({
            quality: 90,
            mozjpeg: true,
          })
          .toFile(jpgPath);

        console.log(`Converted: ${pngFile} -> ${path.basename(jpgPath)}`);

        // Optionally, remove the original PNG file
        // await fs.unlink(pngPath);
      } catch (err) {
        console.error(`Error converting ${pngFile}:`, err.message);
      }
    }

    console.log("Conversion complete!");
  } catch (err) {
    console.error("Error reading directory:", err.message);
  }
}

// Check if directory path is provided as command line argument
const directoryPath = process.argv[2];

if (!directoryPath) {
  console.error("Please provide a directory path");
  process.exit(1);
}

// Run the converter
convertPNGtoJPG(directoryPath);
