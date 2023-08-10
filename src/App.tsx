import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import hljs from "highlight.js";
import 'highlight.js/styles/a11y-dark.css';
import { useCallback, useEffect, useState } from "react";
import Actions from './Actions';
import "./App.css";

function App() {
  const [code, setCode] = useState("");
  const [formtedCode, setFormtedCode] = useState("");

  const onInput = useCallback((e: React.FormEvent<HTMLTextAreaElement>) => {
    const ta = e.target as HTMLTextAreaElement
    ta.style.height = ta.scrollHeight + 'px'
  }, [])
  
  useEffect(() => {
    const html = hljs.highlight(code, {language: 'javascript'}).value
    setFormtedCode(html);
  }, [code])



  return (
    <Theme appearance='dark'>
    <div className="frame" data-theme="dark">
      <div className="frame-window">
        <div className="editor">
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
            dangerouslySetInnerHTML={{ __html: formtedCode }}
          ></div>
        </div>
      </div>
    </div>
     <Actions />
    </Theme>
  );
}

export default App;
