import { Trigger } from './JassOverrides/Trigger';
import { Log, LogLevel } from './lib/Serilog/Serilog';
import { StringSink } from './lib/Serilog/Sinks/StringSink';
import { Game } from './Game/Game';
import { GameGlobals } from './Game/GameGlobals';
import { Hero } from './Game/Hero';


ceres.addHook('main::after', () => {
    Log.Init([
        new StringSink(LogLevel.Error, SendMessage),
    ]);

    xpcall(() => {
        const gameGlobals: GameGlobals = new GameGlobals();

        spawnAllCreeps(gameGlobals);
        initializeHeroSelection(gameGlobals);

        const gameTrig: Trigger = new Trigger();
        gameTrig.registerTimerEvent(0.00, false);
        gameTrig.addAction(() => {
            const game: Game = new Game(gameGlobals);
        });
    },     (err) => {
        Log.Fatal(err);
    });
});

function spawnAllCreeps(gameGlobals: GameGlobals): void {
    for (let i: number = 0; i < gameGlobals.CreepUnitArraySize; i++) {
        SetUnitUserData(CreateUnit(Player(PLAYER_NEUTRAL_AGGRESSIVE),
                                   FourCC(gameGlobals.CreepUnitTypeID[i]),
                                   gameGlobals.CreepSpawnPoint[i].x,
                                   gameGlobals.CreepSpawnPoint[i].y,
                                   gameGlobals.CreepSpawnAngle[i]),
                        i);
    }
}

function initializeHeroSelection(gameGlobals: GameGlobals): void {
    const heroes: Hero[] = [];
    for (let i: number = 0; i < gameGlobals.HeroArraySize; i++) {
        heroes.push(new Hero(gameGlobals,
                             Rect(gameGlobals.HeroSelectRegions[i].minX,
                                  gameGlobals.HeroSelectRegions[i].minY,
                                  gameGlobals.HeroSelectRegions[i].maxX,
                                  gameGlobals.HeroSelectRegions[i].maxY),
                             FourCC(gameGlobals.HeroUnitTypeID[i]),
                             gameGlobals.HeroSelectPoints[i].x,
                             gameGlobals.HeroSelectPoints[i].y,
                             gameGlobals.HeroSelectAngles[i]));
    }
}

function SendMessage(this: void, msg: any): void {
    DisplayTimedTextToForce(bj_FORCE_ALL_PLAYERS, 10, `${msg}`);
}
