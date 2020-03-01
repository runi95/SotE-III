import { ClarityPotionUse } from './Abilities/ClarityPotionUse';
import { ExecutionerAxe } from './Abilities/ExecutionerAxe';
import { ExecutionerAxeBuy } from './Abilities/ExecutionerAxeBuy';
import { ExecutionerAxeSell } from './Abilities/ExecutionerAxeSell';
import { IronShieldDrop } from './Abilities/IronShieldDrop';
import { IronShieldPickup } from './Abilities/IronShieldPickup';
import { MoonArmorDrop } from './Abilities/MoonArmorDrop';
import { ImprovedMoonArmorDrop } from './Abilities/ImprovedMoonArmorDrop';
import { ImrpovedMoonArmorPickup } from './Abilities/ImprovedMoonArmorPickup';
import { MoonArmorPickup } from './Abilities/MoonArmorPickup';
import { SteelShieldDrop } from './Abilities/SteelShieldDrop';
import { SteelShieldPickup } from './Abilities/SteelShieldPickup';
import { GameGlobals } from '../Game/GameGlobals';
import { TheAegisResetCharges } from './Abilities/TheAegisResetCharges';
import { CaduceusUse } from './Abilities/CaduceusUse';
import { ScrollOfTownPortalUse } from './Abilities/ScrollOfTownPortalUse';
import { TimerUtils } from '../Utility/TimerUtils';
import { ArmoredBootsDrop } from './Abilities/ArmoredBootsDrop';
import { ArmoredBootsPickup } from './Abilities/ArmoredBootsPickup';
import { LionsRingDrop } from './Abilities/LionsRingDrop';
import { LionsRingPickup } from './Abilities/LionsRingPickup';
import { ClockworkPenguinDrop } from './Abilities/ClockworkPenguinDrop';
import { ClockworkPenguinPickup } from './Abilities/ClockworkPenguinPickup';
import { GoblinBatteryDrop } from './Abilities/GoblinBatteryDrop';
import { GoblinBatteryPickup } from './Abilities/GoblinBatteryPickup';
import { GoblinBatteryBuy } from './Abilities/GoblinBatteryBuy';
import { GoblinBatterySell } from './Abilities/GoblinBatterySell';
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
import { SacrificialDaggerBuy } from './Abilities/SacrificialDaggerBuy';
import { SacrificialDaggerSell } from './Abilities/SacrificialDaggerSell';
import { SacrificialDaggerUse } from './Abilities/SacrificialDaggerUse';
import { BloodiedSacrificialDaggerCast } from './Abilities/BloodiedSacrificialDaggerCast';
import { VampireDaggerCast } from './Abilities/VampireDaggerCast';
import { AssassinsBladeDrop } from './Abilities/AssassinsBladeDrop';
import { AssassinsBladePickup } from './Abilities/AssassinsBladePickup';
import { AssassinsMapDrop } from './Abilities/AssassinsMapDrop';
import { AssassinsMapPickup } from './Abilities/AssassinsMapPickup';
import { NaturesBlessingUse } from './Abilities/NaturesBlessingUse';
import { FastVampireClawsPickup } from './Abilities/FastVampireClawsPickup';
import { FastVampireClawsDrop } from './Abilities/FastVampireClawsDrop';
import { OrbOfLightningCast } from './Abilities/OrbOfLightningCast';
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
import { ThoriumSpearDrop } from './Abilities/ThoriumSpearDrop';
import { ThoriumSpearPickup } from './Abilities/ThoriumSpearPickup';
import { LongRifleDrop } from './Abilities/LongRifleDrop';
import { LongRiflePickup } from './Abilities/LongRiflePickup';
import { SpikedCarapaceDrop } from './Abilities/SpikedCarapaceDrop';
import { SpikedCarapacePickup } from './Abilities/SpikedCarapacePickup';
import { ChargedStoneDrop } from './Abilities/ChargedStoneDrop';
import { ChargedStonePickup } from './Abilities/ChargedStonePickup';
import { BrightLifeStoneDrop } from './Abilities/BrightLifeStoneDrop';
import { BrightLifeStonePickup } from './Abilities/BrightLifeStonePickup';
import { AdeptStaffDrop } from './Abilities/AdeptStaffDrop';
import { AdeptStaffPickup } from './Abilities/AdeptStaffPickup';
import { MasterStaffDrop } from './Abilities/MasterStaffDrop';
import { MasterStaffPickup } from './Abilities/MasterStaffPickup';
import { VampireFangsDrop } from './Abilities/VampireFangsDrop';
import { VampireFangsPickup } from './Abilities/VampireFangsPickup';
import { FairyWandDrop } from './Abilities/FairyWandDrop';
import { FairyWandPickup } from './Abilities/FairyWandPickup';
import { OrbOfFireDrop } from './Abilities/OrbOfFireDrop';
import { OrbOfFirePickup } from './Abilities/OrbOfFirePickup';
import { ArcaniteSpearDrop } from './Abilities/ArcaniteSpearDrop';
import { ArcaniteSpearPickup } from './Abilities/ArcaniteSpearPickup';
import { KhadgarsAmuletDrop } from './Abilities/KhadgarsAmuletDrop';
import { KhadgarsAmuletPickup } from './Abilities/KhadgarsAmuletPickup';

