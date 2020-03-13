import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { PipeOfInsight } from '../BaseItems/PipeOfInsight';
import { EmptyVial } from '../BaseItems/EmptyVial';

const itemId: number = FourCC('I03V');
const name: string = 'Ring of Superiority';
const labels: ItemLabel[] = [ItemLabel.PERSEVERANCE, ItemLabel.MAX_MANA];
const goldCost: number = 2310;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNGoldRing.blp';
const description: string = `Are you wealthy enough for this?

|cffffcc00Max Mana:|r +350
|cffffcc00Perseverance:|r +35

|cFF808080Spell damage will persevere and break through opponent's resistance.|r`;

export class RingOfSuperiority extends ItemRecipe {
    constructor(pipeOfInsight: PipeOfInsight, emptyVial: EmptyVial) {
        super(itemId, name, labels, goldCost, iconPath, description, [pipeOfInsight, emptyVial]);
    }
}
