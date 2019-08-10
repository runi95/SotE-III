import { Point } from '../Utility/Point';
import { Region } from '../Utility/Region';

export class GameGlobals {
    public CryostasisSummons: unit[] = [];
    public RazorBladesOn: boolean[] = [false, false, false, false, false, false];
    public PlayerPhysicalBlock: number[] = [0, 0, 0, 0, 0, 0];
    public PlayerSpellBlock: number[] = [0, 0, 0, 0, 0, 0];

    public BossDruidOfTheClaw: unit | undefined;

    public PlayerCount: number = 0;

    public Multiboard: multiboard | undefined = undefined;

    public DebugMode: boolean = false;
    public TeleportMovement: boolean = false;

    public TheArenaRegion: rect = Rect(864.00, 5600.00, 5024.00, 9760.00);
    public PlayerColorCodes: string[] = ['|c00FF0303', '|c000042FF', '|c001CE6B9', '|c00540081', '|c00FFFC01', '|c00fEBA0E'];

    // ========================================
    //
    // 	Creep Spawn Positions
    //
    // ========================================

    // Players' Creep Spawns
    public CreepSpawnPoint: Point[] = [
        // Purple
        new Point(-2880.00, 12096.00),
        new Point(-2496.00, 12096.00),
        new Point(-2880.00, 11712.00),
        new Point(-2496.00, 11712.00),
        new Point(-2880.00, 8768.00),
        new Point(-2496.00, 8768.00),
        new Point(-2880.00, 8384.00),
        new Point(-2496.00, 8384.00),

        // Yellow
        new Point(-2880.00, 1600.00),
        new Point(-2496.00, 1600.00),
        new Point(-2880.00, 1216.00),
        new Point(-2496.00, 1216.00),
        new Point(-2880.00, -1728.00),
        new Point(-2496.00, -1728.00),
        new Point(-2880.00, -2112.00),
        new Point(-2496.00, -2112.00),

        // Orange
        new Point(-2880.00, -8896.00),
        new Point(-2496.00, -8896.00),
        new Point(-2880.00, -9280.00),
        new Point(-2496.00, -9280.00),
        new Point(-2880.00, -12224.00),
        new Point(-2496.00, -12224.00),
        new Point(-2880.00, -12608.00),
        new Point(-2496.00, -12608.00),

        // Red
        new Point(8384.00, 12096.00),
        new Point(8768.00, 12096.00),
        new Point(8384.00, 11712.00),
        new Point(8768.00, 11712.00),
        new Point(8384.00, 8768.00),
        new Point(8768.00, 8768.00),
        new Point(8384.00, 8384.00),
        new Point(8768.00, 8384.00),

        // Blue
        new Point(8384.00, 1600.00),
        new Point(8768.00, 1600.00),
        new Point(8384.00, 1216.00),
        new Point(8768.00, 1216.00),
        new Point(8384.00, -1728.00),
        new Point(8768.00, -1728.00),
        new Point(8384.00, -2112.00),
        new Point(8768.00, -2112.00),

        // Teal
        new Point(8384.00, -8896.00),
        new Point(8768.00, -8896.00),
        new Point(8384.00, -9280.00),
        new Point(8768.00, -9280.00),
        new Point(8384.00, -12224.00),
        new Point(8768.00, -12224.00),
        new Point(8384.00, -12608.00),
        new Point(8768.00, -12608.00),

        // Graveyard Zombies
        new Point(-6496.00, -12624.00),
        new Point(-6240.00, -12624.00),
        new Point(-5984.00, -12624.00),
        new Point(-6528.00, -13008.00),
        new Point(-6288.00, -13008.00),
        new Point(-6048.00, -13008.00),

        // Succubus
        new Point(-6975.00, -14655.00),

        // Ghouls
        new Point(-5888.00, -13432.00),
        new Point(-6894.00, -13776.00),
        new Point(-6523.00, -15227.00),
        new Point(-7583.00, -15024.00),
        new Point(-8046.00, -14465.00),
        new Point(-7200.00, -11700.00),
        new Point(-5853.00, -11703.00),
        new Point(-5824.00, -14262.00),
        new Point(-8091.00, -15547.00),

        // Beetles
        new Point(-1417.00, 12803.00),
        new Point(-1075.00, 13098.00),
        new Point(-1070.00, 12567.00),
        new Point(-1189.00, 12814.00),
        new Point(-1333.00, 12293.00),
        new Point(-1600.00, 12536.00),
        new Point(-1522.00, 13213.00),
        new Point(-735.00, 12527.00),
        new Point(349.00, 13080.00),
        new Point(1148.00, 12105.00),
        new Point(-1917.00, 13613.00),
        new Point(-2448.00, 13834.00),
        new Point(-1165.00, 14432.00),
        new Point(-173.00, 14454.00),
        new Point(460.00, 11669.00),
        new Point(907.00, 12676.00),
        new Point(605.00, 13744.00),
        new Point(-1813.00, 14964.00),
        new Point(1834.00, 14462.00),
        new Point(2048.00, 10495.00),
        new Point(2560.00, 10750.00),
        new Point(3840.00, 10935.00),
        new Point(3375.00, 11693.00),
        new Point(4480.00, 11331.00),
        new Point(2074.00, 12550.00),
        new Point(4188.00, 10140.00),
        new Point(3018.00, 14276.00),
        new Point(2985.00, 13092.00),
        new Point(3888.00, 12723.00),
        new Point(4364.00, 14942.00),

        // Murloc Slaves
        new Point(13650.00, 6656.00),
        new Point(13126.00, 7360.00),
        new Point(13881.00, 7318.00),
        new Point(13254.00, 7793.00),
        new Point(14140.00, 8922.00),

        // Murlocs
        new Point(15217.00, 9473.00),
        new Point(13750.00, 9676.00),
        new Point(12953.00, 10512.00),
        new Point(13345.00, 11188.00),
        new Point(14426.00, 11188.00),
        new Point(15038.00, 11509.00),

        // Murloc Mages
        new Point(13766.00, 10428.00),

        // Centaur Archers
        new Point(9785.00, 14390.00),
        new Point(14258.00, 13593.00),
        new Point(14406.00, 14904.00),
        new Point(14906.00, 14380.00),

        // Centaurs
        new Point(9144.00, 13500.00),
        new Point(12191.00, 14248.00),
        new Point(11697.00, 13117.00),
        new Point(12461.00, 13117.00),
        new Point(12857.00, 14414.00),
        new Point(13126.00, 14512.00),
        new Point(13229.00, 14263.00),

        // Ice Revenants
        new Point(11489.00, 1589.00),
        new Point(12953.00, 2718.00),
        new Point(14236.00, 3374.00),
        new Point(14270.00, 1870.00),
        new Point(13486.00, -954.00),
        new Point(12475.00, -2151.00),

        // Burning Archers
        new Point(-9153.00, -11970.00),

        // Giant Skeleton Warriors
        new Point(-9145.00, -11707.00),
        new Point(-8888.00, -11970.00),
        new Point(-7873.00, -11450.00),
        new Point(-6980.00, -10940.00),

        // Skeletal Orcs
        new Point(-9150.00, -9662.00),
        new Point(-8647.00, -10560.00),
        new Point(-7613.00, -10048.00),
        new Point(-6845.00, -10940.00),
        new Point(-5956.00, 9659.00),

        // Eredar Warlocks
        new Point(14080.00, -15335.00),

        // Eredar Diabolists
        new Point(14334.00, -15362.00),

        // Nether Dragons
        new Point(14847.00, -14336.00),

        // Fel Ravagers
        new Point(12287.00, -15358.00),
        new Point(12800.00, -13818.00),
        new Point(14333.00, -12820.00),

        // Fel Beasts
        new Point(8704.00, -13938.00),
        new Point(8703.00, -14833.00),
        new Point(8831.00, -13807.00),
        new Point(9359.00, -15489.00),
        new Point(9600.00, -14336.00),
        new Point(10108.00, -13445.00),
        new Point(10121.00, -14984.00),
        new Point(11264.00, -13310.00),
        new Point(11780.00, -14848.00),
        new Point(12681.00, -13945.00),
        new Point(13191.00, -12670.00),
        new Point(13803.00, -11629.00),
        new Point(14209.00, -12806.00),
        new Point(14452.00, -12809.00),
        new Point(14858.00, -11770.00),
    ];

