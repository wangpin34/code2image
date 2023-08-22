chrome.action.onClicked.addListener((tab) => {
  console.log(`action got clicked within tab[${tab.id}]`)
  chrome.tabs.sendMessage(tab.id as number, { type: 'enable' }, function (response) {
    console.log(`got response from tab[${tab.id}]`)
    if (response) {
      console.log(response)
    }
  })
})