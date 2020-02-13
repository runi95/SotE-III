import { ClarityPotionUse } from './Abilities/ClarityPotionUse';
import { ExecutionerAxe } from './Abilities/ExecutionerAxe';
import { ExecutionerAxeResetCharges } from './Abilities/ExecutionerAxeResetCharges';
import { IronShieldDrop } from './Abilities/IronShieldDrop';
import { IronShieldPickup } from './Abilities/IronShieldPickup';
import { LoadedCannonUse } from './Abilities/LoadedCannonUse';
import { MoonArmorDrop } from './Abilities/MoonArmorDrop';
import { ImprovedMoonArmorDrop } from './Abilities/ImprovedMoonArmorDrop';
import { ImrpovedMoonArmorPickup } from './Abilities/ImprovedMoonArmorPickup';
import { MoonArmorPickup } from './Abilities/MoonArmorPickup';
import { SteelShieldDrop } from './Abilities/SteelShieldDrop';
import { TheAegisDrop } from './Abilities/TheAegisDrop';
import { TheAegisPickup } from './Abilities/TheAegisPickup';
import { SteelShieldPickup } from './Abilities/SteelShieldPickup';
import { GameGlobals } from '../Game/GameGlobals';
import { TheAegisResetCharges } from './Abilities/TheAegisResetCharges';
import { AncileDrop } from './Abilities/AncileDrop';
import { AncilePickup } from './Abilities/AncilePickup';
import { CaduceusUse } from './Abilities/CaduceusUse';
import { ScrollOfTownPortalUse } from './Abilities/ScrollOfTownPortalUse';
import { TimerUtils } from '../Utility/TimerUtils';
import { ArmoredBootsDrop } from './Abilities/ArmoredBootsDrop';
import { ArmoredBootsPickup } from './Abilities/ArmoredBootsPickup';
import { ReinforcedScalesDrop } from './Abilities/ReinforcedScalesDrop';
import { ReinforcedScalesPickup } from './Abilities/ReinforcedScalesPickup';
import { LionsRingDrop } from './Abilities/LionsRingDrop';
import { LionsRingPickup } from './Abilities/LionsRingPickup';
import { ClockworkPenguinDrop } from './Abilities/ClockworkPenguinDrop';
import { ClockworkPenguinPickup } from './Abilities/ClockworkPenguinPickup';
import { GoblinBatteryDrop } from './Abilities/GoblinBatteryDrop';
import { GoblinBatteryPickup } from './Abilities/GoblinBatteryPickup';
import { GoblinBatteryResetCharges } from './Abilities/GoblinBatteryResetCharges';
import { GoblinBatteryUse } from './Abilities/GoblinBatteryUse';
import { RandomNumberGenerator } from '../Utility/RandomNumberGenerator';
import { LightningBoltCast } from './Abilities/LightningBoltCast';
import { EnchantedShieldDrop } from './Abilities/EnchantedShieldDrop';
import { EnchantedShieldPickup } from './Abilities/EnchantedShieldPickup';
import { BalancedShieldDrop } from './Abilities/BalancedShieldDrop';
import { BalancedShieldPickup } from './Abilities/BalancedShieldPickup';
import { ImprovedBalancedShieldPickup } from './Abilities/ImprovedBalancedShieldPickup';
import { ImprovedBalancedShieldDrop } from './Abilities/ImprovedBalancedShieldDrop';
import { SnowyOwlDrop } from './Abilities/SnowyOwlDrop';
import { SnowyOwlPickup } from './Abilities/SnowyOwlPickup';
import { AdvancedReinforcedHidesDrop } from './Abilities/AdvancedReinforcedHidesDrop';
import { AdvancedReinforcedHidesPickup } from './Abilities/AdvancedReinforcedHidesPickup';
import { VampireClawsDrop } from './Abilities/VampireClawsDrop';
import { VampireClawsPickup } from './Abilities/VampireClawsPickup';
import { SpellShieldDrop } from './Abilities/SpellShieldDrop';
import { SpellShieldPickup } from './Abilities/SpellShieldPickup';
import { SacrificialDaggerResetCharges } from './Abilities/SacrificialDaggerResetCharges';
import { SacrificialDaggerUse } from './Abilities/SacrificialDaggerUse';
import { BloodiedSacrificialDaggerCast } from './Abilities/BloodiedSacrificialDaggerCast';
import { VampireDaggerCast } from './Abilities/VampireDaggerCast';
import { AssassinsBladeDrop } from './Abilities/AssassinsBladeDrop';
import { AssassinsBladePickup } from './Abilities/AssassinsBladePickup';
import { AssassinsMapDrop } from './Abilities/AssassinsMapDrop';
import { AssassinsMapPickup } from './Abilities/AssassinsMapPickup';
import { NaturesBlessingUse } from './Abilities/NaturesBlessingUse';
import { MaskOfDeathDrop } from './Abilities/MaskOfDeathDrop';
import { MaskOfDeathPickup } from './Abilities/MaskOfDeathPickup';
import { FastVampireClawsPickup } from './Abilities/FastVampireClawsPickup';
import { FastVampireClawsDrop } from './Abilities/FastVampireClawsDrop';
import { SlowChainsCast } from './Abilities/SlowChainsCast';

