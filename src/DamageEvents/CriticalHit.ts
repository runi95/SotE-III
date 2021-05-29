import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { RandomNumberGenerator } from '../Utility/RandomNumberGenerator';
import * as settings from '../Game/GameSettings';

export class CriticalHit implements DamageEvent {
    private readonly randomNumberGenerator: RandomNumberGenerator;
    
    constructor(randomNumberGenerator: RandomNumberGenerator) {
        this.randomNumberGenerator = randomNumberGenerator;
    }

    public event(globals: DamageEngineGlobals): void {
        if (globals.DamageEventAmount < 1) {
            return;
        }

        if (globals.DamageEventDamageT === settings.DAMAGE_TYPE_UNIVERSAL) {
            return;
        }

        const randomNumber: number = this.randomNumberGenerator.random(1, 100);
        if (randomNumber <= 20) {
            globals.DamageEventAmount *= 2;
            const txt: texttag = CreateTextTag();
            SetTextTagText(txt, `${Math.floor(globals.DamageEventAmount).toString()}!`, 0.023);
            SetTextTagPos(
                txt,
                GetUnitX(globals.DamageEventSource as unit),
                GetUnitY(globals.DamageEventSource as unit),
                BlzGetUnitZ(globals.DamageEventSource as unit),
            );
            SetTextTagColor(txt, 255.0, 0.0, 0.0, 255.0);
            SetTextTagPermanent(txt, false);
            SetTextTagLifespan(txt, 4.0);
            SetTextTagVelocity(txt, 0, 0.04);
            SetTextTagFadepoint(txt, 2.5);
        }
    }
}
