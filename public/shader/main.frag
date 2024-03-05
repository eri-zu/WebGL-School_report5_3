// フラグメントシェーダ内で、浮動小数点をどのような精度で扱うか
precision mediump float; // lowp, mediump, highp

// 経過時間を uniform 変数として受け取る
uniform float time;

varying vec4 vColor;

void main() {
  // 時間の経過からサイン波を作り、絶対値で点滅させるようにする
  // abs(sin(time))は、0 - 1の間の値を取る
  vec3 rgb = vColor.rgb * abs(sin(time));

  // gl_FragColor が、最終的に画面に出力される色（vec4）
  // gl_FragColor = vec4(rgb, vColor.a); // vColorはvec4なので、vColor.aは4つ目の値
  gl_FragColor = vColor; // vColorはvec4なので、vColor.aは4つ目の値
}

