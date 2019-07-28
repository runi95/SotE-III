import { Spell } from './Spell';
import { TimerUtils } from '../Utility/TimerUtils';
import { GameGlobals } from '../Game/GameGlobals';
import { Timer } from '../JassOverrides/Timer';

export class DefenseSystem extends Spell {
    protected abilityId: number = FourCC('A029');
    private readonly defenseSystemDummyAbilityId: number = FourCC('A02A');
    private readonly gameGlobals: GameGlobals;
    private readonly timerUtils: TimerUtils;

    constructor(gameGlobals: GameGlobals, timerUtils: TimerUtils) {
        super();

        this.gameGlobals = gameGlobals;
        this.timerUtils = timerUtils;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const playerId: number = GetPlayerId(GetOwningPlayer(trig));
        const abilityLevel: number = GetUnitAbilityLevel(trig, this.abilityId);
        const intelligence: number = GetHeroInt(trig, true);
        const bonusArmor: number = 2;
        const bonusPhysical: number = Math.floor(abilityLevel + 0.50 * intelligence);
        UnitAddAbilityBJ(this.defenseSystemDummyAbilityId, trig);
        this.gameGlobals.PlayerPhysicalBlock[playerId] += bonusPhysical;
        SetUnitScalePercent(trig, 150, 150, 150);
        BlzSetUnitArmor(trig, BlzGetUnitArmor(trig) + bonusArmor);

        const t: Timer = this.timerUtils.NewTimer();
        t.start(10, false, () => {
            UnitRemoveAbilityBJ(this.defenseSystemDummyAbilityId, trig);
            this.gameGlobals.PlayerPhysicalBlock[playerId] -= bonusPhysical;
            SetUnitScalePercent(trig, 100, 100, 100);
            BlzSetUnitArmor(trig, BlzGetUnitArmor(trig) - bonusArmor);

            this.timerUtils.ReleaseTimer(t);
        });
    }
}
