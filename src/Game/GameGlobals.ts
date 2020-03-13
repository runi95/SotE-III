import { Point } from '../Utility/Point';
import { Region } from '../Utility/Region';
import { Hero } from './Hero';

export enum AssassinsBladeStates {
    UNEQUIPPED,
    READY,
    COOLDOWN,
}

export class GameGlobals {
    public SummonHawkInt: number[] = [];
    public ScrollOfTownPortal: boolean[] = [];
    public Repetition: number[] = [];
    public RepetitionCounter: number[] = [];
    public Regenerate: boolean[] = [];
    public CryostasisSummons: unit[] = [];
    public GoblinBattery: boolean[] = [];
    public SnowyOwl: boolean[] = [];
    public ClockworkPenguin: boolean[] = [];
    public AssassinsBlade: AssassinsBladeStates[] = [];
    public RazorBladesOn: boolean[] = [];
    public ElementalOrbCount: number[] = [];
    public ArcaniteSpearCount: number[] = [];
    public DivineShieldLife: number[] = [];
    public PlayerLifesteal: number[] = [];
    public PlayerRestoration: number[] = [];
    public PlayerThorns: number[] = [];
    public PlayerReflect: number[] = [];
    public PlayerExecute: number[] = [];
    public PlayerCriticalCast: number[] = [];
    public PlayerSplash: number[] = [];
    public PlayerSplashRadius: number[] = [];
    public PlayerPiercing: number[] = [];
    public PlayerPerseverance: number[] = [];
    public PlayerPhysicalBlock: number[] = [];
    public PlayerSpellBlock: number[] = [];
    public PlayerHero: unit[] = [];
    public PlayerHeroId: number[] = [];
    public ActivePlayerIdList: number[] = [];

    public PlayerCount: number = 0;

    public Multiboard: multiboard | undefined = undefined;

    public DebugMode: boolean = false;
    public TeleportMovement: boolean = false;

    public CenterPortalRegion: rect = Rect(2880.0, 192, 3008, 320);
    public TheArenaRegion: rect = Rect(1280.0, 6016.0, 4608.0, 9344.0);
    public IsArenaBattleInProgress: boolean = false;
    public ArenaOneMinuteSound: sound = CreateSound('Sound\\Interface\\Hint.wav', false, false, false, 0, 0, 'DefaultEAXON');
    public ArenaStartedSound: sound = CreateSound('Sound\\Interface\\NewTournament.wav', false, false, false, 0, 0, 'DefaultEAXON');
    public ArenaCountdownSound: sound = CreateSound('Sound\\Interface\\BattleNetTick.wav', false, false, false, 0, 0, 'DefaultEAXON');
    public ArenaFightSound: sound = CreateSound('Sound\\Interface\\Rescue.wav', false, false, false, 0, 0, 'DefaultEAXON');
    public PlayerColorCodes: string[] = ['|c00FF0303', '|c000042FF', '|c001CE6B9', '|c00540081', '|c00FFFC01', '|c00fEBA0E'];

    // ========================================
    //
    // 	Game Settings
    //
    // ========================================

    public GameIsFogOfWarEnabled: boolean = true;
    public GameIsAllRandomEnabled: boolean = false;
    public GameIsTeamsEnabled: boolean = true;
    public GameIsSuddenDeathEnabled: boolean = true;
    public GameStartingLife: number = 10;
    public GameSuddenDeathTime: number = 600;

    // ========================================
    //
    // 	Creep Spawn Positions
    //
    // ========================================

