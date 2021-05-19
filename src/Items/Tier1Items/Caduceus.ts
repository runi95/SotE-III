import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { Scepter } from '../BaseItems/Scepter';

const itemId: number = FourCC('I019');
const name = 'Caduceus';
const labels: ItemLabel[] = [];
const goldCost = 600;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNWandOfManaSteal.blp';
const description = `Caduceus the protector of merchants and travellers.

|cffffcc00Use:|r Instantly teleport to the Arcane Vault
|cffffcc00Mana Cost:|r 0
|cffffcc00Cooldown:|r 240

|cFF808080Use is an effect that occurs when an item is used by clicking on it.|r`;

export class Caduceus extends ItemRecipe {
    constructor(scepter: Scepter) {
        super(itemId, name, labels, goldCost, iconPath, description, [scepter]);
    }
}
