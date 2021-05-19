import { Spell } from './Spell';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';
import { GameGlobals } from '../Game/GameGlobals';
import { SpellCastUtils } from '../Utility/SpellCastUtils';

export class SummonHawk extends Spell {
    protected readonly abilityId: number = FourCC('A00R');
    private readonly chainLightningAbilityId: number = FourCC('A04J');
    private readonly forkedLightningAbilityId: number = FourCC('A04K');
    private readonly spellImmunityAbilityId: number = FourCC('ACmi');
    private readonly summonId: number = FourCC('n00D');
    private summonUnit: unit[] = [];
    private readonly gameGlobals: GameGlobals;
    private readonly timerUtils: TimerUtils;
    private readonly spellCastUtils: SpellCastUtils;

    constructor(gameGlobals: GameGlobals, timerUtils: TimerUtils, spellCastUtils: SpellCastUtils) {
        super();

        this.gameGlobals = gameGlobals;
        this.timerUtils = timerUtils;
        this.spellCastUtils = spellCastUtils;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const abilityLevel: number = GetUnitAbilityLevel(trig, this.abilityId);
        const facing: number = GetUnitFacing(trig);
        const x: number = GetUnitX(trig) + 50 * Math.cos((facing * Math.PI) / 180);
        const y: number = GetUnitY(trig) + 50 * Math.sin((facing * Math.PI) / 180);
        const int: number = this.spellCastUtils.GetIntelligence(trig);
        const playerId: number = GetPlayerId(GetOwningPlayer(trig));

        if (this.summonUnit[playerId]) {
            RemoveUnit(this.summonUnit[playerId]);
        }

        this.summonUnit[playerId] = CreateUnit(GetOwningPlayer(trig), this.summonId, x, y, bj_UNIT_FACING);
        DestroyEffect(AddSpecialEffect('Abilities\\Spells\\Orc\\FeralSpirit\\feralspiritdone.mdl', x, y));

        this.gameGlobals.SummonHawkInt[GetPlayerId(GetOwningPlayer(trig))] = int;

        BlzSetUnitMaxHP(this.summonUnit[playerId], Math.ceil(75 * abilityLevel + 7.5 * int));
        SetUnitLifePercentBJ(this.summonUnit[playerId], 100);
        BlzSetUnitBaseDamage(this.summonUnit[playerId], Math.ceil(2.25 * abilityLevel + 0.75 * int), 0);

        if (abilityLevel > 2) {
            UnitAddAbility(this.summonUnit[playerId], this.chainLightningAbilityId);
        }

        if (abilityLevel > 4) {
            UnitAddAbility(this.summonUnit[playerId], this.forkedLightningAbilityId);
        }

        if (abilityLevel > 7) {
            UnitAddAbility(this.summonUnit[playerId], this.spellImmunityAbilityId);
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
