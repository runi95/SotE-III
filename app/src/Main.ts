import { Trigger } from './JassOverrides/Trigger';
import { Log, LogLevel } from './lib/Serilog/Serilog';
import { StringSink } from './lib/Serilog/Sinks/StringSink';
import { Game } from './Game/Game';
import { GameGlobals } from './Game/GameGlobals';
import { Hero } from './Game/Hero';
import { RandomNumberGenerator } from './Utility/RandomNumberGenerator';
import { ItemRecipe } from './Items/ItemRecipe';
import { AdeptCrystalBall } from './Items/Recipes/AdeptCrystalBall';
import { CrystalBall } from './Items/BasicItems/CrystalBall';
import { SobiMask } from './Items/BasicItems/SobiMask';
import { AdvancedReinforcedHides } from './Items/Recipes/AdvancedReinforcedHides';
import { ImprovedMoonArmor } from './Items/Recipes/ImprovedMoonArmor';
import { ImprovedBalancedShield } from './Items/Recipes/ImprovedBalancedShield';
import { ReinforcedScales } from './Items/Recipes/ReinforcedScales';
import { MoonArmor } from './Items/BasicItems/MoonArmor';
import { BalancedShield } from './Items/Recipes/BalancedShield';
import { IronShield } from './Items/BasicItems/IronShield';
import { SteelShield } from './Items/Recipes/SteelShield';
import { CoralScales } from './Items/Recipes/CoralScales';
import { ReinforcedHide } from './Items/BasicItems/ReinforcedHide';
import { StuddedLeatherArmor } from './Items/BasicItems/StuddedLeatherArmor';
import { AgileSlippers } from './Items/Recipes/AgileSlippers';
import { BootsOfSpeed } from './Items/BasicItems/BootsOfSpeed';
import { Ancile } from './Items/Recipes/Ancile';
import { ManaEgg } from './Items/BasicItems/ManaEgg';
import { ArmoredBoots } from './Items/Recipes/ArmoredBoots';
import { BerserkerPotion } from './Items/BasicItems/BerserkerPotion';
import { BloodiedExecutionersAxe } from './Items/BasicItems/BloodiedExecutionersAxe';
import { BlueSoulstone } from './Items/BasicItems/BlueSoulstone';
import { Branch } from './Items/BasicItems/Branch';
import { Claws } from './Items/BasicItems/Claws';
import { CloakOfShadows } from './Items/BasicItems/CloakOfShadows';
import { ClockworkPenguin } from './Items/BasicItems/ClockworkPenguin';
import { EmptySoulcage } from './Items/BasicItems/EmptySoulcage';
import { EmptyVial } from './Items/BasicItems/EmptyVial';
import { Flare } from './Items/BasicItems/Flare';
import { GoblinBattery } from './Items/BasicItems/GoblinBattery';
import { GreenSoulstone } from './Items/BasicItems/GreenSoulstone';
import { IronSword } from './Items/BasicItems/IronSword';
import { LoadedRifle } from './Items/BasicItems/LoadedRifle';
import { OrbOfMagic } from './Items/BasicItems/OrbOfMagic';
import { PurpleSoulstone } from './Items/BasicItems/PurpleSoulstone';
import { Scepter } from './Items/BasicItems/Scepter';
import { SpeedPotion } from './Items/BasicItems/SpeedPotion';
import { WarAxe } from './Items/BasicItems/WarAxe';
import { BerserkerAxes } from './Items/Recipes/BerserkerAxes';
import { Caduceus } from './Items/Recipes/Caduceus';
import { CircesStaff } from './Items/Recipes/CircesStaff';
import { CloakOfShadowWalk } from './Items/Recipes/CloakOfShadowWalk';
import { ScrollOfAgility } from './Items/Recipes/ScrollOfAgility';
import { CreatureClaws } from './Items/Recipes/CreatureClaws';
import { DragonScales } from './Items/Recipes/DragonScales';
import { DragonWhelpClaws } from './Items/Recipes/DragonWhelpClaws';
import { EnchantedShield } from './Items/Recipes/EnchantedShield';
import { EnhancedBerserkerAxes } from './Items/Recipes/EnhancedBerserkerAxes';
import { Fragarach } from './Items/Recipes/Fragarach';
import { ManaBlade } from './Items/Recipes/ManaBlade';
import { IronClaws } from './Items/Recipes/IronClaws';
import { LightningBolt } from './Items/Recipes/LightningBolt';
import { TheAegis } from './Items/Recipes/TheAegis';
import { LionsRing } from './Items/Recipes/LionsRing';
import { RunedBracers } from './Items/BasicItems/RunedBracers';
import { LoadedCannon } from './Items/Recipes/LoadedCannon';
import { ManaAxe } from './Items/Recipes/ManaAxe';
import { ManaInfusedMask } from './Items/Recipes/ManaInfusedMask';
import { MaskOfProficiency } from './Items/Recipes/MaskOfProficiency';
import { VialOfMagic } from './Items/Recipes/VialOfMagic';
import { MasterCrystalBall } from './Items/Recipes/MasterCrystalBall';
import { SnowyOwl } from './Items/Recipes/SnowyOwl';
import { WandOfShadowsight } from './Items/Recipes/WandOfShadowsight';
import { GoblinNightScope } from './Items/BasicItems/GoblinNightScope';
import { Soulcage } from './Items/Recipes/Soulcage';
import { SpellShield } from './Items/Recipes/SpellShield';
import { SwordOfFreyr } from './Items/Recipes/SwordOfFreyr';
import { SwordOfNaegling } from './Items/Recipes/SwordOfNaegling';
import { ThrowableAxe } from './Items/Recipes/ThrowableAxe';

interface ItemInSlot {
    itemId: number;
    includedInRecipe: boolean;
}

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
            initializeGameOptionFrames(gameGlobals, randomNumberGenerator);
            initializeItemUpgradeFrames(gameGlobals);
        },
        (err) => {
            Log.Fatal(err);
        },
    );
});

function loadItemIconWithDescription(): void {
    // BlzLoadTOCFile('war3mapImported\\BoxedText.toc');
    const itemId: number = FourCC('I02I');
    const recipe: number[] = [FourCC('I02I')];
    const item: item = CreateItem(itemId, 0, 0);
    const face: framehandle = BlzCreateFrameByType('BACKDROP', 'Face', BlzGetOriginFrame(ORIGIN_FRAME_GAME_UI, 0), '', 1);
    const faceHover: framehandle = BlzCreateFrameByType('FRAME', 'FaceFrame', face, '', 1);
    const tooltip: framehandle = BlzCreateFrame('BoxedText', face, 0, 0);

    BlzFrameSetAllPoints(faceHover, face);
    BlzFrameSetTooltip(faceHover, tooltip);

    BlzFrameSetSize(face, 0.04, 0.04);
    BlzFrameSetAbsPoint(face, FRAMEPOINT_CENTER, 0.4, 0.3);
    BlzFrameSetAbsPoint(tooltip, FRAMEPOINT_CENTER, 0.2, 0.3);
    const tooltipText: string = BlzGetItemExtendedTooltip(item);
    const tooltipTextSplit: string[] = tooltipText.split('\n');
    const maxLineCharLength: number = 55;
    let linesAboveMaxCharLength: number = 0;
    tooltipTextSplit.forEach((line: string) => (linesAboveMaxCharLength += Math.ceil(line.length / maxLineCharLength)));
    const lines: number = linesAboveMaxCharLength;
    BlzFrameSetSize(tooltip, 0.3, 0.025 + 0.012 * lines);
    BJDebugMsg(lines.toString());

    BlzFrameSetText(BlzGetFrameByName('BoxedTextTitle', 0), GetItemName(item));
    BlzFrameSetText(BlzGetFrameByName('BoxedTextValue', 0), tooltipText);

    BlzFrameSetTexture(face, BlzGetItemIconPath(item), 0, true);
}

