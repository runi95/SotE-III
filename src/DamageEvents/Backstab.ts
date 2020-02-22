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
            const dmg: number = globals.DamageEventAmount * 2.0;
            const txt: texttag = CreateTextTag();
            SetTextTagText(txt, Math.floor(dmg).toString(), 0.02);
            SetTextTagPos(
                txt,
                GetUnitX(globals.DamageEventSource as unit),
                GetUnitY(globals.DamageEventSource as unit),
                BlzGetUnitZ(globals.DamageEventSource as unit),
            );
            SetTextTagColor(txt, 255.0, 0.0, 0.0, 255.0);
            SetTextTagPermanent(txt, false);
            SetTextTagLifespan(txt, 2.0);
            SetTextTagVelocityBJ(txt, 64, 90);
        }
    }
}
