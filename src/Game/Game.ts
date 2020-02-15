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
import { FlyingMachineController } from '../FlyingMachine/FlyingMachineController';
import { Trigger } from '../JassOverrides/Trigger';
import { Group } from '../JassOverrides/Group';
import { RecipeSystem } from '../Items/RecipeSystem';

export class Game {
    private readonly gameGlobals: GameGlobals;
    private readonly recipeSystem: RecipeSystem;
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
    private readonly flyingMachineController: FlyingMachineController;
    private readonly bossController: BossController;
    private readonly commands: Commands;
    private readonly teleportMovement: TeleportMovement;

    private readonly ancientOfWonders: unit;
    private readonly tombOfAncients: unit;
    private readonly arcaneVault: unit;

    constructor(gameGlobals: GameGlobals, recipeSystem: RecipeSystem, randomNumberGenerator: RandomNumberGenerator) {
        this.gameGlobals = gameGlobals;
        this.recipeSystem = recipeSystem;
        this.randomNumberGenerator = randomNumberGenerator;
        this.playerVictoryUtils = new PlayerVictoryUtils(this.gameGlobals);
        this.timerUtils = new TimerUtils();
        this.stunUtils = new StunUtils(this.gameGlobals, this.timerUtils);
        this.arenaUtils = new ArenaUtils(this.gameGlobals, this.timerUtils, this.stunUtils, this.randomNumberGenerator);
        this.damageEngineGlobals = new DamageEngineGlobals();
        this.damageEngine = new DamageEngine(this.timerUtils, this.damageEngineGlobals);
        this.creepRespawn = new CreepRespawn(this.gameGlobals);
        this.playerRespawn = new PlayerRespawn(this.gameGlobals, this.playerVictoryUtils);
        this.playerLeaves = new PlayerLeaves(this.playerVictoryUtils);
        this.spellController = new SpellController(this.gameGlobals, this.stunUtils, this.timerUtils, this.randomNumberGenerator);
        this.teleportController = new TeleportController();
        this.damageEventController = new DamageEventController(
            this.gameGlobals,
            this.timerUtils,
            this.randomNumberGenerator,
            this.damageEngine,
        );
        this.flyingMachineController = new FlyingMachineController();
        this.bossController = new BossController(this.timerUtils, this.randomNumberGenerator);
        this.teleportMovement = new TeleportMovement(this.gameGlobals);
        const ancientOfWondersX: number = this.randomNumberGenerator.random(0, 10630) - 2370;
        const ancientOfWondersY: number = this.randomNumberGenerator.random(0, 25400) - 12700;
        const tombOfAncientsX: number = this.randomNumberGenerator.random(0, 10630) - 2370;
        const tombOfAncientsY: number = this.randomNumberGenerator.random(0, 25400) - 12700;
        const arcaneVaultX: number = this.randomNumberGenerator.random(0, 10630) - 2370;
        const arcaneVaultY: number = this.randomNumberGenerator.random(0, 25400) - 12700;
        this.ancientOfWonders = CreateUnit(
            Player(PLAYER_NEUTRAL_PASSIVE),
            FourCC('n00R'),
            ancientOfWondersX,
            ancientOfWondersY,
            bj_UNIT_FACING,
        );
        this.tombOfAncients = CreateUnit(Player(PLAYER_NEUTRAL_PASSIVE), FourCC('n00Q'), tombOfAncientsX, tombOfAncientsY, bj_UNIT_FACING);
        this.arcaneVault = CreateUnit(Player(PLAYER_NEUTRAL_PASSIVE), FourCC('n00P'), arcaneVaultX, arcaneVaultY, bj_UNIT_FACING);

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
        this.createSpawnHealTriggers();
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
        BlzChangeMinimapTerrainTex('war3mapMap.blp');
        SetCameraBoundsToRect(GetCameraBoundsMapRect());
        this.recipeSystem.showMainButton();

        const t: Timer = this.timerUtils.newTimer();
        t.start(2, false, () => {
            BlzFrameSetSpriteAnimate(this.recipeSystem.animatedFrame, 2, 0);
            this.timerUtils.releaseTimer(t);
        });

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
            if (this.gameGlobals.ActivePlayerIdList.every((playerId) => this.gameGlobals.PlayerHeroId[playerId] !== undefined)) {
                this.timerUtils.releaseTimer(t);
                this.startGame();
            } else if (index === 0 || this.gameGlobals.PlayerHeroId[randomizedPlayerIdArray[index - 1]] !== undefined) {
                const playerId: number = randomizedPlayerIdArray[index++];
                const heroSelector: unit = CreateUnit(Player(playerId), heroSelectorId, -14400.0, -10700.0, bj_UNIT_FACING);
                if (this.gameGlobals.GameIsAllRandomEnabled || GetPlayerController(Player(playerId)) === MAP_CONTROL_COMPUTER) {
                    UnitAddAbility(heroSelector, FourCC('Aloc'));
                    const availableHeroIndexes: number[] = [];
                    for (let i: number = 0; i < this.gameGlobals.HeroList.length; i++) {
                        if (!this.gameGlobals.HeroList[i].getIsHeroPicked()) {
                            availableHeroIndexes.push(i);
                        }
                    }

                    const selectedIndex: number = this.randomNumberGenerator.random(0, availableHeroIndexes.length - 1);
                    IssuePointOrder(
                        heroSelector,
                        'move',
                        this.gameGlobals.HeroSelectRegions[availableHeroIndexes[selectedIndex]].getCenter().x,
                        this.gameGlobals.HeroSelectRegions[availableHeroIndexes[selectedIndex]].getCenter().y,
                    );
                }
            }
        });
    }

    private initializeScoreboard(): void {
        this.gameGlobals.Multiboard = CreateMultiboardBJ(3, 9, 'Spawn of the Enemy');
        MultiboardSetItemValueBJ(this.gameGlobals.Multiboard, 1, 1, 'Player');
        MultiboardSetItemValueBJ(this.gameGlobals.Multiboard, 2, 1, 'Lives');
        MultiboardSetItemValueBJ(this.gameGlobals.Multiboard, 3, 1, 'Level');

        MultiboardSetItemWidthBJ(this.gameGlobals.Multiboard, 1, 1, 10.0);
        MultiboardSetItemWidthBJ(this.gameGlobals.Multiboard, 2, 1, 4.0);
        MultiboardSetItemWidthBJ(this.gameGlobals.Multiboard, 3, 1, 4.0);

        MultiboardSetItemStyleBJ(this.gameGlobals.Multiboard, 1, 1, true, false);
        MultiboardSetItemStyleBJ(this.gameGlobals.Multiboard, 2, 1, true, false);
        MultiboardSetItemStyleBJ(this.gameGlobals.Multiboard, 3, 1, true, false);

        for (let i: number = 0; i < 6; i++) {
            if (GetPlayerSlotState(Player(i)) === PLAYER_SLOT_STATE_PLAYING) {
                MultiboardSetItemValueBJ(
                    this.gameGlobals.Multiboard,
                    1,
                    2 + i,
                    `${this.gameGlobals.PlayerColorCodes[i]}${GetPlayerName(Player(i))}|r`,
                );
                MultiboardSetItemValueBJ(this.gameGlobals.Multiboard, 2, 2 + i, this.gameGlobals.GameStartingLife.toString());
                MultiboardSetItemValueBJ(this.gameGlobals.Multiboard, 3, 2 + i, '1');
            } else {
                MultiboardSetItemValueBJ(this.gameGlobals.Multiboard, 1, 2 + i, `${this.gameGlobals.PlayerColorCodes[i]}None|r`);
                MultiboardSetItemValueBJ(this.gameGlobals.Multiboard, 2, 2 + i, '-');
                MultiboardSetItemValueBJ(this.gameGlobals.Multiboard, 3, 2 + i, '-');
            }

            MultiboardSetItemWidthBJ(this.gameGlobals.Multiboard, 1, 2 + i, 10.0);
            MultiboardSetItemWidthBJ(this.gameGlobals.Multiboard, 2, 2 + i, 4.0);
            MultiboardSetItemWidthBJ(this.gameGlobals.Multiboard, 3, 2 + i, 4.0);

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

        MultiboardSetItemWidthBJ(this.gameGlobals.Multiboard, 1, 9, 10.0);
        MultiboardSetItemWidthBJ(this.gameGlobals.Multiboard, 2, 9, 8.0);

        MultiboardSetItemStyleBJ(this.gameGlobals.Multiboard, 1, 8, false, false);
        MultiboardSetItemStyleBJ(this.gameGlobals.Multiboard, 2, 8, false, false);
        MultiboardSetItemStyleBJ(this.gameGlobals.Multiboard, 3, 8, false, false);
        MultiboardSetItemStyleBJ(this.gameGlobals.Multiboard, 1, 9, true, true);
        MultiboardSetItemStyleBJ(this.gameGlobals.Multiboard, 2, 9, true, false);
        MultiboardSetItemStyleBJ(this.gameGlobals.Multiboard, 3, 9, false, false);

        MultiboardDisplayBJ(true, this.gameGlobals.Multiboard);
    }

    private startDebugUI(): void {
        BJDebugMsg('Launching debug UI');
        const goldButton: framehandle = BlzCreateFrameByType(
            'BUTTON',
            'goldButton',
            BlzGetOriginFrame(ORIGIN_FRAME_GAME_UI, 0),
            'StandardButtonTemplate',
            0,
        );
        const goldBackdrop: framehandle = BlzCreateFrameByType('BACKDROP', 'goldBackdrop', goldButton, 'ButtonBackdropTemplate', 0);
        const lumberButton: framehandle = BlzCreateFrameByType(
            'BUTTON',
            'lumberButton',
            BlzGetOriginFrame(ORIGIN_FRAME_GAME_UI, 0),
            'StandardButtonTemplate',
            0,
        );
        const lumberBackdrop: framehandle = BlzCreateFrameByType('BACKDROP', 'lumberBackdrop', lumberButton, 'ButtonBackdropTemplate', 0);
        const teleportButton: framehandle = BlzCreateFrameByType(
            'BUTTON',
            'teleportButton',
            BlzGetOriginFrame(ORIGIN_FRAME_GAME_UI, 0),
            'StandardButtonTemplate',
            0,
        );
        const teleportBackdrop: framehandle = BlzCreateFrameByType(
            'BACKDROP',
            'teleportBackdrop',
            teleportButton,
            'ButtonBackdropTemplate',
            0,
        );
        const healHitpointsButton: framehandle = BlzCreateFrameByType(
            'BUTTON',
            'healHitpointsButton',
            BlzGetOriginFrame(ORIGIN_FRAME_GAME_UI, 0),
            'StandardButtonTemplate',
            0,
        );
        const healHitpointsBackdrop: framehandle = BlzCreateFrameByType(
            'BACKDROP',
            'healHitpointsBackdrop',
            healHitpointsButton,
            'ButtonBackdropTemplate',
            0,
        );
        const healManaButton: framehandle = BlzCreateFrameByType(
            'BUTTON',
            'healManaButton',
            BlzGetOriginFrame(ORIGIN_FRAME_GAME_UI, 0),
            'StandardButtonTemplate',
            0,
        );
        const healManaBackdrop: framehandle = BlzCreateFrameByType(
            'BACKDROP',
            'healManaBackdrop',
            healManaButton,
            'ButtonBackdropTemplate',
            0,
        );
        const resetCooldownButton: framehandle = BlzCreateFrameByType(
            'BUTTON',
            'resetCooldownButton',
            BlzGetOriginFrame(ORIGIN_FRAME_GAME_UI, 0),
            'StandardButtonTemplate',
            0,
        );
        const resetCooldownBackdrop: framehandle = BlzCreateFrameByType(
            'BACKDROP',
            'resetCooldownBackdrop',
            resetCooldownButton,
            'ButtonBackdropTemplate',
            0,
        );
        const levelUpButton: framehandle = BlzCreateFrameByType(
            'BUTTON',
            'levelUpButton',
            BlzGetOriginFrame(ORIGIN_FRAME_GAME_UI, 0),
            'StandardButtonTemplate',
            0,
        );
        const levelUpBackdrop: framehandle = BlzCreateFrameByType(
            'BACKDROP',
            'levelUpBackdrop',
            levelUpButton,
            'ButtonBackdropTemplate',
            0,
        );
        BlzFrameSetSize(goldButton, 0.02, 0.02);
        BlzFrameSetSize(goldBackdrop, 0.02, 0.02);
        BlzFrameSetSize(lumberButton, 0.02, 0.02);
        BlzFrameSetSize(lumberBackdrop, 0.02, 0.02);
        BlzFrameSetSize(teleportButton, 0.02, 0.02);
        BlzFrameSetSize(teleportBackdrop, 0.02, 0.02);
        BlzFrameSetSize(healHitpointsButton, 0.02, 0.02);
        BlzFrameSetSize(healHitpointsBackdrop, 0.02, 0.02);
        BlzFrameSetSize(healManaButton, 0.02, 0.02);
        BlzFrameSetSize(healManaBackdrop, 0.02, 0.02);
        BlzFrameSetSize(resetCooldownButton, 0.02, 0.02);
        BlzFrameSetSize(resetCooldownBackdrop, 0.02, 0.02);
        BlzFrameSetSize(levelUpButton, 0.02, 0.02);
        BlzFrameSetSize(levelUpBackdrop, 0.02, 0.02);
        BlzFrameSetTexture(goldBackdrop, 'UI\\Feedback\\Resources\\ResourceGold.blp', 0, true);
        BlzFrameSetTexture(lumberBackdrop, 'UI\\Feedback\\Resources\\ResourceLumber.blp', 0, true);
        BlzFrameSetTexture(teleportBackdrop, 'ReplaceableTextures\\CommandButtons\\BTNUnloadCrossed.blp', 0, true);
        BlzFrameSetTexture(healHitpointsBackdrop, 'ReplaceableTextures\\CommandButtons\\BTNPotionGreenNoBorder.blp', 0, true);
        BlzFrameSetTexture(healManaBackdrop, 'ReplaceableTextures\\CommandButtons\\BTNPotionBlueNoBorder.blp', 0, true);
        BlzFrameSetTexture(resetCooldownBackdrop, 'ReplaceableTextures\\CommandButtons\\BTNSelectUnitNoBorder.blp', 0, true);
        BlzFrameSetTexture(levelUpBackdrop, 'ReplaceableTextures\\CommandButtons\\BTNStatUpNoBorder.blp', 0, true);
        BlzFrameSetAbsPoint(goldButton, FRAMEPOINT_CENTER, 0.215, 0.15);
        BlzFrameSetAbsPoint(lumberButton, FRAMEPOINT_CENTER, 0.24, 0.15);
        BlzFrameSetAbsPoint(teleportButton, FRAMEPOINT_CENTER, 0.265, 0.15);
        BlzFrameSetAbsPoint(healHitpointsButton, FRAMEPOINT_CENTER, 0.505, 0.15);
        BlzFrameSetAbsPoint(healManaButton, FRAMEPOINT_CENTER, 0.53, 0.15);
        BlzFrameSetAbsPoint(resetCooldownButton, FRAMEPOINT_CENTER, 0.555, 0.15);
        BlzFrameSetAbsPoint(levelUpButton, FRAMEPOINT_CENTER, 0.58, 0.15);
        BlzFrameSetPoint(goldBackdrop, FRAMEPOINT_CENTER, goldButton, FRAMEPOINT_CENTER, 0.0, 0.0);
        BlzFrameSetPoint(lumberBackdrop, FRAMEPOINT_CENTER, lumberButton, FRAMEPOINT_CENTER, 0.0, 0.0);
        BlzFrameSetPoint(teleportBackdrop, FRAMEPOINT_CENTER, teleportButton, FRAMEPOINT_CENTER, 0.0, 0.0);
        BlzFrameSetPoint(healHitpointsBackdrop, FRAMEPOINT_CENTER, healHitpointsButton, FRAMEPOINT_CENTER, 0.0, 0.0);
        BlzFrameSetPoint(healManaBackdrop, FRAMEPOINT_CENTER, healManaButton, FRAMEPOINT_CENTER, 0.0, 0.0);
        BlzFrameSetPoint(resetCooldownBackdrop, FRAMEPOINT_CENTER, resetCooldownButton, FRAMEPOINT_CENTER, 0.0, 0.0);
        BlzFrameSetPoint(levelUpBackdrop, FRAMEPOINT_CENTER, levelUpButton, FRAMEPOINT_CENTER, 0.0, 0.0);

        const createButtonTrigger: (frame: framehandle, event: () => void) => void = (frame: framehandle, event: () => void) => {
            const trig: Trigger = new Trigger();
            trig.addAction(() => event());
            trig.registerFrameEvent(frame, FRAMEEVENT_CONTROL_CLICK);
        };
        createButtonTrigger(goldButton, () => {
            BlzFrameSetEnable(goldButton, false);
            SetPlayerState(Player(0), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState(Player(0), PLAYER_STATE_RESOURCE_GOLD) + 1000);
            BlzFrameSetEnable(goldButton, true);
        });
        createButtonTrigger(lumberButton, () => {
            BlzFrameSetEnable(lumberButton, false);
            SetPlayerState(Player(0), PLAYER_STATE_RESOURCE_LUMBER, GetPlayerState(Player(0), PLAYER_STATE_RESOURCE_LUMBER) + 1000);
            BlzFrameSetEnable(lumberButton, true);
        });
        createButtonTrigger(teleportButton, () => {
            BlzFrameSetEnable(teleportButton, false);
            const teleportMovement: boolean = this.gameGlobals.TeleportMovement;

            if (teleportMovement) {
                this.gameGlobals.TeleportMovement = false;
                BlzFrameSetTexture(teleportBackdrop, 'ReplaceableTextures\\CommandButtons\\BTNUnloadCrossed.blp', 0, true);
            } else {
                this.gameGlobals.TeleportMovement = true;
                BlzFrameSetTexture(teleportBackdrop, 'ReplaceableTextures\\CommandButtons\\BTNUnloadNoBorder.blp', 0, true);
            }
            BlzFrameSetEnable(teleportButton, true);
        });
        createButtonTrigger(healHitpointsButton, () => {
            BlzFrameSetEnable(healHitpointsButton, false);
            const grp: Group = new Group(GetUnitsSelectedAll(Player(0)));
            grp.for((u: unit) => {
                SetUnitLifePercentBJ(u, 100);
            });

            grp.destroy();
            BlzFrameSetEnable(healHitpointsButton, true);
        });
        createButtonTrigger(healManaButton, () => {
            BlzFrameSetEnable(healManaButton, false);
            const grp: Group = new Group(GetUnitsSelectedAll(Player(0)));
            grp.for((u: unit) => {
                SetUnitManaPercentBJ(u, 100);
            });

            grp.destroy();
            BlzFrameSetEnable(healManaButton, true);
        });
        createButtonTrigger(resetCooldownButton, () => {
            BlzFrameSetEnable(resetCooldownButton, false);
            const grp: Group = new Group(GetUnitsSelectedAll(Player(0)));
            grp.for((u: unit) => {
                UnitResetCooldown(u);
            });

            grp.destroy();
            BlzFrameSetEnable(resetCooldownButton, true);
        });
        createButtonTrigger(levelUpButton, () => {
            BlzFrameSetEnable(levelUpButton, false);
            const grp: Group = new Group(GetUnitsSelectedAll(Player(0)));
            grp.for((u: unit) => {
                if (IsUnitType(u, UNIT_TYPE_HERO)) {
                    SetHeroLevel(u, GetHeroLevel(u) + 1, true);
                }
            });

            grp.destroy();
            BlzFrameSetEnable(levelUpButton, true);
        });
    }

    private createSpawnHealTriggers(): void {
        for (let i: number = 0; i < this.gameGlobals.PlayerSpawnRegion.length; i++) {
            const index: number = i;
            const trig: Trigger = new Trigger();
            trig.registerEnterRectSimple(this.gameGlobals.PlayerSpawnRegion[i]);
            trig.addCondition(() => GetOwningPlayer(GetTriggerUnit()) === Player(index));
            trig.addAction(() => {
                SetUnitLifePercentBJ(GetTriggerUnit(), 100);
                SetUnitManaPercentBJ(GetTriggerUnit(), 100);
            });
        }
    }

    private enableDebugMode(): void {
        let nonBotPlayerCount: number = 0;
        for (let i: number = 0; i < bj_MAX_PLAYERS; i++) {
            if (GetPlayerSlotState(Player(i)) === PLAYER_SLOT_STATE_PLAYING && GetPlayerController(Player(i)) === MAP_CONTROL_USER) {
                nonBotPlayerCount++;
            }
        }

        if (nonBotPlayerCount === 1 && GetPlayerName(Player(0)) === 'Local Player') {
            this.gameGlobals.DebugMode = true;
            this.startDebugUI();
        }
    }
}
