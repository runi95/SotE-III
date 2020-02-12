import { ItemRecipe } from '../ItemRecipe';
import { SteelShield } from './SteelShield';
import { CoralScales } from './CoralScales';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I01K');
const name: string = 'Reinforced Scales';
const labels: ItemLabel[] = [ItemLabel.HEALTH_REGEN, ItemLabel.MAX_HEALTH, ItemLabel.BLOCK];
const goldCost: number = 2990;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNNagaArmorUp3.blp';
const description: string = `Highly reinforced scales, sure to defend against the strongest of opponents.

|cffffcc00Health regen:|r +15
|cffffcc00Max health:|r +150
|cffffcc00Block:|r +20

|cFF808080Health determines how much damage you can take before dying.|r`;

export class ReinforcedScales extends ItemRecipe {
    constructor(steelShield: SteelShield, coralScales: CoralScales) {
        super(itemId, name, labels, goldCost, iconPath, description, [steelShield, coralScales]);
    }
}
