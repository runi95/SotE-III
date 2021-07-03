import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { AncientFigurine } from '../Tier1Items/AncientFigurine';
import { CoralScales } from '../Tier1Items/CoralScales';

const itemId: number = FourCC('I05F');
const name = 'Scaly Figurine';
const labels: ItemLabel[] = [ItemLabel.INTELLIGENCE, ItemLabel.MAX_HEALTH, ItemLabel.HEALTH_REGEN];
const goldCost = 2815;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNScaledFigurine.dds';
const description = `A very old, scaly ancient figurine.

|cffffcc00Intelligence:|r +16
|cffffcc00Max health:|r +500
|cffffcc00Health regen:|r +20
|cffffcc00Effect:|r Reduces damage taken by 25% for a duration of 5 seconds after casting a spell

|cFF808080Intelligence increases the damage done by your spells.|r`;

export class ScalyFigurine extends ItemRecipe {
    constructor(ancientFigurine: AncientFigurine, coralScales: CoralScales) {
        super(itemId, name, labels, goldCost, iconPath, description, [ancientFigurine, coralScales]);
    }
}
