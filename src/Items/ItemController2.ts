import { GameGlobals } from '../Game/GameGlobals';
import { TimerUtils } from '../Utility/TimerUtils';
import { RandomNumberGenerator } from '../Utility/RandomNumberGenerator';
import { MantleOfIntelligencePickupAndDrop } from './Abilities/MantleOfIntelligencePickupAndDrop';
import { RingOfSuperiorityPickupAndDrop } from './Abilities/RingOfSuperiorityPickupAndDrop';
import { ElementalOrbPickupAndDrop } from './Abilities/ElementalOrbPickupAndDrop';
import { SkullShieldPickupAndDrop } from './Abilities/SkullShieldPickupAndDrop';
import { StoneArmorPickupAndDrop } from './Abilities/StoneArmorPickupAndDrop';
import { ImprovedShimmerWeedPickupAndDrop } from './Abilities/ImprovedShimmerWeedPickupAndDrop';
import { SunkenShardPickupAndDrop } from './Abilities/SunkenShardPickupAndDrop';
import { EnhancedMantleOfIntelligencePickupAndDrop } from './Abilities/EnhancedMantleOfIntelligencePickupAndDrop';
import { DevouringFangsPickupAndDrop } from './Abilities/DevouringFangsPickupAndDrop';
import { DruidsCrowPickupAndDrop } from './Abilities/DruidsCrowPickupAndDrop';
import { ImprovedNaturesBlessingUse } from './Abilities/ImprovedNaturesBlessingUse';
import { BoneChimesPickupAndDrop } from './Abilities/BoneChimesPickupAndDrop';
import { MedallionOfCouragePickupAndDrop } from './Abilities/MedallionOfCouragePickupAndDrop';
import { QuillsPickupAndDrop } from './Abilities/QuillsPickupAndDrop';
import { SpikedWoodPickupAndDrop } from './Abilities/SpikedWoodPickupAndDrop';
import { ImprovedSpikesPickupAndDrop } from './Abilities/ImprovedSpikesPickupAndDrop';
import { ImprovedAmuletOfProtectionPickupAndDrop } from './Abilities/ImprovedAmuletOfProtectionPickupAndDrop';
import { ImprovedElementalOrbPickupAndDrop } from './Abilities/ImprovedElementalOrbPickupAndDrop';
import { LoadedCannonPickupAndDrop } from './Abilities/LoadedCannonPickupAndDrop';
import { AdvancedCannonPickupAndDrop } from './Abilities/AdvancedCannonPickupAndDrop';
import { FierceTridentPickupAndDrop } from './Abilities/FierceTridentPickupAndDrop';
import { RingOfPerseverancePickupAndDrop } from './Abilities/RingOfPerseverancePickupAndDrop';
import { FlakCannonsPickupAndDrop } from './Abilities/FlakCannonsPickupAndDrop';
import { ThoriumSpearPickupAndDrop } from './Abilities/ThoriumSpearPickupAndDrop';
import { EnhancedJavelinPickupAndDrop } from './Abilities/EnhancedJavelinPickupAndDrop';
import { ScrollOfWisdomCast } from './Abilities/ScrollOfWisdomCast';
import { MarkOfTheTalonPickupAndDrop } from './Abilities/MarkOfTheTalonPickupAndDrop';
import { ChitinousScalesPickupAndDrop } from './Abilities/ChitinousScalesPickupAndDrop';
import { LegionDoomHornPickupAndDrop } from './Abilities/LegionDoomHornPickupAndDrop';
import { ScrollOfWitchcraftPickupAndDrop } from './Abilities/ScrollOfWitchcraftPickupAndDrop';
import { OrbOfVenomPickupAndDrop } from './Abilities/OrbOfVenomPickupAndDrop';

// TODO: The item controllers need to be split into item tiers, this class is just a temp solution to the local variables problem

export class ItemController2 {
    private itemAbilities: any[];

    constructor(gameGlobals: GameGlobals, timerUtils: TimerUtils, randomNumberGenerator: RandomNumberGenerator) {
        this.itemAbilities = [
            new MantleOfIntelligencePickupAndDrop(gameGlobals),
            new RingOfSuperiorityPickupAndDrop(gameGlobals),
            new ElementalOrbPickupAndDrop(gameGlobals),
            new SkullShieldPickupAndDrop(gameGlobals),
            new StoneArmorPickupAndDrop(gameGlobals),
            new ImprovedShimmerWeedPickupAndDrop(gameGlobals),
            new SunkenShardPickupAndDrop(gameGlobals),
            new EnhancedMantleOfIntelligencePickupAndDrop(gameGlobals),
            new DevouringFangsPickupAndDrop(gameGlobals),
            new DruidsCrowPickupAndDrop(gameGlobals),
            new ImprovedNaturesBlessingUse(),
            new BoneChimesPickupAndDrop(gameGlobals),
            new MedallionOfCouragePickupAndDrop(gameGlobals),
            new QuillsPickupAndDrop(gameGlobals),
            new SpikedWoodPickupAndDrop(gameGlobals),
            new ImprovedSpikesPickupAndDrop(gameGlobals),
            new ImprovedAmuletOfProtectionPickupAndDrop(gameGlobals),
            new ImprovedElementalOrbPickupAndDrop(gameGlobals),
            new LoadedCannonPickupAndDrop(gameGlobals),
            new AdvancedCannonPickupAndDrop(gameGlobals),
            new FierceTridentPickupAndDrop(gameGlobals),
            new RingOfPerseverancePickupAndDrop(gameGlobals),
            new FlakCannonsPickupAndDrop(gameGlobals),
            new ThoriumSpearPickupAndDrop(gameGlobals),
            new EnhancedJavelinPickupAndDrop(gameGlobals),
            new ScrollOfWisdomCast(randomNumberGenerator),
            new MarkOfTheTalonPickupAndDrop(gameGlobals),
            new ChitinousScalesPickupAndDrop(gameGlobals),
            new LegionDoomHornPickupAndDrop(gameGlobals),
            new ScrollOfWitchcraftPickupAndDrop(gameGlobals),
            new OrbOfVenomPickupAndDrop(gameGlobals),
        ];
    }
}
