
// サーフェースにラインを描画する  //
//      TOUCH_START、TOUCH_END 間にラインを描画  //


// enchant.js v0.8.2 使用 //
enchant();


var GAME_WIDTH = 320;
var GAME_HEIGHT = 320;


// html読み込み完了 //
window.onload = function () {
    // core 生成 //
    var mainGame = new Core(GAME_WIDTH, GAME_HEIGHT);
    mainGame.fps = 30;
    

    // game に対しシーン追加 //
    (function (game) {
        // テストシーン作成 //
        var tmpScene = new Scene();
        tmpScene.backgroundColor = "rgb(200, 160, 160)";

        // サーフェース生成 //
        tmpScene.mBackSurface = new Surface(GAME_WIDTH, GAME_HEIGHT);
        var bg = new Sprite(GAME_WIDTH, GAME_HEIGHT);
        bg.image = tmpScene.mBackSurface;
        tmpScene.addChild(bg);

        // ラベル生成（アプリの動作確認用） //
        tmpScene.mCounterLabel = new Label("てすと");
        tmpScene.addChild(tmpScene.mCounterLabel);

        // カウンタ生成 //
        tmpScene.mCounter = 0;

        // シーン メインループ //
        tmpScene.addEventListener(Event.ENTER_FRAME, function () {
            // カウントアップ //
            ++this.mCounter;
            // ラベル更新 //
            this.mCounterLabel.text = this.mCounter;


            // タッチ入力処理 //
            if (this.INPUT_STATE_END == this.mInputState) {
                // 入力内容でライン描画 //
                this.mBackSurface.context.strokeStyle = "rgb(255, 255, 255)";
                this.mBackSurface.context.beginPath();
                this.mBackSurface.context.moveTo(this.mInputSX, this.mInputSY);
                this.mBackSurface.context.lineTo(this.mInputEX, this.mInputEY);
                this.mBackSurface.context.stroke();

                // 状態更新 //
                this.mInputState = this.INPUT_STATE_WAIT;
            }
        });


        // タッチ入力 //
        tmpScene.INPUT_STATE_WAIT = 0;
        tmpScene.INPUT_STATE_START = 1;
        tmpScene.INPUT_STATE_END = 2;

        tmpScene.mInputState = tmpScene.INPUT_STATE_WAIT;
        tmpScene.mInputSX = 0;
        tmpScene.mInputSY = 0;
        tmpScene.mInputEX = 0;
        tmpScene.mInputEY = 0;

        // タッチ開始 //
        tmpScene.addEventListener(Event.TOUCH_START, function (e) {
            // 状況確認 //
            if (this.mInputState != this.INPUT_STATE_WAIT) {
                return;
            }

            // 入力状態更新 //
            this.mInputState = this.INPUT_STATE_START;
            // タッチ位置 //
            this.mInputSX = e.x;
            this.mInputSY = e.y;
        });

        // タッチ終了 //
        tmpScene.addEventListener(Event.TOUCH_END, function (e) {
            // 状況確認 //
            if (this.mInputState != this.INPUT_STATE_START) {
                return;
            }

            // 入力状態更新 //
            this.mInputState = this.INPUT_STATE_END;
            // タッチ位置 //
            this.mInputEX = e.x;
            this.mInputEY = e.y;
        });


        // シーン追加 //
        game.pushScene(tmpScene);
    })(mainGame);


 

    // ゲーム開始 //
    mainGame.start();
};

