
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    // 主角之间的距离小于这个数值时，就算过关
    @property()
    pickRadius: number = 0;

    // 暂存 Game 对象的引用
    game = null;

    start () {

    }

    update (dt) {
        if (this.collision() < this.pickRadius) {
            // console.log('碰撞了')
            this.game.babala.getComponent('Babala').stopMove()
            return;
        }

        if (this.node.x < -500) {
            this.newSlm()
        }
    }

    newSlm() {
        this.node.destroy()
        this.game.newSlm();
    }

    // 计算芭芭拉和史莱姆是否碰撞了
    collision() {
        const playerPos = this.game.babala.getPosition()
        const dist = this.node.position.sub(playerPos).mag();
        return dist
    }
}
