import { useState, useEffect } from "react";
import hljs  from "highlight.js"
import 'highlight.js/styles/a11y-dark.css'
import "./App.css";

function App() {
  const [code, setCode] = useState("");
  const [formtedCode, setFormtedCode] = useState("");
  useEffect(() => {
    const html = hljs.highlight(code, {language: 'javascript'}).value
    setFormtedCode(html);
  }, [code]);
  return (
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
          />
          <div
            className="editor-formatted hljs"
            dangerouslySetInnerHTML={{ __html: formtedCode }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default App;
