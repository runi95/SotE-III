import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { RingOfSuperiority } from '../Tier1Items/RingOfSuperiority';
import { ManaStone } from '../Tier1Items/ManaStone';

const itemId: number = FourCC('I04G');
const name: string = 'Ring of Perseverance';
const labels: ItemLabel[] = [ItemLabel.MAX_MANA, ItemLabel.PERSEVERANCE];
const goldCost: number = 8400;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNRingPurple.blp';
const description: string = `A ring once sought after by pirates

|cffffcc00Max Mana:|r +1000
|cffffcc00Perseverance:|r +150

|cFF808080Spell damage will persevere and break through opponent's resistance.|r`;

export class RingOfPerseverance extends ItemRecipe {
    constructor(ringOfSuperiority: RingOfSuperiority, manaStone: ManaStone) {
        super(itemId, name, labels, goldCost, iconPath, description, [ringOfSuperiority, manaStone]);
    }
}
