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
import { BossController } from '../Boss/BossController';
import { RandomNumberGenerator } from '../Utility/RandomNumberGenerator';
import { PlayerVictoryUtils } from '../Utility/PlayerVictoryUtils';
import { PlayerLeaves } from './PlayerLeaves';
import { ArenaUtils } from '../Utility/ArenaUtils';

export class Game {
    private readonly gameGlobals: GameGlobals;
    private readonly randomNumberGenerator: RandomNumberGenerator;
    private readonly playerVictoryUtils: PlayerVictoryUtils;
    private readonly timerUtils: TimerUtils;
    private readonly stunUtils: StunUtils;
    private readonly arenaUtils: ArenaUtils;
    private readonly damageEngineGlobals: DamageEngineGlobals;
    private readonly damageEngine: DamageEngine;
    private readonly creepRespawn: CreepRespawn;
    private readonly playerRespawn: PlayerRespawn;
    private readonly playerLeaves: PlayerLeaves;
    private readonly spellController: SpellController;
    private readonly teleportController: TeleportController;
    private readonly itemController: ItemController;
    private readonly damageEventController: DamageEventController;
    private readonly bossController: BossController;
    private readonly commands: Commands;
    private readonly teleportMovement: TeleportMovement;

    private readonly ancientOfWonders: unit;
    private readonly tombOfAncients: unit;
    private readonly arcaneVault: unit;

    constructor(gameGlobals: GameGlobals, randomNumberGenerator: RandomNumberGenerator) {
        this.gameGlobals = gameGlobals;
        this.randomNumberGenerator = randomNumberGenerator;
        this.playerVictoryUtils = new PlayerVictoryUtils(this.gameGlobals);
        this.timerUtils = new TimerUtils();
        this.stunUtils = new StunUtils(this.timerUtils);
        this.arenaUtils = new ArenaUtils(this.gameGlobals, this.timerUtils, this.stunUtils, this.randomNumberGenerator);
        this.damageEngineGlobals = new DamageEngineGlobals();
        this.damageEngine = new DamageEngine(this.damageEngineGlobals);
        this.creepRespawn = new CreepRespawn(this.gameGlobals);
        this.playerRespawn = new PlayerRespawn(this.gameGlobals, this.playerVictoryUtils);
        this.playerLeaves = new PlayerLeaves(this.playerVictoryUtils);
        this.spellController = new SpellController(this.gameGlobals, this.stunUtils, this.timerUtils, this.randomNumberGenerator);
        this.teleportController = new TeleportController();
        this.damageEventController = new DamageEventController(this.gameGlobals, this.timerUtils,
                                                               this.randomNumberGenerator, this.damageEngine);
        this.bossController = new BossController();
        this.teleportMovement = new TeleportMovement(this.gameGlobals);
        const ancientOfWondersX: number = this.randomNumberGenerator.random(0, 10630) - 2370;
        const ancientOfWondersY: number = this.randomNumberGenerator.random(0, 25400) - 12700;
        const tombOfAncientsX: number = this.randomNumberGenerator.random(0, 10630) - 2370;
        const tombOfAncientsY: number = this.randomNumberGenerator.random(0, 25400) - 12700;
        const arcaneVaultX: number = this.randomNumberGenerator.random(0, 10630) - 2370;
        const arcaneVaultY: number = this.randomNumberGenerator.random(0, 25400) - 12700;
        this.ancientOfWonders = CreateUnit(Player(PLAYER_NEUTRAL_PASSIVE), FourCC('n00R'),
                                           ancientOfWondersX, ancientOfWondersY, bj_UNIT_FACING);
        this.tombOfAncients = CreateUnit(Player(PLAYER_NEUTRAL_PASSIVE), FourCC('n00Q'),
                                         tombOfAncientsX, tombOfAncientsY, bj_UNIT_FACING);
        this.arcaneVault = CreateUnit(Player(PLAYER_NEUTRAL_PASSIVE), FourCC('n00P'),
                                      arcaneVaultX, arcaneVaultY, bj_UNIT_FACING);

        this.init();

        this.commands = new Commands(this.gameGlobals, this.playerVictoryUtils);
        this.itemController = new ItemController(this.gameGlobals, this.timerUtils, this.randomNumberGenerator, this.arcaneVault);

        const t: Timer = this.timerUtils.newTimer();
        t.start(240, true, () => {
            const newX: number = this.randomNumberGenerator.random(0, 10630) - 2370;
            const newY: number = this.randomNumberGenerator.random(0, 25400) - 12700;
            SetUnitPosition(this.arcaneVault, newX, newY);
        });
    }