function initializeItemUpgradeFrames2(): void {
    const originFrameGameUi: framehandle = BlzGetOriginFrame(ORIGIN_FRAME_GAME_UI, 0);
    const menu: framehandle = BlzCreateFrame('QuestMainListScrollBar', originFrameGameUi, 0, 0);
    BlzFrameSetSize(menu, 0.02, 0.35);
    BlzFrameSetPoint(menu, FRAMEPOINT_CENTER, originFrameGameUi, FRAMEPOINT_CENTER, 0.0, 0.0);

    /*
    const button: framehandle = BlzCreateFrame('ScriptDialogButton', menu, 0, 0);
    BlzFrameSetPoint(button, FRAMEPOINT_CENTER, menu, FRAMEPOINT_CENTER, 0.0, 0.0);
    BlzFrameSetSize(button, 0.12, 0.05);
    BlzFrameSetText(button, 'My ButtonText');

    const button2: framehandle = BlzCreateFrame('ScriptDialogButton', menu, 0, 0);
    BlzFrameSetPoint(button2, FRAMEPOINT_CENTER, menu, FRAMEPOINT_CENTER, 0.0, 0.0);
    BlzFrameSetSize(button2, 0.12, 0.05);
    BlzFrameSetText(button2, 'My ButtonText 2');
    */

    const t: Trigger = new Trigger();
    // t.registerFrameEvent(menu, FRAMEEVENT_SLIDER_VALUE_CHANGED);
    t.registerFrameEvent(menu, FRAMEEVENT_MOUSE_WHEEL);
    t.addAction(() => {
        BJDebugMsg('Slider changed!!!');
    });
}

function createItemRecipeGreenBorderFrame(parent: framehandle, index: number): framehandle {
    const itemBorder: framehandle = BlzCreateFrameByType('BACKDROP', 'ItemBorder', parent, '', 0);
    BlzFrameSetVisible(itemBorder, false);
    BlzFrameSetSize(itemBorder, 0.04, 0.04);
    BlzFrameSetPoint(itemBorder, FRAMEPOINT_TOPLEFT, parent, FRAMEPOINT_TOPLEFT, 0.03 + 0.0525 * index, -0.05);
    BlzFrameSetTexture(itemBorder, 'war3mapImported\\BTNGreyedItem.blp', 0, true);

    return itemBorder;
}

function createItemRecipeFrame(parent: framehandle, index: number): framehandle {
    const itemIcon: framehandle = BlzCreateFrameByType('BACKDROP', 'ItemIcon', parent, '', 0);
    BlzFrameSetSize(itemIcon, 0.04, 0.04);
    BlzFrameSetPoint(itemIcon, FRAMEPOINT_TOPLEFT, parent, FRAMEPOINT_TOPLEFT, 0.03 + 0.0525 * index, -0.05);
    BlzFrameSetTexture(itemIcon, 'war3mapImported\\BTNNoItem.blp', 0, true);

    const plussFrame: framehandle = BlzCreateFrame('StandardTitleTextTemplate', parent, 0, 0);
    BlzFrameSetPoint(plussFrame, FRAMEPOINT_RIGHT, itemIcon, FRAMEPOINT_RIGHT, 0.01, 0.0);

    if (index === 5) {
        BlzFrameSetText(plussFrame, '=');
    } else {
        BlzFrameSetText(plussFrame, '+');
    }

    return itemIcon;
}

function createItemFrame(
    parent: framehandle,
    texture: string,
    index: number,
    itemClickEvent: (index: number, triggerPlayerId: number) => void,
): framehandle {
    const itemIcon: framehandle = BlzCreateFrameByType('BACKDROP', 'ItemIcon', parent, '', 0);
    const itemClickFrame: framehandle = BlzCreateFrameByType('BUTTON', 'itemClickFrame', itemIcon, '', 0);
    BlzFrameSetSize(itemIcon, 0.04, 0.04);
    BlzFrameSetPoint(itemIcon, FRAMEPOINT_BOTTOMLEFT, parent, FRAMEPOINT_BOTTOMLEFT, 0.0175 + 0.0425 * index, 0.03);
    BlzFrameSetAllPoints(itemClickFrame, itemIcon);
    BlzFrameSetTexture(itemIcon, texture, 0, true);

    const t: Trigger = new Trigger();
    t.registerFrameEvent(itemClickFrame, FRAMEEVENT_CONTROL_CLICK);
    t.addAction(() => itemClickEvent(index, GetPlayerId(GetTriggerPlayer())));

    return itemIcon;
}

function createItemGoldCostFrame(parent: framehandle, goldCost: number, index: number): framehandle {
    const itemGoldText: framehandle = BlzCreateFrameByType('TEXT', 'itemGoldText', parent, '', 0);
    // BlzFrameSetSize(itemGoldText, 0.04, 0.04);
    BlzFrameSetPoint(itemGoldText, FRAMEPOINT_BOTTOM, parent, FRAMEPOINT_BOTTOMLEFT, 0.04 + 0.0425 * index, 0.07);
    BlzFrameSetText(itemGoldText, `|cFFFFCC00${goldCost}|r`);

    return itemGoldText;
}

/*
function createItemRecipe(goldCost: number, recipe: number[], resultingItem: number): ItemRecipe {
    const item: item = CreateItem(resultingItem, 0, 0);
    const itemRecipe: Item[] = [];
    for (let i: number = 0; i < recipe.length; i++) {
        const itemId: number = recipe[i];
        const recipeItem: item = CreateItem(itemId, 0, 0);
        itemRecipe.push(
            new Item(
                itemId,
                GetItemName(recipeItem),
                Math.random() * 1000,
                BlzGetItemExtendedTooltip(recipeItem),
                BlzGetItemIconPath(recipeItem),
            ),
        );
    }

    // const itemIcon: framehandle = BlzCreateFrameByType('BACKDROP', 'ItemIcon', parent, '', 0);
    // const itemHover: framehandle = BlzCreateFrameByType('FRAME', 'ItemHover', itemIcon, '', 0);
    // const tooltip: framehandle = BlzCreateFrame('BoxedText', itemIcon, 0, 0);

    // BlzFrameSetAllPoints(itemHover, itemIcon);
    // BlzFrameSetTooltip(itemHover, tooltip);
    // BlzFrameSetSize(itemIcon, 0.03, 0.03);
    // BlzFrameSetAbsPoint(itemIcon, FRAMEPOINT_CENTER, 0.4, 0.3);
    // BlzFrameSetPoint(itemIcon, FRAMEPOINT_BOTTOMLEFT, parent, FRAMEPOINT_BOTTOMLEFT, 0.015 + 0.04 * index, 0.03);
    // BlzFrameSetPoint(tooltip, FRAMEPOINT_BOTTOMRIGHT, itemIcon, FRAMEPOINT_TOPLEFT, 0.0, 0.0);
    // BlzFrameSetAbsPoint(tooltip, FRAMEPOINT_CENTER, 0.2, 0.3);
    // const tooltipText: string = BlzGetItemExtendedTooltip(item);
    // const tooltipTextSplit: string[] = tooltipText.split('\n');
    // const maxLineCharLength: number = 55;
    // let linesAboveMaxCharLength: number = 0;
    // tooltipTextSplit.forEach((line: string) => (linesAboveMaxCharLength += Math.ceil(line.length / maxLineCharLength)));
    // const lines: number = linesAboveMaxCharLength;
    // BlzFrameSetSize(tooltip, 0.3, 0.025 + 0.012 * lines);
    // BlzFrameSetText(BlzGetFrameByName('BoxedTextTitle', 0), GetItemName(item));
    // BlzFrameSetText(BlzGetFrameByName('BoxedTextValue', 0), tooltipText);
    // BlzFrameSetTexture(itemIcon, BlzGetItemIconPath(item), 0, true);

    return new ItemRecipe(
        resultingItem,
        GetItemName(item),
        goldCost,
        BlzGetItemExtendedTooltip(item),
        BlzGetItemIconPath(item),
        itemRecipe,
    );
}
*/

function arrayIncludes(arr: number[], n: number): boolean {
    for (let i: number = 0; i < arr.length; i++) {
        if (arr[i] === n) {
            return true;
        }
    }

    return false;
}

