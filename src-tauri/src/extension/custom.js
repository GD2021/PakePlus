/*
 * This file serves as a collection point for external JS and CSS dependencies.
 * It amalgamates these external resources for easier injection into the application.
 * Additionally, you can directly include any script files in this file
 * that you wish to attach to the application.
 */
console.log(
    '%cbuild from PakePlus： https://github.com/Sjj1024/PakePlus',
    'color:orangered;font-weight:bolder'
)

document.addEventListener('DOMContentLoaded', () => {
    const originalWindowOpen = window.open
    window.open = function (url, _, features) {
        return originalWindowOpen.call(window, url, '_self', features)
    }
    console.log('window.open has been overridden to open in the current page.')
})

document.addEventListener('DOMContentLoaded', () => {
    const targetNode = document.body
    // 配置观察选项
    const config = {
        childList: true,
        subtree: true,
    }
    const observer = new MutationObserver((mutationsList, observer) => {
        let htmlContent = document.documentElement.innerHTML
        console.log(
            'window.open has been overridden to open in the current page.'
        )
        for (const mutation of mutationsList) {
            if (
                mutation.type === 'childList' &&
                htmlContent.includes('_blank')
            ) {
                const links = document.querySelectorAll('a[target="_blank"]')
                links.forEach((link) => {
                    link.addEventListener('click', function (event) {
                        event.preventDefault()
                        window.location.href = link.href
                    })
                })
            }
        }
    })
    observer.observe(targetNode, config)
})
// 2.js
// List of CSS selectors to remove
const adSelectors = [
    'div[data-adext]',
    '.youku-advertise-layer',
    '.advertise-layer',
    '.ad-wrap:not(#google_ads_iframe_checktag)',
    '#player-advertise'
];

// Function to remove elements matching the selectors
function removeAds() {
    adSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.remove();
        });
    });
}

// Remove ads on initial load
removeAds();

// Set up MutationObserver to remove ads added dynamically
const observer = new MutationObserver(() => {
    removeAds();
});

// Configure the observer to watch for changes in the entire document
observer.observe(document.body, {
    childList: true,
    subtree: true
});
// end 2.js
