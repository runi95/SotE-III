import { DamageEngine } from '../DamageEngine/DamageEngine';
import { GameGlobals } from '../Game/GameGlobals';
import { PhysicalBlockEvent } from './PhysicalBlockEvent';
import { SpellBlockEvent } from './SpellBlockEvent';
import { Backstab } from './Backstab';
import { ManaShield } from './ManaShield';
import { ManaBrilliance } from './ManaBrilliance';
import { Envenom } from './Envenom';
import { Immunity } from './Immunity';
import { SpiritOfFrost } from './SpiritOfFrost';
import { TimerUtils } from '../Utility/TimerUtils';
import { BurnVictim } from './BurnVictim';
import { TheAegis } from './TheAegis';

export class DamageEventController {
    constructor(gameGlobals: GameGlobals, timerUtils: TimerUtils, damageEngine: DamageEngine) {
        // Initial damage events
        damageEngine.AddInitialDamageEvent(new ManaBrilliance());
        damageEngine.AddInitialDamageEvent(new SpiritOfFrost(gameGlobals));
        damageEngine.AddInitialDamageEvent(new BurnVictim(timerUtils));
        damageEngine.AddInitialDamageEvent(new TheAegis(timerUtils));

        // Initial damage modification events
        damageEngine.AddInitialDamageModificationEvent(new PhysicalBlockEvent(gameGlobals));
        damageEngine.AddInitialDamageModificationEvent(new SpellBlockEvent(gameGlobals));
        damageEngine.AddInitialDamageModificationEvent(new Backstab());
        damageEngine.AddInitialDamageModificationEvent(new Envenom(gameGlobals));

        // Final damage modification events
        damageEngine.AddFinalDamageModificationEvent(new ManaShield());
        damageEngine.AddFinalDamageModificationEvent(new Immunity(gameGlobals));
    }
}
