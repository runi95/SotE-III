import { GameGlobals } from '../Game/GameGlobals';
import { TimerUtils } from '../Utility/TimerUtils';
import { RandomNumberGenerator } from '../Utility/RandomNumberGenerator';
import { MantleOfIntelligenceDrop } from './Abilities/MantleOfIntelligenceDrop';
import { MantleOfIntelligencePickup } from './Abilities/MantleOfIntelligencePickup';
import { RingOfSuperiorityDrop } from './Abilities/RingOfSuperiorityDrop';
import { RingOfSuperiorityPickup } from './Abilities/RingOfSuperiorityPickup';

// TODO: The item controllers need to be split into item tiers, this class is just a temp solution to the local variables problem

export class ItemController2 {
    private itemAbilities: any[];

    constructor(gameGlobals: GameGlobals, timerUtils: TimerUtils, randomNumberGenerator: RandomNumberGenerator) {
        this.itemAbilities = [
            new MantleOfIntelligenceDrop(gameGlobals),
            new MantleOfIntelligencePickup(gameGlobals),
            new RingOfSuperiorityDrop(gameGlobals),
            new RingOfSuperiorityPickup(gameGlobals),
        ];
    }
}
