import { Trigger } from './JassOverrides/Trigger';
import { Log, LogLevel } from './lib/Serilog/Serilog';
import { StringSink } from './lib/Serilog/Sinks/StringSink';
import { Game } from './Game/Game';
import { GameGlobals } from './Game/GameGlobals';
import { Hero } from './Game/Hero';
import { RandomNumberGenerator } from './Utility/RandomNumberGenerator';
import { RecipeSystem } from './Items/RecipeSystem';
import { GameOptionSystem } from './Game/GameOptionSystem';

ceres.addHook('main::after', () => {
    // tslint:disable-next-line:typedef
    const oldFourCC = FourCC;
    globalThis['FourCC'] = (id: string) => {
        const a: number = oldFourCC(id);
        return a;
    };
    Log.Init([new StringSink(LogLevel.Error, SendMessage)]);

    xpcall(
        () => {
            const gameGlobals: GameGlobals = new GameGlobals();
            const randomNumberGenerator: RandomNumberGenerator = new RandomNumberGenerator();

            BlzLoadTOCFile('war3mapImported\\Templates.toc');
            seedRandomNumberGenerator(randomNumberGenerator);
            spawnAllCreeps(gameGlobals);
            initializeHeroSelection(gameGlobals);
            setPlayerCameras(gameGlobals);
            // tslint:disable-next-line: no-unused-expression
            new GameOptionSystem(gameGlobals, randomNumberGenerator);
            // tslint:disable-next-line: no-unused-expression
            new RecipeSystem(gameGlobals);
        },
        (err) => {
            Log.Fatal(err);
        },
    );
});

function seedRandomNumberGenerator(randomNumberGenerator: RandomNumberGenerator): void {
    const trig: Trigger = new Trigger();
    trig.addAction(() => randomNumberGenerator.setSeed(Number(BlzGetTriggerSyncData())));
    for (let i: number = 0; i < bj_MAX_PLAYERS; i++) {
        trig.registerPlayerSyncEvent(Player(i), 'randomseed', false);
    }

    if (GetLocalPlayer() === Player(0)) {
        BlzSendSyncData('randomseed', os.time().toString());
    }
}

function setPlayerCameras(gameGlobals: GameGlobals): void {
    SetCameraPosition(-14400.0, -10700.0);
    const heroSelectionArea: rect = Rect(-15616, -11904, -13184, -9472);
    SetCameraBoundsToRect(heroSelectionArea);
    for (let i: number = 0; i < bj_MAX_PLAYERS; i++) {
        gameGlobals.SummonHawkInt[i] = 0;
        gameGlobals.ScrollOfTownPortal[i] = false;
        gameGlobals.Regenerate[i] = false;
        gameGlobals.SnowyOwl[i] = false;
        gameGlobals.ClockworkPenguin[i] = false;
        gameGlobals.AssassinsBlade[i] = false;
        gameGlobals.RazorBladesOn[i] = false;
        gameGlobals.DivineShieldLife[i] = 0;
        gameGlobals.PlayerLifesteal[i] = 0;
        gameGlobals.PlayerPhysicalBlock[i] = 0;
        gameGlobals.PlayerSpellBlock[i] = 0;
        FogModifierStart(CreateFogModifierRect(Player(i), FOG_OF_WAR_VISIBLE, heroSelectionArea, false, false));
        if (gameGlobals.PlayerSpawnRegion[i] !== undefined) {
            FogModifierStart(CreateFogModifierRect(Player(i), FOG_OF_WAR_VISIBLE, gameGlobals.PlayerSpawnRegion[i], true, false));
        }
        SetPlayerState(Player(i), PLAYER_STATE_RESOURCE_GOLD, 500);
    }
}

function spawnAllCreeps(gameGlobals: GameGlobals): void {
    for (let i: number = 0; i < gameGlobals.CreepUnitArraySize; i++) {
        SetUnitUserData(
            CreateUnit(
                Player(PLAYER_NEUTRAL_AGGRESSIVE),
                FourCC(gameGlobals.CreepUnitTypeID[i]),
                gameGlobals.CreepSpawnPoint[i].x,
                gameGlobals.CreepSpawnPoint[i].y,
                gameGlobals.CreepSpawnAngle[i],
            ),
            i,
        );
    }
}

function initializeHeroSelection(gameGlobals: GameGlobals): void {
    for (let i: number = 0; i < gameGlobals.HeroArraySize; i++) {
        gameGlobals.HeroList.push(
            new Hero(
                gameGlobals,
                Rect(
                    gameGlobals.HeroSelectRegions[i].minX,
                    gameGlobals.HeroSelectRegions[i].minY,
                    gameGlobals.HeroSelectRegions[i].maxX,
                    gameGlobals.HeroSelectRegions[i].maxY,
                ),
                FourCC(gameGlobals.HeroUnitTypeID[i]),
                gameGlobals.HeroSelectPoints[i].x,
                gameGlobals.HeroSelectPoints[i].y,
                gameGlobals.HeroSelectAngles[i],
            ),
        );
    }
}

function SendMessage(this: void, msg: any): void {
    DisplayTimedTextToForce(bj_FORCE_ALL_PLAYERS, 10, `${msg}`);
}
