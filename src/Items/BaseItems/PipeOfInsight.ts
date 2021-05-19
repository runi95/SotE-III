import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I03E');
const name = 'Pipe of Insight';
const labels: ItemLabel[] = [ItemLabel.PERSEVERANCE];
const goldCost = 432;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNPipeOfInsight.blp';
const description = `This pipe used to belong to Khadgar, but not anymore.

|cffffcc00Perseverance:|r +12

|cFF808080Spell damage will persevere and break through opponent's resistance.|r`;

export class PipeOfInsight extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
