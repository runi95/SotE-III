import { Spell } from './Spell';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';
import { Group } from '../JassOverrides/Group';
import { GroupInRange } from '../JassOverrides/GroupInRange';

export class Inferno extends Spell {
    protected readonly abilityId: number = FourCC('A012');
    private readonly infernalUnitId: number = FourCC('n023');
    private readonly timedLifeBuffId: number = FourCC('BTLF');
    private readonly timerUtils: TimerUtils;

    constructor(timerUtils: TimerUtils) {
        super();

        this.timerUtils = timerUtils;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const x: number = GetUnitX(trig);
        const y: number = GetUnitY(trig);
        const abilityLevel: number = GetUnitAbilityLevel(trig, this.abilityId);
        const str: number = GetHeroStr(trig, true);
        const damage: number = abilityLevel * 200 + 5 * str;

        UnitDamageTargetBJ(trig, trig, 200, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);

        let rngX: number = x + GetRandomReal(0, 1000) - 500.0;
        let rngY: number = y + GetRandomReal(0, 1000) - 500.0;
        let eff: effect = AddSpecialEffect('Units\\Demon\\Infernal\\InfernalBirth.mdl', rngX, rngY);
        let shouldSummon: boolean = true;
        let ticks: number = 10;
        const t: Timer = this.timerUtils.newTimer();
        t.start(0.75, true, () => {
            ticks--;

            if (shouldSummon) {
                shouldSummon = false;
                const summon: unit = CreateUnit(GetOwningPlayer(trig), this.infernalUnitId, rngX, rngY, bj_UNIT_FACING);
                BlzSetUnitMaxHP(summon, 150 * abilityLevel + 15 * str);
                SetUnitLifePercentBJ(summon, 100);
                BlzSetUnitBaseDamage(summon, Math.ceil(4.5 * abilityLevel + str), 0);
                UnitApplyTimedLife(summon, this.timedLifeBuffId, 10);
            } else {
                shouldSummon = true;
            }

            DestroyEffect(eff);
            const loc: location = Location(rngX, rngY);
            const grp: GroupInRange = new GroupInRange(175, loc);
            grp.for((u: unit) => {
                if (IsPlayerEnemy(GetOwningPlayer(trig), GetOwningPlayer(u))) {
                    UnitDamageTargetBJ(trig, u,
                                       damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
                }
            });

            RemoveLocation(loc);
            grp.destroy();

            if (ticks <= 0) {
                this.timerUtils.releaseTimer(t);
            } else {
                rngX = x + GetRandomReal(0, 1000) - 500.0;
                rngY = y + GetRandomReal(0, 1000) - 500.0;
                eff = AddSpecialEffect('Units\\Demon\\Infernal\\InfernalBirth.mdl', rngX, rngY);
            }
        });
    }
}
