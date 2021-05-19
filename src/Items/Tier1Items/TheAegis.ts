import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { GoblinBattery } from '../BaseItems/GoblinBattery';

// tslint:disable: max-line-length
const itemId: number = FourCC('I014');
const name = 'The Aegis';
const labels: ItemLabel[] = [];
const goldCost = 1985;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNLightningShield.blp';
const description = `A shield said to be forged by gods.

|cffffcc00Effect (1):|r Increases charges by +1 each second
|cffffcc00Effect (2):|r Taking damage with 100 charges resets the charges and forms a shield of electricity around the wearer, dealing 350 damage per second to surrounding units for 20 seconds

|cFF808080Incoming physical damage is reduced by the amount of block you have.|r`;

export class TheAegis extends ItemRecipe {
    constructor(goblinBattery: GoblinBattery) {
        super(itemId, name, labels, goldCost, iconPath, description, [goblinBattery]);
    }
}
