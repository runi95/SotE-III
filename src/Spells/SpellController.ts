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
import { DemonicSacrifice } from './DemonicSacrifice';
import { Devour } from './Devour';
import { Inferno } from './Inferno';
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
import { ToArms } from './ToArms';
import { HolyLight } from './HolyLight';
import { HolyLance } from './HolyLance';
import { DarkCorruption } from './DarkCorruption';
import { Drink } from './Drink';
import { Slash } from './Slash';
import { Brawl } from './Brawl';
import { PandarenChi } from './PandarenChi';
import { CommandoFlag } from './CommandoFlag';
import { Challenge } from './Challenge';
import { ChiMaster } from './ChiMaster';
import { RandomNumberGenerator } from '../Utility/RandomNumberGenerator';
import { Regenerate } from './Regenerate';
import { BurningFlask } from './BurningFlask';
import { PoisonFlask } from './PoisonFlask';
import { FrozenFlask } from './FrozenFlask';
import { LifeDrain } from './LifeDrain';
import { AbolishLight } from './AbolishLight';
import { MarkForDeath } from './MarkForDeath';
import { Restoration } from './Restoration';

export class SpellController {
    private spells: any[];

    constructor(gameGlobals: GameGlobals, stunUtils: StunUtils, timerUtils: TimerUtils, randomNumberGenerator: RandomNumberGenerator) {
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
            new DemonicSacrifice(),
            new Devour(),
            new Inferno(timerUtils),
            new EnvenomCast(),
            new Fireball(timerUtils),
            new Frostfire(timerUtils),
            new FrostFireDamage(),
            new FrostNova(timerUtils),
            new GoblinBombShip(timerUtils, randomNumberGenerator),
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
            new SpiritOfFrost(gameGlobals, randomNumberGenerator),
            new StormCloud(timerUtils, randomNumberGenerator),
            new SummonBear(timerUtils),
            new SummonClockwerkGoblin(),
            new SummonFelbeast(),
            new SummonHawk(gameGlobals, timerUtils),
            new SummonQuilbeast(timerUtils),
            new Swarm(timerUtils),
            new Immolation(timerUtils),
            new ToArms(timerUtils),
            new HolyLight(),
            new HolyLance(timerUtils),
            new DarkCorruption(),
            new Drink(),
            new Slash(timerUtils, stunUtils),
            new Brawl(),
            new PandarenChi(timerUtils),
            new CommandoFlag(),
            new Challenge(),
            new ChiMaster(timerUtils),
            new Regenerate(gameGlobals, timerUtils),
            new BurningFlask(timerUtils),
            new PoisonFlask(timerUtils),
            new FrozenFlask(stunUtils),
            new LifeDrain(timerUtils),
            new AbolishLight(),
            new MarkForDeath(),
            new Restoration(gameGlobals),
        ];
    }
}
