import { ItemLabel } from '../ItemLabel';
import { ItemRecipe } from '../ItemRecipe';
import { MantleOfIntelligence } from '../Tier1Items/MantleOfIntelligence';

const itemId: number = FourCC('I041');
const name = 'Enhanced Mantle of Intelligence';
const labels: ItemLabel[] = [ItemLabel.INTELLIGENCE, ItemLabel.PERSEVERANCE];
const goldCost = 9160;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNEnhancedMantleOfIntelligence.dds';
const description = `Makes you look fabolous.

|cffffcc00Intelligence:|r +70
|cffffcc00Perseverance:|r +60

|cFF808080Spell damage will persevere and break through opponent's resistance.|r`;

export class EnhancedMantleOfIntelligence extends ItemRecipe {
    constructor(mantleOfIntelligence: MantleOfIntelligence) {
        super(itemId, name, labels, goldCost, iconPath, description, [mantleOfIntelligence]);
    }
}
