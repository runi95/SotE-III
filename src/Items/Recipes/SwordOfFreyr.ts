import { ItemRecipe } from '../ItemRecipe';
import { ManaAxe } from './ManaAxe';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I018');
const name: string = 'Sword of Freyr';
const labels: ItemLabel[] = [ItemLabel.STRENGTH];
const goldCost: number = 1440;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNRitualDagger.blp';
const description: string = `A sword that somehow dances in front of your very eyes.

|cffffcc00Strength:|r +7
|cffffcc00Effect:|r Summons a sword that fights by your side

|cFF808080Effects are special properties that usually trigger on an event.|r`;

export class SwordOfFreyr extends ItemRecipe {
    constructor(manaAxe: ManaAxe) {
        super(itemId, name, labels, goldCost, iconPath, description, [manaAxe]);
    }
}
