import { ClarityPotionUse } from './Abilities/ClarityPotionUse';
import { ExecutionerAxe } from './Abilities/ExecutionerAxe';
import { ExecutionerAxeBuy } from './Abilities/ExecutionerAxeBuy';
import { ExecutionerAxeSell } from './Abilities/ExecutionerAxeSell';
import { IronShieldPickupAndDrop } from './Abilities/IronShieldPickupAndDrop';
import { MoonArmorPickupAndDrop } from './Abilities/MoonArmorPickupAndDrop';
import { ImprovedMoonArmorPickupAndDrop } from './Abilities/ImprovedMoonArmorPickupAndDrop';
import { SteelShieldPickupAndDrop } from './Abilities/SteelShieldPickupAndDrop';
import { GameGlobals } from '../Game/GameGlobals';
import { TheAegisResetCharges } from './Abilities/TheAegisResetCharges';
import { CaduceusUse } from './Abilities/CaduceusUse';
import { ScrollOfTownPortalUse } from './Abilities/ScrollOfTownPortalUse';
import { TimerUtils } from '../Utility/TimerUtils';
import { ArmoredBootsPickupAndDrop } from './Abilities/ArmoredBootsPickupAndDrop';
import { LionsRingPickupAndDrop } from './Abilities/LionsRingPickupAndDrop';
import { ClockworkPenguinPickupAndDrop } from './Abilities/ClockworkPenguinPickupAndDrop';
import { GoblinBatteryPickupAndDrop } from './Abilities/GoblinBatteryPickupAndDrop';
import { GoblinBatteryBuy } from './Abilities/GoblinBatteryBuy';
import { GoblinBatterySell } from './Abilities/GoblinBatterySell';
import { GoblinBatteryUse } from './Abilities/GoblinBatteryUse';
import { RandomNumberGenerator } from '../Utility/RandomNumberGenerator';
import { LightningBoltCast } from './Abilities/LightningBoltCast';
import { BalancedShieldPickupAndDrop } from './Abilities/BalancedShieldPickupAndDrop';
import { ImprovedBalancedShieldPickupAndDrop } from './Abilities/ImprovedBalancedShieldPickupAndDrop';
import { SnowyOwlPickupAndDrop } from './Abilities/SnowyOwlPickupAndDrop';
import { AdvancedReinforcedHidesPickupAndDrop } from './Abilities/AdvancedReinforcedHidesPickupAndDrop';
import { VampireClawsPickupAndDrop } from './Abilities/VampireClawsPickupAndDrop';
import { SpellShieldPickupAndDrop } from './Abilities/SpellShieldPickupAndDrop';
import { SacrificialDaggerBuy } from './Abilities/SacrificialDaggerBuy';
import { SacrificialDaggerSell } from './Abilities/SacrificialDaggerSell';
import { SacrificialDaggerUse } from './Abilities/SacrificialDaggerUse';
import { BloodiedSacrificialDaggerCast } from './Abilities/BloodiedSacrificialDaggerCast';
import { VampireDaggerCast } from './Abilities/VampireDaggerCast';
import { AssassinsBladePickupAndDrop } from './Abilities/AssassinsBladePickupAndDrop';
import { AssassinsMapPickupAndDrop } from './Abilities/AssassinsMapPickupAndDrop';
import { NaturesBlessingUse } from './Abilities/NaturesBlessingUse';
import { FastVampireClawsPickupAndDrop } from './Abilities/FastVampireClawsPickupAndDrop';
import { OrbOfLightningCast } from './Abilities/OrbOfLightningCast';
import { AdvancedCreatureClawsPickupAndDrop } from './Abilities/AdvancedCreatureClawsPickupAndDrop';
import { IronwoodBranchPickupAndDrop } from './Abilities/IronwoodBranchPickupAndDrop';
import { AmuletOfSpellReflectionPickupAndDrop } from './Abilities/AmuletOfSpellReflectionPickupAndDrop';
import { ExecutionersAxePickupAndDrop } from './Abilities/ExecutionersAxePickupAndDrop';
import { BloodiedExecutionersAxePickupAndDrop } from './Abilities/BloodiedExecutionersAxePickupAndDrop';
import { LifeStonePickupAndDrop } from './Abilities/LifeStonePickupAndDrop';
import { SteelSpearPickupAndDrop } from './Abilities/SteelSpearPickupAndDrop';
import { PipeOfInsightPickupAndDrop } from './Abilities/PipeOfInsightPickupAndDrop';
import { JavelinPickupAndDrop } from './Abilities/JavelinPickupAndDrop';
import { LongRiflePickupAndDrop } from './Abilities/LongRiflePickupAndDrop';
import { SpikedCarapacePickupAndDrop } from './Abilities/SpikedCarapacePickupAndDrop';
import { ChargedStonePickupAndDrop } from './Abilities/ChargedStonePickupAndDrop';
import { BrightLifeStonePickupAndDrop } from './Abilities/BrightLifeStonePickupAndDrop';
import { AdeptStaffPickupAndDrop } from './Abilities/AdeptStaffPickupAndDrop';
import { MasterStaffPickupAndDrop } from './Abilities/MasterStaffPickupAndDrop';
import { VampireFangsPickupAndDrop } from './Abilities/VampireFangsPickupAndDrop';
import { VampireFangsPickup } from './Abilities/VampireFangsPickup';
import { FairyWandPickupAndDrop } from './Abilities/FairyWandPickupAndDrop';
import { OrbOfFirePickupAndDrop } from './Abilities/OrbOfFirePickupAndDrop';
import { ArcaniteSpearPickupAndDrop } from './Abilities/ArcaniteSpearPickupAndDrop';
import { KhadgarsAmuletPickupAndDrop } from './Abilities/KhadgarsAmuletPickupAndDrop';
import { AmuletOfProtectionPickupAndDrop } from './Abilities/AmuletOfProtectionPickupAndDrop';
import { MasterExecutionerAxePickupAndDrop } from './Abilities/MasterExecutionerAxePickupAndDrop';
import { ShimmerWeedPickupAndDrop } from './Abilities/ShimmerWeedPickupAndDrop';
import { MagesSabatonsPickupAndDrop } from './Abilities/MagesSabatonsPickupAndDrop';
import { ScaledBootsPickupAndDrop } from './Abilities/ScaledBootsPickupAndDrop';
import { AssassinsBladeSell } from './Abilities/AssassinsBladeSell';
import { MoonBladePickupAndDrop } from './Abilities/MoonBladePickupAndDrop';
import { FullVialPickupAndDrop } from './Abilities/FullVialPickupAndDrop';
import { FullVialSell } from './Abilities/FullVialSell';
import { MaskOfProficiencyPickupAndDrop } from './Abilities/MaskOfProficiencyPickupAndDrop';
import { MaskOfProficiencySell } from './Abilities/MaskOfProficiencySell';
import { MaskOfProficiencyCast } from './Abilities/MaskOfProficiencyCast';

