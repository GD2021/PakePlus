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
(function() {
  window.addEventListener('DOMContentLoaded', function() {
    // 移除广告DOM元素
    var adSelectors = [
      'div[data-adext]',
      '.youku-advertise-layer',
      '.advertise-layer',
      '.ad-wrap:not(#google_ads_iframe_checktag)',
      '#player-advertise'
    ];
    adSelectors.forEach(function(selector) {
      var elements = document.querySelectorAll(selector);
      elements.forEach(function(el) {
        el.remove();
      });
    });

    // 阻止特定资源加载
    var scripts = document.querySelectorAll('script[src]');
    scripts.forEach(function(script) {
      if (
        script.src.includes('gm.mmstat.com/yt/youku.pcweb.control') ||
        script.src.includes('fourier.taobao.com/rp') ||
        script.src.includes('g.alicdn.com/AWSC/et/1.82.2/et_f.js')
      ) {
        script.remove();
      }
    });

    var imgs = document.querySelectorAll('img[src]');
    imgs.forEach(function(img) {
      if (img.src.includes('acg.youku.com/webfile/IX5p5Aajvbq1bOVNR7rCKo8jZKCClTmr.jpg')) {
        img.remove();
      }
    });

    var links = document.querySelectorAll('link[href]');
    links.forEach(function(link) {
      if (link.href.includes('mmstat.com')) {
        link.remove();
      }
    });
  });
})();
// end 2.js