function initializeItemUpgradeFrames(gameGlobals: GameGlobals): void {
    const originFrameGameUi: framehandle = BlzGetOriginFrame(ORIGIN_FRAME_GAME_UI, 0);
    const menu: framehandle = BlzCreateFrame('EscMenuPopupMenuTemplate', originFrameGameUi, 0, 0);
    const menuBackdrop: framehandle = BlzCreateFrame('EscMenuButtonBackdropTemplate', menu, 0, 0);
    const menuTitle: framehandle = BlzCreateFrame('StandardTitleTextTemplate', menu, 0, 0);
    const menuScrollbar: framehandle = BlzCreateFrame('EscMenuSliderTemplate', menu, 0, 0);
    const mainButton: framehandle = BlzCreateFrame('ScoreScreenTabButtonTemplate', originFrameGameUi, 0, 0);
    const mainButtonBackdrop: framehandle = BlzCreateFrameByType('BACKDROP', 'mainButtonBackdrop', mainButton, '', 0);
    BlzFrameSetSize(menu, 0.5, 0.38);
    BlzFrameSetSize(menuScrollbar, 0.48, 0.02);
    BlzFrameSetPoint(menu, FRAMEPOINT_CENTER, originFrameGameUi, FRAMEPOINT_CENTER, 0.0, 0.06);
    BlzFrameSetPoint(menuTitle, FRAMEPOINT_TOP, menu, FRAMEPOINT_TOP, 0.0, -0.02);
    BlzFrameSetPoint(menuScrollbar, FRAMEPOINT_BOTTOM, menu, FRAMEPOINT_BOTTOM, 0.0, 0.01);
    BlzFrameSetAllPoints(menuBackdrop, menu);
    BlzFrameSetVisible(menu, false);
    BlzFrameSetSize(mainButton, 0.04, 0.04);
    BlzFrameSetPoint(mainButton, FRAMEPOINT_BOTTOMLEFT, originFrameGameUi, FRAMEPOINT_BOTTOMLEFT, 0.005, 0.15);
    BlzFrameSetAllPoints(mainButtonBackdrop, mainButton);
    BlzFrameSetTexture(mainButtonBackdrop, 'ReplaceableTextures\\CommandButtons\\BTNScroll.blp', 0, true);
    BlzFrameSetText(menuTitle, 'Recipes');
    BlzFrameSetVisible(mainButton, false);

    const showMainButton: boolean[] = [];
    for (let i: number = 0; i < bj_MAX_PLAYERS; i++) {
        showMainButton.push(false);
        if (gameGlobals.PlayerSpawnRegion.length > i) {
            const index: number = i;
            const showMainButtonTrigger: Trigger = new Trigger();
            showMainButtonTrigger.registerEnterRectSimple(gameGlobals.PlayerSpawnRegion[i]);
            showMainButtonTrigger.addAction(() => {
                showMainButton[index] = true;
                BlzFrameSetVisible(mainButton, showMainButton[GetPlayerId(GetLocalPlayer())]);
            });

            const hideMainButtonTrigger: Trigger = new Trigger();
            hideMainButtonTrigger.registerLeaveRectSimple(gameGlobals.PlayerSpawnRegion[i]);
            hideMainButtonTrigger.addAction(() => {
                showMainButton[index] = false;
                BlzFrameSetVisible(mainButton, showMainButton[GetPlayerId(GetLocalPlayer())]);
            });
        }
    }

    // Item
    const crystalBall: CrystalBall = new CrystalBall();
    const sobiMask: SobiMask = new SobiMask();
    const moonArmor: MoonArmor = new MoonArmor();
    const ironShield: IronShield = new IronShield();
    const reinforcedHide: ReinforcedHide = new ReinforcedHide();
    const studdedLeatherArmor: StuddedLeatherArmor = new StuddedLeatherArmor();
    const bootsOfSpeed: BootsOfSpeed = new BootsOfSpeed();
    const manaEgg: ManaEgg = new ManaEgg();
    const berserkerPotion: BerserkerPotion = new BerserkerPotion();
    const bloodiedExecutionersAxe: BloodiedExecutionersAxe = new BloodiedExecutionersAxe();
    const blueSoulstone: BlueSoulstone = new BlueSoulstone();
    const branch: Branch = new Branch();
    const claws: Claws = new Claws();
    const cloakOfShadows: CloakOfShadows = new CloakOfShadows();
    const clockworkPenguin: ClockworkPenguin = new ClockworkPenguin();
    const emptySoulcage: EmptySoulcage = new EmptySoulcage();
    const emptyVial: EmptyVial = new EmptyVial();
    const flare: Flare = new Flare();
    const goblinBattery: GoblinBattery = new GoblinBattery();
    const greenSoulstone: GreenSoulstone = new GreenSoulstone();
    const ironSword: IronSword = new IronSword();
    const loadedRifle: LoadedRifle = new LoadedRifle();
    const orbOfMagic: OrbOfMagic = new OrbOfMagic();
    const purpleSoulstone: PurpleSoulstone = new PurpleSoulstone();
    const scepter: Scepter = new Scepter();
    const speedPotion: SpeedPotion = new SpeedPotion();
    const warAxe: WarAxe = new WarAxe();
    const runedBracers: RunedBracers = new RunedBracers();
    const goblinNightScope: GoblinNightScope = new GoblinNightScope();
    const balancedShield: BalancedShield = new BalancedShield(moonArmor, ironShield);
    const improvedMoonArmor: ImprovedMoonArmor = new ImprovedMoonArmor(moonArmor);
    const improvedBalancedShield: ImprovedBalancedShield = new ImprovedBalancedShield(balancedShield);
    const steelShield: SteelShield = new SteelShield(ironShield);
    const coralScales: CoralScales = new CoralScales(reinforcedHide, studdedLeatherArmor);
    const reinforcedScales: ReinforcedScales = new ReinforcedScales(steelShield, coralScales);
    const agileSlippers: AgileSlippers = new AgileSlippers(bootsOfSpeed);
    const scrollOfAgility: ScrollOfAgility = new ScrollOfAgility(agileSlippers, speedPotion);
    const creatureClaws: CreatureClaws = new CreatureClaws(claws, studdedLeatherArmor);
    const dragonWhelpClaws: DragonWhelpClaws = new DragonWhelpClaws(creatureClaws);
    const berserkerAxes: BerserkerAxes = new BerserkerAxes(warAxe);
    const manaBlade: ManaBlade = new ManaBlade(ironSword, emptyVial);
    const ironClaws: IronClaws = new IronClaws(ironSword, claws);
    const theAegis: TheAegis = new TheAegis(steelShield, scepter);
    const vialOfMagic: VialOfMagic = new VialOfMagic(orbOfMagic, emptyVial);
    const maskOfProficiency: MaskOfProficiency = new MaskOfProficiency(orbOfMagic, sobiMask);
    const adeptCrystalBall: AdeptCrystalBall = new AdeptCrystalBall(crystalBall, sobiMask);
    const wandOfShadowsight: WandOfShadowsight = new WandOfShadowsight(goblinNightScope, flare);
    const enchantedShield: EnchantedShield = new EnchantedShield(orbOfMagic, moonArmor);
    const lionsRing: LionsRing = new LionsRing(runedBracers, improvedMoonArmor);
    const manaAxe: ManaAxe = new ManaAxe(warAxe, emptyVial);
    const fragarach: Fragarach = new Fragarach(manaBlade, ironClaws);
    const swordOfFreyr: SwordOfFreyr = new SwordOfFreyr(manaBlade, manaAxe);
    const items: ItemRecipe[] = [
        improvedMoonArmor,
        improvedBalancedShield,
        reinforcedScales,
        balancedShield,
        steelShield,
        coralScales,
        agileSlippers,
        scrollOfAgility,
        creatureClaws,
        dragonWhelpClaws,
        berserkerAxes,
        manaBlade,
        ironClaws,
        theAegis,
        vialOfMagic,
        maskOfProficiency,
        adeptCrystalBall,
        wandOfShadowsight,
        enchantedShield,
        lionsRing,
        manaAxe,
        new AdvancedReinforcedHides(improvedMoonArmor, improvedBalancedShield, reinforcedScales),
        new AgileSlippers(bootsOfSpeed),
        new Ancile(manaEgg, ironShield),
        new ArmoredBoots(bootsOfSpeed, steelShield),
        new Caduceus(branch, studdedLeatherArmor),
        new CircesStaff(branch, scepter),
        new CloakOfShadowWalk(cloakOfShadows, scrollOfAgility),
        new DragonScales(dragonWhelpClaws, coralScales),
        new EnhancedBerserkerAxes(berserkerAxes, berserkerPotion),
        new LightningBolt(goblinBattery, theAegis),
        new LoadedCannon(loadedRifle, ironSword),
        new ManaInfusedMask(maskOfProficiency, vialOfMagic),
        new MasterCrystalBall(adeptCrystalBall, vialOfMagic),
        new SnowyOwl(clockworkPenguin, wandOfShadowsight),
        new Soulcage(emptySoulcage, greenSoulstone, blueSoulstone, purpleSoulstone),
        new SpellShield(vialOfMagic, enchantedShield, lionsRing),
        new SwordOfNaegling(fragarach, swordOfFreyr),
        new ThrowableAxe(bloodiedExecutionersAxe, scepter),
    ];

    const itemWindowSize: number = Math.min(items.length, 11);
    const itemRecipeResultIconFrame: framehandle = BlzCreateFrameByType('BACKDROP', 'itemRecipeResultIcon', menu, '', 0);
    const itemRecipeResultDescriptionFrame: framehandle = BlzCreateFrame('StandardValueTextTemplate', menu, 0, 0);
    const itemRecipeResultUpgradeButton: framehandle = BlzCreateFrame('ScriptDialogButton', menu, 0, 0);
    BlzFrameSetSize(itemRecipeResultIconFrame, 0.04, 0.04);
    BlzFrameSetPoint(itemRecipeResultIconFrame, FRAMEPOINT_TOPLEFT, menu, FRAMEPOINT_TOPLEFT, 0.02, -0.06);
    BlzFrameSetTexture(itemRecipeResultIconFrame, 'war3mapImported\\BTNNoItem.blp', 0, true);
    BlzFrameSetPoint(itemRecipeResultDescriptionFrame, FRAMEPOINT_TOPLEFT, menu, FRAMEPOINT_TOPLEFT, 0.07, -0.06);
    BlzFrameSetTextAlignment(itemRecipeResultDescriptionFrame, TEXT_JUSTIFY_LEFT, TEXT_JUSTIFY_TOP);
    BlzFrameSetSize(itemRecipeResultDescriptionFrame, 0.41, 0.24);
    BlzFrameSetPoint(itemRecipeResultUpgradeButton, FRAMEPOINT_TOPLEFT, menu, FRAMEPOINT_TOPLEFT, 0.01, -0.17);
    BlzFrameSetSize(itemRecipeResultUpgradeButton, 0.06, 0.03);
    BlzFrameSetEnable(itemRecipeResultUpgradeButton, false);

    const itemRecipeFrames: framehandle[] = [];
    for (let i: number = 1; i < 7; i++) {
        const itemIcon: framehandle = BlzCreateFrameByType('BACKDROP', 'ItemIcon', menu, '', 0);
        BlzFrameSetSize(itemIcon, 0.02, 0.02);
        const x: number = 0.019 + ((i - 1) % 2) * 0.022;
        const y: number = -0.085 - 0.02 * ((i % 2) + Math.floor(i / 2));
        BlzFrameSetPoint(itemIcon, FRAMEPOINT_TOPLEFT, menu, FRAMEPOINT_TOPLEFT, x, y);
        BlzFrameSetTexture(itemIcon, 'war3mapImported\\BTNNoItem.blp', 0, true);

        itemRecipeFrames.push(itemIcon);
    }

    const itemRecipeGreenBorderFrames: framehandle[] = [];
    for (let i: number = 1; i < 7; i++) {
        const itemIcon: framehandle = BlzCreateFrameByType('BACKDROP', 'ItemIcon', menu, '', 0);
        BlzFrameSetSize(itemIcon, 0.02, 0.02);
        const x: number = 0.019 + ((i - 1) % 2) * 0.022;
        const y: number = -0.085 - 0.02 * ((i % 2) + Math.floor(i / 2));
        BlzFrameSetPoint(itemIcon, FRAMEPOINT_TOPLEFT, menu, FRAMEPOINT_TOPLEFT, x, y);
        BlzFrameSetTexture(itemIcon, 'war3mapImported\\BTNGreyedItem.blp', 0, true);

        itemRecipeGreenBorderFrames.push(itemIcon);
    }

    const findSlotItem: (itemSlotArray: ItemInSlot[], itemId: number) => ItemInSlot | undefined = (
        itemSlotArray: ItemInSlot[],
        itemId: number,
    ) => {
        for (let i: number = 0; i < itemSlotArray.length; i++) {
            if (!itemSlotArray[i].includedInRecipe && itemSlotArray[i].itemId === itemId) {
                return itemSlotArray[i];
            }
        }

        return undefined;
    };

    const selectedItemIndex: (number | undefined)[] = [];
    for (let i: number = 0; i < bj_MAX_PLAYERS; i++) {
        selectedItemIndex[i] = undefined;
    }

    let selectedItemFrame: framehandle | undefined;
    let selectedItemFrameIndex: number | undefined;
    let previousItemWindowMax: number = itemWindowSize - 1;
    const unselectItemEvent: () => void = () => {
        for (let i: number = 0; i < itemRecipeFrames.length; i++) {
            BlzFrameSetTexture(itemRecipeGreenBorderFrames[i], 'war3mapImported\\BTNGreyedItem.blp', 0, true);
            BlzFrameSetTexture(itemRecipeFrames[i], 'war3mapImported\\BTNNoItem.blp', 0, true);
            BlzFrameSetText(itemRecipeResultUpgradeButton, '');
            BlzFrameSetEnable(itemRecipeResultUpgradeButton, false);
        }

        BlzFrameSetText(itemRecipeResultDescriptionFrame, '');
        BlzFrameSetTexture(itemRecipeResultIconFrame, 'war3mapImported\\BTNNoItem.blp', 0, true);
        BlzFrameSetVisible(selectedItemFrame as framehandle, false);
        selectedItemFrameIndex = undefined;
    };

    const showMainFrame: boolean[] = [];
    for (let i: number = 0; i < bj_MAX_PLAYERS; i++) {
        showMainFrame.push(false);
        if (GetPlayerController(Player(i)) === MAP_CONTROL_USER && GetPlayerSlotState(Player(i)) === PLAYER_SLOT_STATE_PLAYING) {
            const index: number = i;
            const t: Trigger = new Trigger();
            t.registerFrameEvent(mainButton, FRAMEEVENT_CONTROL_CLICK);
            t.addAction(() => {
                showMainFrame[index] = !showMainFrame[index];
                BlzFrameSetVisible(menu, showMainFrame[GetPlayerId(GetLocalPlayer())]);

                if (showMainFrame[index]) {
                    unselectItemEvent();
                }

                BlzFrameSetEnable(mainButton, false);
                BlzFrameSetEnable(mainButton, true);
            });
        }
    }

    const selectItemEvent: (index: number, triggerPlayerId: number) => void = (index: number, triggerPlayerId: number) => {
        selectedItemFrameIndex = index;
        selectedItemIndex[triggerPlayerId] = selectedItemFrameIndex + previousItemWindowMax + 1 - itemWindowSize;
        const item: ItemRecipe = items[selectedItemIndex[triggerPlayerId] as number];
        BlzFrameSetText(itemRecipeResultDescriptionFrame, item.description);
        let hasAllItems: boolean = true;
        const itemsInSlots: { itemId: number; includedInRecipe: boolean }[] = [];
        const playerId: number = GetPlayerId(GetLocalPlayer());
        for (let i: number = 1; i < 7; i++) {
            itemsInSlots.push({ itemId: GetItemTypeId(UnitItemInSlotBJ(gameGlobals.PlayerHero[playerId], i)), includedInRecipe: false });
        }

        for (let i: number = 0; i < itemRecipeFrames.length; i++) {
            if (i < item.recipe.length) {
                const foundSlotItem: ItemInSlot | undefined = findSlotItem(
                    itemsInSlots,
                    items[selectedItemIndex[triggerPlayerId] as number].recipe[i].itemId,
                );
                if (foundSlotItem !== undefined) {
                    foundSlotItem.includedInRecipe = true;
                    BlzFrameSetTexture(itemRecipeGreenBorderFrames[i], 'war3mapImported\\BTNGreenBorder.blp', 0, true);
                } else {
                    hasAllItems = false;
                    BlzFrameSetTexture(itemRecipeGreenBorderFrames[i], 'war3mapImported\\BTNGreyedItem.blp', 0, true);
                }

                BlzFrameSetVisible(itemRecipeGreenBorderFrames[i], true);
                BlzFrameSetTexture(itemRecipeFrames[i], item.recipe[i].iconPath, 0, true);
            } else {
                BlzFrameSetTexture(itemRecipeFrames[i], 'war3mapImported\\BTNNoItem.blp', 0, true);
            }
        }

        if (hasAllItems) {
            BlzFrameSetText(itemRecipeResultUpgradeButton, item.goldCost.toString());
            BlzFrameSetEnable(itemRecipeResultUpgradeButton, true);
        } else {
            BlzFrameSetText(itemRecipeResultUpgradeButton, '');
            BlzFrameSetEnable(itemRecipeResultUpgradeButton, false);
        }

        BlzFrameSetTexture(itemRecipeResultIconFrame, item.iconPath, 0, true);
        BlzFrameSetPoint(
            selectedItemFrame as framehandle,
            FRAMEPOINT_BOTTOMLEFT,
            menu,
            FRAMEPOINT_BOTTOMLEFT,
            0.0175 + 0.0425 * selectedItemFrameIndex,
            0.03,
        );
        BlzFrameSetVisible(selectedItemFrame as framehandle, true);
    };

    const upgradeButtonTrigger: Trigger = new Trigger();
    upgradeButtonTrigger.registerFrameEvent(itemRecipeResultUpgradeButton, FRAMEEVENT_CONTROL_CLICK);
    upgradeButtonTrigger.addAction(() => {
        const triggerPlayerId: number = GetPlayerId(GetTriggerPlayer());
        const selectedItemForPlayerIndex: number | undefined = selectedItemIndex[triggerPlayerId];
        if (selectedItemForPlayerIndex !== undefined) {
            const itemsInSlots: ItemInSlot[] = [];
            for (let i: number = 1; i < 7; i++) {
                itemsInSlots.push({
                    itemId: GetItemTypeId(UnitItemInSlotBJ(gameGlobals.PlayerHero[triggerPlayerId], i)),
                    includedInRecipe: false,
                });
            }

            let hasAllItems: boolean = true;
            for (let i: number = 0; i < items[selectedItemForPlayerIndex].recipe.length; i++) {
                const foundSlotItem: ItemInSlot | undefined = findSlotItem(
                    itemsInSlots,
                    items[selectedItemForPlayerIndex].recipe[i].itemId,
                );

                if (foundSlotItem === undefined) {
                    hasAllItems = false;
                }
            }

            const upgradeGoldCost: number = items[selectedItemForPlayerIndex].goldCost;
            const playerCurrentGold: number = GetPlayerState(GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD);
            if (hasAllItems && playerCurrentGold >= upgradeGoldCost) {
                SetPlayerState(GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD, playerCurrentGold - upgradeGoldCost);

                for (let i: number = 0; i < items[selectedItemForPlayerIndex].recipe.length; i++) {
                    RemoveItem(
                        GetItemOfTypeFromUnitBJ(
                            gameGlobals.PlayerHero[triggerPlayerId],
                            items[selectedItemForPlayerIndex].recipe[i].itemId,
                        ),
                    );
                }
                UnitAddItemById(gameGlobals.PlayerHero[triggerPlayerId], items[selectedItemForPlayerIndex].itemId);
                selectItemEvent(selectedItemFrameIndex as number, triggerPlayerId);
            }
        }
    });

    const itemFrames: framehandle[] = [];
    for (let i: number = 0; i < itemWindowSize && i < items.length; i++) {
        itemFrames.push(createItemFrame(menu, items[i].iconPath, i, selectItemEvent));
    }

    const itemGoldCost: framehandle[] = [];
    for (let i: number = 0; i < itemWindowSize && i < items.length; i++) {
        itemGoldCost.push(createItemGoldCostFrame(menu, items[i].goldCost, i));
    }

    selectedItemFrame = BlzCreateFrameByType('SPRITE', 'selectedItemFrame', menu, '', 0);
    BlzFrameSetVisible(selectedItemFrame, false);
    BlzFrameSetSize(selectedItemFrame, 0.04, 0.04);
    BlzFrameSetPoint(selectedItemFrame, FRAMEPOINT_BOTTOMLEFT, menu, FRAMEPOINT_BOTTOMLEFT, 0.016, 0.03);
    BlzFrameSetModel(selectedItemFrame, 'UI\\Feedback\\Autocast\\UI-ModalButtonOn.mdx', 0);

    const scrollTrigger: Trigger = new Trigger();
    scrollTrigger.registerFrameEvent(menuScrollbar, FRAMEEVENT_SLIDER_VALUE_CHANGED);
    scrollTrigger.addAction(() => {
        const value: number = BlzFrameGetValue(menuScrollbar);
        const itemWindowMax: number = itemWindowSize + Math.round(value * (items.length - itemWindowSize)) - 1;
        if (itemWindowMax === previousItemWindowMax) {
            return;
        }

        const itemWindowMaxDifference: number = previousItemWindowMax - itemWindowMax;
        previousItemWindowMax = itemWindowMax;
        const itemWindowMin: number = itemWindowMax + 1 - itemWindowSize;
        if (selectedItemFrameIndex === undefined) {
            BlzFrameSetVisible(selectedItemFrame as framehandle, false);
        } else {
            selectedItemFrameIndex += itemWindowMaxDifference;
            if (selectedItemFrameIndex < 0 || selectedItemFrameIndex > itemWindowSize - 1) {
                BlzFrameSetVisible(selectedItemFrame as framehandle, false);
            } else {
                BlzFrameSetPoint(
                    selectedItemFrame as framehandle,
                    FRAMEPOINT_BOTTOMLEFT,
                    menu,
                    FRAMEPOINT_BOTTOMLEFT,
                    0.0175 + 0.0425 * selectedItemFrameIndex,
                    0.03,
                );
                BlzFrameSetVisible(selectedItemFrame as framehandle, true);
            }
        }

        for (let i: number = 0; i < itemFrames.length && itemWindowMin + i < items.length; i++) {
            BlzFrameSetTexture(itemFrames[i], items[itemWindowMin + i].iconPath, 0, true);
            // BlzFrameSetPoint(items[i], FRAMEPOINT_BOTTOMLEFT, menu, FRAMEPOINT_BOTTOMLEFT, 0.015 + 0.04 * (i - itemWindowMin), 0.03);
        }
    });
}

