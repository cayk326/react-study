/**
 * ・コンポーネントを使用する場合は拡張子をjs->jsxにするとよい
 * 　また、コンポーネント名は必ず大文字から始める
 * 　先頭が大文字で始まり、単語の区切りを大文字とする変数名の付け方を「パスカルケース」で
 * 　命名すること
 *
 *・ {}でくくった部分はjavascriptとして認識する
 *・CSSも{}を使って書いたり直接書いたりできる
 *・jsのオブジェクトとしてcssを書く<h1 style={{ color: 'red'}}>Hello!</h1>
 *
 *・propsはコンポーネントに渡す引数的なもの. Web開発をするといろんな状態に応じて画面を書き換える必要が
 *でてくる。例えば、エラーの時は赤文字にして正常の時は青文字にするとか。
 * これらの状態に応じてコンポーネントを作ると、コンポーネントの数は膨大になる
 * そこで、propsを使って状態を引数としてコンポーネントに渡すことでその状態に応じた
 * 動的な処理を実行できるようにする
 *
 *・stateはそれぞれのコンポーネントが持っている状態のこと
 * Stateが変更されると再レンダリングされる
 * {faceShowFlag && <p>(^_-)-☆</p>}ここでは、論理演算のテクニックを使って
 * 左側がtrueの時だけ右側の値を返すように設定している(&&の本来の意味)
 *
 * Q. なぜボタンを押したときにレンダリングされていないのに画面が変わっているのか
 * A. Stateの変化を検知したコンポーネントが上から下まで再実行されている
 *    コンポーネントのreturnで再レンダリングされている
 *    つまり、Reactでは特定のコンポーネントがStateの変更を検知した際に
 *    差分だけレンダリングしなおすことで差分の反映をブラウザに実施している
 *　　レンダリング条件としてはStateが変わったとき、
 *    Propsの中身が変わったとき、親コンポーネントが再レンダリングされたときに
 *　　子のコンポーネントも再レンダリング
 *   そのため、システムが大規模になると、どのタイミングでレンダリングするか
 * 　レンダリングをどれだけ減らすかといったチューニングポイントがある
 *   また、初心者が陥りやすいバグとしてToo many re-renders. React limits the number of renders to prevent an infinite loop.
 * 　というStateの変更とrenderingに起因する無限ループがある
 *
 * 扱うstateやフラグが増えるとそれぞれの処理が干渉してうまく動かなくなることがある
 * そういう時は「関心の分離」をしてあげる。useeffectを活用する
 *
 *
 *
 *
 */

import React, { useEffect, useState } from "react";
import { ColorfulMessage } from "./components/ColorfulMessage";

//App関数の作成
const App = () => {
  console.log("最初");
  //コンポーネント内で使うstateは関数の最初に記載しておくと分かりやすい
  const [num, setNum] = useState(0);
  const [faceShowFlag, setfaceShowFlag] = useState(true);

  const onClickCountUp = () => {
    setNum(num + 1); //numに設定したい値を書くとnumが更新される
  };
  //stateを使うときはuseStateを使用し、配列の分割代入で値を得る
  //引数にはStateの変数名とStateの変数を変更するための関数を定義する
  //useState()の中でStateの初期値を定義できる
  //setNumで動的にnumを更新する

  const onClickSwithcShowFlag = () => {
    setfaceShowFlag(!faceShowFlag);
  };
  // この部分はnubmの値だけに関心を持たせたい
  //第二引数の配列を空にすると最初のレンダリングのみ実行されるようになる
  // 第二引数の配列にnumだけ渡すとuseEffectはnumの変更時のみ処理を実行するようになる
  // eslintの構文解析よれば、useEffectの引数の配列には関数内で使われる全ての変数を入れるべきとのこと
  // 場合によってはこの助言が邪魔になることがある。助言通りにするとバグが発生したり。。。
  //なので、ある部分だけeslintを解除したりすることもある
  useEffect(() => {
    console.log("UseEffect!");
    if (num > 0) {
      if (num % 3 === 0) {
        //flagがfalseの時にだけ右側の式を実行することでToo many renderingを回避
        faceShowFlag || setfaceShowFlag(true);
      } else {
        //flagがtrueの時にだけ右側の式を実行することでToo many renderingを回避
        faceShowFlag && setfaceShowFlag(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [num]);

  return (
    <>
      <h1 style={{ color: "red" }}>Hello!</h1>
      <ColorfulMessage color="blue">How are you?</ColorfulMessage>

      <ColorfulMessage color="pink">I'm fine!</ColorfulMessage>
      <button onClick={onClickCountUp}>カウントアップ</button>
      <br />
      <button onClick={onClickSwithcShowFlag}>on/off</button>
      <p>{num}</p>

      {faceShowFlag && <p>(^_-)-☆</p>}
    </>
  );
};

/**
 * 何もしないとApp関数はApp.jsの中でしか使えない
 *そこでexportをすることで他のファイルでも使用できるようにし
 *コンポーネントとして扱えるようにする
 */
export default App;
