import { Spell } from './Spell';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';
import { GroupInRange } from '../JassOverrides/GroupInRange';
import { SpellCastUtils } from '../Utility/SpellCastUtils';

export class FrostNova extends Spell {
    protected readonly abilityId: number = FourCC('A01J');
    private readonly dummyOrbUnitId: number = FourCC('n00Q');
    private readonly dummyMarkerUnitId: number = FourCC('n01R');
    private readonly dummyUnitId: number = FourCC('n001');
    private readonly dummyAbilityId: number = FourCC('A01K');
    private readonly dummySlowAuraAbilityId: number = FourCC('A08W');
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

        const orbCount = 8;
        const orbCountDiv = 360 / orbCount;
        const radius = 170.0;
        const locX: number = GetLocationX(loc);
        const locY: number = GetLocationY(loc);

        const p: player = GetOwningPlayer(trig);
        const orbUnits: unit[] = [];
        for (let i = 0; i < orbCount; i++) {
            orbUnits[i] = CreateUnit(p, this.dummyMarkerUnitId, locX + radius * CosBJ(i * orbCountDiv), locY + radius * SinBJ(i * orbCountDiv), 0);
            SetUnitTimeScale(orbUnits[i], 0.5);
        }

        const tickerOrb: unit = CreateUnit(p, this.dummyOrbUnitId, locX + radius * CosBJ(0.0), locY + radius * SinBJ(0.0), 0);

        let ticker = 0;
        const orbTimer: Timer = this.timerUtils.newTimer();
        orbTimer.start(0.05, true, () => {
            ticker += 9;
            const tickerModulo = ticker % 360;
            SetUnitPosition(tickerOrb, locX + radius * SinBJ(tickerModulo), locY + radius * CosBJ(tickerModulo));
        });

        const dummySlowAura: unit = CreateUnitAtLoc(p, this.dummyUnitId, loc, 0);
        UnitAddAbility(dummySlowAura, this.dummySlowAuraAbilityId);
        UnitApplyTimedLifeBJ(2.0, this.timedLifeBuffId, dummySlowAura);

        const t: Timer = this.timerUtils.newTimer();
        t.start(2, false, () => {
            DestroyEffect(AddSpecialEffectLocBJ(loc, 'Abilities\\Spells\\Undead\\FrostNova\\FrostNovaTarget.mdl'));

            const grp: GroupInRange = new GroupInRange(200.0, loc);

            grp.for((u: unit) => {
                if (IsUnitEnemy(u, p)) {
                    UnitDamageTargetBJ(trig, u, damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);

                    const x: number = GetUnitX(u);
                    const y: number = GetUnitY(u);
                    const dummy: unit = CreateUnit(p, this.dummyUnitId, x, y, 0);

                    UnitAddAbility(dummy, this.dummyAbilityId);
                    IssueTargetOrder(dummy, 'slow', u);
                    UnitApplyTimedLifeBJ(2.0, this.timedLifeBuffId, dummy);
                }
            });

            RemoveLocation(loc);
            grp.destroy();
            RemoveUnit(tickerOrb);
            for (let i = 0; i < orbCount; i++) {
                RemoveUnit(orbUnits[i]);
            }

            this.timerUtils.releaseTimer(orbTimer);
            this.timerUtils.releaseTimer(t);
        });
    }
}
