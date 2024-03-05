// attribute：頂点属性であることを示す修飾子
attribute vec3 position; 
attribute vec4 color; // strideを考慮したデータ型

// varying：フラグメントシェーダとの橋渡しを意味する修飾子
varying vec4 vColor;

// 必ずmain関数が必要
void main() {
  // フラグメントシェーダに値を送る
  vColor = color;

  // gl_Position は頂点がどのように描かれるかを決める座標の出力（vec4）
  // gl_ 〜というのは組み込み変数 vec4でないとだめ
  // gl_Positionに突っ込むことで、最後どういう風に描かれるか決まる
  gl_Position = vec4(position, 1.0);
}