/*
const s: sound = CreateSound('Sound\\Interface\\BigButtonClick.wav', false, false, false, 0, 0, 'DefaultEAXON');

function createFakeCheckbox(parent: framehandle, defaultVisibility: boolean = true,
                            isHoverEffectEnabled: boolean = true, event?: () => void): framehandle {
    const hiddenButton: framehandle = BlzCreateFrameByType('BUTTON', 'buttonCheckbox', parent, 'EscMenuControlBackdropTemplate',  0);
    let glow: framehandle | undefined;
    if (isHoverEffectEnabled) {
        glow = BlzCreateFrameByType('BACKDROP', 'checkboxGlow', hiddenButton, 'EscMenuCheckHighlightTemplate',  0);
    }
    const border: framehandle = BlzCreateFrameByType('BACKDROP', 'checkboxBorder', hiddenButton, 'ButtonBackdropTemplate',  0);
    const checkmark: framehandle = BlzCreateFrameByType('BACKDROP', 'checkboxCheckmark', hiddenButton, 'ButtonBackdropTemplate',  0);

    if (glow !== undefined) {
        BlzFrameSetSize(glow, 0.02, 0.02);
    }
    BlzFrameSetSize(hiddenButton, 0.02, 0.02);
    BlzFrameSetSize(checkmark, 0.02, 0.02);
    BlzFrameSetSize(border, 0.02, 0.02);

    // UI\Widgets\Glues\GlueScreen-Checkbox-Check.blp
    // UI\Widgets\EscMenu\Human\Checkbox-Depressed.blp
    // UI\Widgets\Glues\GlueScreen-RadioButton-Background.blp
    if (glow !== undefined) {
        BlzFrameSetTexture(glow, 'UI\\Widgets\\EscMenu\\Human\\Checkbox-Depressed.blp', 0, true);
    }
    BlzFrameSetTexture(border, 'UI\\Widgets\\EscMenu\\Human\\Checkbox-Background.blp', 0, true);
    BlzFrameSetTexture(checkmark, 'UI\\Widgets\\Glues\\GlueScreen-Checkbox-Check.blp', 0, true);

    if (glow !== undefined) {
        BlzFrameSetPoint(glow, FRAMEPOINT_CENTER, hiddenButton, FRAMEPOINT_CENTER, 0.0, 0.0);
    }
    BlzFrameSetPoint(border, FRAMEPOINT_CENTER, hiddenButton, FRAMEPOINT_CENTER, 0.0, 0.0);
    BlzFrameSetPoint(checkmark, FRAMEPOINT_CENTER, hiddenButton, FRAMEPOINT_CENTER, 0.0, 0.0);

    let visible: boolean = defaultVisibility;

    BlzFrameSetVisible(checkmark, visible);
    if (glow !== undefined) {
        BlzFrameSetVisible(glow, false);
    }

    const trig: Trigger = new Trigger();
    trig.addAction(() => {
        if (GetLocalPlayer() === GetTriggerPlayer()) {
            PlaySoundBJ(s);
        }

        visible = !visible;
        BlzFrameSetVisible(checkmark, visible);

        if (event !== undefined) {
            event();
        }
    });
    trig.registerFrameEvent(hiddenButton, FRAMEEVENT_CONTROL_CLICK);

    if (glow !== undefined) {
        const mouseEnterEvent: Trigger = new Trigger();
        mouseEnterEvent.addAction(() => {
            BlzFrameSetVisible(glow as framehandle, true);
        });
        mouseEnterEvent.registerFrameEvent(hiddenButton, FRAMEEVENT_MOUSE_ENTER);

        const mouseLeaveEvent: Trigger = new Trigger();
        mouseLeaveEvent.addAction(() => {
            BlzFrameSetVisible(glow as framehandle, false);
        });
        mouseLeaveEvent.registerFrameEvent(hiddenButton, FRAMEEVENT_MOUSE_LEAVE);
    }

    return hiddenButton;
}
*/

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

