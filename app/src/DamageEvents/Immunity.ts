import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { GameGlobals } from '../Game/GameGlobals';

export class Immunity implements DamageEvent {
    private readonly gameGlobals: GameGlobals;
    private readonly abilityId: number = FourCC('A01B');

    constructor(gameGlobals: GameGlobals) {
        this.gameGlobals = gameGlobals;
    }

    public event(globals: DamageEngineGlobals): void {
        if (GetUnitAbilityLevel(globals.DamageEventTarget as unit, this.abilityId) > 0) {
            const sourceLoc: location = GetUnitLoc(globals.DamageEventSource as unit);
            const txt: texttag = CreateTextTagLocBJ('0', sourceLoc, 1, 10, 50.00, 50.00, 50.00, 0.00);
            globals.DamageEventAmount = 0;
            SetTextTagPermanentBJ(txt, false);
            SetTextTagLifespanBJ(txt, 2.00);
            SetTextTagVelocityBJ(txt, 64, 90);

            RemoveLocation(sourceLoc);
        }
    }
}