    // ========================================
    //
    // 	Creep Spawn Angles
    //
    // ========================================

    public CreepSpawnAngle: number[] = [
        0.00,
        0.00,
        0.00,
        0.00,
        0.00,
        0.00,
        0.00,
        0.00,
        0.00,
        0.00,
        0.00,
        0.00,
        0.00,
        0.00,
        0.00,
        0.00,
        0.00,
        0.00,
        0.00,
        0.00,
        0.00,
        0.00,
        0.00,
        0.00,
        180.00,
        180.00,
        180.00,
        180.00,
        180.00,
        180.00,
        180.00,
        180.00,
        180.00,
        180.00,
        180.00,
        180.00,
        180.00,
        180.00,
        180.00,
        180.00,
        180.00,
        180.00,
        180.00,
        180.00,
        180.00,
        180.00,
        180.00,
        180.00,
        270.00,
        270.00,
        270.00,
        90.00,
        90.00,
        90.00,
        0.00,
        52.00,
        290.00,
        260.00,
        94.00,
        350.00,
        160.00,
        180.00,
        193.00,
        100.00,
        180.00,
        260.00,
        311.00,
        128.00,
        17.00,
        203.00,
        62.00,
        73.00,
        73.00,
        220.00,
        321.00,
        90.00,
        10.00,
        235.00,
        263.00,
        318.00,
        162.00,
        311.00,
        192.00,
        300.00,
        172.00,
        270.00,
        90.00,
        324.00,
        122.00,
        250.00,
        22.00,
        300.00,
        60.00,
        285.00,
        3.00,
        157.00,
        319.00,
        150.00,
        160.00,
        219.00,
        197.00,
        334.00,
        170.00,
        72.00,
        157.00,
        180.00,
        280.00,
        232.00,
        216.00,
        231.00,
        45.00,
        270.00,
        0.00,
        180.00,
        330.00,
        245.00,
        145.00,
        170.00,
        280.00,
        55.00,
        330.00,
        350.00,
        262.00,
        48.00,
        48.00,
        48.00,
        290.00,
        90.00,
        18.00,
        175.00,
        312.00,
        280.00,
        320.00,
        285.00,
        56.00,
        235.00,
        233.00,
        132.00,
        93.00,
        185.00,
        90.00,
        94.00,
        267.00,
        175.00,
        248.00,
        180.00,
        350.00,
        353.00,
        90.00,
        117.00,
        90.00,
        71.00,
        114.00,
        0.00,
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

        // Fel Ravagers
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
    ];

