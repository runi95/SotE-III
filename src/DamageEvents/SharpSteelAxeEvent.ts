import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { GameGlobals, ChargedItemStates } from '../Game/GameGlobals';

export class SharpSteelAxeEvent implements DamageEvent {
    private readonly gameGlobals: GameGlobals;
    private readonly itemId: number = FourCC('I00Q');
    private readonly dummyUnitTypeId: number = FourCC('n001');
    private readonly dummyAbilityId: number = FourCC('A08J');
    private readonly timedLifeBuffId: number = FourCC('BTLF');

    constructor(gameGlobals: GameGlobals) {
        this.gameGlobals = gameGlobals;
    }

    public event(globals: DamageEngineGlobals): void {
        if (globals.IsDamageSpell) {
            return;
        }

        const owningPlayer: player = GetOwningPlayer(globals.DamageEventTarget as unit);
        const playerId: number = GetPlayerId(owningPlayer);
        if (playerId < 0 || playerId >= bj_MAX_PLAYERS) {
            return;
        }

        if (this.gameGlobals.SharpSteelAxe[playerId] !== ChargedItemStates.READY) {
            return;
        }

        if (!IsUnitType(globals.DamageEventTarget as unit, UNIT_TYPE_HERO)) {
            return;
        }

        this.gameGlobals.SharpSteelAxe[playerId] = ChargedItemStates.COOLDOWN;

        const dummy: unit = CreateUnit(owningPlayer, this.dummyUnitTypeId, GetUnitX(globals.DamageEventTarget as unit), GetUnitY(globals.DamageEventTarget as unit), 0);
        UnitAddAbilityBJ(this.dummyAbilityId, dummy);
        UnitApplyTimedLifeBJ(2, this.timedLifeBuffId, dummy);
        IssueTargetOrder(dummy, 'lightningshield', globals.DamageEventTarget as unit);

        SetItemCharges(GetItemOfTypeFromUnitBJ(globals.DamageEventTarget as unit, this.itemId), 1);
    }
}
