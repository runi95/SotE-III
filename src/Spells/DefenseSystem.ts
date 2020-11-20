import { Spell } from './Spell';
import { TimerUtils } from '../Utility/TimerUtils';
import { GameGlobals } from '../Game/GameGlobals';
import { Timer } from '../JassOverrides/Timer';
import { SpellCastUtils } from '../Utility/SpellCastUtils';

export class DefenseSystem extends Spell {
    protected readonly abilityId: number = FourCC('A029');
    private readonly defenseSystemDummyAbilityId: number = FourCC('A02A');
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
        const playerId: number = GetPlayerId(GetOwningPlayer(trig));
        const abilityLevel: number = GetUnitAbilityLevel(trig, this.abilityId);
        const intelligence: number = this.spellCastUtils.GetIntelligence(trig);
        const bonusArmor: number = 2;
        const bonusPhysical: number = Math.floor(abilityLevel + 0.50 * intelligence);
        UnitAddAbilityBJ(this.defenseSystemDummyAbilityId, trig);
        this.gameGlobals.PlayerPhysicalBlock[playerId] += bonusPhysical;
        SetUnitScalePercent(trig, 150, 150, 150);
        BlzSetUnitArmor(trig, BlzGetUnitArmor(trig) + bonusArmor);

        const t: Timer = this.timerUtils.newTimer();
        t.start(10, false, () => {
            UnitRemoveAbilityBJ(this.defenseSystemDummyAbilityId, trig);
            this.gameGlobals.PlayerPhysicalBlock[playerId] -= bonusPhysical;
            SetUnitScalePercent(trig, 100, 100, 100);
            BlzSetUnitArmor(trig, BlzGetUnitArmor(trig) - bonusArmor);

            this.timerUtils.releaseTimer(t);
        });
    }
}
