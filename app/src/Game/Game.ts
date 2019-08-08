import { DamageEngine } from '../DamageEngine/DamageEngine';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { GameGlobals } from './GameGlobals';
import { TimerUtils } from '../Utility/TimerUtils';
import { SpellController } from '../Spells/SpellController';
import { StunUtils } from '../Utility/StunUtils';
import { TeleportController } from '../Teleports/TeleportController';
import { ItemController } from '../Items/ItemController';
import { CreepRespawn } from './CreepRespawn';
import { PlayerRespawn } from './PlayerRespawn';
import { DamageEventController } from '../DamageEvents/DamageEventController';
import { Commands } from './Commands';
import { TeleportMovement } from './TeleportMovement';
import { Timer } from '../JassOverrides/Timer';
import { Hero } from './Hero';

export class Game {
    private readonly gameGlobals: GameGlobals;
    private readonly timerUtils: TimerUtils;
    private readonly stunUtils: StunUtils;
    private readonly damageEngineGlobals: DamageEngineGlobals;
    private readonly damageEngine: DamageEngine;
    private readonly creepRespawn: CreepRespawn;
    private readonly playerRespawn: PlayerRespawn;
    private readonly spellController: SpellController;
    private readonly teleportController: TeleportController;
    private readonly itemController: ItemController;
    private readonly damageEventController: DamageEventController;
    private readonly commands: Commands;
    private readonly teleportMovement: TeleportMovement;

    private readonly arenaGate: destructable;
    private readonly ancientOfWonders: unit;
    private readonly tombOfAncients: unit;
    private readonly arcaneVault: unit;
    private readonly heroes: Hero[];

    constructor() {
        this.gameGlobals = new GameGlobals();
        this.timerUtils = new TimerUtils();
        this.stunUtils = new StunUtils(this.timerUtils);
        this.damageEngineGlobals = new DamageEngineGlobals();
        this.damageEngine = new DamageEngine(this.damageEngineGlobals);
        this.creepRespawn = new CreepRespawn(this.gameGlobals);
        this.playerRespawn = new PlayerRespawn(this.gameGlobals);
        this.spellController = new SpellController(this.gameGlobals, this.stunUtils, this.timerUtils);
        this.teleportController = new TeleportController();
        this.damageEventController = new DamageEventController(this.gameGlobals, this.timerUtils, this.damageEngine);
        this.teleportMovement = new TeleportMovement(this.gameGlobals);
        this.arenaGate = CreateDestructable(FourCC('ATg1'), 2944, 5632, 0, 1, 0);
        const ancientOfWondersX: number = GetRandomInt(0, 10630) - 2370;
        const ancientOfWondersY: number = GetRandomInt(0, 25400) - 12700;
        const tombOfAncientsX: number = GetRandomInt(0, 10630) - 2370;
        const tombOfAncientsY: number = GetRandomInt(0, 25400) - 12700;
        const arcaneVaultX: number = GetRandomInt(0, 10630) - 2370;
        const arcaneVaultY: number = GetRandomInt(0, 25400) - 12700;
        this.ancientOfWonders = CreateUnit(Player(PLAYER_NEUTRAL_PASSIVE), FourCC('n00R'),
                                           ancientOfWondersX, ancientOfWondersY, bj_UNIT_FACING);
        this.tombOfAncients = CreateUnit(Player(PLAYER_NEUTRAL_PASSIVE), FourCC('n00Q'),
                                         tombOfAncientsX, tombOfAncientsY, bj_UNIT_FACING);
        this.arcaneVault = CreateUnit(Player(PLAYER_NEUTRAL_PASSIVE), FourCC('n00P'),
                                      arcaneVaultX, arcaneVaultY, bj_UNIT_FACING);
        this.heroes = [];

        ModifyGateBJ(bj_GATEOPERATION_OPEN, this.arenaGate);
        this.init();

        this.commands = new Commands(this.gameGlobals);
        this.itemController = new ItemController(this.gameGlobals, this.arcaneVault);

        const t: Timer = this.timerUtils.newTimer();
        t.start(240, true, () => {
            const newX: number = GetRandomInt(0, 10630) - 2370;
            const newY: number = GetRandomInt(0, 25400) - 12700;
            SetUnitPosition(this.arcaneVault, newX, newY);
        });
    }

    private init(): void {
        this.initializeHeroSelection();
        this.initializePlayers();
        this.spawnAllCreeps();
        this.initializeScoreboard();
        this.enableDebugMode();
        this.printGameModeInfo();
    }

    private initializeHeroSelection(): void {
        for (let i: number = 0; i < this.gameGlobals.HeroArraySize; i++) {
            this.heroes.push(new Hero(this.gameGlobals,
                                      Rect(this.gameGlobals.HeroSelectRegions[i].minX,
                                           this.gameGlobals.HeroSelectRegions[i].minY,
                                           this.gameGlobals.HeroSelectRegions[i].maxX,
                                           this.gameGlobals.HeroSelectRegions[i].maxY),
                                      FourCC(this.gameGlobals.HeroUnitTypeID[i]),
                                      this.gameGlobals.HeroSelectPoints[i].x,
                                      this.gameGlobals.HeroSelectPoints[i].y,
                                      this.gameGlobals.HeroSelectAngles[i]));
        }
    }

