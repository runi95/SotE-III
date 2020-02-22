import { ItemRecipe } from '../ItemRecipe';
import { SharpSteelAxe } from './SharpSteelAxe';
import { ItemLabel } from '../ItemLabel';
import { Scepter } from '../BasicItems/Scepter';

const itemId: number = FourCC('I018');
const name: string = 'Sword of Freyr';
const labels: ItemLabel[] = [ItemLabel.STRENGTH, ItemLabel.ATTACK_DAMAGE];
const goldCost: number = 2790;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNRitualDagger.blp';
const description: string = `A sword that somehow dances in front of your very eyes.

|cffffcc00Strength:|r +12
|cffffcc00Attack damage:|r +15
|cffffcc00Effect:|r Summons a sword that fights by your side

|cFF808080Effects are special properties that usually trigger on an event.|r`;

export class SwordOfFreyr extends ItemRecipe {
    constructor(sharpSteelAxe: SharpSteelAxe, scepter: Scepter) {
        super(itemId, name, labels, goldCost, iconPath, description, [sharpSteelAxe, scepter]);
    }
}
