
// enchant.js v0.8.2 使用 //
enchant();


var GAME_WIDTH = 320;
var GAME_HEIGHT = 320;


// html読み込み完了 //
window.onload = function () {
    document.body.style.overflow = "hidden";

    // core 生成 //
    var mainGame = new Core(GAME_WIDTH, GAME_HEIGHT);
    mainGame.fps = 30;

    // 自力で画面サイズ倍率指定（html の <body> タブへ <div id="enchant-stage"></div> を記述し自動倍率を切っています） //
    var scaleH = window.innerHeight /GAME_HEIGHT;
    var scaleW = window.innerWidth / GAME_WIDTH;
    if (scaleW <= scaleH) {
        mainGame.scale = scaleW;
    }
    else {
        mainGame.scale = scaleH;
    }
  

    // シーン入れ替え //
    mainGame.replaceScene((function () {
        // テストシーン作成 //
        var tmpScene = new Scene();
        tmpScene.backgroundColor = "rgb(200, 160, 160)";

        // サーフェース生成 //
        tmpScene.mBackSurface = new Surface(GAME_WIDTH, GAME_HEIGHT);
        // 記述省略のため //
        var context = tmpScene.mBackSurface.context;
        // サーフェースを不透明にするため塗りつぶし //
        context.fillStyle = "rgba(255, 255, 255, 1.0)"
        context.beginPath();
        context.rect(0, 0, tmpScene.mBackSurface.width, tmpScene.mBackSurface.height);
        context.fill();
        // 線の色設定 //
        context.strokeStyle = "rgb(32, 32, 64)";
        // スプライトにsetし登録 //
        var bg = new Sprite(GAME_WIDTH, GAME_HEIGHT);
        bg.image = tmpScene.mBackSurface;
        tmpScene.addChild(bg);

        // 背景色用カウンタ //
        tmpScene.mColorCounter = 0;

        // 加速度表示用ラベル生成 //
        tmpScene.mAccelerationLabel = new Label("加速度");
        tmpScene.mAccelerationLabel.y = 32;
        tmpScene.addChild(tmpScene.mAccelerationLabel);

        // タッチ入力 //
        tmpScene.mInput = new InputTouch();
        

        // 情報表示用ラベル //
        var tmpLabel = new Label("size:" + window.parent.screen.width + "/" + window.parent.screen.height
            + " in:" + window.innerWidth + "/" + window.innerHeight);
        tmpScene.addChild(tmpLabel);


        // シーン メインループ //
        tmpScene.addEventListener(Event.ENTER_FRAME, function () {
            // 過去の加速度 //
            var oldAcc = Math.abs(this.mInput.GetAccelerationX()) +Math.abs(this.mInput.GetAccelerationY());
            
            // 入力更新 //
            this.mInput.Update();
            // 現在の加速度 //
            var newAcc = Math.abs(this.mInput.GetAccelerationX()) + Math.abs(this.mInput.GetAccelerationY());
            
            // ラベル更新 //
            this.mAccelerationLabel.text = newAcc;


            // グラフを描画 //
            // 記述省略のため context 取得 //
            var context = this.mBackSurface.context;
            // 現在の状態をずらす //
            this.mBackSurface.draw(this.mBackSurface, -2, 0);
            // 背景色用カウントアップ //
            this.mColorCounter += 0.5;
            // 右端背景塗りつぶし //
            context.fillStyle = HSV2RGBA(Math.floor(this.mColorCounter), 32, 255, 1.0);
            context.beginPath();
            context.rect(tmpScene.mBackSurface.width - 2, 0, 2, tmpScene.mBackSurface.height);
            context.fill();

            // 加速度変化内容でライン描画 //
            context.beginPath();
            context.moveTo(GAME_WIDTH -8, GAME_HEIGHT -oldAcc -4);
            context.lineTo(GAME_WIDTH -6, GAME_HEIGHT -newAcc -4);
            context.stroke();
        });


        // タッチ開始 //
        tmpScene.addEventListener(Event.TOUCH_START, function (e) {
            this.mInput.StartTouch(e);
        });

        // タッチ終了 //
//        tmpScene.addEventListener(Event.TOUCH_END, function (e) {
  //      });

        tmpScene.addEventListener(Event.TOUCH_MOVE, function (e) {
            this.mInput.MoveTouch(e);
        });

        // 作成したシーンを返す //
        return tmpScene;
    })());


 

    // ゲーム開始 //
    mainGame.start();
};




