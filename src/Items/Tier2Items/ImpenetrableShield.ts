import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { SteelShield } from '../Tier1Items/SteelShield';
import { CoralScales } from '../Tier1Items/CoralScales';

const itemId: number = FourCC('I02B');
const name = 'Impenetrable Shield';
const labels: ItemLabel[] = [ItemLabel.BLOCK, ItemLabel.HEALTH_REGEN, ItemLabel.MAX_HEALTH];
const goldCost = 3385;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNDefend.blp';
const description = `Nothing can get through this shield from the front.

|cffffcc00Block:|r +45
|cffffcc00Health regen:|r +20
|cffffcc00Max health:|r +250
|cffffcc00Armor:|r +1
|cffffcc00Unique:|r Any leftover block after completely blocking an incoming attack heals the wearer for the remaining amount

|cFF808080Incoming physical damage is reduced by the amount of block you have.|r`;

export class ImpenetrableShield extends ItemRecipe {
    constructor(steelShield: SteelShield, coralScales: CoralScales) {
        super(itemId, name, labels, goldCost, iconPath, description, [steelShield, coralScales]);
    }
}
