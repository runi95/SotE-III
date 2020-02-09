import { Spell } from './Spell';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';

export class SummonQuilbeast extends Spell {
    protected readonly abilityId: number = FourCC('A00Q');
    private readonly quillSprayAbilityId: number = FourCC('A04L');
    private readonly howlOfTerrorAbilityId: number = FourCC('A04M');
    private readonly enduranceAuraAbilityId: number = FourCC('SCae');
    private readonly summonId: number = FourCC('n00C');
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
        const agi: number = GetHeroAgi(trig, true);
        const playerId: number = GetPlayerId(GetOwningPlayer(trig));

        if (this.summonUnit[playerId]) {
            RemoveUnit(this.summonUnit[playerId]);
        }

        this.summonUnit[playerId] = CreateUnit(GetOwningPlayer(trig), this.summonId, x, y, bj_UNIT_FACING);
        DestroyEffect(AddSpecialEffect('Abilities\\Spells\\Orc\\FeralSpirit\\feralspiritdone.mdl', x, y));

        BlzSetUnitMaxHP(this.summonUnit[playerId], 100 * abilityLevel + 10 * agi);
        SetUnitLifePercentBJ(this.summonUnit[playerId], 100);
        BlzSetUnitBaseDamage(this.summonUnit[playerId], Math.ceil(2 * abilityLevel + 0.6 * agi), 0);

        if (abilityLevel > 2) {
            UnitAddAbility(this.summonUnit[playerId], this.quillSprayAbilityId);
        }

        if (abilityLevel > 4) {
            UnitAddAbility(this.summonUnit[playerId], this.howlOfTerrorAbilityId);
        }

        if (abilityLevel > 7) {
            UnitAddAbility(this.summonUnit[playerId], this.enduranceAuraAbilityId);
        }

        const maxDistance: number = 1200;
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