    public CreepUnitArraySize: number = this.CreepUnitTypeID.length;

    // ========================================
    //
    // 	Player Spawn Regions
    //
    // ========================================
    public PlayerSpawnRegion: rect[] = [
        Rect(9344.00, 9344.00, 11136.00, 11136.00),
        Rect(9344.00, -1152.00, 11136.00, 640.00),
        Rect(9344.00, -11648.00, 11136.00, -9856.00),
        Rect(-5248.00, 9344.00, -3456.00, 11136.00),
        Rect(-5248.00, -1152.00, -3456.00, 640.00),
        Rect(-5248.00, -11648.00, -3456.00, -9856.00),
    ];

    // ========================================
    //
    // 	Player Lives
    //
    // ========================================
    public PlayerLives: number[] = [10, 10, 10, 10, 10, 10];

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
        new Point(-15234.00, -10179.00),
        new Point(-15234.00, -10429.00),
        new Point(-15234.00, -10691.00),
        new Point(-15234.00, -10944.00),
        new Point(-15234.00, -11197.00),
        new Point(-14788.00, -11515.00),
        new Point(-14526.00, -11515.00),
        new Point(-14272.00, -11515.00),
        new Point(-14000.00, -11515.00),
        new Point(-13565.00, -11200.00),
        new Point(-13565.00, -10950.00),
        new Point(-13565.00, -10680.00),
        new Point(-13565.00, -10430.00),
        new Point(-13565.00, -10175.00),
        new Point(-14000.00, -9854.00),
        new Point(-14270.00, -9854.00),
        new Point(-14530.00, -9854.00),
        new Point(-14790.00, -9854.00),
    ];

    public HeroSelectAngles: number[] = [
        0.00,
        0.00,
        0.00,
        0.00,
        0.00,
        90.00,
        90.00,
        90.00,
        90.00,
        90.00,
        180.00,
        180.00,
        180.00,
        180.00,
        180.00,
        270.00,
        270.00,
        270.00,
        270.00,
        270.00,
    ];
}