    // Players' Creep Spawns
    public CreepSpawnPoint: Point[] = [
        // Purple
        new Point(-2880.0, 12096.0),
        new Point(-2496.0, 12096.0),
        new Point(-2880.0, 11712.0),
        new Point(-2496.0, 11712.0),
        new Point(-2880.0, 8768.0),
        new Point(-2496.0, 8768.0),
        new Point(-2880.0, 8384.0),
        new Point(-2496.0, 8384.0),

        // Yellow
        new Point(-2880.0, 1600.0),
        new Point(-2496.0, 1600.0),
        new Point(-2880.0, 1216.0),
        new Point(-2496.0, 1216.0),
        new Point(-2880.0, -1728.0),
        new Point(-2496.0, -1728.0),
        new Point(-2880.0, -2112.0),
        new Point(-2496.0, -2112.0),

        // Orange
        new Point(-2880.0, -8896.0),
        new Point(-2496.0, -8896.0),
        new Point(-2880.0, -9280.0),
        new Point(-2496.0, -9280.0),
        new Point(-2880.0, -12224.0),
        new Point(-2496.0, -12224.0),
        new Point(-2880.0, -12608.0),
        new Point(-2496.0, -12608.0),

        // Red
        new Point(8384.0, 12096.0),
        new Point(8768.0, 12096.0),
        new Point(8384.0, 11712.0),
        new Point(8768.0, 11712.0),
        new Point(8384.0, 8768.0),
        new Point(8768.0, 8768.0),
        new Point(8384.0, 8384.0),
        new Point(8768.0, 8384.0),

        // Blue
        new Point(8384.0, 1600.0),
        new Point(8768.0, 1600.0),
        new Point(8384.0, 1216.0),
        new Point(8768.0, 1216.0),
        new Point(8384.0, -1728.0),
        new Point(8768.0, -1728.0),
        new Point(8384.0, -2112.0),
        new Point(8768.0, -2112.0),

        // Teal
        new Point(8384.0, -8896.0),
        new Point(8768.0, -8896.0),
        new Point(8384.0, -9280.0),
        new Point(8768.0, -9280.0),
        new Point(8384.0, -12224.0),
        new Point(8768.0, -12224.0),
        new Point(8384.0, -12608.0),
        new Point(8768.0, -12608.0),

        // Graveyard Zombies
        new Point(-6496.0, -12624.0),
        new Point(-6240.0, -12624.0),
        new Point(-5984.0, -12624.0),
        new Point(-6528.0, -13008.0),
        new Point(-6288.0, -13008.0),
        new Point(-6048.0, -13008.0),

        // Succubus
        new Point(-6975.0, -14655.0),

        // Ghouls
        new Point(-5888.0, -13432.0),
        new Point(-6894.0, -13776.0),
        new Point(-6523.0, -15227.0),
        new Point(-7583.0, -15024.0),
        new Point(-8046.0, -14465.0),
        new Point(-7200.0, -11700.0),
        new Point(-5853.0, -11703.0),
        new Point(-5824.0, -14262.0),
        new Point(-8091.0, -15547.0),

        // Beetles
        new Point(-1417.0, 12803.0),
        new Point(-1075.0, 13098.0),
        new Point(-1070.0, 12567.0),
        new Point(-1189.0, 12814.0),
        new Point(-1333.0, 12293.0),
        new Point(-1600.0, 12536.0),
        new Point(-1522.0, 13213.0),
        new Point(-735.0, 12527.0),
        new Point(349.0, 13080.0),
        new Point(1148.0, 12105.0),
        new Point(-1917.0, 13613.0),
        new Point(-2448.0, 13834.0),
        new Point(-1165.0, 14432.0),
        new Point(-173.0, 14454.0),
        new Point(460.0, 11669.0),
        new Point(907.0, 12676.0),
        new Point(605.0, 13744.0),
        new Point(-1813.0, 14964.0),
        new Point(1834.0, 14462.0),
        new Point(2048.0, 10495.0),
        new Point(2560.0, 10750.0),
        new Point(3840.0, 10935.0),
        new Point(3375.0, 11693.0),
        new Point(4480.0, 11331.0),
        new Point(2074.0, 12550.0),
        new Point(4188.0, 10140.0),
        new Point(3018.0, 14276.0),
        new Point(2985.0, 13092.0),
        new Point(3888.0, 12723.0),
        new Point(4364.0, 14942.0),

        // Murloc Slaves
        new Point(13650.0, 6656.0),
        new Point(13126.0, 7360.0),
        new Point(13881.0, 7318.0),
        new Point(13254.0, 7793.0),
        new Point(14140.0, 8922.0),

        // Murlocs
        new Point(15217.0, 9473.0),
        new Point(13750.0, 9676.0),
        new Point(12953.0, 10512.0),
        new Point(13345.0, 11188.0),
        new Point(14426.0, 11188.0),
        new Point(15038.0, 11509.0),

        // Murloc Mages
        new Point(13766.0, 10428.0),

        // Centaur Archers
        new Point(9785.0, 14390.0),
        new Point(14258.0, 13593.0),
        new Point(14406.0, 14904.0),
        new Point(14906.0, 14380.0),

        // Centaurs
        new Point(9144.0, 13500.0),
        new Point(12191.0, 14248.0),
        new Point(11697.0, 13117.0),
        new Point(12461.0, 13117.0),
        new Point(12857.0, 14414.0),
        new Point(13126.0, 14512.0),
        new Point(13229.0, 14263.0),

        // Ice Revenants
        new Point(11489.0, 1589.0),
        new Point(12953.0, 2718.0),
        new Point(14236.0, 3374.0),
        new Point(14270.0, 1870.0),
        new Point(13486.0, -954.0),
        new Point(12475.0, -2151.0),

        // Burning Archers
        new Point(-9153.0, -11970.0),

        // Giant Skeleton Warriors
        new Point(-9145.0, -11707.0),
        new Point(-8888.0, -11970.0),
        new Point(-7873.0, -11450.0),
        new Point(-6980.0, -10940.0),

        // Skeletal Orcs
        new Point(-9150.0, -9662.0),
        new Point(-8647.0, -10560.0),
        new Point(-7613.0, -10048.0),
        new Point(-6845.0, -10940.0),
        new Point(-5956.0, 9659.0),

        // Eredar Warlocks
        new Point(14080.0, -15335.0),

        // Eredar Diabolists
        new Point(14334.0, -15362.0),

        // Nether Dragons
        new Point(14847.0, -14336.0),
        new Point(5758.0, -15611.0),

        // Fel Ravagers
        new Point(12287.0, -15358.0),
        new Point(12800.0, -13818.0),
        new Point(14333.0, -12820.0),
        new Point(7156.0, -14826.0),

        // Fel Beasts
        new Point(8704.0, -13938.0),
        new Point(8703.0, -14833.0),
        new Point(8831.0, -13807.0),
        new Point(9359.0, -15489.0),
        new Point(9600.0, -14336.0),
        new Point(10108.0, -13445.0),
        new Point(10121.0, -14984.0),
        new Point(11264.0, -13310.0),
        new Point(11780.0, -14848.0),
        new Point(12681.0, -13945.0),
        new Point(13191.0, -12670.0),
        new Point(13803.0, -11629.0),
        new Point(14209.0, -12806.0),
        new Point(14452.0, -12809.0),
        new Point(14858.0, -11770.0),
        new Point(5639.0, -14978.0),
        new Point(6146.0, -14198.0),
        new Point(6789.0, -15737.0),

        // Satyrs
        new Point(-2687.0, -5248.0),
        new Point(-1660.0, -5421.0),
        new Point(-2236.0, -4089.0),
        new Point(-2421.0, -6430.0),
        new Point(-1544.0, -7740.0),
        new Point(-1017.0, -3072.0),
        new Point(-503.0, -2023.0),
        new Point(377.0, -2130.0),
        new Point(-187.0, -2995.0),
        new Point(-766.0, -7851.0),
        new Point(-841.0, -8762.0),
        new Point(-707.0, -8900.0),
        new Point(1208.0, -9844.0),
        new Point(2391.0, -9351.0),
        new Point(2405.0, -10330.0),
        new Point(4089.0, -10450.0),
        new Point(4487.0, -9051.0),
        new Point(6107.0, -9339.0),
        new Point(6807.0, -8421.0),
        new Point(8090.0, -7132.0),

        // Satyr Tricksters
        new Point(-1000.0, -6473.0),
        new Point(1327.0, -9799.0),
        new Point(4064.0, -10275.0),
        new Point(5203.0, -9977.0),
        new Point(7937.0, -7076.0),
        new Point(8595.0, -6277.0),
        new Point(7771.0, -5383.0),
        new Point(8857.0, -5113.0),

        // Satyr Shadowdancers
        new Point(-33.0, -3005.0),
        new Point(-1470.0, -3890.0),
        new Point(-1369.0, -7197.0),
        new Point(3556.0, -8728.0),
        new Point(3626.0, -9630.0),
        new Point(5704.0, -9123.0),
        new Point(8401.0, -6552.0),

        // Crystal Arachnathids
        new Point(-7168.0, -610.0),
        new Point(-6952.0, -801.0),
        new Point(-8721.0, -1177.0),
        new Point(-5573.0, -2253.0),
        new Point(-5571.0, -2395.0),
        new Point(-7197.0, -2750.0),
        new Point(-4917.0, -4329.0),
        new Point(-6130.0, -4159.0),
        new Point(-4287.0, -4663.0),
        new Point(-7299.0, -5243.0),
        new Point(-5223.0, -5660.0),
        new Point(-7295.0, -6680.0),
        new Point(-4391.0, -6918.0),
        new Point(-4463.0, -7070.0),
        new Point(-5884.0, -7679.0),
        new Point(-8766.0, -7804.0),
        new Point(-7122.0, -8024.0),

        // Arachnathid Earth-borers
        new Point(-8824.0, -1266.0),
        new Point(-7327.0, -2650.0),
        new Point(-4807.0, -3514.0),
        new Point(-5414.0, -5690.0),
        new Point(-5928.0, -7525.0),
        new Point(-8819.0, -7635.0),

        // Murloc Plaguebearer
        new Point(-8715.0, 9811.0),
        new Point(-7263.0, 9670.0),
        new Point(-8261.0, 8964.0),
        new Point(-7025.0, 8254.0),
        new Point(-8296.0, 7673.0),
        new Point(-7640.0, 6674.0),
        new Point(-8838.0, 5995.0),
        new Point(-8062.0, 5110.0),

        // Murloc Nightcrawler
        new Point(-6846.0, 9918.0),
        new Point(-6941.0, 7572.0),
        new Point(-7622.0, 7269.0),
        new Point(-8016.0, 5957.0),

        // Murloc Flesheater
        new Point(-9039.0, 10362.0),
        new Point(-8783.0, 6720.0),

        // Necromancers
        new Point(12156.0, -8342.0),
        new Point(12293.0, -8188.0),
    ];

