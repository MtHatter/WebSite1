
// タッチ入力を扱うクラス  //


// ---------------- ---------------- //
//  コンストラクタ //
// ---------------- ---------------- //
function InputTouch() {
    // タッチ開始位置 //
    this.sx = 0;
    this.sy = 0;
    // タッチ終了位置 //
    this.ex = 0;
    this.ey = 0;

    this.accelerationX = 0;
    this.accelerationY = 0;

};


// ---------------- ---------------- //
// Event.TOUCH_START 時に呼び出してください    //
// ---------------- ---------------- //
InputTouch.prototype.StartTouch = function (e) {
    // タッチ位置 //
    this.sx = e.x;
    this.sy = e.y;
    this.ex = e.x;
    this.ey = e.y;
};


// ---------------- ---------------- //
// Event.TOUCH_END 時に呼び出してください    //
// ---------------- ---------------- //
InputTouch.prototype.EndTouch = function (e) {
    // タッチ位置 //
    this.ex = e.x;
    this.ey = e.y;
};


// ---------------- ---------------- //
// Event.TOUCH_MOVE 時に呼び出してください    //
// ---------------- ---------------- //
InputTouch.prototype.MoveTouch = function (e) {
    // タッチ位置 //
    this.ex = e.x;
    this.ey = e.y;
};



// ---------------- ---------------- //
// Event.ENTER_FRAME などで定期的に呼び出してください   //
// ---------------- ---------------- //
InputTouch.prototype.Update = function () {
    // 加速度 更新 //
    this.accelerationX = this.sx - this.ex;
    this.accelerationY = this.sy - this.ey;

    // 座標更新 //
    this.sx = this.ex;
    this.sy = this.ey;
};



// ---------------- ---------------- //
// ｘ軸方向速度 取得 //
// ---------------- ---------------- //
InputTouch.prototype.GetAccelerationX = function () {
    return this.accelerationX;
};

// ---------------- ---------------- //
// ｙ軸方向速度 取得 //
// ---------------- ---------------- //
InputTouch.prototype.GetAccelerationY = function () {
    return this.accelerationY;
};
