setTimeout(() => {
    const externalLinks = document.querySelectorAll("li[class*='external-link::']")

    for (let i = 0; i < externalLinks.length; i++) {
        const classNames = externalLinks[i].className;
        const url = classNames.split('::')[1];
        
        const link = externalLinks[i];
        const text = link.children[0].innerHTML;
        link.innerHTML = `<a class="menu__link" href="${url.startsWith('http') ? url : 'https://' + url}" target="_blank" rel="noopener noreferrer">${text}</a>`;
    }
}, 1000);