import { ItemRecipe } from '../ItemRecipe';
import { WarAxe } from '../BaseItems/WarAxe';
import { ItemLabel } from '../ItemLabel';
import { Scepter } from '../BaseItems/Scepter';

const itemId: number = FourCC('I018');
const name = 'Sword of Freyr';
const labels: ItemLabel[] = [ItemLabel.STRENGTH, ItemLabel.ATTACK_DAMAGE];
const goldCost = 2790;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNRitualDagger.blp';
const description = `A sword that somehow dances in front of your very eyes.

|cffffcc00Strength:|r +12
|cffffcc00Attack damage:|r +15
|cffffcc00Effect:|r Summons a sword that fights by your side

|cFF808080Effects are special properties that usually trigger on an event.|r`;

export class SwordOfFreyr extends ItemRecipe {
    constructor(warAxe: WarAxe, scepter: Scepter) {
        super(itemId, name, labels, goldCost, iconPath, description, [warAxe, scepter]);
    }
}
