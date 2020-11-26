const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property()
    jumpHeight: number = 0 // 跳跃高度

    @property() // 主角跳跃持续时间
    jumpDuration: number = 0

    @property() // 最大移动速度
    maxMoveSpeed: number = 0

    @property() // 加速度
    accel: number = 0

    @property(cc.Button)
    Button: cc.Button = null

    @property(cc.Label) // 分数
    label: cc.Label = null

    score: number = 0 // 分数

    // 加速方向开关
    left: boolean = false
    right: boolean = false

    jumpEnd: boolean = false // 是否跳跃结束

    // 主角当前水平方向速度
    xSpeed: number = 0

    onLoad() {

    }

    start() {

    }

    update(dt) {
        if (this.left) this.backward(dt)
        if (this.right) this.forward(dt)
    }

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKey, this)
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this)
    }

    // 监听键盘按键
    onKey(e) {
        switch (e.keyCode) {
            case cc.macro.KEY.w:
                this.jumpAction()
                break
            case cc.macro.KEY.up:
                this.jumpAction()
                break
            case cc.macro.KEY.space:
                this.jumpAction()
                break
            case cc.macro.KEY.left:
                this.left = true
                break
            case cc.macro.KEY.a:
                this.left = true
                break
            case cc.macro.KEY.d:
                this.right = true
                break
            case cc.macro.KEY.right:
                this.right = true
                break
        }
    }
    onKeyUp(e) {
        switch (e.keyCode) {
            case cc.macro.KEY.w:
                break
            case cc.macro.KEY.up:
                break
            case cc.macro.KEY.space:
                break
            case cc.macro.KEY.left:
                this.left = false
                this.xSpeed = 0
                break
            case cc.macro.KEY.a:
                this.left = false
                break
            case cc.macro.KEY.d:
                this.right = false
                break
            case cc.macro.KEY.right:
                this.right = false
                this.xSpeed = 0
                break
        }
    }

    // 芭芭拉跳跃
    jumpAction(): boolean {
        if (this.jumpEnd) return false
        // 跳跃上升
        this.jumpEnd = true
        const jumpUp = cc.tween().to(this.jumpDuration, {y: this.jumpHeight}, {easing: 'sineOut'})
        // 下落
        const jumpDown = cc.tween().to(this.jumpDuration, {y: -220}, {easing: 'sineOut'})
        // 创建一个缓动，按 jumpUp、jumpDown 的顺序执行动作
        const tween = cc.tween().sequence(jumpUp, jumpDown).call( () => {
            // 缓动结束
            this.jumpEnd = false
        })
        // 开始移动
        cc.tween(this.node).then(tween).start()
    }

    // 向前移动
    forward(dt) {
        // 主角移动的话
        // this.xSpeed += this.accel * dt
        // 背景移动
        this.xSpeed -= this.accel * dt
        this.move(dt)
    }
    // 向后移动
    backward(dt) {
        // 主角移动的话
        // this.xSpeed -= this.accel * dt
        // 背景移动
        this.xSpeed += this.accel * dt
        this.move(dt)
    }
    move(dt) {
        if (this.right) {
            this.score += dt * 1000
            this.label.string = '当前分数:' + this.score.toFixed(0)
        }
        // 限制主角的速度不能超过最大值
        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed)
        }
        // 根据当前速度更新主角的位置
        if (this.left && this.node.x > -430) {
            this.node.x -= this.xSpeed * dt;
        }
        if (this.right && this.node.x < -100) {
            this.node.x -= this.xSpeed * dt;
        }
        // this.node.x += this.xSpeed * dt;
    }
    // 停止
    stopMove() {
        this.jumpEnd = false
        this.left = false
        this.right = false
        this.node.stopAllActions()
        this.Button.node.opacity = 255
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKey, this)
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this)
    }
    // 开始游戏
    play() {
        this.label.string = '当前分数:' + 0
        this.Button.node.opacity = 0
        this.node.x = -400
        this.node.y = -220
        // 键盘监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKey, this)
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this)
    }
}
