import { Spell } from './Spell';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';
import { GroupInRange } from '../JassOverrides/GroupInRange';
import { SpellCastUtils } from '../Utility/SpellCastUtils';

export class FrostNova extends Spell {
    protected readonly abilityId: number = FourCC('A01J');
    private readonly dummyUnitId: number = FourCC('n001');
    private readonly dummyAbilityId: number = FourCC('A01K');
    private readonly timedLifeBuffId: number = FourCC('BTLF');
    private readonly timerUtils: TimerUtils;
    private readonly spellCastUtils: SpellCastUtils;

    constructor(timerUtils: TimerUtils, spellCastUtils: SpellCastUtils) {
        super();

        this.timerUtils = timerUtils;
        this.spellCastUtils = spellCastUtils;
    }

    protected action(): void {
        const loc: location = GetSpellTargetLoc();
        const trig: unit = GetTriggerUnit();
        const abilityLevel: number = GetUnitAbilityLevel(trig, this.abilityId);
        const intelligence: number = this.spellCastUtils.GetIntelligence(trig);
        const damage: number = 280.0 * abilityLevel + 2.25 * intelligence;
        const brillianceAura: effect = AddSpecialEffectLocBJ(loc, 'Abilities\\Spells\\Other\\Drain\\ManaDrainCaster.mdl');

        const t: Timer = this.timerUtils.newTimer();
        t.start(2, false, () => {
            DestroyEffect(brillianceAura);
            DestroyEffect(AddSpecialEffectLocBJ(loc, 'Abilities\\Spells\\Undead\\FrostNova\\FrostNovaTarget.mdl'));

            const grp: GroupInRange = new GroupInRange(200.0, loc);

            grp.for((u: unit) => {
                if (IsUnitEnemy(u, GetOwningPlayer(trig))) {
                    UnitDamageTargetBJ(trig, u, damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);

                    const x: number = GetUnitX(u);
                    const y: number = GetUnitY(u);
                    const dummy: unit = CreateUnit(GetOwningPlayer(trig), this.dummyUnitId, x, y, 0);

                    UnitAddAbility(dummy, this.dummyAbilityId);
                    IssueTargetOrder(dummy, 'slow', u);
                    UnitApplyTimedLifeBJ(2.0, this.timedLifeBuffId, dummy);
                }
            });

            RemoveLocation(loc);
            grp.destroy();
            this.timerUtils.releaseTimer(t);
        });
    }
}