export class ItemController {
    private itemAbilities: any[];

    constructor(gameGlobals: GameGlobals, timerUtils: TimerUtils, randomNumberGenerator: RandomNumberGenerator, arcaneVault: unit) {
        this.itemAbilities = [
            new ClarityPotionUse(),
            new ExecutionerAxe(),
            new ExecutionerAxeBuy(),
            new ExecutionerAxeSell(),
            new ImprovedMoonArmorPickupAndDrop(gameGlobals),
            new IronShieldPickupAndDrop(gameGlobals),
            new MoonArmorPickupAndDrop(gameGlobals),
            new SteelShieldPickupAndDrop(gameGlobals),
            new TheAegisResetCharges(),
            new CaduceusUse(arcaneVault),
            new ScrollOfTownPortalUse(gameGlobals, timerUtils),
            new ArmoredBootsPickupAndDrop(gameGlobals),
            new MagesSabatonsPickupAndDrop(gameGlobals),
            new LionsRingPickupAndDrop(gameGlobals),
            new ClockworkPenguinPickupAndDrop(gameGlobals, timerUtils),
            new GoblinBatteryPickupAndDrop(gameGlobals, timerUtils),
            new GoblinBatteryBuy(),
            new GoblinBatterySell(),
            new GoblinBatteryUse(randomNumberGenerator),
            new LightningBoltCast(timerUtils, randomNumberGenerator),
            new BalancedShieldPickupAndDrop(gameGlobals),
            new ImprovedBalancedShieldPickupAndDrop(gameGlobals),
            new SnowyOwlPickupAndDrop(gameGlobals, timerUtils),
            new AdvancedReinforcedHidesPickupAndDrop(gameGlobals),
            new VampireClawsPickupAndDrop(gameGlobals),
            new SpellShieldPickupAndDrop(gameGlobals),
            new SacrificialDaggerUse(),
            new SacrificialDaggerBuy(),
            new SacrificialDaggerSell(),
            new BloodiedSacrificialDaggerCast(),
            new VampireDaggerCast(),
            new AssassinsBladePickupAndDrop(gameGlobals, timerUtils),
            new AssassinsMapPickupAndDrop(),
            new NaturesBlessingUse(),
            new FastVampireClawsPickupAndDrop(gameGlobals),
            new OrbOfLightningCast(),
            new AdvancedCreatureClawsPickupAndDrop(gameGlobals),
            new IronwoodBranchPickupAndDrop(gameGlobals),
            new AmuletOfSpellReflectionPickupAndDrop(gameGlobals),
            new ExecutionersAxePickupAndDrop(gameGlobals),
            new BloodiedExecutionersAxePickupAndDrop(gameGlobals),
            new LifeStonePickupAndDrop(gameGlobals),
            new SteelSpearPickupAndDrop(gameGlobals),
            new PipeOfInsightPickupAndDrop(gameGlobals),
            new JavelinPickupAndDrop(gameGlobals),
            new LongRiflePickupAndDrop(gameGlobals),
            new SpikedCarapacePickupAndDrop(gameGlobals),
            new ChargedStonePickupAndDrop(gameGlobals),
            new BrightLifeStonePickupAndDrop(gameGlobals),
            new AdeptStaffPickupAndDrop(gameGlobals),
            new MasterStaffPickupAndDrop(gameGlobals),
            new VampireFangsPickupAndDrop(gameGlobals),
            new VampireFangsPickup(gameGlobals),
            new FairyWandPickupAndDrop(gameGlobals),
            new OrbOfFirePickupAndDrop(gameGlobals),
            new ArcaniteSpearPickupAndDrop(gameGlobals),
            new KhadgarsAmuletPickupAndDrop(gameGlobals),
            new AmuletOfProtectionPickupAndDrop(gameGlobals),
            new MasterExecutionerAxePickupAndDrop(gameGlobals),
            new ShimmerWeedPickupAndDrop(gameGlobals),
            new ScaledBootsPickupAndDrop(gameGlobals),
            new AssassinsBladeSell(),
            new MoonBladePickupAndDrop(gameGlobals),
            new FullVialPickupAndDrop(gameGlobals, timerUtils),
            new FullVialSell(),
            new MaskOfProficiencyPickupAndDrop(gameGlobals, timerUtils),
            new MaskOfProficiencySell(),
            new MaskOfProficiencyCast(),
        ];
    }
}