    // ========================================
    //
    // 	Creep Spawn Angles
    //
    // ========================================

    public CreepSpawnAngle: number[] = [
        0.0,
        0.0,
        0.0,
        0.0,
        0.0,
        0.0,
        0.0,
        0.0,
        0.0,
        0.0,
        0.0,
        0.0,
        0.0,
        0.0,
        0.0,
        0.0,
        0.0,
        0.0,
        0.0,
        0.0,
        0.0,
        0.0,
        0.0,
        0.0,
        180.0,
        180.0,
        180.0,
        180.0,
        180.0,
        180.0,
        180.0,
        180.0,
        180.0,
        180.0,
        180.0,
        180.0,
        180.0,
        180.0,
        180.0,
        180.0,
        180.0,
        180.0,
        180.0,
        180.0,
        180.0,
        180.0,
        180.0,
        180.0,
        270.0,
        270.0,
        270.0,
        90.0,
        90.0,
        90.0,
        0.0,
        52.0,
        290.0,
        260.0,
        94.0,
        350.0,
        160.0,
        180.0,
        193.0,
        100.0,
        180.0,
        260.0,
        311.0,
        128.0,
        17.0,
        203.0,
        62.0,
        73.0,
        73.0,
        220.0,
        321.0,
        90.0,
        10.0,
        235.0,
        263.0,
        318.0,
        162.0,
        311.0,
        192.0,
        300.0,
        172.0,
        270.0,
        90.0,
        324.0,
        122.0,
        250.0,
        22.0,
        300.0,
        60.0,
        285.0,
        3.0,
        157.0,
        319.0,
        150.0,
        160.0,
        219.0,
        197.0,
        334.0,
        170.0,
        72.0,
        157.0,
        180.0,
        280.0,
        232.0,
        216.0,
        231.0,
        45.0,
        270.0,
        0.0,
        180.0,
        330.0,
        245.0,
        145.0,
        170.0,
        280.0,
        55.0,
        330.0,
        350.0,
        262.0,
        48.0,
        48.0,
        48.0,
        290.0,
        90.0,
        18.0,
        175.0,
        312.0,
        280.0,
        320.0,
        285.0,
        56.0,

        // Nether Dragons
        235.0,
        50.0,

        // Fel Ravagers
        233.0,
        132.0,
        93.0,
        116.0,

        // Fel Beasts
        185.0,
        90.0,
        94.0,
        267.0,
        175.0,
        248.0,
        180.0,
        350.0,
        353.0,
        90.0,
        117.0,
        90.0,
        71.0,
        114.0,
        0.0,
        0.0,
        115.0,
        175.0,

        // Satyrs
        180.0,
        100.0,
        76.0,
        50.0,
        225.0,
        130.0,
        264.0,
        290.0,
        70.0,
        123.0,
        107.0,
        0.0,
        280.0,
        185.0,
        106.0,
        350.0,
        280.0,
        310.0,
        240.0,
        200.0,

        // Satyr Tricksters
        170.0,
        352.0,
        304.0,
        160.0,
        225.0,
        325.0,
        117.0,
        200.0,

        // Satyr Shadowdancers
        108.0,
        50.0,
        208.0,
        155.0,
        90.0,
        70.0,
        127.0,

        // Crystal Arachnathids
        339.0,
        130.0,
        154.0,
        217.0,
        141.0,
        261.0,
        44.0,
        253.0,
        353.0,
        305.0,
        152.0,
        244.0,
        192.0,
        119.0,
        24.0,
        321.0,
        125.0,

        // Arachnathid Earth-borers
        151.0,
        20.0,
        55.0,
        107.0,
        357.0,
        7.0,

        // Murloc Plaguebearer
        325.0,
        238.0,
        330.0,
        138.0,
        0.0,
        90.0,
        347.0,
        11.0,

        // Murloc Nightcrawler
        182.0,
        343.0,
        288.0,
        316.0,

        // Murloc Flesheater
        21.0,
        320.0,

        // Necromances
        0.0,
        270.0,
    ];

