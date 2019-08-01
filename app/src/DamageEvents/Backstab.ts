import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';

export class Backstab implements DamageEvent {
    private readonly unitTypeId: number = FourCC('E000');

    public event(globals: DamageEngineGlobals): void {
        if (GetUnitTypeId(globals.DamageEventSource as unit) !== this.unitTypeId) {
            return;
        }

        const angleBetweenPoints: number = Math.atan2(
            GetUnitY(globals.DamageEventTarget as unit) - GetUnitY(globals.DamageEventSource as unit),
            GetUnitX(globals.DamageEventTarget as unit) - GetUnitX(globals.DamageEventSource as unit)) * 180 / Math.PI;
        if (angleBetweenPoints < 0.00) {
            if (RAbsBJ(GetUnitFacing(globals.DamageEventTarget as unit) - (angleBetweenPoints + 360.00)) < 20.00) {
                this.DealCriticalDamage(globals);
            }
        } else {
            if (RAbsBJ(GetUnitFacing(globals.DamageEventTarget as unit) - angleBetweenPoints) < 20.00) {
                this.DealCriticalDamage(globals);
            }
        }
    }

    private DealCriticalDamage(globals: DamageEngineGlobals): void {
        const dmg: number = globals.DamageEventAmount * 2.00
        const sourceLoc: location = GetUnitLoc(globals.DamageEventSource as unit);
        const txt: texttag = CreateTextTagLocBJ(I2S(R2I(dmg)), sourceLoc, 1, 10, 100.00, 0.00, 0.00, 0.00);
        globals.DamageEventAmount = dmg;
        SetTextTagPermanentBJ(txt, false);
        SetTextTagLifespanBJ(txt, 2.00);
        SetTextTagVelocityBJ(txt, 64, 90);

        RemoveLocation(sourceLoc);
    }
}
