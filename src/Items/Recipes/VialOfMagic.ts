import { ItemRecipe } from '../ItemRecipe';
import { OrbOfMagic } from '../BasicItems/OrbOfMagic';
import { EmptyVial } from '../BasicItems/EmptyVial';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I001');
const name: string = 'Vial of Magic';
const labels: ItemLabel[] = [ItemLabel.INTELLIGENCE, ItemLabel.MAX_MANA];
const goldCost: number = 680;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNVialFull.blp';
const description: string = `An orb full of potencial magic if you know how to extract it.

|cffffcc00Intelligence:|r +5
|cffffcc00Max Mana:|r +60

|cFF808080Intelligence increases the damage done by your spells.|r`;

export class VialOfMagic extends ItemRecipe {
    constructor(orbOfMagic: OrbOfMagic, emptyVial: EmptyVial) {
        super(itemId, name, labels, goldCost, iconPath, description, [orbOfMagic, emptyVial]);
    }
}