    // ========================================
    //
    // 	Creep Unit ID's
    //
    // ========================================

    public CreepUnitTypeID: string[] = [
        // Gnolls
        'n00I',
        'n00I',
        'n00I',
        'n00I',
        'n00I',
        'n00I',
        'n00I',
        'n00I',
        'n00I',
        'n00I',
        'n00I',
        'n00I',
        'n00I',
        'n00I',
        'n00I',
        'n00I',
        'n00I',
        'n00I',
        'n00I',
        'n00I',
        'n00I',
        'n00I',
        'n00I',
        'n00I',
        'n00I',
        'n00I',
        'n00I',
        'n00I',
        'n00I',
        'n00I',
        'n00I',
        'n00I',
        'n00I',
        'n00I',
        'n00I',
        'n00I',
        'n00I',
        'n00I',
        'n00I',
        'n00I',
        'n00I',
        'n00I',
        'n00I',
        'n00I',
        'n00I',
        'n00I',
        'n00I',
        'n00I',

        // Zombies
        'n007',
        'n007',
        'n007',
        'n007',
        'n007',
        'n007',

        // Succubus
        'n00N',

        // Ghouls
        'n00O',
        'n00O',
        'n00O',
        'n00O',
        'n00O',
        'n00O',
        'n00O',
        'n00O',
        'n00O',

        // Beetles
        'n00S',
        'n00S',
        'n00S',
        'n00S',
        'n00S',
        'n00S',
        'n00S',
        'n00S',
        'n00S',
        'n00S',
        'n00S',
        'n00S',
        'n00S',
        'n00S',

        // Forest Spiders
        'n00T',
        'n00T',
        'n00T',
        'n00T',

        // Goblin Shredder
        'n00U',

        // Pigs
        'n010',
        'n010',
        'n010',
        'n010',
        'n010',
        'n010',

        // Mutated Rabbit
        'n013',

        // Druid
        'n014',
        'n014',
        'n014',
        'n014',

        // Murloc Slaves
        'n01C',
        'n01C',
        'n01C',
        'n01C',
        'n01C',

        // Murlocs
        'n01A',
        'n01A',
        'n01A',
        'n01A',
        'n01A',
        'n01A',

        // Murloc Mages
        'n01B',

        // Centaur Archers
        'n01E',
        'n01E',
        'n01E',
        'n01E',

        // Centaurs
        'n01D',
        'n01D',
        'n01D',
        'n01D',
        'n01D',
        'n01D',
        'n01D',

        // Ice Revenants
        'n01G',
        'n01G',
        'n01G',
        'n01G',
        'n01G',
        'n01G',

        // Burning Archers
        'n01I',

        // Giant Skeleton Warriors
        'n01H',
        'n01H',
        'n01H',
        'n01H',

        // Skeletal Orcs
        'n01J',
        'n01J',
        'n01J',
        'n01J',
        'n01J',

        // Eredar Warlocks
        'n01K',

        // Eredar Diabolists
        'n01L',

        // Nether Dragons
        'n01M',
        'n01M',

        // Fel Ravagers
        'n01N',
        'n01N',
        'n01N',
        'n01N',

        // Fel Beasts
        'n01O',
        'n01O',
        'n01O',
        'n01O',
        'n01O',
        'n01O',
        'n01O',
        'n01O',
        'n01O',
        'n01O',
        'n01O',
        'n01O',
        'n01O',
        'n01O',
        'n01O',
        'n01O',
        'n01O',
        'n01O',

        // Satyrs
        'n01S',
        'n01S',
        'n01S',
        'n01S',
        'n01S',
        'n01S',
        'n01S',
        'n01S',
        'n01S',
        'n01S',
        'n01S',
        'n01S',
        'n01S',
        'n01S',
        'n01S',
        'n01S',
        'n01S',
        'n01S',
        'n01S',
        'n01S',

        // Satyr Tricksters
        'n01T',
        'n01T',
        'n01T',
        'n01T',
        'n01T',
        'n01T',
        'n01T',
        'n01T',

        // Satyr Shadowdancers
        'n01U',
        'n01U',
        'n01U',
        'n01U',
        'n01U',
        'n01U',
        'n01U',

        // Crystal Arachnathids
        'n01W',
        'n01W',
        'n01W',
        'n01W',
        'n01W',
        'n01W',
        'n01W',
        'n01W',
        'n01W',
        'n01W',
        'n01W',
        'n01W',
        'n01W',
        'n01W',
        'n01W',
        'n01W',
        'n01W',

        // Arachnathid Earth-borers
        'n01V',
        'n01V',
        'n01V',
        'n01V',
        'n01V',
        'n01V',

        // Murloc Plaguebearer
        'n012',
        'n012',
        'n012',
        'n012',
        'n012',
        'n012',
        'n012',
        'n012',

        // Murloc Nightcrawler
        'n025',
        'n025',
        'n025',
        'n025',

        // Murloc Flesheater
        'n024',
        'n024',

        // Necromancers
        'u004',
        'u004',
    ];

