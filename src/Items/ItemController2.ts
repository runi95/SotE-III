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
import { DevouringFangsDrop } from './Abilities/DevouringFangsDrop';
import { DevouringFangsPickup } from './Abilities/DevouringFangsPickup';
import { DruidsCrowDrop } from './Abilities/DruidsCrowDrop';
import { DruidsCrowPickup } from './Abilities/DruidsCrowPickup';
import { ImprovedNaturesBlessingUse } from './Abilities/ImprovedNaturesBlessingUse';
import { BoneChimesDrop } from './Abilities/BoneChimesDrop';
import { BoneChimesPickup } from './Abilities/BoneChimesPickup';
import { MedallionOfCouragePickup } from './Abilities/MedallionOfCouragePickup';
import { MedallionOfCourageDrop } from './Abilities/MedallionOfCourageDrop';
import { QuillsDrop } from './Abilities/QuillsDrop';
import { QuillsPickup } from './Abilities/QuillsPickup';
import { SpikedWoodDrop } from './Abilities/SpikedWoodDrop';
import { SpikedWoodPickup } from './Abilities/SpikedWoodPickup';
import { ImprovedSpikesDrop } from './Abilities/ImprovedSpikesDrop';
import { ImprovedSpikesPickup } from './Abilities/ImprovedSpikesPickup';
import { ImprovedAmuletOfProtectionDrop } from './Abilities/ImprovedAmuletOfProtectionDrop';
import { ImprovedAmuletOfProtectionPickup } from './Abilities/ImprovedAmuletOfProtectionPickup';
import { ImprovedElementalOrbDrop } from './Abilities/ImprovedElementalOrbDrop';
import { ImprovedElementalOrbPickup } from './Abilities/ImprovedElementalOrbPickup';
import { LoadedCannonDrop } from './Abilities/LoadedCannonDrop';
import { LoadedCannonPickup } from './Abilities/LoadedCannonPickup';
import { AdvancedCannonDrop } from './Abilities/AdvancedCannonDrop';
import { AdvancedCannonPickup } from './Abilities/AdvancedCannonPickup';
import { FierceTridentDrop } from './Abilities/FierceTridentDrop';
import { FierceTridentPickup } from './Abilities/FierceTridentPickup';
import { RingOfPerseveranceDrop } from './Abilities/RingOfPerseveranceDrop';
import { RingOfPerseverancePickup } from './Abilities/RingOfPerseverancePickup';
import { FlakCannonsDrop } from './Abilities/FlakCannonsDrop';
import { FlakCannonsPickup } from './Abilities/FlakCannonsPickup';
import { ThoriumSpearDrop } from './Abilities/ThoriumSpearDrop';
import { ThoriumSpearPickup } from './Abilities/ThoriumSpearPickup';
import { EnhancedJavelinDrop } from './Abilities/EnhancedJavelinDrop';
import { EnhancedJavelinPickup } from './Abilities/EnhancedJavelinPickup';
import { ScrollOfWisdomCast } from './Abilities/ScrollOfWisdomCast';
import { MarkOfTheTalonDrop } from './Abilities/MarkOfTheTalonDrop';
import { MarkOfTheTalonPickup } from './Abilities/MarkOfTheTalonPickup';

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
            new DevouringFangsDrop(gameGlobals),
            new DevouringFangsPickup(gameGlobals),
            new DruidsCrowDrop(gameGlobals),
            new DruidsCrowPickup(gameGlobals),
            new ImprovedNaturesBlessingUse(),
            new BoneChimesDrop(gameGlobals),
            new BoneChimesPickup(gameGlobals),
            new MedallionOfCourageDrop(gameGlobals),
            new MedallionOfCouragePickup(gameGlobals),
            new QuillsDrop(gameGlobals),
            new QuillsPickup(gameGlobals),
            new SpikedWoodDrop(gameGlobals),
            new SpikedWoodPickup(gameGlobals),
            new ImprovedSpikesDrop(gameGlobals),
            new ImprovedSpikesPickup(gameGlobals),
            new ImprovedAmuletOfProtectionDrop(gameGlobals),
            new ImprovedAmuletOfProtectionPickup(gameGlobals),
            new ImprovedElementalOrbDrop(gameGlobals),
            new ImprovedElementalOrbPickup(gameGlobals),
            new LoadedCannonDrop(gameGlobals),
            new LoadedCannonPickup(gameGlobals),
            new AdvancedCannonDrop(gameGlobals),
            new AdvancedCannonPickup(gameGlobals),
            new FierceTridentDrop(gameGlobals),
            new FierceTridentPickup(gameGlobals),
            new RingOfPerseveranceDrop(gameGlobals),
            new RingOfPerseverancePickup(gameGlobals),
            new FlakCannonsDrop(gameGlobals),
            new FlakCannonsPickup(gameGlobals),
            new ThoriumSpearDrop(gameGlobals),
            new ThoriumSpearPickup(gameGlobals),
            new EnhancedJavelinDrop(gameGlobals),
            new EnhancedJavelinPickup(gameGlobals),
            new ScrollOfWisdomCast(randomNumberGenerator),
            new MarkOfTheTalonDrop(gameGlobals),
            new MarkOfTheTalonPickup(gameGlobals),
        ];
    }
}
