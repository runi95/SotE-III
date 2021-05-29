import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';

export class Immunity implements DamageEvent {
    private readonly abilityId: number = FourCC('A01B');

    public event(globals: DamageEngineGlobals): void {
        if (GetUnitAbilityLevel(globals.DamageEventTarget as unit, this.abilityId) > 0) {
            const sourceLoc: location = GetUnitLoc(globals.DamageEventSource as unit);
            const txt: texttag = CreateTextTagLocBJ('0', sourceLoc, 1, 10, 50.0, 50.0, 50.0, 0.0);
            globals.DamageEventAmount = 0;
            SetTextTagPermanentBJ(txt, false);
            SetTextTagLifespanBJ(txt, 2.0);
            SetTextTagVelocityBJ(txt, 64, 90);

            RemoveLocation(sourceLoc);
        }
    }
}
