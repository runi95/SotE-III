import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { GameGlobals } from '../Game/GameGlobals';

export class SpellBlockEvent implements DamageEvent {
    private gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        this.gameGlobals = gameGlobals;
    }

    public event(globals: DamageEngineGlobals): void {
        if (!globals.IsDamageSpell) {
            return;
        }

        if (GetOwningPlayer(globals.DamageEventTarget as unit) === Player(PLAYER_NEUTRAL_AGGRESSIVE)) {
            return;
        }

        // tslint:disable-next-line:max-line-length
        globals.DamageEventAmount = RMaxBJ(globals.DamageEventAmount - this.gameGlobals.PlayerSpellBlock[GetPlayerId(GetOwningPlayer(globals.DamageEventTarget as unit))], 0.00);
    }
}
