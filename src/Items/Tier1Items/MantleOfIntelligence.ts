import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { OrbOfMagic } from '../BaseItems/OrbOfMagic';
import { PipeOfInsight } from '../BaseItems/PipeOfInsight';

const itemId: number = FourCC('I03U');
const name = 'Mantle of Intelligence';
const labels: ItemLabel[] = [ItemLabel.INTELLIGENCE, ItemLabel.PERSEVERANCE];
const goldCost = 1176;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNMantleOfIntelligence.blp';
const description = `Makes you look fabolous.

|cffffcc00Intelligence:|r +12
|cffffcc00Perseverance:|r +16
|cffffcc00Effect:|r Dealing spell damage to a hero reduces the target's resistance by 15% for 5 seconds.

|cFF808080Spell damage will persevere and break through opponent's resistance.|r`;

export class MantleOfIntelligence extends ItemRecipe {
    constructor(orbOfMagic: OrbOfMagic, pipeOfInsight: PipeOfInsight) {
        super(itemId, name, labels, goldCost, iconPath, description, [orbOfMagic, pipeOfInsight]);
    }
}
