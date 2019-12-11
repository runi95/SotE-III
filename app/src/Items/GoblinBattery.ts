import { Item } from './Item';

export class GoblinBattery extends Item {
    public readonly itemId: number = FourCC('I01O');
    public readonly name: string = 'Goblin Battery';
    public readonly goldCost: number = 700;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNMoonStone.blp';
    public readonly description: string = `You can't quite make out what the runes say.

|cffffcc00Attack damage:|r +4
|cffffcc00Effect (1):|r Increases item charges whenever you kill a unit.
|cffffcc00Effect (2):|r Permanently upgrades this item to the Bloodied Executioner's Axe once you reach 100 charges.

|cFF808080Effects are special properties that usually trigger on an event.|r`;
}
