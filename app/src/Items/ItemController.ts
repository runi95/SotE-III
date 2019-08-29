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
import { CoralScales } from './Recipes/CoralScales';
import { IronClaws } from './Recipes/IronClaws';
import { SteelShield } from './Recipes/SteelShield';
import { LoadedCannon } from './Recipes/LoadedCannon';
import { ManaAxe } from './Recipes/ManaAxe';
import { ManaBlade } from './Recipes/ManaBlade';
import { ImprovedMoonArmor } from './Recipes/ImprovedMoonArmor';
import { VialOfMagic } from './Recipes/VialOfMagic';
import { Soulcage } from './Recipes/Soulcage';
import { CircesStaff } from './Recipes/CircesStaff';
import { TheAegisResetCharges } from './Abilities/TheAegisResetCharges';
import { TheAegis } from './Recipes/TheAegis';
import { Ancile } from './Recipes/Ancile';
import { AncileDrop } from './Abilities/AncileDrop';
import { AncilePickup } from './Abilities/AncilePickup';
import { Fragarach } from './Recipes/Fragarach';
import { SwordOfFreyr } from './Recipes/SwordOfFreyr';
import { Caduceus } from './Recipes/Caduceus';
import { CaduceusUse } from './Abilities/CaduceusUse';
import { ScrollOfTownPortalUse } from './Abilities/ScrollOfTownPortalUse';
import { TimerUtils } from '../Utility/TimerUtils';
import { AgileSlippers } from './Recipes/AgileSlippers';
import { ArmoredBoots } from './Recipes/ArmoredBoots';
import { ArmoredBootsDrop } from './Abilities/ArmoredBootsDrop';
import { ArmoredBootsPickup } from './Abilities/ArmoredBootsPickup';
import { ThrowableAxe } from './Recipes/ThrowableAxe';
import { AdeptCrystalBall } from './Recipes/AdeptCrystalBall';
import { MasterCrystalBall } from './Recipes/MasterCrystalBall';
import { ScrollOfAgility } from './Recipes/ScrollOfAgility';
import { CloakOfShadowWalk } from './Recipes/CloakOfShadowWalk';
import { ReinforcedScales } from './Recipes/ReinforcedScales';
import { ReinforcedScalesDrop } from './Abilities/ReinforcedScalesDrop';
import { ReinforcedScalesPickup } from './Abilities/ReinforcedScalesPickup';
import { LionsRing } from './Recipes/LionsRing';
import { LionsRingDrop } from './Abilities/LionsRingDrop';
import { LionsRingPickup } from './Abilities/LionsRingPickup';
import { ClockworkPenguinDrop } from './Abilities/ClockworkPenguinDrop';
import { ClockworkPenguinPickup } from './Abilities/ClockworkPenguinPickup';
import { GoblinBatteryDrop } from './Abilities/GoblinBatteryDrop';
import { GoblinBatteryPickup } from './Abilities/GoblinBatteryPickup';
import { GoblinBatteryResetCharges } from './Abilities/GoblinBatteryResetCharges';
import { GoblinBatteryUse } from './Abilities/GoblinBatteryUse';
import { RandomNumberGenerator } from '../Utility/RandomNumberGenerator';
import { LightningBolt } from './Recipes/LightningBolt';
import { LightningBoltCast } from './Abilities/LightningBoltCast';

export class ItemController {
    private itemAbilities: any[];
    private itemRecipes: any[];

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
        ];

        this.itemRecipes = [
            new CoralScales(),
            new IronClaws(),
            new SteelShield(),
            new LoadedCannon(),
            new ManaAxe(),
            new ManaBlade(),
            new ImprovedMoonArmor(),
            new VialOfMagic(),
            new Soulcage(),
            new CircesStaff(),
            new TheAegis(),
            new Ancile(),
            new Fragarach(),
            new SwordOfFreyr(),
            new Caduceus(),
            new AgileSlippers(),
            new ArmoredBoots(),
            new ThrowableAxe(),
            new AdeptCrystalBall(),
            new MasterCrystalBall(),
            new ScrollOfAgility(),
            new CloakOfShadowWalk(),
            new ReinforcedScales(),
            new LionsRing(),
            new LightningBolt(),
        ];
    }
}
