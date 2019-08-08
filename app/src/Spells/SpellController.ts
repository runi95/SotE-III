import { Avatar } from './Avatar';
import { TimerUtils } from '../Utility/TimerUtils';
import { GameGlobals } from '../Game/GameGlobals';
import { Backstab } from '../DamageEvents/Backstab';
import { BeastSense } from './BeastSense';
import { Clarity } from './Clarity';
import { ClockwerkGoblinDeath } from './ClockwerkGoblinDeath';
import { Conversion } from './Conversion';
import { Cryostasis } from './Cryostasis';
import { CryostasisStop } from './CryostasisStop';
import { DeathGrasp } from './DeathGrasp';
import { DefenseSystem } from './DefenseSystem';
import { DemonicRitual } from './DemonicRitual';
import { Devour } from './Devour';
import { Doom } from './Doom';
import { EnvenomCast } from './EnvenomCast';
import { Fireball } from './Fireball';
import { Frostfire } from './Frostfire';
import { FrostFireDamage } from './FrostFireDamage';
import { GoblinMine } from './GoblinMine';
import { Immunity } from '../DamageEvents/Immunity';
import { Maelstrom } from './Maelstrom';
import { ManaBrilliance } from '../DamageEvents/ManaBrilliance';
import { ManaShield } from '../DamageEvents/ManaShield';
import { Permafrost } from './Permafrost';
import { PsychicScream } from './PsychicScream';
import { RazorBlades } from './RazorBlades';
import { RazorBladesStop } from './RazorBladesStop';
import { Rupture } from './Rupture';
import { ShadowStep } from './ShadowStep';
import { SnareTrap } from './SnareTrap';
import { SpiritOfFrost } from '../DamageEvents/SpiritOfFrost';
import { StormCloud } from './StormCloud';
import { SummonBear } from './SummonBear';
import { SummonClockwerkGoblin } from './SummonClockwerkGoblin';
import { SummonFelbeast } from './SummonFelbeast';
import { SummonHawk } from './SummonHawk';
import { SummonQuilbeast } from './SummonQuilbeast';
import { Swarm } from './Swarm';
import { Betrayal } from './Betrayal';
import { CrushingWave } from './CrushingWave';
import { PiercingBlade } from './PiercingBlade';
import { StunUtils } from '../Utility/StunUtils';
import { FrostNova } from './FrostNova';
import { GoblinBombShip } from './GoblinBombShip';
import { SnareTrapDeath } from './SnareTrapDeath';
import { Shackles } from './Shackles';
import { Combust } from './Combust';
import { Immolation } from './Immolation';

export class SpellController {
    private spells: any[];

    constructor(gameGlobals: GameGlobals, stunUtils: StunUtils, timerUtils: TimerUtils) {
        this.spells = [
            new Avatar(timerUtils),
            new Backstab(),
            new BeastSense(),
            new Betrayal(),
            new Clarity(),
            new ClockwerkGoblinDeath(stunUtils),
            new Combust(),
            new Conversion(),
            new CrushingWave(timerUtils),
            new Cryostasis(gameGlobals),
            new CryostasisStop(gameGlobals),
            new DeathGrasp(stunUtils, timerUtils),
            new DefenseSystem(gameGlobals, timerUtils),
            new DemonicRitual(),
            new Devour(),
            new Doom(timerUtils),
            new EnvenomCast(),
            new Fireball(timerUtils),
            new Frostfire(timerUtils),
            new FrostFireDamage(),
            new FrostNova(timerUtils),
            new GoblinBombShip(timerUtils),
            new GoblinMine(timerUtils),
            new Immunity(gameGlobals),
            new Maelstrom(timerUtils),
            new ManaBrilliance(),
            new ManaShield(),
            new Permafrost(stunUtils),
            new PiercingBlade(timerUtils),
            new PsychicScream(),
            new RazorBlades(gameGlobals, timerUtils),
            new RazorBladesStop(gameGlobals),
            new Rupture(timerUtils),
            new Shackles(timerUtils),
            new ShadowStep(),
            new SnareTrap(),
            new SnareTrapDeath(),
            new SpiritOfFrost(gameGlobals),
            new StormCloud(timerUtils),
            new SummonBear(timerUtils),
            new SummonClockwerkGoblin(),
            new SummonFelbeast(),
            new SummonHawk(timerUtils),
            new SummonQuilbeast(timerUtils),
            new Swarm(timerUtils),
            new Immolation(timerUtils),
        ];
    }
}
