import { ItemLabel } from '../ItemLabel';
import { ItemRecipe } from '../ItemRecipe';
import { MantleOfIntelligence } from '../Tier1Items/MantleOfIntelligence';
import { BookOfKnowledge } from '../Tier1Items/BookOfKnowledge';

const itemId: number = FourCC('I041');
const name: string = 'Enhanced Mantle of Intelligence';
const labels: ItemLabel[] = [ItemLabel.INTELLIGENCE, ItemLabel.PERSEVERANCE];
const goldCost: number = 9160;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNEnhancedMantleOfIntelligence.dds';
const description: string = `Makes you look fabolous.

|cffffcc00Intelligence:|r +70
|cffffcc00Perseverance:|r +60

|cFF808080Spell damage will persevere and break through opponent's resistance.|r`;

export class EnhancedMantleOfIntelligence extends ItemRecipe {
    constructor(mantleOfIntelligence: MantleOfIntelligence, bookOfKnowledge: BookOfKnowledge) {
        super(itemId, name, labels, goldCost, iconPath, description, [mantleOfIntelligence, bookOfKnowledge]);
    }
}
