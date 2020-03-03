import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { OrbOfMagic } from '../BaseItems/OrbOfMagic';
import { PipeOfInsight } from '../BaseItems/PipeOfInsight';

const itemId: number = FourCC('I03U');
const name: string = 'Mantle of Intelligence';
const labels: ItemLabel[] = [ItemLabel.INTELLIGENCE, ItemLabel.PERSEVERANCE];
const goldCost: number = 3440;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNMantleOfIntelligence.blp';
const description: string = `Makes you look fabolous.

|cffffcc00Intelligence:|r +20
|cffffcc00Perseverance:|r +40

|cFF808080Spell damage will persevere and break through opponent's resistance.|r`;

export class MantleOfIntelligence extends ItemRecipe {
    constructor(orbOfMagic: OrbOfMagic, pipeOfInsight: PipeOfInsight) {
        super(itemId, name, labels, goldCost, iconPath, description, [orbOfMagic, pipeOfInsight]);
    }
}
