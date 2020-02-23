import { ItemLabel } from '../ItemLabel';
import { ItemRecipe } from '../ItemRecipe';
import { IronwoodBranch } from '../BasicItems/IronwoodBranch';

const itemId: number = FourCC('I03H');
const name: string = 'Spiked Wood';
const labels: ItemLabel[] = [ItemLabel.THORNS];
const goldCost: number = 3600;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNSpikedBarricades.blp';
const description: string = `A large chunk of wood with spikes on it.

|cffffcc00Thorns:|r +45

|cFF808080Thorns makes melee attackers take thorn damage when attacking.|r`;

export class SpikedWood extends ItemRecipe {
    constructor(ironwoodBranch: IronwoodBranch) {
        super(itemId, name, labels, goldCost, iconPath, description, [ironwoodBranch]);
    }
}
