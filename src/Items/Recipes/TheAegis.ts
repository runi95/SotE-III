import { ItemRecipe } from '../ItemRecipe';
import { SteelShield } from './SteelShield';
import { Scepter } from '../BasicItems/Scepter';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I014');
const name: string = 'The Aegis';
const labels: ItemLabel[] = [ItemLabel.BLOCK];
const goldCost: number = 1402;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNLightningShield.blp';
const description: string = `A shield said to be forged by gods.

|cffffcc00Effect:|r Forms a shield of electricity around the wearer, dealing damage each second to surrounding units
|cffffcc00Block:|r +15

|cFF808080Incoming physical damage is reduced by the amount of block you have.|r`;

export class TheAegis extends ItemRecipe {
    constructor(steelShield: SteelShield, scepter: Scepter) {
        super(itemId, name, labels, goldCost, iconPath, description, [steelShield, scepter]);
    }
}
