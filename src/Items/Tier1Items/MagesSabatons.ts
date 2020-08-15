import { ItemRecipe } from '../ItemRecipe';
import { BootsOfSpeed } from '../BaseItems/BootsOfSpeed';
import { ItemLabel } from '../ItemLabel';
import { EmptyVial } from '../BaseItems/EmptyVial';

const itemId: number = FourCC('I04X');
const name: string = `Mage's Sabatons`;
const labels: ItemLabel[] = [ItemLabel.MAX_MANA];
const goldCost: number = 1500;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNMagesSabatons.dds';
const description: string = `Increases movement rate while keeping your feet safe.

|cffffcc00Movement Speed:|r +50
|cffffcc00Max Mana:|r +200
|cffffcc00Unique:|r Increases spell damage by 12%

|cFF808080Movement speed determines how fast you're able to move.|r`;

export class MagesSabatons extends ItemRecipe {
    constructor(bootsOfSpeed: BootsOfSpeed, emptyVial: EmptyVial) {
        super(itemId, name, labels, goldCost, iconPath, description, [bootsOfSpeed, emptyVial]);
    }
}
