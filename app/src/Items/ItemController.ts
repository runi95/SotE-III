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
import { RunedBracers } from './Abilities/RunedBracers';
import { SteelShieldDrop } from './Abilities/SteelShieldDrop';
import { SteelShieldPickup } from './Abilities/SteelShieldPickup';
import { GameGlobals } from '../Game/GameGlobals';
import { CoralScales } from './Recipes/CoralScales';
import { IronClaws } from './Recipes/IronClaws';
import { IronShield } from './Recipes/IronShield';
import { LoadedCannon } from './Recipes/LoadedCannon';
import { ManaAxe } from './Recipes/ManaAxe';
import { ManaBlade } from './Recipes/ManaBlade';
import { MoonArmor } from './Recipes/MoonArmor';
import { VialOfMagic } from './Recipes/VialOfMagic';
import { Soulcage } from './Recipes/Soulcage';
import { CircesStaff } from './Recipes/CircesStaff';
import { TheAegisResetCharges } from './Abilities/TheAegisResetCharges';
import { TheAegis } from './Recipes/TheAegis';

export class ItemController {
    private itemAbilities: any[];
    private itemRecipes: any[];

    constructor(gameGlobals: GameGlobals) {
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
            new RunedBracers(),
            new SteelShieldDrop(gameGlobals),
            new SteelShieldPickup(gameGlobals),
            new TheAegisResetCharges(),
        ];

        this.itemRecipes = [
            new CoralScales(),
            new IronClaws(),
            new IronShield(),
            new LoadedCannon(),
            new ManaAxe(),
            new ManaBlade(),
            new MoonArmor(),
            new VialOfMagic(),
            new Soulcage(),
            new CircesStaff(),
            new TheAegis(),
        ];
    }
}
