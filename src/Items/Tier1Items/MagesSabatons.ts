import { ItemRecipe } from '../ItemRecipe';
import { BootsOfSpeed } from '../BaseItems/BootsOfSpeed';
import { ItemLabel } from '../ItemLabel';
import { EmptyVial } from '../BaseItems/EmptyVial';

const itemId: number = FourCC('I04X');
const name = `Mage's Sabatons`;
const labels: ItemLabel[] = [ItemLabel.MAX_MANA];
const goldCost = 1100;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNMagesSabatons.dds';
const description = `Increases movement rate while keeping your feet safe.

|cffffcc00Movement speed:|r +50
|cffffcc00Max mana:|r +200
|cffffcc00Unique:|r Increases spell damage by 12%

|cFF808080Movement speed determines how fast you're able to move.|r`;

export class MagesSabatons extends ItemRecipe {
    constructor(bootsOfSpeed: BootsOfSpeed, emptyVial: EmptyVial) {
        super(itemId, name, labels, goldCost, iconPath, description, [bootsOfSpeed, emptyVial]);
    }
}
