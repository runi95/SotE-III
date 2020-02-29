import { ItemRecipe } from '../ItemRecipe';
import { CoralScales } from '../Tier1Items/CoralScales';
import { ItemLabel } from '../ItemLabel';
import { ImprovedReinforcedHide } from '../Tier1Items/ImprovedReinforcedHide';
import { ReinforcedLeatherArmor } from '../Tier1Items/ReinforcedLeatherArmor';

const itemId: number = FourCC('I01K');
const name: string = 'Reinforced Scales';
const labels: ItemLabel[] = [ItemLabel.HEALTH_REGEN, ItemLabel.MAX_HEALTH, ItemLabel.BLOCK];
const goldCost: number = 4800;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNNagaArmorUp3.blp';
const description: string = `Highly reinforced scales, sure to defend against the strongest of opponents.

|cffffcc00Health regen:|r +40
|cffffcc00Max health:|r +500

|cFF808080Health determines how much damage you can take before dying.|r`;

export class ReinforcedScales extends ItemRecipe {
    constructor(coralScales: CoralScales, improvedReinforcedHide: ImprovedReinforcedHide, reinforcedLeatherArmor: ReinforcedLeatherArmor) {
        super(itemId, name, labels, goldCost, iconPath, description, [coralScales, improvedReinforcedHide, reinforcedLeatherArmor]);
    }
}
