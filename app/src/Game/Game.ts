import { DamageEngine } from '../DamageEngine/DamageEngine';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { PhysicalBlockEvent } from '../DamageEvents/PhysicalBlockEvent';
import { GameGlobals } from './GameGlobals';
import { TimerUtils } from '../Utility/TimerUtils';
import { SpellBlockEvent } from '../DamageEvents/SpellBlockEvent';
import { SpellController } from '../Spells/SpellController';
import { StunUtils } from '../Utility/StunUtils';
import { TeleportController } from '../Teleports/TeleportController';
import { ItemController } from '../Items/ItemController';
import { CreepRespawn } from './CreepRespawn';
import { PlayerRespawn } from './PlayerRespawn';

export class Game {
    private readonly gameGlobals: GameGlobals;
    private readonly timerUtils: TimerUtils;
    private readonly stunUtils: StunUtils;
    private readonly damageEngineGlobals: DamageEngineGlobals;
    private readonly damageEngine: DamageEngine;
    private readonly physicalBlockEvent: PhysicalBlockEvent;
    private readonly spellBlockEvent: SpellBlockEvent;
    private readonly creepRespawn: CreepRespawn;
    private readonly playerRespawn: PlayerRespawn;
    private readonly spellController: SpellController;
    private readonly teleportController: TeleportController;
    private readonly itemController: ItemController;

    private readonly arenaGate: destructable;

    constructor() {
        this.gameGlobals = new GameGlobals();
        this.timerUtils = new TimerUtils();
        this.stunUtils = new StunUtils(this.timerUtils);
        this.damageEngineGlobals = new DamageEngineGlobals();
        this.damageEngine = new DamageEngine(this.damageEngineGlobals);
        this.physicalBlockEvent = new PhysicalBlockEvent(this.gameGlobals);
        this.spellBlockEvent = new SpellBlockEvent(this.gameGlobals);
        this.creepRespawn = new CreepRespawn(this.gameGlobals);
        this.playerRespawn = new PlayerRespawn(this.gameGlobals);
        this.spellController = new SpellController(this.gameGlobals, this.stunUtils, this.timerUtils);
        this.teleportController = new TeleportController();
        this.itemController = new ItemController(this.gameGlobals);

        this.damageEngine.AddInitialDamageModificationEvent(this.physicalBlockEvent);
        this.damageEngine.AddInitialDamageModificationEvent(this.spellBlockEvent);

        this.arenaGate = CreateDestructable(FourCC('ATg1'), 2944, 5632, 0, 1, 0);
        ModifyGateBJ(bj_GATEOPERATION_OPEN, this.arenaGate);

        this.init();
    }

    private init(): void {
        this.initializePlayers();
        this.spawnAllCreeps();
        this.spawnShops();
        this.initializeScoreboard();
        this.enableDebugMode();
    }

    private initializePlayers(): void {
        for (let i: number = 0; i < 5; i++) {
            if (GetPlayerSlotState(Player(i)) === PLAYER_SLOT_STATE_PLAYING && GetPlayerController(Player(i)) === MAP_CONTROL_USER) {
                this.gameGlobals.PlayerCount++;
                SetPlayerStateBJ(Player(i), PLAYER_STATE_RESOURCE_GOLD, 500);
                CreateUnit(Player(i), FourCC(this.gameGlobals.HeroUnitTypeID[GetRandomInt(0, this.gameGlobals.HeroArraySize)]),
                           GetRectCenterX(this.gameGlobals.PlayerSpawnRegion[i]),
                           GetRectCenterY(this.gameGlobals.PlayerSpawnRegion[i]), bj_UNIT_FACING);
                FogModifierStart(CreateFogModifierRect(Player(i), FOG_OF_WAR_VISIBLE, this.gameGlobals.PlayerSpawnRegion[i], true, false));
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

    private spawnShops(): void {
        const ancientOfWondersX: number = I2R(GetRandomInt(0, 10630) - 2370);
        const ancientOfWondersY: number = I2R(GetRandomInt(0, 25400) - 12700);
        const tombOfAncientsX: number = I2R(GetRandomInt(0, 10630) - 2370);
        const tombOfAncientsY: number = I2R(GetRandomInt(0, 25400) - 12700);
        const arcaneVaultX: number = I2R(GetRandomInt(0, 10630) - 2370);
        const arcaneVaultY: number = I2R(GetRandomInt(0, 25400) - 12700);
        CreateUnit(Player(PLAYER_NEUTRAL_AGGRESSIVE), FourCC('n00R'), ancientOfWondersX, ancientOfWondersY, bj_UNIT_FACING);
        CreateUnit(Player(PLAYER_NEUTRAL_AGGRESSIVE), FourCC('n00Q'), tombOfAncientsX, tombOfAncientsY, bj_UNIT_FACING);
        CreateUnit(Player(PLAYER_NEUTRAL_AGGRESSIVE), FourCC('n00P'), arcaneVaultX, arcaneVaultY, bj_UNIT_FACING);
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
            BJDebugMsg('Activating debug mode...');
            this.gameGlobals.DebugMode = true;
            for (let i: number = 0; i < this.gameGlobals.HeroArraySize; i++) {
                CreateUnit(Player(0), FourCC(this.gameGlobals.HeroUnitTypeID[i]), 2810.00, 7680.00, bj_UNIT_FACING);
            }
        }
    }
}