export class ItemController {
    private itemAbilities: any[];

    constructor(gameGlobals: GameGlobals, timerUtils: TimerUtils, randomNumberGenerator: RandomNumberGenerator, arcaneVault: unit) {
        this.itemAbilities = [
            new ClarityPotionUse(),
            new ExecutionerAxe(),
            new ExecutionerAxeResetCharges(),
            new ImprovedMoonArmorDrop(gameGlobals),
            new ImrpovedMoonArmorPickup(gameGlobals),
            new IronShieldDrop(gameGlobals),
            new IronShieldPickup(gameGlobals),
            new LoadedCannonUse(),
            new MoonArmorDrop(gameGlobals),
            new MoonArmorPickup(gameGlobals),
            new SteelShieldDrop(gameGlobals),
            new SteelShieldPickup(gameGlobals),
            new TheAegisResetCharges(),
            new TheAegisDrop(gameGlobals),
            new TheAegisPickup(gameGlobals),
            new AncileDrop(gameGlobals),
            new AncilePickup(gameGlobals),
            new CaduceusUse(arcaneVault),
            new ScrollOfTownPortalUse(gameGlobals, timerUtils),
            new ArmoredBootsDrop(gameGlobals),
            new ArmoredBootsPickup(gameGlobals),
            new ReinforcedScalesDrop(gameGlobals),
            new ReinforcedScalesPickup(gameGlobals),
            new LionsRingDrop(gameGlobals),
            new LionsRingPickup(gameGlobals),
            new ClockworkPenguinDrop(gameGlobals),
            new ClockworkPenguinPickup(gameGlobals, timerUtils),
            new GoblinBatteryDrop(gameGlobals),
            new GoblinBatteryPickup(gameGlobals, timerUtils),
            new GoblinBatteryResetCharges(),
            new GoblinBatteryUse(randomNumberGenerator),
            new LightningBoltCast(timerUtils, randomNumberGenerator),
            new EnchantedShieldDrop(gameGlobals),
            new EnchantedShieldPickup(gameGlobals),
            new BalancedShieldDrop(gameGlobals),
            new BalancedShieldPickup(gameGlobals),
            new ImprovedBalancedShieldDrop(gameGlobals),
            new ImprovedBalancedShieldPickup(gameGlobals),
            new SnowyOwlDrop(gameGlobals),
            new SnowyOwlPickup(gameGlobals, timerUtils),
            new AdvancedReinforcedHidesDrop(gameGlobals),
            new AdvancedReinforcedHidesPickup(gameGlobals),
            new VampireClawsDrop(gameGlobals),
            new VampireClawsPickup(gameGlobals),
            new SpellShieldDrop(gameGlobals),
            new SpellShieldPickup(gameGlobals),
            new SacrificialDaggerUse(),
            new SacrificialDaggerResetCharges(),
            new BloodiedSacrificialDaggerCast(),
            new VampireDaggerCast(),
            new AssassinsBladeDrop(gameGlobals),
            new AssassinsBladePickup(gameGlobals),
            new AssassinsMapDrop(),
            new AssassinsMapPickup(),
            new NaturesBlessingUse(),
            new MaskOfDeathDrop(gameGlobals),
            new MaskOfDeathPickup(gameGlobals),
            new FastVampireClawsPickup(gameGlobals),
            new FastVampireClawsDrop(gameGlobals),
            new SlowChainsCast(),
        ];
    }
}
