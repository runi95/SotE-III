import { Spell } from './Spell';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';
import { GroupInRange } from '../JassOverrides/GroupInRange';

export class FrostNova extends Spell {
    protected readonly abilityId: number = FourCC('A01J');
    private readonly dummyUnitId: number = FourCC('n001');
    private readonly dummyAbilityId: number = FourCC('A01K');
    private readonly timedLifeBuffId: number = FourCC('BTLF');
    private readonly timerUtils: TimerUtils;

    constructor(timerUtils: TimerUtils) {
        super();

        this.timerUtils = timerUtils;
    }

    protected action(): void {
        const loc: location = GetSpellTargetLoc();
        const trig: unit = GetTriggerUnit();
        const abilityLevel: number = GetUnitAbilityLevel(trig, this.abilityId);
        const intelligence: number = GetHeroInt(trig, true);
        const damage: number = 200.00 * abilityLevel + 3.00 * intelligence;
        const brillianceAura: effect = AddSpecialEffectLocBJ(loc, 'Abilities\\Spells\\Other\\Drain\\ManaDrainCaster.mdl');

        const t: Timer = this.timerUtils.newTimer();
        t.start(2, false, () => {
            DestroyEffect(brillianceAura);
            DestroyEffect(AddSpecialEffectLocBJ(loc, 'Abilities\\Spells\\Undead\\FrostNova\\FrostNovaTarget.mdl'));

            const grp: GroupInRange = new GroupInRange(200.00, loc);

            grp.for(() => {
                if (IsUnitEnemy(GetEnumUnit(), GetOwningPlayer(trig))) {
                    UnitDamageTargetBJ(trig, GetEnumUnit(), damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);

                    const x: number = GetUnitX(GetEnumUnit());
                    const y: number = GetUnitY(GetEnumUnit());
                    const dummy: unit = CreateUnit(GetOwningPlayer(trig), this.dummyUnitId, x, y, 0);

                    UnitAddAbility(dummy, this.dummyAbilityId);
                    IssueTargetOrder(dummy, 'slow', GetEnumUnit());
                    UnitApplyTimedLifeBJ(2.00, this.timedLifeBuffId, dummy);
                }
            });

            RemoveLocation(loc);
            grp.destroy();
            this.timerUtils.releaseTimer(t);
        });
    }
}