    public CreepUnitArraySize: number = this.CreepUnitTypeID.length;

    // ========================================
    //
    // 	Player Spawn Regions
    //
    // ========================================
    public PlayerSpawnRegion: rect[] = [
        Rect(9344.0, 9344.0, 11136.0, 11136.0),
        Rect(9344.0, -1152.0, 11136.0, 640.0),
        Rect(9344.0, -11648.0, 11136.0, -9856.0),
        Rect(-5248.0, 9344.0, -3456.0, 11136.0),
        Rect(-5248.0, -1152.0, -3456.0, 640.0),
        Rect(-5248.0, -11648.0, -3456.0, -9856.0),
    ];

    // ========================================
    //
    // 	Player Lives
    //
    // ========================================
    public PlayerLives: number[] = [];

    // ========================================
    //
    // 	Hero Unit ID's
    //
    // ========================================
    public HeroUnitTypeID: string[] = [
        'E000',
        'O002',
        'U000',
        'N000',
        'N00Y',
        'N006',
        'N003',
        'N011',
        'H000',
        'N01X',
        'N01Y',
        'N01Z',
        'O003',
    ];

    public HeroArraySize: number = this.HeroUnitTypeID.length;

    // ========================================
    //
    // 	Hero Selection
    //
    // ========================================
    public HeroSelectRegions: Region[] = [
        new Region(-15104, -14976, -10240, -10112),
        new Region(-15104, -14976, -10496, -10368),
        new Region(-15104, -14976, -10752, -10624),
        new Region(-15104, -14976, -11008, -10880),
        new Region(-15104, -14976, -11264, -11136),
        new Region(-14848, -14720, -11392, -11264),
        new Region(-14592, -14464, -11392, -11264),
        new Region(-14336, -14208, -11392, -11264),
        new Region(-14080, -13952, -11392, -11264),
        new Region(-13824, -13696, -11264, -11136),
        new Region(-13824, -13696, -11008, -10880),
        new Region(-13824, -13696, -10752, -10624),
        new Region(-13824, -13696, -10496, -10368),
        new Region(-13824, -13696, -10240, -10112),
        new Region(-14080, -13952, -10112, -9984),
        new Region(-14336, -14208, -10112, -9984),
        new Region(-14592, -14464, -10112, -9984),
        new Region(-14848, -14720, -10112, -9984),
    ];

