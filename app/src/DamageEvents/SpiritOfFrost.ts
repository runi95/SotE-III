import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { GameGlobals } from '../Game/GameGlobals';

export class SpiritOfFrost implements DamageEvent {
    private readonly gameGlobals: GameGlobals;
    private readonly abilityId: number = FourCC('A01L');
    private readonly dummyUnitTypeId: number = FourCC('n00J');
    private readonly timedLifeBuffId: number = FourCC('BTLF');

    constructor(gameGlobals: GameGlobals) {
        this.gameGlobals = gameGlobals;
    }

    public event(globals: DamageEngineGlobals): void {
        const abilityLevel: number = GetUnitAbilityLevel(globals.DamageEventTarget as unit, this.abilityId);

        if (abilityLevel > 0) {
            if (GetRandomInt(1, 100) < 10) {
                const mana: number = GetUnitStateSwap(UNIT_STATE_MANA, globals.DamageEventTarget as unit);
                if (mana > 25) {
                    const x: number = GetUnitX(globals.DamageEventTarget as unit) + GetRandomReal(0.00, 500.00) - 250.00;
                    const y: number = GetUnitY(globals.DamageEventTarget as unit) + GetRandomReal(0.00, 500.00) - 250.00;
                    const intelligence: number = GetHeroInt(globals.DamageEventTarget as unit, true);
                    const summon: unit = CreateUnit(GetOwningPlayer(globals.DamageEventTarget as unit),
                                                    this.dummyUnitTypeId, x, y, bj_UNIT_FACING);
                    BlzSetUnitBaseDamage(summon, 2 * intelligence, 1);
                    UnitApplyTimedLifeBJ(abilityLevel, this.timedLifeBuffId, summon);
                    SetUnitManaBJ(globals.DamageEventTarget as unit, mana - 25.00);
                }
            }
        }
    }
}
