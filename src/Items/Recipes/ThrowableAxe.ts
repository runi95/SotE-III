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
|cffffcc00Effect:|r Throw an axe at the target unit dealing 300 initial damage, 20 damage per second afterwards and drastically slows down movement speed for 15 seconds

|cFF808080Effects are special properties that usually trigger on an event.|r`;

export class ThrowableAxe extends ItemRecipe {
    constructor(bloodiedExecutionersAxe: BloodiedExecutionersAxe, scepter: Scepter) {
        super(itemId, name, labels, goldCost, iconPath, description, [bloodiedExecutionersAxe, scepter]);
    }
}