    private init(): void {
        this.initializePlayers();
        this.beginHeroSelection();
        this.initializeScoreboard();
        this.enableDebugMode();
    }

    private initializePlayers(): void {
        for (let i: number = 0; i < bj_MAX_PLAYERS; i++) {
            if (GetPlayerSlotState(Player(i)) === PLAYER_SLOT_STATE_PLAYING) {
                this.gameGlobals.PlayerCount++;
                this.gameGlobals.ActivePlayerIdList.push(i);
            }
        }
    }

    private startGame(): void {
        SetCameraBoundsToRect(GetPlayableMapRect());
        for (let i: number = 0; i < bj_MAX_PLAYERS; i++) {
            if (this.gameGlobals.PlayerHeroId[i] !== undefined) {
                const x: number = GetRectCenterX(this.gameGlobals.PlayerSpawnRegion[i]);
                const y: number = GetRectCenterY(this.gameGlobals.PlayerSpawnRegion[i]);
                this.gameGlobals.PlayerHero[i] = CreateUnit(Player(i), this.gameGlobals.PlayerHeroId[i], x, y, bj_UNIT_FACING);
                SetCameraPositionForPlayer(Player(i), x, y);
            }

            if (!this.gameGlobals.GameIsFogOfWarEnabled) {
                FogModifierStart(CreateFogModifierRect(Player(i), FOG_OF_WAR_VISIBLE, GetPlayableMapRect(), false, false));
            }

            if (this.gameGlobals.GameIsTeamsEnabled) {
                if (i < 3) {
                    for (let j: number = 0; j < 3; j++) {
                        SetPlayerAlliance(Player(i), Player(j), ALLIANCE_SHARED_VISION, true);
                        SetPlayerAlliance(Player(i), Player(j), ALLIANCE_PASSIVE, true);
                        SetPlayerAlliance(Player(i), Player(j), ALLIANCE_HELP_REQUEST, true);
                        SetPlayerAlliance(Player(i), Player(j), ALLIANCE_HELP_RESPONSE, true);
                    }
                } else {
                    for (let j: number = 3; j < 5; j++) {
                        SetPlayerAlliance(Player(i), Player(j), ALLIANCE_SHARED_VISION, true);
                        SetPlayerAlliance(Player(i), Player(j), ALLIANCE_PASSIVE, true);
                        SetPlayerAlliance(Player(i), Player(j), ALLIANCE_HELP_REQUEST, true);
                        SetPlayerAlliance(Player(i), Player(j), ALLIANCE_HELP_RESPONSE, true);
                    }
                }
            }
        }

        if (this.gameGlobals.GameIsSuddenDeathEnabled) {
            this.arenaUtils.initiateFightCountdown();
        }
    }

