import { ItemRecipe } from '../ItemRecipe';
import { IronShield } from '../BaseItems/IronShield';
import { ItemLabel } from '../ItemLabel';
import { OrbOfMagic } from '../BaseItems/OrbOfMagic';

const itemId: number = FourCC('I05H');
const name = 'Corrupt Shield';
const labels: ItemLabel[] = [ItemLabel.INTELLIGENCE, ItemLabel.BLOCK];
const goldCost = 1028;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNCorruptedShield.dds';
const description = `This shield used to be worn by the paladins before it got corrupted.

|cffffcc00Intelligence:|r +10
|cffffcc00Block:|r +16
|cffffcc00Passive:|r Attacking units become cursed for 3 seconds causing their physical attacks to have a 15% chance to miss

|cFF808080Intelligence increases the damage done by your spells.|r`;

export class CorruptShield extends ItemRecipe {
    constructor(orbOfMagic: OrbOfMagic, ironShield: IronShield) {
        super(itemId, name, labels, goldCost, iconPath, description, [orbOfMagic, ironShield]);
    }
}
