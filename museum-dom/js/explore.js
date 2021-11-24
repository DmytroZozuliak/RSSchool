// Explore section

export function initComparisons() {
  const slider = document.querySelector('#oneSlide-change');
  const before = slider.querySelector('#beforeSlider');
  const change = slider.querySelector('.explore__line-slider');

  let isActive = false;

  function beforeAfterSlider(x) {
    let shift = Math.max(0, Math.min(x, slider.offsetWidth));
    before.style.width = `${shift}px`;
    change.style.left = `${shift}px`;
  }

  function pauseEvents(e) {
    e.stopPropagation();
    e.preventDefault();
    return false;
  }

  change.addEventListener('mousedown', () => {
    isActive = true;
  });

  window.addEventListener('mouseup', () => {
    isActive = false;
  });

  window.addEventListener('mouseleave', () => {
    isActive = false;
  });

  window.addEventListener('mousemove', e => {
    if (!isActive) {
      return;
    }

    let x = e.pageX;

    x -= slider.getBoundingClientRect().left;
    beforeAfterSlider(x);
  });

  change.addEventListener(
    'touchstart',
    () => {
      isActive = true;
    },
    { passive: true }
  );

  window.addEventListener('touchend', () => {
    isActive = false;
  });

  window.addEventListener('touchcancel', () => {
    isActive = false;
  });

  window.addEventListener('touchmove', e => {
    if (!isActive) {
      return;
    }

    for (const shift of e.changedTouches) {
      let x = shift.pageX - slider.getBoundingClientRect().left;
      beforeAfterSlider(x);
    }
  });
}
