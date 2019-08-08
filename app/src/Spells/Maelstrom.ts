import { Spell } from './Spell';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';

export class Maelstrom extends Spell {
    protected readonly abilityId: number = FourCC('A001');
    private readonly dummyUnitId: number = FourCC('n002');
    private readonly timerUtils: TimerUtils;

    constructor(timerUtils: TimerUtils) {
        super();

        this.timerUtils = timerUtils;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const x: number = GetSpellTargetX();
        const y: number = GetSpellTargetY();
        const damage: number = 2.50 * GetUnitAbilityLevel(trig, this.abilityId) + 0.05 * GetHeroInt(trig, true);
        const dummy: unit = CreateUnit(GetOwningPlayer(GetTriggerUnit()), this.dummyUnitId, x, y, 0);
        const trigOwner: player = GetOwningPlayer(trig);
        const loc: location = GetUnitLoc(dummy);

        let ticks: number = 100;
        const t: Timer = this.timerUtils.NewTimer();
        t.start(0.05, true, () => {
            ticks--;

            const grp: group = GetUnitsInRangeOfLocAll(500.00, loc);
            ForGroup(grp, () => {
                if (IsUnitEnemy(GetEnumUnit(), trigOwner) && UnitAlive(GetEnumUnit())) {
                    UnitDamageTargetBJ(trig, GetEnumUnit(), damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
                }
            });
            DestroyGroup(grp);

            if (ticks <= 0) {
                RemoveUnit(dummy);
                RemoveLocation(loc);
                this.timerUtils.ReleaseTimer(t);
            }
        });
    }
}
