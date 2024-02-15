
const cardText = document.querySelector('.card-text');
document.addEventListener('DOMContentLoaded', function() {
    const arr = Product.colorsAvailable;
    console.log(arr);
    for(let i = 0; i < arr.length; i++){
        const clr = document.createElement('div');
        clr.className = 'clr';
        clr.style.backgroundColor = arr[i];
        cardText.appendChild(clr);
    }
    console.log('DOM fully loaded and parsed');
});
