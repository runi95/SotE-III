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
            globals.DamageEventAmount *= 2;
            const txt: texttag = CreateTextTag();
            SetTextTagText(txt, 'Backstab!', 0.020);
            SetTextTagPos(
                txt,
                GetUnitX(globals.DamageEventSource as unit) + 32,
                GetUnitY(globals.DamageEventSource as unit),
                BlzGetUnitZ(globals.DamageEventSource as unit),
            );
            SetTextTagColor(txt, 255.0, 0.0, 0.0, 255.0);
            SetTextTagPermanent(txt, false);
            SetTextTagLifespan(txt, 1.5);
            SetTextTagVelocity(txt, 0, 0.01);
            SetTextTagFadepoint(txt, 0.9375);
        }
    }
}
