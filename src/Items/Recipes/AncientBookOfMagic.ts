import { ItemRecipe } from '../ItemRecipe';
import { CrystalBall } from '../BasicItems/CrystalBall';
import { ItemLabel } from '../ItemLabel';
import { BookOfMagic } from './BookOfMagic';
import { BlueSoulstone } from '../BasicItems/BlueSoulstone';

const itemId: number = FourCC('I036');
const name: string = 'Ancient Book of Magic';
const labels: ItemLabel[] = [ItemLabel.INTELLIGENCE, ItemLabel.MAX_MANA];
const goldCost: number = 21800;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNSorceressMaster.blp';
const description: string = `A book containing long lost knowledge.

|cffffcc00Intelligence:|r +200
|cffffcc00Max Mana:|r +600

|cFF808080Intelligence increases the damage done by your spells.|r`;

export class AncientBookOfMagic extends ItemRecipe {
    constructor(bookOfMagic: BookOfMagic, blueSoulstone: BlueSoulstone) {
        super(itemId, name, labels, goldCost, iconPath, description, [bookOfMagic, blueSoulstone, blueSoulstone]);
    }
}