    private initializePlayers(): void {
        const heroSelectorId: number = FourCC('e001');
        for (let i: number = 0; i < 5; i++) {
            if (GetPlayerSlotState(Player(i)) === PLAYER_SLOT_STATE_PLAYING && GetPlayerController(Player(i)) === MAP_CONTROL_USER) {
                this.gameGlobals.PlayerCount++;
                SetPlayerStateBJ(Player(i), PLAYER_STATE_RESOURCE_GOLD, 500);
                FogModifierStart(CreateFogModifierRect(Player(i), FOG_OF_WAR_VISIBLE, this.gameGlobals.PlayerSpawnRegion[i], true, false));
                CreateUnit(Player(i), heroSelectorId, -14400.00, -10700.00, bj_UNIT_FACING);
            }
        }
    }

    private spawnAllCreeps(): void {
        for (let i: number = 0; i < this.gameGlobals.CreepUnitArraySize; i++) {
            SetUnitUserData(CreateUnit(Player(PLAYER_NEUTRAL_AGGRESSIVE),
                                       FourCC(this.gameGlobals.CreepUnitTypeID[i]),
                                       this.gameGlobals.CreepSpawnPoint[i].x,
                                       this.gameGlobals.CreepSpawnPoint[i].y,
                                       this.gameGlobals.CreepSpawnAngle[i]),
                            i);
        }
    }

    private initializeScoreboard(): void {
        this.gameGlobals.Multiboard = CreateMultiboardBJ(3, 7, 'Spawn of the Enemy');
        MultiboardSetItemValueBJ(this.gameGlobals.Multiboard, 1, 1, 'Player');
        MultiboardSetItemValueBJ(this.gameGlobals.Multiboard, 2, 1, 'Lives');
        MultiboardSetItemValueBJ(this.gameGlobals.Multiboard, 3, 1, 'Level');

        MultiboardSetItemWidthBJ(this.gameGlobals.Multiboard, 1, 1, 10.00);
        MultiboardSetItemWidthBJ(this.gameGlobals.Multiboard, 2, 1, 4.00);
        MultiboardSetItemWidthBJ(this.gameGlobals.Multiboard, 3, 1, 4.00);

        MultiboardSetItemStyleBJ(this.gameGlobals.Multiboard, 1, 1, true, false);
        MultiboardSetItemStyleBJ(this.gameGlobals.Multiboard, 2, 1, true, false);
        MultiboardSetItemStyleBJ(this.gameGlobals.Multiboard, 3, 1, true, false);

        for (let i: number = 0; i < 6; i++) {
            if (GetPlayerSlotState(Player(i)) === PLAYER_SLOT_STATE_PLAYING) {
                MultiboardSetItemValueBJ(this.gameGlobals.Multiboard, 1, 2 + i,
                                         `${this.gameGlobals.PlayerColorCodes[i]}${GetPlayerName(Player(i))}|r`);
                MultiboardSetItemValueBJ(this.gameGlobals.Multiboard, 2, 2 + i, '10');
                MultiboardSetItemValueBJ(this.gameGlobals.Multiboard, 3, 2 + i, '1');
            } else {
                MultiboardSetItemValueBJ(this.gameGlobals.Multiboard, 1, 2 + i, `${this.gameGlobals.PlayerColorCodes[i]}None|r`);
                MultiboardSetItemValueBJ(this.gameGlobals.Multiboard, 2, 2 + i, '-');
                MultiboardSetItemValueBJ(this.gameGlobals.Multiboard, 3, 2 + i, '-');
            }

            MultiboardSetItemWidthBJ(this.gameGlobals.Multiboard, 1, 2 + i, 10.00);
            MultiboardSetItemWidthBJ(this.gameGlobals.Multiboard, 2, 2 + i, 4.00);
            MultiboardSetItemWidthBJ(this.gameGlobals.Multiboard, 3, 2 + i, 4.00);

            MultiboardSetItemStyleBJ(this.gameGlobals.Multiboard, 1, 2 + i, true, false);
            MultiboardSetItemStyleBJ(this.gameGlobals.Multiboard, 2, 2 + i, true, false);
            MultiboardSetItemStyleBJ(this.gameGlobals.Multiboard, 3, 2 + i, true, false);
        }

        MultiboardDisplayBJ(true, this.gameGlobals.Multiboard);
    }

    private enableDebugMode(): void {
        if (this.gameGlobals.PlayerCount === 1 && GetPlayerName(Player(0)) === 'WorldEdit') {
            // BJDebugMsg('Activating debug mode...');
            this.gameGlobals.DebugMode = true;
            for (let i: number = 0; i < this.gameGlobals.HeroArraySize; i++) {
                CreateUnit(Player(0), FourCC(this.gameGlobals.HeroUnitTypeID[i]), 2810.00, 7680.00, bj_UNIT_FACING);
            }
        }
    }

    private printGameModeInfo(): void {
        DisplayTimedTextToForce(bj_FORCE_ALL_PLAYERS, 30, `|c00FF0303${GetPlayerName(Player(0))}|r may change the game rules`);
        DisplayTimedTextToForce(bj_FORCE_ALL_PLAYERS, 30, 'Lives: |cFFFFCC0010|r');
        DisplayTimedTextToForce(bj_FORCE_ALL_PLAYERS, 30, 'Teams: |cFFFFCC00none|r');
        DisplayTimedTextToForce(bj_FORCE_ALL_PLAYERS, 30, 'Fog of war: |cFFFFCC00true|r');
        DisplayTimedTextToForce(bj_FORCE_ALL_PLAYERS, 30, 'Sudden death: |cFFFFCC00true|r');
    }
}
