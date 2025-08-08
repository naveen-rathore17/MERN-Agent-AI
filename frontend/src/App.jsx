import "./App.css";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import { ToastContainer, toast } from 'react-toastify';
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [code, setCode] = useState(``);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  function reviewCode() {
    if (!code.trim()) {
      toast.warn("⚠️ Please paste some code first!");
      return;
    }

    toast.info("⏳ Please wait... Reviewing code");
    setLoading(true);

    // Axios request without try-catch
    axios.post("http://localhost:3001/ai/get-review", { code })
      .then((response) => {
        setReview(response.data);
     
      })
    
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <main>
        <div className="left">
          <h1 className="h1">
            Paste Your Code Here... Click <span> "Review"</span>
          </h1>

          <div className="code">
            <Editor
              value={code}
              onValueChange={setCode}
              highlight={(code) =>
                prism.highlight(code, prism.languages.js, "js")
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 14,
                border: "1px solid #ccc",
                borderRadius: "4px",
                height: "100%",
                width: "100%",
              }}
            />
          </div>

          <div
            className="review"
            onClick={!loading ? reviewCode : null}
            style={{
              background: loading
                ? "linear-gradient(135deg, #999, #666)"
                : "linear-gradient(135deg, #ff6b6b, #ff4757)",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Reviewing..." : "Review"}
          </div>
        </div>

        <div className="right">
          <div className="markdown-box">
            <Markdown rehypePlugins={[rehypeHighlight]}>
              {review}
            </Markdown>
          </div>
        </div>
      </main>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={2500} theme="dark" />
    </>
  );
}

export default App;
