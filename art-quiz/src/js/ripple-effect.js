//   ripple
const buttons = document.querySelectorAll('.ripple');

export function rippleFunc(e, button) {
    const x = e.clientX;
    const y = e.clientY;
    const buttonRipple = e.target.getBoundingClientRect();

    const buttonTop = buttonRipple.top;
    const buttonLeft = buttonRipple.left;

    const xInside = x - buttonLeft;
    const yInside = y - buttonTop;

    const circle = document.createElement('span');
    circle.classList.add('circle');
    circle.style.top = yInside + 'px';
    circle.style.left = xInside + 'px';

    button.append(circle);

    setTimeout(() => circle.remove(), 500);
}

buttons.forEach(button => {
    button.addEventListener('click', e => {
        rippleFunc(e, button);
    });
});
