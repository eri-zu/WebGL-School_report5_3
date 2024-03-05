import { WebGLUtility } from "./webgl";
import { radian } from "../util/math";

export class Gl {
  constructor() {
    this.canvas = null;
    this.gl = null; // context
    this.program = null; // program object

    this.position = null;
    this.positionStride = null;
    this.positionVBO = null; // 頂点バッファ（vertex buffer object）

    this.color = null;
    this.colorStride = null;
    this.colorVBO = null;

    this.uniformLocation = null;
    this.startTime = null;
    this.isRender = false;

    this.init();
    this.setup();
  }

  init() {
    this.canvas = document.getElementById("webgl");
    this.gl = WebGLUtility.createWebGLContext(this.canvas);

    const size = Math.min(window.innerWidth, window.innerHeight);
    this.canvas.width = size;
    this.canvas.height = size;
  }

  async setup() {
    this.load()
      //
      .then(() => {
        this.setupGeometry();
        this.setupLocation();
        this.start();
      });
  }

  load() {
    const p = new Promise((resolve, reject) => {
      const gl = this.gl;

      if (gl == null) {
        const error = new Error("not init");
        reject(error);
      } else {
        // shaderのロード
        let vs = null;
        let fs = null;

        WebGLUtility.loadFile("/shader/main.vert")
          // シェーダオブジェクトの作成
          .then((vertexShaderSource) => {
            vs = WebGLUtility.createShaderObject(
              gl,
              vertexShaderSource,
              gl.VERTEX_SHADER
            );

            return WebGLUtility.loadFile("/shader/main.frag");
          })
          // シェーダオブジェクトの作成
          .then((fragmentShaderSource) => {
            fs = WebGLUtility.createShaderObject(
              gl,
              fragmentShaderSource,
              gl.FRAGMENT_SHADER
            );

            // プログラムオブジェクトの作成
            this.program = WebGLUtility.createProgramObject(gl, vs, fs);
            resolve();
          });
      }
    });

    return p;
  }

  setupGeometry() {
    // ------------------------------------------------------------
    // position
    // ------------------------------------------------------------
    // 頂点属性データの設定
    const r = 0.5;
    const num = 3;
    const startDeg = 90;
    const deg = 360 / num;

    this.position = [
      // 1
      r * Math.cos(radian(startDeg)),
      r * Math.sin(radian(startDeg)),
      0.0,
      //
      r * Math.cos(radian(startDeg + deg * 1)),
      r * Math.sin(radian(startDeg + deg * 1)),
      0.0,
      //
      r * Math.cos(radian(startDeg + deg * 2)),
      r * Math.sin(radian(startDeg + deg * 2)),
      0.0,
    ];
    this.positionStride = 3;

    // GPUに情報を渡すために...
    // 1.属性情報をvboに入れる
    this.positionVBO = WebGLUtility.createVBO(this.gl, this.position);

    // ------------------------------------------------------------
    // color
    // ------------------------------------------------------------
    this.color = [
      //
      1.0, 0.0, 0.0, 1.0,
      //
      0.0, 1.0, 0.0, 1.0,
      //
      0.0, 0.0, 1.0, 1.0,
    ];
    this.colorStride = 4;
    this.colorVBO = WebGLUtility.createVBO(this.gl, this.color);
  }

  setupLocation() {
    // GPUに情報を渡すために...
    // 2.ロケーション（=GPU上の参照先? ）を取得する
    // →どこにどの頂点属性データを送ればいいか関連づける
    const gl = this.gl;

    const attPosition = gl.getAttribLocation(this.program, "position");
    WebGLUtility.enableAttribute(
      gl,
      this.positionVBO,
      attPosition,
      this.positionStride
    );

    const attColor = gl.getAttribLocation(this.program, "color");
    WebGLUtility.enableAttribute(gl, this.colorVBO, attColor, this.colorStride);

    // uniform loationの取得
    this.uniformLocation = {
      time: gl.getUniformLocation(this.program, "time"),
    };
  }

  start() {
    this.startTime = Date.now();
    this.isRender = true;

    this.render();
  }

  setupRendering() {
    // 描画領域の設定
    const gl = this.gl;

    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    gl.clearColor(0.3, 0.3, 0.3, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }

  render() {
    const gl = this.gl;

    // ビューポートの設定, クリア処理
    this.setupRendering();

    // 経過時間を取得し、秒に変換
    const nowTime = (Date.now() - this.startTime) * 0.001;

    // プログラムオブジェクトを選択
    gl.useProgram(this.program);

    // ロケーションを指定して、uniform変数の値を更新する（GPUに送る）
    gl.uniform1f(this.uniformLocation.time, nowTime);

    // 描画
    gl.drawArrays(
      gl.TRIANGLES, // 何を
      0, // どのインデックスから
      this.position.length / this.positionStride // 何個の頂点
    );
  }

  onUpdate() {
    if (!this.isRender) return;

    this.render();
  }
}
