console.log('elo');

const button = document.getElementById('btn');
button.addEventListener('click', () => {
    const square = document.querySelector('a-box');
    square.setAttribute('position', {x: 1, y: 2, z: -3});
})
