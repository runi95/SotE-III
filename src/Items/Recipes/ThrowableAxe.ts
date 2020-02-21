import { ItemRecipe } from '../ItemRecipe';
import { Scepter } from '../BasicItems/Scepter';
import { BloodiedExecutionersAxe } from '../BasicItems/BloodiedExecutionersAxe';
import { ItemLabel } from '../ItemLabel';

// tslint:disable: max-line-length
const itemId: number = FourCC('I01E');
const name: string = 'Throwable Axe';
const labels: ItemLabel[] = [ItemLabel.ATTACK_DAMAGE];
const goldCost: number = 1200;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNOrcMeleeUpThree.blp';
const description: string = `You can't quite make out what the runes say.

|cffffcc00Attack damage:|r +19
|cffffcc00Use:|r Throw an axe at the target unit dealing 300 initial damage, 20 damage per second afterwards and drastically slows down movement speed
|cffffcc00Mana Cost:|r 65
|cffffcc00Range:|r 350
|cffffcc00Duration:|r 15
|cffffcc00Cooldown:|r 20

|cFF808080Use is an effects that occurs when an item is used by clicking on it.|r`;

export class ThrowableAxe extends ItemRecipe {
    constructor(bloodiedExecutionersAxe: BloodiedExecutionersAxe, scepter: Scepter) {
        super(itemId, name, labels, goldCost, iconPath, description, [bloodiedExecutionersAxe, scepter]);
    }
}
