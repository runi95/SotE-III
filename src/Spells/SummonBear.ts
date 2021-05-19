import { Spell } from './Spell';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';

export class SummonBear extends Spell {
    protected readonly abilityId: number = FourCC('A00P');
    private readonly roarAbilityId: number = FourCC('A03G');
    private readonly commandAuraAbilityId: number = FourCC('A04I');
    private readonly criticalStrikeAbilityId: number = FourCC('A04E');
    private readonly summonId: number = FourCC('n00B');
    private summonUnit: unit[] = [];
    private readonly timerUtils: TimerUtils;

    constructor(timerUtils: TimerUtils) {
        super();

        this.timerUtils = timerUtils;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const abilityLevel: number = GetUnitAbilityLevel(trig, this.abilityId);
        const facing: number = GetUnitFacing(trig);
        const x: number = GetUnitX(trig) + 50 * Math.cos((facing * Math.PI) / 180);
        const y: number = GetUnitY(trig) + 50 * Math.sin((facing * Math.PI) / 180);
        const str: number = GetHeroStr(trig, true);
        const playerId: number = GetPlayerId(GetOwningPlayer(trig));

        if (this.summonUnit[playerId]) {
            RemoveUnit(this.summonUnit[playerId]);
        }

        this.summonUnit[playerId] = CreateUnit(GetOwningPlayer(trig), this.summonId, x, y, bj_UNIT_FACING);
        DestroyEffect(AddSpecialEffect('Abilities\\Spells\\Orc\\FeralSpirit\\feralspiritdone.mdl', x, y));

        BlzSetUnitMaxHP(this.summonUnit[playerId], 100 * abilityLevel + 10 * str);
        SetUnitLifePercentBJ(this.summonUnit[playerId], 100);
        BlzSetUnitBaseDamage(this.summonUnit[playerId], Math.ceil(6 * abilityLevel + 2 * str), 0);

        if (abilityLevel > 2) {
            UnitAddAbility(this.summonUnit[playerId], this.roarAbilityId);
        }

        if (abilityLevel > 4) {
            UnitAddAbility(this.summonUnit[playerId], this.commandAuraAbilityId);
        }

        if (abilityLevel > 7) {
            UnitAddAbility(this.summonUnit[playerId], this.criticalStrikeAbilityId);
        }

        const maxDistance = 1200;
        const t: Timer = this.timerUtils.newTimer();
        t.start(1, true, () => {
            const newX: number = GetUnitX(trig);
            const newY: number = GetUnitY(trig);
            const distance: number = Math.sqrt(
                Pow(GetUnitX(this.summonUnit[playerId]) - newX, 2) + Pow(GetUnitY(this.summonUnit[playerId]) - newY, 2),
            );

            if (distance > maxDistance) {
                SetUnitPosition(this.summonUnit[playerId], newX, newY);
                IssueTargetOrderBJ(this.summonUnit[playerId], 'move', trig);
            }

            if (!UnitAlive(this.summonUnit[playerId])) {
                this.summonUnit.splice(playerId, 1);
                this.timerUtils.releaseTimer(t);
            }
        });
    }
}
