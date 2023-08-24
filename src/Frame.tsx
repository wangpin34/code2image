import hljs from "highlight.js";
import 'highlight.js/styles/a11y-dark.css';
import React, { useCallback, useEffect, useState } from 'react';
import { useFontSize, useLanguage } from './context';

const defaultCode = `import React from 'react'
export default function App() {
  return <div>React is awesome</div>
}  
`

export default function Frame() {
  const language = useLanguage()
  const fontSize = useFontSize()
  const [code, setCode] = useState(defaultCode);
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
      <div className="frame p-64px" data-theme="dark">
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