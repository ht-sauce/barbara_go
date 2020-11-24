import { antiShake } from '../tool/antiShakingAndThrottling.js'

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

    // 加速方向开关
    accLeft: boolean = false
    accRight: boolean = false

    jumpEnd: boolean = false // 是否跳跃结束

    onLoad() {
        // 键盘监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKey, this)
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this)
    }

    start() {

    }

    update(dt) {}

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
                this.backward()
                break
            case cc.macro.KEY.a:
                this.forward()
                break
            case cc.macro.KEY.d:
                this.backward()
                break
            case cc.macro.KEY.right:
                this.forward()
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
                this.accLeft = false
                break
            case cc.macro.KEY.a:
                this.accLeft = false
                break
            case cc.macro.KEY.d:
                this.accRight = false
                break
            case cc.macro.KEY.right:
                this.accRight = false
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
    forward() {
        // const tween = cc.tween().by(this.jumpDuration, {x: 10}, {easing: 'sineOut'})
        // cc.tween(this.node).then(tween).start()
        this.node.x += 2
    }
    backward() {
        const tween = cc.tween().by(this.jumpDuration, {x: -10}, {easing: 'sineOut'})
        cc.tween(this.node).then(tween).start()
    }
}
