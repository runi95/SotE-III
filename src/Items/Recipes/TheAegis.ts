import { ItemRecipe } from '../ItemRecipe';
import { SteelShield } from './SteelShield';
import { Scepter } from '../BasicItems/Scepter';
import { ItemLabel } from '../ItemLabel';

// tslint:disable: max-line-length
const itemId: number = FourCC('I014');
const name: string = 'The Aegis';
const labels: ItemLabel[] = [ItemLabel.BLOCK];
const goldCost: number = 1402;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNLightningShield.blp';
const description: string = `A shield said to be forged by gods.

|cffffcc00Block:|r +15
|cffffcc00Effect (1):|r Increases charges by +1 each second
|cffffcc00Effect (2):|r Taking damage with 100 charges resets the charges and forms a shield of electricity around the wearer, dealing 70 damage per second to surrounding units for 20 seconds

|cFF808080Incoming physical damage is reduced by the amount of block you have.|r`;

export class TheAegis extends ItemRecipe {
    constructor(steelShield: SteelShield, scepter: Scepter) {
        super(itemId, name, labels, goldCost, iconPath, description, [steelShield, scepter]);
    }
}