export class ItemController {
    private itemAbilities: any[];

    constructor(gameGlobals: GameGlobals, timerUtils: TimerUtils, randomNumberGenerator: RandomNumberGenerator, arcaneVault: unit) {
        this.itemAbilities = [
            new ClarityPotionUse(),
            new ExecutionerAxe(),
            new ExecutionerAxeBuy(),
            new ExecutionerAxeSell(),
            new ImprovedMoonArmorDrop(gameGlobals),
            new ImrpovedMoonArmorPickup(gameGlobals),
            new IronShieldDrop(gameGlobals),
            new IronShieldPickup(gameGlobals),
            new MoonArmorDrop(gameGlobals),
            new MoonArmorPickup(gameGlobals),
            new SteelShieldDrop(gameGlobals),
            new SteelShieldPickup(gameGlobals),
            new TheAegisResetCharges(),
            new CaduceusUse(arcaneVault),
            new ScrollOfTownPortalUse(gameGlobals, timerUtils),
            new ArmoredBootsDrop(gameGlobals),
            new ArmoredBootsPickup(gameGlobals),
            new LionsRingDrop(gameGlobals),
            new LionsRingPickup(gameGlobals),
            new ClockworkPenguinDrop(gameGlobals),
            new ClockworkPenguinPickup(gameGlobals, timerUtils),
            new GoblinBatteryDrop(gameGlobals),
            new GoblinBatteryPickup(gameGlobals, timerUtils),
            new GoblinBatteryBuy(),
            new GoblinBatterySell(),
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
            new SacrificialDaggerBuy(),
            new SacrificialDaggerSell(),
            new BloodiedSacrificialDaggerCast(),
            new VampireDaggerCast(),
            new AssassinsBladeDrop(gameGlobals),
            new AssassinsBladePickup(gameGlobals),
            new AssassinsMapDrop(),
            new AssassinsMapPickup(),
            new NaturesBlessingUse(),
            new FastVampireClawsPickup(gameGlobals),
            new FastVampireClawsDrop(gameGlobals),
            new OrbOfLightningCast(),
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
            new ThoriumSpearDrop(gameGlobals),
            new ThoriumSpearPickup(gameGlobals),
            new LongRifleDrop(gameGlobals),
            new LongRiflePickup(gameGlobals),
            new SpikedCarapaceDrop(gameGlobals),
            new SpikedCarapacePickup(gameGlobals),
            new ChargedStoneDrop(gameGlobals),
            new ChargedStonePickup(gameGlobals),
            new BrightLifeStoneDrop(gameGlobals),
            new BrightLifeStonePickup(gameGlobals),
            new AdeptStaffDrop(gameGlobals),
            new AdeptStaffPickup(gameGlobals),
            new MasterStaffDrop(gameGlobals),
            new MasterStaffPickup(gameGlobals),
            new VampireFangsDrop(gameGlobals),
            new VampireFangsPickup(gameGlobals),
            new FairyWandDrop(gameGlobals),
            new FairyWandPickup(gameGlobals),
            new OrbOfFireDrop(gameGlobals),
            new OrbOfFirePickup(gameGlobals),
            new ArcaniteSpearDrop(gameGlobals),
            new ArcaniteSpearPickup(gameGlobals),
            new KhadgarsAmuletDrop(gameGlobals),
            new KhadgarsAmuletPickup(gameGlobals),
        ];
    }
}
