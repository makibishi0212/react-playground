import React, { useState, useEffect } from "react";
import { RecoilRoot, useRecoilValue, useRecoilState, atom } from "recoil";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

const TAB = {
  HTML: 0,
  CSS: 1,
  JS: 2,
} as const;

const activeTab = atom<0 | 1 | 2>({ key: "active", default: TAB.HTML });
const htmlSource = atom({ key: "html", default: "" });
const cssSource = atom({ key: "css", default: "" });
const jsSource = atom({ key: "js", default: "" });

export const PlayGroundEditor: React.FC<{
  html?: string;
  css?: string;
  js?: string;
}> = (props) => {
  return (
    <RecoilRoot
      initializeState={({ set }) => {
        const defaultHtml = props.html ? props.html : "";
        set(htmlSource, defaultHtml);

        const defaultCss = props.css ? props.css : "";
        set(cssSource, defaultCss);

        const defaultJs = props.js ? props.js : "";
        set(jsSource, defaultJs);
      }}
    >
      <div className="playground-render">
        <PlayGroundResult></PlayGroundResult>
        <div className="playground-edit">
          <PlayGroundNav></PlayGroundNav>
          <SourceEditor></SourceEditor>
        </div>
      </div>
    </RecoilRoot>
  );
};

const createPlayGroundHtml = (html: string, css: string, js: string) =>
  `<!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>playground</title>
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>${js}</script>
      </body>
    </html>`;

// 実行結果を表示する
const PlayGroundResult: React.FC<{}> = () => {
  const html = useRecoilValue(htmlSource);
  const css = useRecoilValue(cssSource);
  const js = useRecoilValue(jsSource);

  const [playGroundHtml, setPlayGroundHtml] = useState(
    createPlayGroundHtml(html, css, js)
  );

  useEffect(() => {
    const timerId = setTimeout(() => {
      setPlayGroundHtml(createPlayGroundHtml(html, css, js));
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [html, css, js]);

  return (
    <div className="playground-result">
      <iframe
        sandbox="allow-scripts"
        className="playground__content"
        srcDoc={playGroundHtml}
      ></iframe>
    </div>
  );
};

// html,css,jsの切替えタブ
const PlayGroundNav: React.FC<{}> = () => {
  const [active, changeActive] = useRecoilState(activeTab);

  const activeClass = (tab: number) => {
    return active === tab ? "is-active" : "";
  };

  return (
    <div className="playground-nav">
      <a
        className={`playground-nav__link ${activeClass(TAB.HTML)}`}
        onClick={() => {
          changeActive(TAB.HTML);
        }}
      >
        HTML
      </a>
      <a
        className={`playground-nav__link ${activeClass(TAB.CSS)}`}
        onClick={() => {
          changeActive(TAB.CSS);
        }}
      >
        CSS
      </a>
      <a
        className={`playground-nav__link ${activeClass(TAB.JS)}`}
        onClick={() => {
          changeActive(TAB.JS);
        }}
      >
        JS
      </a>
    </div>
  );
};

// ソースコードエディタ
const SourceEditor: React.FC<{}> = () => {
  const [html, changeHtml] = useRecoilState(htmlSource);
  const [css, changeCss] = useRecoilState(cssSource);
  const [js, changeJs] = useRecoilState(jsSource);
  const active = useRecoilValue(activeTab);

  const source = {
    [TAB.HTML]: {
      aceMode: "html",
      source: html,
      change: changeHtml,
    },
    [TAB.CSS]: {
      aceMode: "css",
      source: css,
      change: changeCss,
    },
    [TAB.JS]: {
      aceMode: "javascript",
      source: js,
      change: changeJs,
    },
  };

  const target = source[active];

  return (
    <div className="playground-editor">
      <AceEditor
        setOptions={{
          useWorker: false,
          enableBasicAutocompletion: true,
        }}
        mode={target.aceMode}
        theme="monokai"
        value={target.source}
        onChange={(value) => {
          target.change(value);
        }}
        height="400px"
        width="400px"
        editorProps={{ $blockScrolling: true }}
        key={target.aceMode}
      />
    </div>
  );
};
