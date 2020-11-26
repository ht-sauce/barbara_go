
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Node)
    bg1: cc.Node = null

    @property(cc.Node)
    bg2: cc.Node = null

    @property(cc.Node)
    babala: cc.Node = null

    // 这个属性引用了史莱姆
    @property(cc.Prefab)
    slm: cc.Prefab = null

    triggerX: number = 0
    onLoad () {
        // 获取重置触发坐标点
        this.triggerX = -this.bg1.width;
    }

    start () {

    }

    update (dt) {
        this.bgMove(dt)
    }

    bgMove(dt) {
        const { xSpeed, left, right } = this.babala.getComponent('Babala')
        if (left || right) {
            this.bg1.x += xSpeed * dt;
            this.bg2.x += xSpeed * dt;
        }

        // 重置
        if (this.bg1.x <= this.triggerX) this.bg1.x = this.bg2.x + this.bg1.width
        if (this.bg2.x <= this.triggerX) this.bg2.x = this.bg1.x + this.bg1.width

        if (this.bg1.x >= -this.triggerX) this.bg1.x = this.bg2.x - this.bg1.width
        if (this.bg2.x >= -this.triggerX) this.bg2.x = this.bg1.x - this.bg1.width
    }

    // 生成史莱姆
    newSlm(xSpeed) {
        // 使用给定的模板在场景中生成一个新节点
        const slm = cc.instantiate(this.slm)
        const {x, y} = this.babala
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(slm)
        slm.setPosition(cc.v2(x + slm.width + Math.random() * 100, y + (Math.random() + 0.2) * 50))
    }
}
