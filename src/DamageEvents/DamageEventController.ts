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
import { MaulOfStrengthEvent } from './MaulOfStrengthEvent';
import { MaulOfStrengthDamageEvent } from './MaulOfStrengthDamageEvent';
import { MantleOfIntelligenceEvent } from './MantleOfIntelligenceEvent';
import { SharpSteelAxeEvent } from './SharpSteelAxeEvent';
import { CrownOfKingsEvent } from './CrownOfKingsEvent';
import { AgileBowEvent } from './AgileBowEvent';
import { RingOfKingsEvent } from './RingOfKingsEvent';
import { CriticalHit } from './CriticalHit';
import { AncientFigurineEvent } from './AncientFigurineEvent';
import { EnhancedIronClawsEvent } from './EnhancedIronClawsEvent';
import { HelmOfValorEvent } from './HelmOfValorEvent';
import { GreaterRingOfRegenerationEvent } from './GreaterRingOfRegenerationEvent';

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
        damageEngine.addInitialDamageEvent(new RunedBracers());
        damageEngine.addInitialDamageEvent(new LionsRing());
        damageEngine.addInitialDamageEvent(new MarkOfTheTalon(gameGlobals));

        // Initial damage modification events
        damageEngine.addInitialDamageModificationEvent(new AssassinsBladeEvent(gameGlobals));
        damageEngine.addInitialDamageModificationEvent(new MoonBladeEvent(gameGlobals, buffUtils));
        damageEngine.addInitialDamageModificationEvent(new PhysicalBlockEvent(gameGlobals, randomNumberGenerator));
        damageEngine.addInitialDamageModificationEvent(new SpellBlockEvent(gameGlobals, randomNumberGenerator));
        damageEngine.addInitialDamageModificationEvent(new CrownOfKingsEvent(gameGlobals));
        damageEngine.addInitialDamageModificationEvent(new HelmOfValorEvent(gameGlobals));
        damageEngine.addInitialDamageModificationEvent(new Backstab());
        damageEngine.addInitialDamageModificationEvent(new Envenom(spellCastUtils));
        damageEngine.addInitialDamageModificationEvent(new Repetition(gameGlobals));
        damageEngine.addInitialDamageModificationEvent(new HawkSpellDamage(gameGlobals));
        damageEngine.addInitialDamageModificationEvent(new EnhancedJavelinEvent(gameGlobals));
        damageEngine.addInitialDamageModificationEvent(new MagesSabatons(gameGlobals));
        damageEngine.addInitialDamageModificationEvent(new MaulOfStrengthDamageEvent(gameGlobals));
        damageEngine.addInitialDamageModificationEvent(new MantleOfIntelligenceEvent(gameGlobals, buffUtils));
        damageEngine.addInitialDamageModificationEvent(new EnhancedIronClawsEvent(gameGlobals));

        // Final damage modification events
        damageEngine.addFinalDamageModificationEvent(new ManaShield());
        damageEngine.addFinalDamageModificationEvent(new Immunity());
        damageEngine.addFinalDamageModificationEvent(new Execute(gameGlobals));
        damageEngine.addFinalDamageModificationEvent(new CriticalHit(randomNumberGenerator));
        damageEngine.addFinalDamageModificationEvent(new AncientFigurineEvent(gameGlobals));

        // After damage events
        damageEngine.addAfterDamageEvent(new Splash(gameGlobals));
        damageEngine.addAfterDamageEvent(new Lifesteal(gameGlobals));
        damageEngine.addAfterDamageEvent(new MaulOfStrengthEvent(gameGlobals, timerUtils));
        damageEngine.addAfterDamageEvent(new ElementalOrb(gameGlobals));
        damageEngine.addAfterDamageEvent(new Venom(gameGlobals, venomUtils));
        damageEngine.addAfterDamageEvent(new SharpSteelAxeEvent(gameGlobals));
        damageEngine.addAfterDamageEvent(new AgileBowEvent(gameGlobals));
        damageEngine.addAfterDamageEvent(new RingOfKingsEvent(gameGlobals));
        damageEngine.addAfterDamageEvent(new GreaterRingOfRegenerationEvent(gameGlobals, buffUtils));
        damageEngine.addAfterDamageEvent(new Thorns(gameGlobals));
        damageEngine.addAfterDamageEvent(new Reflect(gameGlobals));
        damageEngine.addAfterDamageEvent(new Redemption(randomNumberGenerator, spellCastUtils));
    }
}