    public HeroSelectPoints: Point[] = [
        new Point(-15234.0, -10179.0),
        new Point(-15234.0, -10429.0),
        new Point(-15234.0, -10691.0),
        new Point(-15234.0, -10944.0),
        new Point(-15234.0, -11197.0),
        new Point(-14788.0, -11515.0),
        new Point(-14526.0, -11515.0),
        new Point(-14272.0, -11515.0),
        new Point(-14000.0, -11515.0),
        new Point(-13565.0, -11200.0),
        new Point(-13565.0, -10950.0),
        new Point(-13565.0, -10680.0),
        new Point(-13565.0, -10430.0),
        new Point(-13565.0, -10175.0),
        new Point(-14000.0, -9854.0),
        new Point(-14270.0, -9854.0),
        new Point(-14530.0, -9854.0),
        new Point(-14790.0, -9854.0),
    ];

    public HeroSelectAngles: number[] = [
        0.0,
        0.0,
        0.0,
        0.0,
        0.0,
        90.0,
        90.0,
        90.0,
        90.0,
        90.0,
        180.0,
        180.0,
        180.0,
        180.0,
        180.0,
        270.0,
        270.0,
        270.0,
        270.0,
        270.0,
    ];

    public SelectedHeroIndexes: number[] = [];

    public HeroList: Hero[] = [];
}
