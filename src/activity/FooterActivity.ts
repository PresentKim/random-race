import Activity from "./Activity";
import App from "@/App";
import SpriteAnimation from "@/sprite/SpriteAnimation";
import SpriteManager from "@/sprite/SpriteManager";
import SpriteAnimationWidget from "@/widget/SpriteAnimationWidget";
import VersionInfo from "@/version_info.json";
import TextWidget from "@/widget/TextWidget";
import RenderOption from "@/utils/RenderOption";

export default class FooterActivity extends Activity {
    private readonly runners: SpriteAnimationWidget[];
    private readonly versionText: TextWidget;

    constructor(app: App) {
        super(app);

        const characterGroup = SpriteManager.getGroup("character");

        this.runners = [];
        for (let i = 0; i < 30; ++i) {
            const runner = new SpriteAnimationWidget(this.viewport(Math.random() * 100, 100))
                    .setOnUpdate(elapsedTime => {
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
                            runner.pos.x += elapsedTime / runner.playRate * runner.getScale() / 15;
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

        this.versionText = new TextWidget(null, "v" + VersionInfo.version + "-" + VersionInfo.status, new RenderOption().scale(3).absolute());
        this.addWidget(this.versionText);

        this.setOnUpdate(elapsedTime => {
            this.camera.x += elapsedTime / 10;
        })

        this.relocation(1);
    }

    relocation(ratio: number) {
        this.runners.forEach(runner => runner.pos.set(runner.pos.x * ratio, this.vh(100)));

        const versionBB = this.versionText.getBoundingBox();
        this.versionText.pos.set(this.vw(1) + versionBB.xLength / 2, this.vh(99) - +versionBB.yLength / 2);
    }
}
