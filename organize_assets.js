const fs = require('fs');
const path = require('path');

const baseDir = 'c:\\Users\\Admin\\Downloads\\Assured-contract-farming\\client\\public\\assets';
const cropsDir = path.join(baseDir, 'crops');
const paymentsDir = path.join(baseDir, 'payments');

if (!fs.existsSync(cropsDir)) fs.mkdirSync(cropsDir, { recursive: true });
if (!fs.existsSync(paymentsDir)) fs.mkdirSync(paymentsDir, { recursive: true });

const filesToMove = [
    { src: 'basmati rice.jpg', dest: path.join(cropsDir, 'basmati_rice.jpg') },
    { src: 'cotton.jpg', dest: path.join(cropsDir, 'cotton.jpg') },
    { src: 'ms.jpg', dest: path.join(cropsDir, 'mustard_seeds.jpg') },
    { src: 'sb.jpg', dest: path.join(cropsDir, 'soybean.jpg') },
    { src: 'sugarcane.jpg', dest: path.join(cropsDir, 'sugarcane.jpg') },
    { src: 'Image-023_10_48_48.jpg', dest: path.join(paymentsDir, 'qr_code.jpg') }
];

filesToMove.forEach(file => {
    const srcPath = path.join(baseDir, file.src);
    if (fs.existsSync(srcPath)) {
        fs.renameSync(srcPath, file.dest);
        console.log(`Moved ${file.src} to ${file.dest}`);
    } else {
        console.log(`Source file ${srcPath} does not exist`);
    }
});
