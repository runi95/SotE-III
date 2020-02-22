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
import { ScrollOfTownPortal } from './ScrollOfTownPortal';
import { Redemption } from './Redemption';
import { RunedBracers } from './RunedBracers';
import { LionsRing } from './LionsRing';
import { RandomNumberGenerator } from '../Utility/RandomNumberGenerator';
import { Repetition } from './Repetition';
import { HawkSpellDamage } from './HawkSpellDamage';
import { Lifesteal } from './Lifesteal';
import { AssassinsBladeEvent } from './AssassinsBladeEvent';
import { Thorns } from './Thorns';
import { Reflect } from './Reflect';
import { Execute } from './Execute';
import { CriticalCast } from './CriticalCast';

export class DamageEventController {
    constructor(
        gameGlobals: GameGlobals,
        timerUtils: TimerUtils,
        randomNumberGenerator: RandomNumberGenerator,
        damageEngine: DamageEngine,
    ) {
        // Initial damage events
        damageEngine.addInitialDamageEvent(new ManaBrilliance());
        damageEngine.addInitialDamageEvent(new SpiritOfFrost(gameGlobals, randomNumberGenerator));
        damageEngine.addInitialDamageEvent(new BurnVictim(timerUtils));
        damageEngine.addInitialDamageEvent(new TheAegis(timerUtils));
        damageEngine.addInitialDamageEvent(new ScrollOfTownPortal(gameGlobals));
        damageEngine.addInitialDamageEvent(new Redemption(randomNumberGenerator));
        damageEngine.addInitialDamageEvent(new RunedBracers());
        damageEngine.addInitialDamageEvent(new LionsRing());

        // Initial damage modification events
        damageEngine.addInitialDamageModificationEvent(new AssassinsBladeEvent(gameGlobals, timerUtils));
        damageEngine.addInitialDamageModificationEvent(new PhysicalBlockEvent(gameGlobals));
        damageEngine.addInitialDamageModificationEvent(new SpellBlockEvent(gameGlobals));
        damageEngine.addInitialDamageModificationEvent(new Backstab());
        damageEngine.addInitialDamageModificationEvent(new Envenom(gameGlobals));
        damageEngine.addInitialDamageModificationEvent(new Repetition(gameGlobals));
        damageEngine.addInitialDamageModificationEvent(new HawkSpellDamage(gameGlobals));
        damageEngine.addInitialDamageModificationEvent(new Thorns(gameGlobals));
        damageEngine.addInitialDamageModificationEvent(new Reflect(gameGlobals));
        damageEngine.addInitialDamageModificationEvent(new CriticalCast(gameGlobals, randomNumberGenerator));

        // Final damage modification events
        damageEngine.addFinalDamageModificationEvent(new ManaShield());
        damageEngine.addFinalDamageModificationEvent(new Immunity(gameGlobals));
        damageEngine.addFinalDamageModificationEvent(new Execute(gameGlobals));

        // After damage events
        damageEngine.addAfterDamageEvent(new Lifesteal(gameGlobals));
    }
}
