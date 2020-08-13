import React from "react";
import { RecoilRoot, useRecoilValue, useRecoilState, atom } from "recoil";

const TAB = {
  HTML: 0,
  CSS: 1,
  JS: 2,
} as const;

const activeTab = atom<number>({ key: "active", default: TAB.HTML });

export const PlayGroundEditor: React.FC<{}> = () => {
  return (
    <RecoilRoot>
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

// 実行結果を表示する
const PlayGroundResult: React.FC<{}> = () => {
  return <div className="playground-result"></div>;
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
  return <div className="playground-editor"></div>;
};
