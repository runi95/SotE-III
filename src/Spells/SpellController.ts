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
import { PandaBash } from './PandaBash';
import { ChiMaster } from './ChiMaster';
import { RandomNumberGenerator } from '../Utility/RandomNumberGenerator';
import { BurningFlask } from './BurningFlask';
import { PoisonFlask } from './PoisonFlask';
import { FrozenFlask } from './FrozenFlask';
import { LifeDrain } from './LifeDrain';
import { AbolishLight } from './AbolishLight';
import { MarkForDeath } from './MarkForDeath';
import { Restoration } from './Restoration';
import { SpellCastUtils } from '../Utility/SpellCastUtils';
import { ShadowMeld } from './ShadowMeld';
import { BuffUtils } from '../Utility/BuffUtils';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { KnockbackUtils } from '../Utility/KnockbackUtils';

export class SpellController {
    // eslint-disable-next-line
    private spells: any;

    constructor(
        gameGlobals: GameGlobals,
        stunUtils: StunUtils,
        timerUtils: TimerUtils,
        randomNumberGenerator: RandomNumberGenerator,
        spellCastUtils: SpellCastUtils,
        buffUtils: BuffUtils,
        damageEngineGloblals: DamageEngineGlobals,
        knockbackUtils: KnockbackUtils,
    ) {
        this.spells = [
            new Avatar(timerUtils, spellCastUtils),
            new Backstab(),
            new BeastSense(),
            new Betrayal(spellCastUtils, timerUtils, stunUtils),
            new Clarity(spellCastUtils),
            new ClockwerkGoblinDeath(stunUtils),
            new Combust(spellCastUtils),
            new Conversion(spellCastUtils),
            new CrushingWave(timerUtils, spellCastUtils),
            new Cryostasis(gameGlobals, spellCastUtils),
            new CryostasisStop(gameGlobals),
            new DeathGrasp(stunUtils, timerUtils),
            new DefenseSystem(gameGlobals, timerUtils, spellCastUtils),
            new DemonicSacrifice(),
            new Devour(),
            new Inferno(timerUtils),
            new EnvenomCast(),
            new Fireball(timerUtils, spellCastUtils),
            new Frostfire(timerUtils),
            new FrostFireDamage(),
            new FrostNova(timerUtils, spellCastUtils),
            new GoblinBombShip(timerUtils, randomNumberGenerator),
            new GoblinMine(timerUtils, spellCastUtils),
            new Immunity(),
            new Maelstrom(timerUtils, spellCastUtils, damageEngineGloblals),
            new ManaBrilliance(),
            new ManaShield(),
            new Permafrost(stunUtils, spellCastUtils),
            new PiercingBlade(timerUtils, spellCastUtils),
            new PsychicScream(spellCastUtils),
            new RazorBlades(gameGlobals, timerUtils, spellCastUtils),
            new RazorBladesStop(gameGlobals),
            new Rupture(timerUtils),
            new Shackles(timerUtils, spellCastUtils),
            new ShadowStep(),
            new SnareTrap(),
            new SnareTrapDeath(),
            new SpiritOfFrost(randomNumberGenerator, spellCastUtils),
            new StormCloud(timerUtils, randomNumberGenerator, spellCastUtils),
            new SummonBear(timerUtils),
            new SummonClockwerkGoblin(spellCastUtils),
            new SummonFelbeast(),
            new SummonHawk(gameGlobals, timerUtils, spellCastUtils),
            new SummonQuilbeast(timerUtils),
            new Swarm(timerUtils, spellCastUtils),
            new Immolation(timerUtils, spellCastUtils),
            new ToArms(timerUtils),
            new HolyLight(spellCastUtils),
            new HolyLance(timerUtils, spellCastUtils),
            new DarkCorruption(spellCastUtils),
            new Drink(spellCastUtils, randomNumberGenerator),
            new Slash(timerUtils, stunUtils, spellCastUtils),
            new Brawl(spellCastUtils, timerUtils, knockbackUtils),
            new PandarenChi(timerUtils, spellCastUtils, damageEngineGloblals, randomNumberGenerator),
            new CommandoFlag(),
            new PandaBash(knockbackUtils, spellCastUtils, randomNumberGenerator),
            new ChiMaster(buffUtils, spellCastUtils),
            new BurningFlask(timerUtils, spellCastUtils),
            new PoisonFlask(timerUtils, spellCastUtils),
            new FrozenFlask(stunUtils, spellCastUtils),
            new LifeDrain(timerUtils, spellCastUtils),
            new AbolishLight(spellCastUtils),
            new MarkForDeath(),
            new Restoration(gameGlobals),
            new ShadowMeld()
        ];
    }
}
