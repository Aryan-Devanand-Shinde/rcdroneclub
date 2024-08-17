const productContainers = [...document.querySelectorAll('.product-container')];
const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
const preBtn = [...document.querySelectorAll('.pre-btn')];

productContainers.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;

    nxtBtn[i].addEventListener('click', () => {
        item.scrollLeft += containerWidth;
    })

    preBtn[i].addEventListener('click', () => {
        item.scrollLeft -= containerWidth;
    })
})

const options={
    bottom: '64px', // default: '32px'
  right: 'unset', // default: '32px'
  left: '32px', // default: 'unset'
  time: '0.5s', // default: '0.3s'
  mixColor: '#fff', // default: '#fff'
  backgroundColor: '#fff',  // default: '#fff'
  buttonColorDark: '#100f2c',  // default: '#100f2c'
  buttonColorLight: '#fff', // default: '#fff'
  saveInCookies: false, // default: true,
  label: '🌓', // default: ''
  autoMatchOsTheme: true // default: true
}

const darkmode = new Darkmode(options);
darkmode.showWidget();

// search 

function searchContent() {
  // Get the search query
  const query = document.getElementById('searchInput').value.toLowerCase();

  // Get all the content sections
  const sections = document.querySelectorAll('main, .product-container, footer, .card, .aboutus, .evnts, .team, .info_about_us, .product  ,body');

  // Remove previous highlights
  document.querySelectorAll('.highlight').forEach(el => {
      el.outerHTML = el.innerHTML;
  });

  // Helper function to recursively search and highlight text nodes
  function highlightTextNodes(node) {
      if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent.toLowerCase();
          if (text.includes(query)) {
              const regExp = new RegExp(query, 'gi');
              const span = document.createElement('span');
              span.innerHTML = node.textContent.replace(regExp, match => `<span class="highlight">${match}</span>`);
              node.parentNode.replaceChild(span, node);
          }
      } else if (node.nodeType === Node.ELEMENT_NODE && node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') {
          node.childNodes.forEach(highlightTextNodes);
      }
  }

  // Loop through sections and apply highlighting
  let found = false;
  sections.forEach(section => {
      section.childNodes.forEach(child => {
          highlightTextNodes(child);
          if (child.innerHTML && child.innerHTML.toLowerCase().includes(query)) {
              found = true;
          }
      });
  });

  if (!found) {
      alert('No results found!');
  }

  return false; // Prevent form submission
}

// Add CSS for highlighting
const style = document.createElement('style');
style.textContent = `
  .highlight {
      background-color: rgb(0, 128, 255);
  }
`;
document.head.appendChild(style);



