const fs = require('fs');
const path = require('path');

const baseDir = 'c:\\Users\\Admin\\Downloads\\Assured-contract-farming\\client\\public\\assets';

function move(src, dest) {
    const srcPath = path.isAbsolute(src) ? src : path.join(baseDir, src);
    const destPath = path.isAbsolute(dest) ? dest : path.join(baseDir, dest);

    if (fs.existsSync(srcPath)) {
        const destDir = path.dirname(destPath);
        if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
        fs.renameSync(srcPath, destPath);
        console.log(`Moved/Renamed: ${srcPath} -> ${destPath}`);
    } else {
        console.log(`Not found: ${srcPath}`);
    }
}

// Payments
move('scanner.jpg', 'payments/qr_code.jpg');
move('Image-023_10_48_48.jpg', 'payments/qr_code.jpg');

// Crops
const cropsDir = path.join(baseDir, 'crops');
move(path.join(cropsDir, 'basmati rice.jpg'), path.join(cropsDir, 'basmati_rice.jpg'));
move(path.join(cropsDir, 'ms.jpg'), path.join(cropsDir, 'mustard_seeds.jpg'));
move(path.join(cropsDir, 'sb.jpg'), path.join(cropsDir, 'soybean.jpg'));
move(path.join(cropsDir, 'soyabeans.jpg'), path.join(cropsDir, 'soybean.jpg'));
