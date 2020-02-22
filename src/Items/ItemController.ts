import { ClarityPotionUse } from './Abilities/ClarityPotionUse';
import { ExecutionerAxe } from './Abilities/ExecutionerAxe';
import { ExecutionerAxeResetCharges } from './Abilities/ExecutionerAxeResetCharges';
import { IronShieldDrop } from './Abilities/IronShieldDrop';
import { IronShieldPickup } from './Abilities/IronShieldPickup';
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
import { OrbOfLightningCast } from './Abilities/OrbOfLightningCast';
import { LightningBoltDrop } from './Abilities/LightningBoltDrop';
import { LightningBoltPickup } from './Abilities/LightningBoltPickup';
import { AdvancedStrengthOfTheWildDrop } from './Abilities/AdvancedStrengthOfTheWildDrop';
import { AdvancedStrengthOfTheWildPickup } from './Abilities/AdvancedStrengthOfTheWildPickup';
import { AdvancedCreatureClawsDrop } from './Abilities/AdvancedCreatureClawsDrop';
import { AdvancedCreatureClawsPickup } from './Abilities/AdvancedCreatureClawsPickup';
import { IronwoodBranchDrop } from './Abilities/IronwoodBranchDrop';
import { IronwoodBranchPickup } from './Abilities/IronwoodBranchPickup';
import { AmuletOfSpellReflectionDrop } from './Abilities/AmuletOfSpellReflectionDrop';
import { AmuletOfSpellReflectionPickup } from './Abilities/AmuletOfSpellReflectionPickup';
import { ExecutionersAxeDrop } from './Abilities/ExecutionersAxeDrop';
import { ExecutionersAxePickup } from './Abilities/ExecutionersAxePickup';
import { BloodiedExecutionersAxeDrop } from './Abilities/BloodiedExecutionersAxeDrop';
import { BloodiedExecutionersAxePickup } from './Abilities/BloodiedExecutionersAxePickup';
import { LifeStoneDrop } from './Abilities/LifeStoneDrop';
import { LifeStonePickup } from './Abilities/LifeStonePickup';
import { SteelSpearDrop } from './Abilities/SteelSpearDrop';
import { SteelSpearPickup } from './Abilities/SteelSpearPickup';
import { PipeOfInsightDrop } from './Abilities/PipeOfInsightDrop';
import { PipeOfInsightPickup } from './Abilities/PipeOfInsightPickup';

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
            new MoonArmorDrop(gameGlobals),
            new MoonArmorPickup(gameGlobals),
            new SteelShieldDrop(gameGlobals),
            new SteelShieldPickup(gameGlobals),
            new TheAegisResetCharges(),
            new TheAegisDrop(gameGlobals),
            new TheAegisPickup(gameGlobals),
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
            new OrbOfLightningCast(),
            new LightningBoltDrop(gameGlobals),
            new LightningBoltPickup(gameGlobals),
            new AdvancedStrengthOfTheWildDrop(gameGlobals),
            new AdvancedStrengthOfTheWildPickup(gameGlobals),
            new AdvancedCreatureClawsDrop(gameGlobals),
            new AdvancedCreatureClawsPickup(gameGlobals),
            new IronwoodBranchDrop(gameGlobals),
            new IronwoodBranchPickup(gameGlobals),
            new AmuletOfSpellReflectionDrop(gameGlobals),
            new AmuletOfSpellReflectionPickup(gameGlobals),
            new ExecutionersAxeDrop(gameGlobals),
            new ExecutionersAxePickup(gameGlobals),
            new BloodiedExecutionersAxeDrop(gameGlobals),
            new BloodiedExecutionersAxePickup(gameGlobals),
            new LifeStoneDrop(gameGlobals),
            new LifeStonePickup(gameGlobals),
            new SteelSpearDrop(gameGlobals),
            new SteelSpearPickup(gameGlobals),
            new PipeOfInsightDrop(gameGlobals),
            new PipeOfInsightPickup(gameGlobals),
        ];
    }
}
