import { ItemLabel } from '../ItemLabel';
import { ItemRecipe } from '../ItemRecipe';
import { SpikedWood } from '../Tier1Items/SpikedWood';
import { SpikedCarapace } from '../Tier1Items/SpikedCarapace';

const itemId: number = FourCC('I04A');
const name: string = 'Improved Spikes';
const labels: ItemLabel[] = [ItemLabel.THORNS, ItemLabel.MAX_HEALTH];
const goldCost: number = 9200;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNImprovedSpikedBarricades.blp';
const description: string = `A large chunk of wood with spikes on it.

|cffffcc00Max health:|r +600
|cffffcc00Thorns:|r +85

|cFF808080Thorns makes melee attackers take thorn damage when attacking.|r`;

export class ImprovedSpikes extends ItemRecipe {
    constructor(spikedWood: SpikedWood, spikedCarapace: SpikedCarapace) {
        super(itemId, name, labels, goldCost, iconPath, description, [spikedWood, spikedCarapace]);
    }
}
