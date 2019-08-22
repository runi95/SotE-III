import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';

export class Backstab implements DamageEvent {
    private readonly unitTypeId: number = FourCC('E000');

    public event(globals: DamageEngineGlobals): void {
        if (GetUnitTypeId(globals.DamageEventSource as unit) !== this.unitTypeId) {
            return;
        }

        const sourceAngle: number = GetUnitFacing(globals.DamageEventSource as unit);
        const targetAngle: number = GetUnitFacing(globals.DamageEventTarget as unit);
        const angleDiff: number = Math.sqrt(Pow(sourceAngle - targetAngle, 2));
        if (angleDiff <= 35 || angleDiff >= 325) {
            const dmg: number = globals.DamageEventAmount * 2.00;
            const sourceLoc: location = GetUnitLoc(globals.DamageEventSource as unit);
            const txt: texttag = CreateTextTagLocBJ(dmg.toString(), sourceLoc, 1, 10, 100.00, 0.00, 0.00, 0.00);
            globals.DamageEventAmount = dmg;
            SetTextTagPermanentBJ(txt, false);
            SetTextTagLifespanBJ(txt, 2.00);
            SetTextTagVelocityBJ(txt, 64, 90);

            RemoveLocation(sourceLoc);
        }
    }
}
