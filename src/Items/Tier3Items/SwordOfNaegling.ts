import { ItemRecipe } from '../ItemRecipe';
import { Fragarach } from '../Tier2Items/Fragarach';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I02G');
const name = 'Sword of Naegling';
const labels: ItemLabel[] = [ItemLabel.ATTACK_DAMAGE, ItemLabel.STRENGTH, ItemLabel.AGILITY];
const goldCost = 7300;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNDarkSword.blp';
const description = `The wind howls with anticipation as you raise the sword

|cffffcc00Attack damage:|r +50
|cffffcc00Strength:|r +20
|cffffcc00Agility:|r +20
|cffffcc00Effect:|r Summons a tornado that damages and slows nearby enemies

|cFF808080Effects are special properties that usually trigger on an event.|r`;

export class SwordOfNaegling extends ItemRecipe {
    constructor(fragarach: Fragarach) {
        super(itemId, name, labels, goldCost, iconPath, description, [fragarach]);
    }
}
