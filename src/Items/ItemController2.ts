import { GameGlobals } from '../Game/GameGlobals';
import { TimerUtils } from '../Utility/TimerUtils';
import { RandomNumberGenerator } from '../Utility/RandomNumberGenerator';
import { MantleOfIntelligenceDrop } from './Abilities/MantleOfIntelligenceDrop';
import { MantleOfIntelligencePickup } from './Abilities/MantleOfIntelligencePickup';
import { RingOfSuperiorityDrop } from './Abilities/RingOfSuperiorityDrop';
import { RingOfSuperiorityPickup } from './Abilities/RingOfSuperiorityPickup';
import { ElementalOrbDrop } from './Abilities/ElementalOrbDrop';
import { ElementalOrbPickup } from './Abilities/ElementalOrbPickup';
import { SkullShieldDrop } from './Abilities/SkullShieldDrop';
import { SkullShieldPickup } from './Abilities/SkullShieldPickup';
import { StoneArmorDrop } from './Abilities/StoneArmorDrop';
import { StoneArmorPickup } from './Abilities/StoneArmorPickup';
import { ImprovedShimmerWeedDrop } from './Abilities/ImprovedShimmerWeedDrop';
import { ImprovedShimmerWeedPickup } from './Abilities/ImprovedShimmerWeedPickup';
import { SunkenShardDrop } from './Abilities/SunkenShardDrop';
import { SunkenShardPickup } from './Abilities/SunkenShardPickup';
import { EnhancedMantleOfIntelligenceDrop } from './Abilities/EnhancedMantleOfIntelligenceDrop';
import { EnhancedMantleOfIntelligencePickup } from './Abilities/EnhancedMantleOfIntelligencePickup';

// TODO: The item controllers need to be split into item tiers, this class is just a temp solution to the local variables problem

export class ItemController2 {
    private itemAbilities: any[];

    constructor(gameGlobals: GameGlobals, timerUtils: TimerUtils, randomNumberGenerator: RandomNumberGenerator) {
        this.itemAbilities = [
            new MantleOfIntelligenceDrop(gameGlobals),
            new MantleOfIntelligencePickup(gameGlobals),
            new RingOfSuperiorityDrop(gameGlobals),
            new RingOfSuperiorityPickup(gameGlobals),
            new ElementalOrbDrop(gameGlobals),
            new ElementalOrbPickup(gameGlobals),
            new SkullShieldDrop(gameGlobals),
            new SkullShieldPickup(gameGlobals),
            new StoneArmorDrop(gameGlobals),
            new StoneArmorPickup(gameGlobals),
            new ImprovedShimmerWeedDrop(gameGlobals),
            new ImprovedShimmerWeedPickup(gameGlobals),
            new SunkenShardDrop(gameGlobals),
            new SunkenShardPickup(gameGlobals),
            new EnhancedMantleOfIntelligenceDrop(gameGlobals),
            new EnhancedMantleOfIntelligencePickup(gameGlobals),
        ];
    }
}