class FakeCheckbox {
    private readonly border: framehandle;
    private readonly checkmark: framehandle;
    private isChecked: boolean = true;

    constructor(parent: framehandle, size: number = 0.02) {
        this.border = BlzCreateFrameByType('BACKDROP', 'checkboxBorder', parent, 'ButtonBackdropTemplate', 0);
        this.checkmark = BlzCreateFrameByType('BACKDROP', 'checkboxCheckmark', this.border, 'ButtonBackdropTemplate', 0);

        BlzFrameSetTexture(this.border, 'UI\\Widgets\\EscMenu\\Human\\Checkbox-Background-Disabled.blp', 0, true);
        BlzFrameSetTexture(this.checkmark, 'UI\\Widgets\\Glues\\GlueScreen-Checkbox-Checkdisabled.blp', 0, true);
        BlzFrameSetPoint(this.checkmark, FRAMEPOINT_CENTER, this.border, FRAMEPOINT_CENTER, 0.0, 0.0);

        this.setSize(size);
    }

    public setChecked(state: boolean): void {
        this.isChecked = state;
        BlzFrameSetVisible(this.checkmark, this.isChecked);
    }

    public getChecked(): boolean {
        return this.isChecked;
    }

    public setFramePoint(point: framepointtype, relative: framehandle, relativePoint: framepointtype, x: number, y: number): void {
        BlzFrameSetPoint(this.border, point, relative, relativePoint, x, y);
    }

