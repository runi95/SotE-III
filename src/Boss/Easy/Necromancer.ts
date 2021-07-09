import { Boss } from '../Boss';
import { Trigger } from '../../JassOverrides/Trigger';
import { RandomNumberGenerator } from '../../Utility/RandomNumberGenerator';

export class Necromancer extends Boss {
    private readonly araeUnitId: number = FourCC('u005');
    private araeOne: unit | undefined;
    private araeTwo: unit | undefined;
    private araeThree: unit | undefined;
    protected readonly bossId: number = FourCC('n029');
    protected readonly x: number = -8390.0;
    protected readonly y: number = -13294.0;
    protected readonly angle: number = 0.0;
    protected readonly dropTable: number[] = [FourCC('I00B')]; // Blue Soulstone (1800)

    constructor(randomNumberGenerator: RandomNumberGenerator) {
        super(Rect(-8384, -13248, -8256, -13120), randomNumberGenerator);

        const araeDeathTrigger: Trigger = new Trigger();
        araeDeathTrigger.addCondition(() => GetUnitTypeId(GetDyingUnit()) === this.araeUnitId);
        araeDeathTrigger.addAction(() => {
            const dyingUnitHandleId: number = GetHandleId(GetDyingUnit());
            UnitDamageTargetBJ(GetDyingUnit(), GetKillingUnit(), 1000, ATTACK_TYPE_MAGIC, DAMAGE_TYPE_MAGIC);

            if (this.araeOne !== undefined && dyingUnitHandleId === GetHandleId(this.araeOne)) {
                this.araeOne = undefined;
            } else if (this.araeTwo !== undefined && dyingUnitHandleId === GetHandleId(this.araeTwo)) {
                this.araeTwo = undefined;
            } else if (this.araeThree !== undefined && dyingUnitHandleId === GetHandleId(this.araeThree)) {
                this.araeThree = undefined;
            }
        });
        araeDeathTrigger.registerAnyUnitEventBJ(EVENT_PLAYER_UNIT_DEATH);
    }

    protected spawnAction(): void {
        this.araeOne = CreateUnit(Player(PLAYER_NEUTRAL_AGGRESSIVE), this.araeUnitId, -8234, -12978, 280.0);
        this.araeTwo = CreateUnit(Player(PLAYER_NEUTRAL_AGGRESSIVE), this.araeUnitId, -7992, -13088, 210.0);
        this.araeThree = CreateUnit(Player(PLAYER_NEUTRAL_AGGRESSIVE), this.araeUnitId, -8333, -13457, 70.0);

        super.spawnAction();
    }

    protected deathAction(): void {
        if (this.araeOne !== undefined) {
            KillUnit(this.araeOne);
        }

        if (this.araeTwo !== undefined) {
            KillUnit(this.araeTwo);
        }

        if (this.araeThree !== undefined) {
            KillUnit(this.araeThree);
        }

        this.araeOne = undefined;
        this.araeTwo = undefined;
        this.araeThree = undefined;

        super.deathAction();
    }
}
