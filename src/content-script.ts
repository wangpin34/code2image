let htmlURL = chrome.runtime.getURL('index.html')
if (import.meta.env.DEV) {
  htmlURL = 'http://localhost:5173'
}

const iframe = document.createElement('iframe')
iframe.id = 'code-glam-iframe'
iframe.src = htmlURL
iframe.style.visibility = 'hidden'
document.body.parentElement?.appendChild(iframe)
iframe.onload = function () {
  console.info('Previewer frame loaded. \nTry loading Code Glam ...')
}

chrome.runtime.onMessage.addListener(function (request, _ /*sender*/, sendResponse) {
  console.log(`got resquest type=${request.type}`)
  if (request.type === 'enable') {
    sendResponse({
      received: true,
    })
    iframe.style.visibility = 'visible'
    chrome.runtime.sendMessage({ type: 'enabled' })
  }
})