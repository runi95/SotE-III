import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { RandomNumberGenerator } from '../Utility/RandomNumberGenerator';
import { GameGlobals } from '../Game/GameGlobals';

export class CriticalCast implements DamageEvent {
    private readonly gameGlobals: GameGlobals;
    private readonly randomNumberGenerator: RandomNumberGenerator;

    constructor(gameGlobals: GameGlobals, randomNumberGenerator: RandomNumberGenerator) {
        this.gameGlobals = gameGlobals;
        this.randomNumberGenerator = randomNumberGenerator;
    }

    public event(globals: DamageEngineGlobals): void {
        if (!globals.IsDamageSpell) {
            return;
        }

        const playerId: number = GetPlayerId(GetOwningPlayer(globals.DamageEventSource as unit));
        if (playerId < 0 || playerId >= bj_MAX_PLAYERS) {
            return;
        }

        const criticalChance: number = this.gameGlobals.PlayerCriticalCast[playerId];
        if (criticalChance < 1) {
            return;
        }

        if (!(criticalChance >= 100 || this.randomNumberGenerator.random(0, 100) <= criticalChance)) {
            return;
        }

        globals.DamageEventAmount *= 2;
        const txt: texttag = CreateTextTag();
        SetTextTagText(txt, Math.floor(globals.DamageEventAmount).toString(), 0.02);
        SetTextTagPos(
            txt,
            GetUnitX(globals.DamageEventSource as unit),
            GetUnitY(globals.DamageEventSource as unit),
            BlzGetUnitZ(globals.DamageEventSource as unit),
        );
        SetTextTagColor(txt, 255.0, 127.0, 80.0, 255.0);
        SetTextTagPermanent(txt, false);
        SetTextTagLifespan(txt, 2.0);
        SetTextTagVelocityBJ(txt, 64, 90);
    }
}
