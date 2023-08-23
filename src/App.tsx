import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import hljs from "highlight.js";
import 'highlight.js/styles/a11y-dark.css';
import { useCallback, useEffect, useState } from "react";
import Actions from './Actions';
import "./App.css";
import { Language, SetterProvider, ValueProvider, useFontSize, useLanguage } from './context';

function Frame() {
  const language = useLanguage()
  const fontSize = useFontSize()
  const [code, setCode] = useState("");
  const [formattedCode, setFormattedCode] = useState("")
    const onInput = useCallback((e: React.FormEvent<HTMLTextAreaElement>) => {
    const ta = e.target as HTMLTextAreaElement
    ta.style.height = ta.scrollHeight + 'px'
  }, [])

  // useEffect(() => {
  //   hljs.registerLanguage(language, require(`highlight.js/lib/languages/${language}`));
  // }, [language])
  
  useEffect(() => {
    if (!(code && code.trim())) return
    let html: string
    if (language) {
      html = hljs.highlight(code, { language: language}).value
    } else {
      html = hljs.highlightAuto(code).value

    }
    setFormattedCode(html);
    
  }, [code, language])

  const editorStyle = { '--editor-font-size': fontSize + 'px'}

 return (
      <div className="frame" data-theme="dark">
      <div className="frame-window">
        <div className="editor" style={editorStyle as React.CSSProperties}>
          <textarea
            value={code}
            tabIndex={-1}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            autoCapitalize="off"
            onChange={(e) => setCode(e.target.value)}
            onInput={e => onInput(e)}
          />
          <div
            className="editor-formatted hljs"
            dangerouslySetInnerHTML={{ __html: formattedCode }}
          ></div>
        </div>
      </div>
    </div>
 )
}




function App() {
  const [show, setShow] = useState(false)
  const [language, setLanguage] = useState<Language>()
  const [fontSize, setFontSize] = useState<number>(15)

  useEffect(() => {
    chrome.runtime.onMessage.addListener(function (request, _ /*sender*/, sendResponse) {
      console.log(`got resquest type=${request.type}`)
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
  }, [])


  return (
    <Theme appearance='dark'>
      <SetterProvider value={{setLanguage, setFontSize}}>
        <ValueProvider value={{language, fontSize}}>
          { show ? <>
            <Frame />
            <Actions />
          </> : null }
     </ValueProvider>
     </SetterProvider>
    </Theme>
  );
}

export default App;
