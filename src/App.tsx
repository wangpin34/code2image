import '@radix-ui/colors/purple-alpha.css';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { useEffect, useState } from 'react';
import Actions from './Actions';
import "./App.css";
import Frame from './Frame';
import { Language, SetterProvider, ValueProvider } from './context';


function App({initShow}: {initShow?: boolean}) {
  const [show, setShow] = useState(initShow)
  const [language, setLanguage] = useState<Language>()
  const [fontSize, setFontSize] = useState<number>(15)

  useEffect(() => {
    if (import.meta.env.PROD) {
      chrome.runtime.onMessage.addListener(function (request, _ /*sender*/, sendResponse) {
      console.log(`got request type=${request.type}`)
      if (request.type === 'switch') {
        sendResponse({
          received: true,
        })
        setShow(v => {
          const next = !v
          chrome.runtime.sendMessage({ type: next ? 'show' : 'hidden' })
          return next
        })
        
      }
    })
    }
    
  }, [])


  return (
      <Theme accentColor='violet' grayColor='gray'  appearance='dark'>
        <SetterProvider value={{setLanguage, setFontSize}}>
          <ValueProvider value={{language, fontSize}}>
            { show ? <div id="code-glam-app" className="p-4 dark w-fit shadow-2xl rounded-md fixed top-8 right-8">
              <Frame />
              <Actions />
            </div> : <></> }
      </ValueProvider>
      </SetterProvider>
      </Theme>
  );
}

export default App;