    public setSize(size: number): void {
        BlzFrameSetSize(this.border, size, size);
        BlzFrameSetSize(this.checkmark, size, size);
    }

    public getBorderFrame(): framehandle {
        return this.border;
    }
}

class RadioButton {
    private readonly hiddenButton: framehandle;
    private readonly border: framehandle;
    private readonly check: framehandle;
    private isChecked: boolean = false;
    private size: number = 0.015;

    constructor(parent: framehandle, isChecked: boolean = false, size: number = 0.015) {
        this.isChecked = isChecked;
        this.size = size;
        this.hiddenButton = BlzCreateFrameByType('BUTTON', 'radioButtonHiddenButton', parent, 'EscMenuControlBackdropTemplate', 0);
        this.border = BlzCreateFrameByType('BACKDROP', 'radioButtonBorder', this.hiddenButton, 'ButtonBackdropTemplate', 0);
        this.check = BlzCreateFrameByType('BACKDROP', 'radioButtonCheck', this.hiddenButton, 'ButtonBackdropTemplate', 0);

        BlzFrameSetTexture(this.border, 'UI\\Widgets\\EscMenu\\Human\\Radiobutton-Background.blp', 0, true);
        BlzFrameSetTexture(this.check, 'UI\\Widgets\\EscMenu\\Human\\Radiobutton-Button.blp', 0, true);

        BlzFrameSetPoint(this.check, FRAMEPOINT_CENTER, this.hiddenButton, FRAMEPOINT_CENTER, 0.0, 0.0);
        BlzFrameSetPoint(this.border, FRAMEPOINT_CENTER, this.hiddenButton, FRAMEPOINT_CENTER, 0.0, 0.0);

        this.setChecked(this.isChecked);
        this.setSize(this.size);
    }

    public setSize(size: number): void {
        this.size = size;
        BlzFrameSetSize(this.hiddenButton, size, size);
        BlzFrameSetSize(this.border, size, size);
        BlzFrameSetSize(this.check, size, size);
    }

    public setChecked(state: boolean): void {
        this.isChecked = state;
        BlzFrameSetVisible(this.check, this.isChecked);
    }

    public getChecked(): boolean {
        return this.isChecked;
    }

    public setFramePoint(point: framepointtype, relative: framehandle, relativePoint: framepointtype, x: number, y: number): void {
        BlzFrameSetPoint(this.hiddenButton, point, relative, relativePoint, x, y);
    }

    public getHiddenButtonFrame(): framehandle {
        return this.hiddenButton;
    }

    public setClickEvent(event: () => void): void {
        const trig: Trigger = new Trigger();
        trig.addAction(() => event());
        trig.registerFrameEvent(this.hiddenButton, FRAMEEVENT_CONTROL_CLICK);
    }
}

function createSliderTrigger(frame: framehandle, event: (value: number) => void): void {
    const syncTrig: Trigger = new Trigger();
    syncTrig.addAction(() => {
        event(Number(BlzGetTriggerSyncData()));
    });
    for (let i: number = 0; i < bj_MAX_PLAYERS; i++) {
        syncTrig.registerPlayerSyncEvent(Player(i), 'livesupdate', false);
    }

    const trig: Trigger = new Trigger();
    trig.addAction(() => {
        if (GetLocalPlayer() === GetTriggerPlayer()) {
            BlzSendSyncData('livesupdate', BlzFrameGetValue(frame).toString());
        }
    });
    trig.registerFrameEvent(frame, FRAMEEVENT_SLIDER_VALUE_CHANGED);
}

