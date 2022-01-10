let blurElemsList = [];

// blur all siblings and every parent el on the page, except direct parents of the selected element
function blurElem(el) {
  if (!el.parentElement) { return }
  if (el.parentElement.childElementCount) {
    const siblings = [...el.parentElement.children].filter(child => child.nodeType === 1 && child !== el)
    siblings.forEach(sibling => {
      sibling.style.filter = 'blur(5px)';
      blurElemsList.push(sibling);
    })
  }
  blurElem(el.parentElement)
}

function unBlurElems() {
  if (blurElemsList.length) {
    blurElemsList.forEach(elem => elem.style.filter = 'blur(0)');
    blurElemsList = [];
  }
}

document.addEventListener('click', function (evt) {
  if (!blurElemsList.length) {
    blurElem(evt.target);
  } else {
    unBlurElems();
  }
}, false);

