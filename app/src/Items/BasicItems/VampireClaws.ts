import { Item } from '../Item';

export class VampireClaws extends Item {
    public readonly itemId: number = FourCC('I02E');
    public readonly name: string = 'Vampire Claws';
    public readonly goldCost: number = 300;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNGhoulFrenzy.blp';
    public readonly description: string = `Practicing with these will surely make you super fast.

|cffffcc00Lifesteal:|r +16%

|cFF808080Lifesteal makes you heal hitpoints equal to a percentage of the physical damage done when attacking.|r`;
}
