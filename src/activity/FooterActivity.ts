import Activity from "./Activity";
import App from "@/App";
import SpriteAnimation from "@/sprite/SpriteAnimation";
import SpriteManager from "@/sprite/SpriteManager";
import SpriteAnimationWidget from "@/widget/SpriteAnimationWidget";

export default class FooterActivity extends Activity {
    private readonly runners: SpriteAnimationWidget[];

    constructor(app: App) {
        super(app);

        const characterGroup = SpriteManager.getGroup("character");

        this.runners = [];
        for (let i = 0; i < 30; ++i) {
            const runner = new SpriteAnimationWidget(this.viewport(Math.random() * 100, 100))
                    .setOnUpdate(diffSecs => {
                        const maxX = this.getBoundingBox().add(this.camera).maxX;
                        if ((runner.getBoundingBox()?.minX ?? 0) > maxX) {
                            runner.pos.x = this.camera.x;
                            runner.sheet = null;
                        }
                        if (!runner.sheet) {
                            runner.renderOption.scale(Math.random() * 3 + 5);
                            runner.setSheet(characterGroup.random()).setAnimationName("run").reset().setRepeatCount(-1).setPlayRate(1 + Math.random() * 0.3);
                        }
                        if (runner.animation instanceof SpriteAnimation && runner.repeatCount === -1) {
                            runner.pos.x += diffSecs / runner.playRate * runner.getScale() / 15;
                        }
                    }).setOnMouseClick(() => {
                                if (runner.animation instanceof SpriteAnimation && runner.repeatCount === -1) {
                                    runner.setAnimationName("hit")
                                            .reset()
                                            .setRepeatCount(0)
                                            .setOnAnimationEnd(() => {
                                                runner.setSheet(SpriteManager.getSheet("particle/character_particle"))
                                                        .setAnimationName("disappearing")
                                                        .setRepeatCount(0)
                                                        .setOnAnimationEnd(() => {
                                                            runner.pos.x = this.camera.x;
                                                            runner.sheet = null;
                                                        });
                                            });
                                }
                                return true;
                            }
                    );
            this.runners[i] = runner;
            this.addWidget(runner);
        }
        this.setOnUpdate(diffSecs => {
            this.camera.x += diffSecs / 10;
        })

        this.relocation(1);
    }

    relocation(ratio: number) {
        this.runners.forEach(runner => runner.pos.set(runner.pos.x * ratio, this.vh(100)));
    }
}
