import React from "react";

export const ColorfulMessage = (props) => {
  const { color, children } = props; //分割代入を使う
  const contentStyle = {
    color, //colorに対してcolorを割り当てる場合は省略できるcolor:color -> colorとできる
    fontSize: "18px"
  };
  return <p style={contentStyle}>{children}</p>;
};

/**
 * export default ColorfulMessage;は1ファイルで一回のみ実行可能
 * また、読み込み側で自由に名称変更できる
 * 通常はexport const 関数名にして、読み込み側で分割代入でコンポーネントを得る
 * この方がコンポーネント名が確約されて良い。バグを検知しやすい
 */
//export default ColorfulMessage;