function createCheckboxTrigger(frame: framehandle, event: (state: boolean) => void): void {
    const checkboxCheckedTrigger: Trigger = new Trigger();
    checkboxCheckedTrigger.addAction(() => event(true));
    checkboxCheckedTrigger.registerFrameEvent(frame, FRAMEEVENT_CHECKBOX_CHECKED);
    const checkboxUncheckedTrigger: Trigger = new Trigger();
    checkboxUncheckedTrigger.addAction(() => event(false));
    checkboxUncheckedTrigger.registerFrameEvent(frame, FRAMEEVENT_CHECKBOX_UNCHECKED);
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

function initializeGameOptionFrames(gameGlobals: GameGlobals, randomNumberGenerator: RandomNumberGenerator): void {
    // EscMenuSliderTemplate
    // StandardSliderTemplate
    // BattleNetSliderTemplate

    const menu: framehandle = BlzCreateFrame('EscMenuPopupMenuTemplate', BlzGetOriginFrame(ORIGIN_FRAME_GAME_UI, 0), 0, 0);
    const menuBackdrop: framehandle = BlzCreateFrame('EscMenuButtonBackdropTemplate', menu, 0, 0);
    const menuTitle: framehandle = BlzCreateFrame('StandardTitleTextTemplate', menu, 0, 0);
    const fogOfWarCheckbox: framehandle = BlzCreateFrame('QuestCheckBox', menu, 0, 0);
    const fogOfWarText: framehandle = BlzCreateFrame('StandardInfoTextTemplate', fogOfWarCheckbox, 0, 0);
    const allRandomCheckbox: framehandle = BlzCreateFrame('QuestCheckBox', fogOfWarCheckbox, 0, 0);
    const allRandomText: framehandle = BlzCreateFrame('StandardInfoTextTemplate', fogOfWarCheckbox, 0, 0);
    const suddenDeathCheckbox: framehandle = BlzCreateFrame('QuestCheckBox', fogOfWarCheckbox, 0, 0);
    const suddenDeathText: framehandle = BlzCreateFrame('StandardInfoTextTemplate', fogOfWarCheckbox, 0, 0);
    const teamsText: framehandle = BlzCreateFrame('StandardInfoTextTemplate', fogOfWarCheckbox, 0, 0);
    const threeVersusThreeRadioButton: RadioButton = new RadioButton(fogOfWarCheckbox, true);
    const threeVersusThreeText: framehandle = BlzCreateFrame('StandardInfoTextTemplate', fogOfWarCheckbox, 0, 0);
    const noTeamsRadioButton: RadioButton = new RadioButton(fogOfWarCheckbox, false);
    const noTeamsText: framehandle = BlzCreateFrame('StandardInfoTextTemplate', fogOfWarCheckbox, 0, 0);
    const livesLabel: framehandle = BlzCreateFrame('StandardInfoTextTemplate', fogOfWarCheckbox, 0, 0);
    const livesMinValueText: framehandle = BlzCreateFrame('StandardInfoTextTemplate', fogOfWarCheckbox, 0, 0);
    const livesSlider: framehandle = BlzCreateFrame('EscMenuSliderTemplate', fogOfWarCheckbox, 0, 0);
    const livesMaxValueText: framehandle = BlzCreateFrame('StandardInfoTextTemplate', fogOfWarCheckbox, 0, 0);
    const livesCurrentValueText: framehandle = BlzCreateFrame('StandardInfoTextTemplate', fogOfWarCheckbox, 0, 0);
    const startButton: framehandle = BlzCreateFrame('ScriptDialogButton', fogOfWarCheckbox, 0, 0);

    BlzFrameSetSize(menu, 0.3, 0.3);
    BlzFrameSetSize(menuBackdrop, 0.3, 0.3);
    BlzFrameSetSize(fogOfWarCheckbox, 0.02, 0.02);
    BlzFrameSetSize(allRandomCheckbox, 0.02, 0.02);
    BlzFrameSetSize(suddenDeathCheckbox, 0.02, 0.02);
    BlzFrameSetSize(livesSlider, 0.2, 0.02);
    BlzFrameSetSize(startButton, 0.22, 0.035);

    BlzFrameSetAbsPoint(menu, FRAMEPOINT_CENTER, 0.4, 0.35);

    BlzFrameSetPoint(menuBackdrop, FRAMEPOINT_CENTER, menu, FRAMEPOINT_CENTER, 0.0, 0.0);
    BlzFrameSetPoint(menuTitle, FRAMEPOINT_TOPLEFT, menu, FRAMEPOINT_TOPLEFT, 0.11, -0.02);
    BlzFrameSetPoint(fogOfWarCheckbox, FRAMEPOINT_CENTER, menuTitle, FRAMEPOINT_CENTER, -0.12, -0.03);
    BlzFrameSetPoint(fogOfWarText, FRAMEPOINT_LEFT, fogOfWarCheckbox, FRAMEPOINT_RIGHT, 0.01, 0.0);
    BlzFrameSetPoint(allRandomCheckbox, FRAMEPOINT_CENTER, fogOfWarCheckbox, FRAMEPOINT_CENTER, 0.0, -0.025);
    BlzFrameSetPoint(allRandomText, FRAMEPOINT_LEFT, allRandomCheckbox, FRAMEPOINT_RIGHT, 0.01, 0.0);
    BlzFrameSetPoint(suddenDeathCheckbox, FRAMEPOINT_CENTER, allRandomCheckbox, FRAMEPOINT_CENTER, 0.0, -0.025);
    BlzFrameSetPoint(suddenDeathText, FRAMEPOINT_LEFT, suddenDeathCheckbox, FRAMEPOINT_RIGHT, 0.01, 0.0);
    BlzFrameSetPoint(teamsText, FRAMEPOINT_LEFT, suddenDeathCheckbox, FRAMEPOINT_LEFT, 0.0, -0.025);
    threeVersusThreeRadioButton.setFramePoint(FRAMEPOINT_LEFT, teamsText, FRAMEPOINT_RIGHT, 0.01, 0.0);
    BlzFrameSetPoint(
        threeVersusThreeText,
        FRAMEPOINT_LEFT,
        threeVersusThreeRadioButton.getHiddenButtonFrame(),
        FRAMEPOINT_RIGHT,
        0.005,
        0.0,
    );
    noTeamsRadioButton.setFramePoint(FRAMEPOINT_LEFT, threeVersusThreeText, FRAMEPOINT_RIGHT, 0.01, 0.0);
    BlzFrameSetPoint(noTeamsText, FRAMEPOINT_LEFT, noTeamsRadioButton.getHiddenButtonFrame(), FRAMEPOINT_RIGHT, 0.005, 0.0);
    BlzFrameSetPoint(livesMinValueText, FRAMEPOINT_LEFT, teamsText, FRAMEPOINT_LEFT, 0.0, -0.04);
    BlzFrameSetPoint(livesSlider, FRAMEPOINT_LEFT, livesMinValueText, FRAMEPOINT_RIGHT, 0.01, 0.0);
    BlzFrameSetPoint(livesMaxValueText, FRAMEPOINT_LEFT, livesSlider, FRAMEPOINT_RIGHT, 0.01, 0.0);
    BlzFrameSetPoint(livesLabel, FRAMEPOINT_CENTER, livesSlider, FRAMEPOINT_CENTER, 0.0, 0.015);
    BlzFrameSetPoint(livesCurrentValueText, FRAMEPOINT_CENTER, livesSlider, FRAMEPOINT_CENTER, 0.0, -0.015);
    BlzFrameSetPoint(startButton, FRAMEPOINT_CENTER, menu, FRAMEPOINT_CENTER, 0.0, -0.11);

    BlzFrameSetValue(livesSlider, 0.1);

    BlzFrameSetText(menuTitle, 'SotE Rules');
    BlzFrameSetText(fogOfWarText, 'Disable Fog of War');
    BlzFrameSetText(allRandomText, 'All Random');
    BlzFrameSetText(suddenDeathText, 'Disable Sudden Death');
    BlzFrameSetText(teamsText, 'Teams:');
    BlzFrameSetText(threeVersusThreeText, '3 vs 3');
    BlzFrameSetText(noTeamsText, 'All vs All');
    BlzFrameSetText(livesLabel, 'Lives');
    BlzFrameSetText(livesMinValueText, '1');
    BlzFrameSetText(livesMaxValueText, '100');
    BlzFrameSetText(livesCurrentValueText, '10');
    BlzFrameSetText(startButton, 'Start Game');

    const fakeMenuFogOfWarCheckbox: FakeCheckbox = new FakeCheckbox(menu);
    const fakeMenuFogOfWarText: framehandle = BlzCreateFrame('StandardValueTextTemplate', fakeMenuFogOfWarCheckbox.getBorderFrame(), 0, 0);
    const fakeMenuAllRandomCheckbox: FakeCheckbox = new FakeCheckbox(fakeMenuFogOfWarCheckbox.getBorderFrame());
    const fakeMenuAllRandomText: framehandle = BlzCreateFrame(
        'StandardValueTextTemplate',
        fakeMenuAllRandomCheckbox.getBorderFrame(),
        0,
        0,
    );
    const fakeMenuSuddenDeathCheckbox: FakeCheckbox = new FakeCheckbox(fakeMenuFogOfWarCheckbox.getBorderFrame());
    const fakeMenuSuddenDeathText: framehandle = BlzCreateFrame(
        'StandardValueTextTemplate',
        fakeMenuFogOfWarCheckbox.getBorderFrame(),
        0,
        0,
    );
    const fakeMenuTeamsText: framehandle = BlzCreateFrame('StandardValueTextTemplate', fakeMenuFogOfWarCheckbox.getBorderFrame(), 0, 0);
    const fakeMenuLivesText: framehandle = BlzCreateFrame('StandardValueTextTemplate', fakeMenuFogOfWarCheckbox.getBorderFrame(), 0, 0);
    const fakeMenuLivesValue: framehandle = BlzCreateFrame('StandardValueTextTemplate', fakeMenuFogOfWarCheckbox.getBorderFrame(), 0, 0);
    const fakeMenuWaitingForHostText: framehandle = BlzCreateFrame(
        'StandardValueTextTemplate',
        fakeMenuFogOfWarCheckbox.getBorderFrame(),
        0,
        0,
    );

    fakeMenuFogOfWarCheckbox.setFramePoint(FRAMEPOINT_CENTER, menuTitle, FRAMEPOINT_CENTER, -0.12, -0.03);
    BlzFrameSetPoint(fakeMenuFogOfWarText, FRAMEPOINT_LEFT, fakeMenuFogOfWarCheckbox.getBorderFrame(), FRAMEPOINT_RIGHT, 0.01, 0.0);
    fakeMenuAllRandomCheckbox.setFramePoint(FRAMEPOINT_CENTER, fakeMenuFogOfWarCheckbox.getBorderFrame(), FRAMEPOINT_CENTER, 0.0, -0.025);
    BlzFrameSetPoint(fakeMenuAllRandomText, FRAMEPOINT_LEFT, fakeMenuAllRandomCheckbox.getBorderFrame(), FRAMEPOINT_RIGHT, 0.01, 0.0);
    fakeMenuSuddenDeathCheckbox.setFramePoint(
        FRAMEPOINT_CENTER,
        fakeMenuAllRandomCheckbox.getBorderFrame(),
        FRAMEPOINT_CENTER,
        0.0,
        -0.025,
    );
    BlzFrameSetPoint(fakeMenuSuddenDeathText, FRAMEPOINT_LEFT, fakeMenuSuddenDeathCheckbox.getBorderFrame(), FRAMEPOINT_RIGHT, 0.01, 0.0);
    BlzFrameSetPoint(fakeMenuTeamsText, FRAMEPOINT_LEFT, fakeMenuSuddenDeathCheckbox.getBorderFrame(), FRAMEPOINT_LEFT, 0.0, -0.025);
    BlzFrameSetPoint(fakeMenuLivesText, FRAMEPOINT_LEFT, fakeMenuTeamsText, FRAMEPOINT_LEFT, 0.0, -0.025);
    BlzFrameSetPoint(fakeMenuLivesValue, FRAMEPOINT_LEFT, fakeMenuLivesText, FRAMEPOINT_RIGHT, 0.01, 0.0);
    BlzFrameSetPoint(fakeMenuWaitingForHostText, FRAMEPOINT_CENTER, menu, FRAMEPOINT_CENTER, 0.0, -0.11);
    fakeMenuFogOfWarCheckbox.setChecked(false);
    fakeMenuSuddenDeathCheckbox.setChecked(false);
    fakeMenuAllRandomCheckbox.setChecked(false);

    BlzFrameSetText(fakeMenuFogOfWarText, 'Disable Fog of War');
    BlzFrameSetText(fakeMenuAllRandomText, 'All Random');
    BlzFrameSetText(fakeMenuSuddenDeathText, 'Disable Sudden Death');
    BlzFrameSetText(fakeMenuTeamsText, 'Teams: 3 vs 3');
    BlzFrameSetText(fakeMenuLivesText, 'Lives:');
    BlzFrameSetText(fakeMenuLivesValue, '10');
    BlzFrameSetText(fakeMenuWaitingForHostText, 'Waiting for host...');

    let isFogOfWarEnabled: boolean = true;
    createCheckboxTrigger(fogOfWarCheckbox, (state: boolean) => {
        isFogOfWarEnabled = !state;
        fakeMenuFogOfWarCheckbox.setChecked(state);
    });

    let isAllRandomEnabled: boolean = false;
    createCheckboxTrigger(allRandomCheckbox, (state: boolean) => {
        isAllRandomEnabled = state;
        fakeMenuAllRandomCheckbox.setChecked(state);
    });

    let isTeamsEnabled: boolean = true;
    threeVersusThreeRadioButton.setClickEvent(() => {
        isTeamsEnabled = true;
        noTeamsRadioButton.setChecked(false);
        threeVersusThreeRadioButton.setChecked(true);
        BlzFrameSetText(fakeMenuTeamsText, 'Teams: 3 vs 3');
    });

    noTeamsRadioButton.setClickEvent(() => {
        isTeamsEnabled = false;
        threeVersusThreeRadioButton.setChecked(false);
        noTeamsRadioButton.setChecked(true);
        BlzFrameSetText(fakeMenuTeamsText, 'Teams: None');
    });

    let isSuddenDeathEnabled: boolean = true;
    createCheckboxTrigger(suddenDeathCheckbox, (state: boolean) => {
        isSuddenDeathEnabled = !state;
        fakeMenuSuddenDeathCheckbox.setChecked(state);
    });

    let lives: number = 10;
    createSliderTrigger(livesSlider, (value: number) => {
        lives = Math.max(Math.ceil(100 * value), 1);
        BlzFrameSetText(livesCurrentValueText, lives.toString());
        BlzFrameSetText(fakeMenuLivesValue, lives.toString());
    });

    const startButtonTrigger: Trigger = new Trigger();
    startButtonTrigger.addAction(() => {
        BlzFrameSetVisible(menu, false);

        gameGlobals.GameIsFogOfWarEnabled = isFogOfWarEnabled;
        gameGlobals.GameIsAllRandomEnabled = isAllRandomEnabled;
        gameGlobals.GameIsTeamsEnabled = isTeamsEnabled;
        gameGlobals.GameIsSuddenDeathEnabled = isSuddenDeathEnabled;
        gameGlobals.GameStartingLife = lives;

        const game: Game = new Game(gameGlobals, randomNumberGenerator);
    });
    startButtonTrigger.registerFrameEvent(startButton, FRAMEEVENT_CONTROL_CLICK);

    let showHostMenu: boolean = false;

    if (GetLocalPlayer() === Player(0)) {
        showHostMenu = true;
    }

    BlzFrameSetVisible(fogOfWarCheckbox, showHostMenu);
    BlzFrameSetVisible(fakeMenuFogOfWarCheckbox.getBorderFrame(), !showHostMenu);
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
