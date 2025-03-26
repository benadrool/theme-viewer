document.getElementById('getTheme').addEventListener('click', () => {
    const fileInput = document.getElementById('imageUpload');
    if (!fileInput.files.length) return alert('Please upload an image.');
    
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.src = event.target.result;
        img.onload = function() {
            extractColors(img);
        };
    };
    reader.readAsDataURL(file);
});

document.getElementById('resetTheme').addEventListener('click', () => {
    document.getElementById('colorPreview').innerHTML = '';
});

function extractColors(img) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 100;
    canvas.height = 100;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const colors = {};
    
    for (let i = 0; i < pixels.length; i += 4 * 10) {
        let r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];
        let key = `${r},${g},${b}`;
        colors[key] = (colors[key] || 0) + 1;
    }
    
    const sortedColors = Object.entries(colors)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(c => `rgb(${c[0]})`);
    
    applyTheme(sortedColors);
}

function applyTheme(colors) {
    const colorPreview = document.getElementById('colorPreview');
    colorPreview.innerHTML = '';
    
    colors.forEach(color => {
        const div = document.createElement('div');
        div.className = 'w-20 h-20 rounded shadow-md';
        div.style.backgroundColor = color;
        colorPreview.appendChild(div);
    });
}