    private beginHeroSelection(): void {
        const heroSelectorId: number = FourCC('e001');
        const randomizedPlayerIdArray: number[] = [...this.gameGlobals.ActivePlayerIdList];
        for (let i: number = this.gameGlobals.ActivePlayerIdList.length - 1; i > 0; i--) {
            const j: number = this.randomNumberGenerator.random(0, i);
            const temp: number = randomizedPlayerIdArray[i];
            randomizedPlayerIdArray[i] = randomizedPlayerIdArray[j];
            randomizedPlayerIdArray[j] = temp;
        }

        let index: number = 0;
        const t: Timer = this.timerUtils.newTimer();
        t.start(0.1, true, () => {
            if (this.gameGlobals.ActivePlayerIdList.every(playerId => this.gameGlobals.PlayerHeroId[playerId] !== undefined)) {
                this.timerUtils.releaseTimer(t);
                this.startGame();
            } else if (index === 0 || this.gameGlobals.PlayerHeroId[randomizedPlayerIdArray[index - 1]] !== undefined) {
                const playerId: number = randomizedPlayerIdArray[index++];
                const heroSelector: unit = CreateUnit(Player(playerId), heroSelectorId, -14400.00, -10700.00, bj_UNIT_FACING);
                if (this.gameGlobals.GameIsAllRandomEnabled || GetPlayerController(Player(playerId)) === MAP_CONTROL_COMPUTER) {
                    UnitAddAbility(heroSelector, FourCC('Aloc'));
                    const availableHeroIndexes: number[] = [];
                    for (let i: number = 0; i < this.gameGlobals.HeroList.length; i++) {
                        if (!this.gameGlobals.HeroList[i].getIsHeroPicked()) {
                            availableHeroIndexes.push(i);
                        }
                    }

                    const selectedIndex: number = this.randomNumberGenerator.random(0, availableHeroIndexes.length - 1);
                    IssuePointOrder(heroSelector, 'move',
                                    this.gameGlobals.HeroSelectRegions[availableHeroIndexes[selectedIndex]].getCenter().x,
                                    this.gameGlobals.HeroSelectRegions[availableHeroIndexes[selectedIndex]].getCenter().y);
                }
            }
        });
    }

    private initializeScoreboard(): void {
        this.gameGlobals.Multiboard = CreateMultiboardBJ(3, 9, 'Spawn of the Enemy');
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
                MultiboardSetItemValueBJ(this.gameGlobals.Multiboard, 2, 2 + i, this.gameGlobals.GameStartingLife.toString());
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

        MultiboardSetItemValueBJ(this.gameGlobals.Multiboard, 1, 9, 'Arena in...');
        if (this.gameGlobals.GameIsSuddenDeathEnabled) {
            MultiboardSetItemValueBJ(this.gameGlobals.Multiboard, 2, 9, this.gameGlobals.GameSuddenDeathTime.toString());
        } else {
            MultiboardSetItemValueBJ(this.gameGlobals.Multiboard, 2, 9, '|cFF808080(disabled)|r');
        }

        MultiboardSetItemIconBJ(this.gameGlobals.Multiboard, 1, 9, 'UI\\Widgets\\Console\\Human\\Human-Minimap-Ally-Off.blp');

        MultiboardSetItemWidthBJ(this.gameGlobals.Multiboard, 1, 9, 10.00);
        MultiboardSetItemWidthBJ(this.gameGlobals.Multiboard, 2, 9, 8.00);

        MultiboardSetItemStyleBJ(this.gameGlobals.Multiboard, 1, 8, false, false);
        MultiboardSetItemStyleBJ(this.gameGlobals.Multiboard, 2, 8, false, false);
        MultiboardSetItemStyleBJ(this.gameGlobals.Multiboard, 3, 8, false, false);
        MultiboardSetItemStyleBJ(this.gameGlobals.Multiboard, 1, 9, true, true);
        MultiboardSetItemStyleBJ(this.gameGlobals.Multiboard, 2, 9, true, false);
        MultiboardSetItemStyleBJ(this.gameGlobals.Multiboard, 3, 9, false, false);

        MultiboardDisplayBJ(true, this.gameGlobals.Multiboard);
    }

    private enableDebugMode(): void {
        let nonBotPlayerCount: number = 0;
        for (let i: number = 0; i < bj_MAX_PLAYERS; i++) {
            if (GetPlayerSlotState(Player(i)) === PLAYER_SLOT_STATE_PLAYING && GetPlayerController(Player(i)) === MAP_CONTROL_USER) {
                nonBotPlayerCount++;
            }
        }

        if (nonBotPlayerCount === 1 && GetPlayerName(Player(0)) === 'WorldEdit') {
            // BJDebugMsg('Activating debug mode...');
            this.gameGlobals.DebugMode = true;
            /*
            for (let i: number = 0; i < this.gameGlobals.HeroArraySize; i++) {
                CreateUnit(Player(0), FourCC(this.gameGlobals.HeroUnitTypeID[i]), 2810.00, 7680.00, bj_UNIT_FACING);
            }
            */
        }
    }
}
