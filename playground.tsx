import React from "react";

export const PlayGroundEditor: React.FC<{}> = () => {
  return (
    <div className="playground-render">
      <PlayGroundResult></PlayGroundResult>
      <div className="playground-edit">
        <PlayGroundNav></PlayGroundNav>
        <SourceEditor></SourceEditor>
      </div>
    </div>
  );
};

// 実行結果を表示する
const PlayGroundResult: React.FC<{}> = () => {
  return <div className="playground-result"></div>;
};

// html,css,jsの切替えタブ
const PlayGroundNav: React.FC<{}> = () => {
  return (
    <div className="playground-nav">
      <a className={`playground-nav__link is-active`}>HTML</a>
      <a className={`playground-nav__link`}>CSS</a>
      <a className={`playground-nav__link`}>JS</a>
    </div>
  );
};

// ソースコードエディタ
const SourceEditor: React.FC<{}> = () => {
  return <div className="playground-editor"></div>;
};
