import { Trigger } from './JassOverrides/Trigger';
import { Log, LogLevel } from './lib/Serilog/Serilog';
import { StringSink } from './lib/Serilog/Sinks/StringSink';
import { GameGlobals, AssassinsBladeStates } from './Game/GameGlobals';
import { Hero } from './Game/Hero';
import { RandomNumberGenerator } from './Utility/RandomNumberGenerator';
import { RecipeSystem } from './Items/RecipeSystem';
import { GameOptionSystem } from './Game/GameOptionSystem';

export class Initialiser {
    public static run(): void {
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
                createQuests();
                setPlayerCameras(gameGlobals);
                const recipeSystem: RecipeSystem = new RecipeSystem(gameGlobals);
                // tslint:disable-next-line: no-unused-expression
                new GameOptionSystem(gameGlobals, recipeSystem, randomNumberGenerator);
                // tslint:disable-next-line: no-unused-expression
            },
            (err) => {
                Log.Fatal(err);
            },
        );
    }
}

// @ts-ignore
ceres.suppressDefaultMain();
// @ts-ignore
ceres.oldMain();
Initialiser.run();

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
    BlzChangeMinimapTerrainTex('war3mapImported\\war3mapPreviewSmall.dds');
    SetCameraBoundsToRect(heroSelectionArea);
    for (let i: number = 0; i < bj_MAX_PLAYERS; i++) {
        gameGlobals.SummonHawkInt[i] = 0;
        gameGlobals.ScrollOfTownPortal[i] = false;
        gameGlobals.Regenerate[i] = false;
        gameGlobals.SnowyOwl[i] = false;
        gameGlobals.ClockworkPenguin[i] = false;
        gameGlobals.AssassinsBlade[i] = AssassinsBladeStates.UNEQUIPPED;
        gameGlobals.RazorBladesOn[i] = false;
        gameGlobals.ElementalOrbCount[i] = 0;
        gameGlobals.ArcaniteSpearCount[i] = 0;
        gameGlobals.BookOfEvilCount[i] = 0;
        gameGlobals.EnhancedJavelinCount[i] = 0;
        gameGlobals.MarkOfTheTalonCount[i] = 0;
        gameGlobals.EnhancedJavelinAttackCount[i] = 0;
        gameGlobals.DivineShieldLife[i] = 0;
        gameGlobals.PlayerLifesteal[i] = 0;
        gameGlobals.PlayerRestoration[i] = 0;
        gameGlobals.PlayerThorns[i] = 0;
        gameGlobals.PlayerReflect[i] = 0;
        gameGlobals.PlayerExecute[i] = 0;
        gameGlobals.PlayerCriticalCast[i] = 0;
        gameGlobals.PlayerCooldownReduction[i] = 0;
        gameGlobals.PlayerSplash[i] = 0;
        gameGlobals.PlayerSplashRadius[i] = 0;
        gameGlobals.PlayerPiercing[i] = 0;
        gameGlobals.PlayerPerseverance[i] = 0;
        gameGlobals.PlayerPhysicalBlock[i] = 0;
        gameGlobals.PlayerSpellBlock[i] = 0;
        SetPlayerAbilityAvailable(Player(i), FourCC('A06L'), false);
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

function createQuests(): void {
    CreateQuestBJ(
        bj_QUESTTYPE_REQ_DISCOVERED,
        'Introduction',
        // tslint:disable-next-line: max-line-length
        `A new Warcraft III hero arena map |cFFCCCC00(by Runi95#2202)|r|n|n|cFF888800Win conditions|r|n|nDefeat the opposing team by killing their heroes until they run out of lives and can no longer respawn.|n|n|cFF888800Resources|r|n|nGain gold by slaying creeps found scattered all across the map. Higher level creeps tend to give more gold when defeated.|nGold can be spent at the various shops found in spawn and out on the battlefield.|nGold is also necessary when upgrading items through the recipe system.|n|n|cFF888800Recipe system|r|n|nThe recipe system is used when upgrading items to a stronger version of themselves.|nTo upgrade an item your hero HAS TO BE standing in spawn so you can click the recipe button icon which can be found right above your minimap.|nLeft clicking an item will show the recipe for that item.|nRight clicking an item will filter the item list to only show item recipes where the clicked item is used.|nOnce your hero is holding all the required recipe items and you have enough gold to purchase the recipe you'll be able to click the upgrade button.`,
        'ReplaceableTextures\\CommandButtons\\BTNBlueQuestion.blp',
    );
    CreateQuestBJ(
        bj_QUESTTYPE_REQ_DISCOVERED,
        'Commands',
        // tslint:disable-next-line: max-line-length
        `|cFF888800Command list|r|n|nThere are currently no commands available`,
        'ReplaceableTextures\\CommandButtons\\BTNExclamation.blp',
    );
    CreateQuestBJ(
        bj_QUESTTYPE_REQ_DISCOVERED,
        'Bosses',
        // tslint:disable-next-line: max-line-length
        `|cFF888800Spawning a boss|r|n|nBosses are spawned when a hero steps inside a Circle of Power.|nThe size of the circle indicates the strength of the boss.|n|n|cFF888800Rewards|r|n|nThe rewards for slaying a boss is always greater when defeating a harder boss spawned from a greater circle.|nSome bosses drop unique items that can only be obtained through killing bosses.`,
        'ReplaceableTextures\\CommandButtons\\BTNBossQuest.blp',
    );
    CreateQuestBJ(
        bj_QUESTTYPE_REQ_DISCOVERED,
        'FAQ',
        // tslint:disable-next-line: max-line-length
        `|cFF888800Frequently asked questions|r|n|nHow do I play?|n- Read the Introduction quest|n|nHow can I contribute to the map?|n- Add me on BNet (Runi95#2202) so we can discuss contributions`,
        'ReplaceableTextures\\CommandButtons\\BTNBlueQuestion.blp',
    );
    CreateQuestBJ(
        bj_QUESTTYPE_REQ_DISCOVERED,
        'Changelog',
        // tslint:disable-next-line: max-line-length
        `|cFF888800Changes|r|n|nThis map is still in its early stages so changes are frequent.|nFeedback and or questions can be sent to |cFFCCCC00Runi95#2202|r`,
        'ReplaceableTextures\\CommandButtons\\BTNChangelog.blp',
    );
}

function SendMessage(this: void, msg: any): void {
    DisplayTimedTextToForce(bj_FORCE_ALL_PLAYERS, 10, `${msg}`);
}
