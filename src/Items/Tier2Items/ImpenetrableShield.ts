import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { SteelShield } from '../Tier1Items/SteelShield';
import { CoralScales } from '../Tier1Items/CoralScales';
import { BalancedShield } from '../Tier1Items/BalancedShield';

const itemId: number = FourCC('I02B');
const name: string = 'Impenetrable Shield';
const labels: ItemLabel[] = [ItemLabel.BLOCK, ItemLabel.HEALTH_REGEN, ItemLabel.MAX_HEALTH];
const goldCost: number = 4590;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNDefend.blp';
const description: string = `Nothing can get through this shield from the front.

|cffffcc00Block:|r +70
|cffffcc00Health regen:|r +20
|cffffcc00Max health:|r +345
|cffffcc00Armor:|r +1
|cffffcc00Unique:|r Any leftover block after completely blocking an incoming attack heals the wearer for the remaining amount

|cFF808080Incoming physical damage is reduced by the amount of block you have.|r`;

export class ImpenetrableShield extends ItemRecipe {
    constructor(steelShield: SteelShield, coralScales: CoralScales, balancedShield: BalancedShield) {
        super(itemId, name, labels, goldCost, iconPath, description, [steelShield, coralScales, balancedShield]);
    }
}
