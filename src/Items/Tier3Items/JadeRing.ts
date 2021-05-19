import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { RingOfMagic } from '../Tier2Items/RingOfMagic';
import { SunkenShard } from '../Tier2Items/SunkenShard';

const itemId: number = FourCC('I04S');
const name = 'Jade Ring';
const labels: ItemLabel[] = [ItemLabel.INTELLIGENCE, ItemLabel.MAX_MANA, ItemLabel.MANA_REGEN];
const goldCost = 30736;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNRingJadeFalcon.blp';
const description = `A ring infused with pure magic.

|cffffcc00Intelligence:|r +222
|cffffcc00Max Mana:|r +2222
|cffffcc00Mana regen:|r +22

|cFF808080Mana is required when casting most spells.|r`;

// TODO: Add unique effect
export class JadeRing extends ItemRecipe {
    constructor(ringOfMagic: RingOfMagic, sunkenShard: SunkenShard) {
        super(itemId, name, labels, goldCost, iconPath, description, [ringOfMagic, sunkenShard]);
    }
}
