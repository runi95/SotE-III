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
import { Splash } from './Splash';
import { ElementalOrb } from './ElementalOrb';
import { EnhancedJavelinEvent } from './EnhancedJavelinEvent';
import { MarkOfTheTalon } from './MarkOfTheTalon';
import { Venom } from './Venom';
import { VenomUtils } from '../Utility/VenomUtils';
import { MagesSabatons } from './MagesSabatons';
import { MoonBladeEvent } from './MoonBladeEvent';
import { BuffUtils } from '../Utility/BuffUtils';
import { SpellCastUtils } from '../Utility/SpellCastUtils';

export class DamageEventController {
    constructor(
        gameGlobals: GameGlobals,
        timerUtils: TimerUtils,
        venomUtils: VenomUtils,
        randomNumberGenerator: RandomNumberGenerator,
        buffUtils: BuffUtils,
        damageEngine: DamageEngine,
        spellCastUtils: SpellCastUtils,
    ) {
        // Initial damage events
        damageEngine.addInitialDamageEvent(new ManaBrilliance());
        damageEngine.addInitialDamageEvent(new SpiritOfFrost(randomNumberGenerator, spellCastUtils));
        damageEngine.addInitialDamageEvent(new BurnVictim(timerUtils, spellCastUtils));
        damageEngine.addInitialDamageEvent(new TheAegis(timerUtils));
        damageEngine.addInitialDamageEvent(new ScrollOfTownPortal(gameGlobals));
        damageEngine.addInitialDamageEvent(new Redemption(randomNumberGenerator, spellCastUtils));
        damageEngine.addInitialDamageEvent(new RunedBracers());
        damageEngine.addInitialDamageEvent(new LionsRing());
        damageEngine.addInitialDamageEvent(new MarkOfTheTalon(gameGlobals));

        // Initial damage modification events
        damageEngine.addInitialDamageModificationEvent(new AssassinsBladeEvent(gameGlobals));
        damageEngine.addInitialDamageModificationEvent(new MoonBladeEvent(gameGlobals, buffUtils));
        damageEngine.addInitialDamageModificationEvent(new PhysicalBlockEvent(gameGlobals, randomNumberGenerator));
        damageEngine.addInitialDamageModificationEvent(new SpellBlockEvent(gameGlobals, randomNumberGenerator));
        damageEngine.addInitialDamageModificationEvent(new Backstab());
        damageEngine.addInitialDamageModificationEvent(new Envenom(spellCastUtils));
        damageEngine.addInitialDamageModificationEvent(new Repetition(gameGlobals));
        damageEngine.addInitialDamageModificationEvent(new HawkSpellDamage(gameGlobals));
        damageEngine.addInitialDamageModificationEvent(new Thorns(gameGlobals));
        damageEngine.addInitialDamageModificationEvent(new Reflect(gameGlobals));
        damageEngine.addInitialDamageModificationEvent(new CriticalCast(gameGlobals, randomNumberGenerator));
        damageEngine.addInitialDamageModificationEvent(new EnhancedJavelinEvent(gameGlobals));
        damageEngine.addInitialDamageModificationEvent(new MagesSabatons(gameGlobals));

        // Final damage modification events
        damageEngine.addFinalDamageModificationEvent(new ManaShield());
        damageEngine.addFinalDamageModificationEvent(new Immunity(gameGlobals));
        damageEngine.addFinalDamageModificationEvent(new Execute(gameGlobals));
        damageEngine.addAfterDamageEvent(new Splash(gameGlobals));

        // After damage events
        damageEngine.addAfterDamageEvent(new Lifesteal(gameGlobals));
        damageEngine.addAfterDamageEvent(new ElementalOrb(gameGlobals));
        damageEngine.addAfterDamageEvent(new Venom(gameGlobals, venomUtils));
    }
}
