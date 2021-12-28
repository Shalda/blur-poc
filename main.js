let selectedElem;
const closeBtn = document.querySelector('.close');
const modalElem = document.getElementById('myModal')
const getWindowSize = () => {
    const width = window.innerWidth || document.documentElement.clientWidth ||
        document.body.clientWidth;
    const height = window.innerHeight || document.documentElement.clientHeight ||
        document.body.clientHeight;
    return {width, height};
}
const toggleClass = (el, className) => {
    selectedElem = el;
    el.classList.toggle(className)
};
const calculateModalPosition = (el, windowSize) => {
    let position = {
        left: 5,
        top: 5
    }
    const elRect = el.getBoundingClientRect();
    const modalWidth = 350;
    const modalHeight = 400;
    console.log('elRect:', elRect, 'windowSize:', windowSize)
    if (!elRect || !windowSize) {
        return position
    }
    // enough space: right & bottom
    if ((windowSize.width - elRect.right) > modalWidth && (windowSize.height - elRect.top) > modalHeight) {
        position.left = elRect.right + 5;
        position.top = elRect.top;
        console.log('right & bottom')
        return position
    }
    // enough space: left & bottom
    if (elRect.left > modalWidth && (windowSize.height - elRect.top) > modalHeight) {
        position.left = elRect.left - modalWidth - 5;
        position.top = elRect.top;
        console.log('left & bottom')
        return position
    }
    // enough space:top
    if (elRect.top > modalHeight) {
        position.left = elRect.left;
        position.top = elRect.top - modalHeight - 5;
        console.log('top')
        return position
    }
    // enough space:bottom
    if ((windowSize.height - elRect.bottom) > modalHeight) {
        position.left = elRect.left;
        position.top = elRect.bottom + 5;
        console.log('bottom')
        return position
    }
    console.log('default')
    return position

}
const displayModal = (el) => {
    const modalPosition = calculateModalPosition(el, getWindowSize());
    if (modalElem.style.display === 'block') {
        modalElem.style.display = 'none';
        selectedElem = null;
    } else {
        modalElem.style.display = 'block';
        modalElem.style.left = modalPosition.left + 'px';
        modalElem.style.top = modalPosition.top + 'px';
    }
}
document.addEventListener('click', function (evt) {
    if (selectedElem && selectedElem !== evt.target || evt.target === closeBtn) {
        return
    }
    toggleClass(evt.target, 'selected');
    displayModal(evt.target);
}, false);
closeBtn.addEventListener('click', function (evt) {
   modalElem.style.display = 'none'
   selectedElem.classList.remove("selected");
   selectedElem = null
}, false);

