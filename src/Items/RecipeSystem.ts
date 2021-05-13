import { GameGlobals } from '../Game/GameGlobals';
import { Trigger } from '../JassOverrides/Trigger';
import ItemRecipeController from './ItemRecipeController';
import { basicItems } from './BaseItemController';
import { ItemRecipe } from './ItemRecipe';
import { Item } from './Item';
import { ItemLabel } from './ItemLabel';

interface ItemInSlot {
    itemId: number;
    includedInRecipe: boolean;
}

interface LocalPlayerInterface {
    heroItems: number[];
    heroRecipeItems: Item[];
    filterItems: number[];

    isMainWindowVisible: boolean;
    isItemListFiltered: boolean;
    isLeftClick: boolean;

    selectedItemFrameIndex: number | undefined;
    selectedItemId: number | undefined;
    currentScrollValue: number;
    itemWindowMin: number;
    itemWindowMax: number;
    itemWindowSize: number;
}

interface ItemMap {
    [key: number]: Item;
}

interface ItemRecipeIndexMap {
    [key: number]: number;
}

const items: ItemRecipe[] = ItemRecipeController.sort((a, b) => a.goldCost - b.goldCost);

export class RecipeSystem {
    public readonly animatedFrame: framehandle;
    private readonly itemMap: ItemMap = {};
    private readonly itemRecipeIndexMap: ItemRecipeIndexMap = {};
    private readonly gameGlobals: GameGlobals;
    private readonly menu: framehandle;
    private readonly itemFrames: framehandle[] = [];
    private readonly mainButton: framehandle;
    private readonly itemGoldCost: framehandle[] = [];
    private readonly localPlayerInterface: LocalPlayerInterface;
    private readonly itemRecipeFrames: framehandle[] = [];
    private readonly itemRecipeGreenBorderFrames: framehandle[] = [];
    private readonly itemRecipeResultUpgradeButton: framehandle;
    private readonly itemRecipeResultIconFrame: framehandle;
    private readonly itemRecipeResultClickFrame: framehandle;
    private readonly itemRecipeResultDescriptionFrame: framehandle;
    private animatedFrameIsVisible: boolean = true;
    private selectedItemFrame: framehandle | undefined;

    constructor(gameGlobals: GameGlobals) {
        this.gameGlobals = gameGlobals;

        for (let i: number = 0; i < items.length; i++) {
            this.itemMap[items[i].itemId] = items[i];
            this.itemRecipeIndexMap[items[i].itemId] = i;
        }

        for (let i: number = 0; i < basicItems.length; i++) {
            this.itemMap[basicItems[i].itemId] = basicItems[i];
        }

        const originFrameGameUi: framehandle = BlzGetOriginFrame(ORIGIN_FRAME_GAME_UI, 0);
        this.menu = BlzCreateFrame('EscMenuPopupMenuTemplate', originFrameGameUi, 0, 0);
        const menuBackdrop: framehandle = BlzCreateFrame('EscMenuButtonBackdropTemplate', this.menu, 0, 0);
        const menuTitle: framehandle = BlzCreateFrame('StandardTitleTextTemplate', this.menu, 0, 0);
        const menuScrollbar: framehandle = BlzCreateFrame('EscMenuSliderTemplate', this.menu, 0, 0);
        this.mainButton = BlzCreateFrame('ScoreScreenTabButtonTemplate', originFrameGameUi, 0, 0);
        const mainButtonBackdrop: framehandle = BlzCreateFrameByType('BACKDROP', 'mainButtonBackdrop', this.mainButton, '', 0);
        const mainButtonTooltip: framehandle = BlzCreateFrameByType('TEXT', 'mainButtonTooltip', this.mainButton, '', 0);
        const escText: framehandle = BlzCreateFrameByType('TEXT', 'escText', this.menu, '', 0);
        this.animatedFrame = BlzCreateFrameByType('SPRITE', 'animatedFrame', this.mainButton, '', 0);

        const sidebar: framehandle = BlzCreateFrame('EscMenuPopupMenuTemplate', this.menu, 0, 0);
        const sidebarBackdrop: framehandle = BlzCreateFrame('EscMenuButtonBackdropTemplate', sidebar, 0, 0);
        const sidebarTitle: framehandle = BlzCreateFrame('StandardTitleTextTemplate', sidebar, 0, 0);

        BlzFrameSetSize(sidebar, 0.08, 0.135);
        BlzFrameSetPoint(sidebar, FRAMEPOINT_CENTER, this.menu, FRAMEPOINT_CENTER, -0.29, 0.065);
        BlzFrameSetAllPoints(sidebarBackdrop, sidebar);
        BlzFrameSetPoint(sidebarTitle, FRAMEPOINT_TOP, sidebar, FRAMEPOINT_TOP, 0.0, -0.01);
        BlzFrameSetText(sidebarTitle, 'Filters');

        const createFilterIcon: any = (index: number, texture: string, filteredLabels: ItemLabel[]) => {
            const filterIcon: framehandle = BlzCreateFrameByType('BACKDROP', 'filterIcon', sidebar, '', 0);
            const filterClickFrame: framehandle = BlzCreateFrameByType('BUTTON', 'filterClickFrame', filterIcon, '', 0);
            const x: number = 0.01 + 0.03125 * (index % 2);
            const y: number = -0.03 + Math.floor(index / 2) * -0.03375;
            BlzFrameSetSize(filterIcon, 0.03375, 0.03375);
            BlzFrameSetPoint(filterIcon, FRAMEPOINT_TOPLEFT, sidebar, FRAMEPOINT_TOPLEFT, x, y);
            BlzFrameSetAllPoints(filterClickFrame, filterIcon);
            BlzFrameSetTexture(filterIcon, texture, 0, true);

            const clickTrigger: Trigger = new Trigger();
            clickTrigger.registerFrameEvent(filterClickFrame, FRAMEEVENT_MOUSE_UP);
            clickTrigger.addAction(() => {
                if (GetTriggerPlayer() === GetLocalPlayer()) {
                    BlzFrameSetEnable(filterClickFrame, false);
                    BlzFrameSetEnable(filterClickFrame, true);

                    this.localPlayerInterface.filterItems = [];
                    for (let i: number = 0; i < items.length; i++) {
                        const hasLabel: boolean = items[i].labels.some((label: ItemLabel) =>
                            filteredLabels.some((filterLabel: ItemLabel) => label === filterLabel),
                        );
                        if (hasLabel) {
                            this.localPlayerInterface.filterItems.push(i);
                        }
                    }

                    this.localPlayerInterface.isItemListFiltered = true;
                    this.localPlayerInterface.selectedItemFrameIndex = undefined;
                    BlzFrameSetVisible(this.selectedItemFrame as framehandle, false);
                    this.scrollEvent();
                    this.updateItemFrames();
                }
            });
        };

        createFilterIcon(0, 'UI\\Widgets\\Console\\Human\\infocard-neutral-attack-melee.blp', [
            ItemLabel.ATTACK_DAMAGE,
            ItemLabel.LIFESTEAL,
            ItemLabel.EXECUTE,
            ItemLabel.PIERCING,
            ItemLabel.SPLASH,
            ItemLabel.VENOM,
        ]);
        createFilterIcon(1, 'UI\\Widgets\\Console\\Human\\infocard-neutral-armor-medium.blp', [
            ItemLabel.BLOCK,
            ItemLabel.RESISTANCE,
            ItemLabel.MAX_HEALTH,
            ItemLabel.HEALTH_REGEN,
            ItemLabel.THORNS,
            ItemLabel.REFLECT,
        ]);
        createFilterIcon(2, 'UI\\Widgets\\Console\\Human\\infocard-neutral-attack-magic.blp', [
            ItemLabel.MAX_MANA,
            ItemLabel.MANA_REGEN,
            ItemLabel.RESTORATION,
            ItemLabel.PERSEVERANCE,
            ItemLabel.CRITICAL_CAST,
            ItemLabel.COOLDOWN_REDUCTION,
        ]);
        createFilterIcon(3, 'UI\\Widgets\\Console\\Human\\infocard-heroattributes-agi.blp', [ItemLabel.AGILITY]);
        createFilterIcon(4, 'UI\\Widgets\\Console\\Human\\infocard-heroattributes-int.blp', [ItemLabel.INTELLIGENCE]);
        createFilterIcon(5, 'UI\\Widgets\\Console\\Human\\infocard-heroattributes-str.blp', [ItemLabel.STRENGTH]);

        for (let i: number = 0; i < bj_MAX_PLAYERS; i++) {
            const escButtonTrigger: Trigger = new Trigger();
            escButtonTrigger.registerPlayerKeyEvent(Player(i), OSKEY_ESCAPE, 0, true);
            escButtonTrigger.addAction(() => {
                if (GetTriggerPlayer() === GetLocalPlayer()) {
                    this.localPlayerInterface.isMainWindowVisible = false;
                    BlzFrameSetVisible(this.menu, this.localPlayerInterface.isMainWindowVisible);
                }
            });

            const tButtonTrigger: Trigger = new Trigger();
            tButtonTrigger.registerPlayerKeyEvent(Player(i), OSKEY_T, 0, true);
            tButtonTrigger.addAction(() => {
                if (GetTriggerPlayer() === GetLocalPlayer()) {
                    if (this.animatedFrameIsVisible) {
                        this.animatedFrameIsVisible = false;
                        BlzFrameSetVisible(this.animatedFrame, false);
                    }

                    this.localPlayerInterface.isMainWindowVisible = true;
                    BlzFrameSetVisible(this.menu, this.localPlayerInterface.isMainWindowVisible);
                }
            });
        }

        BlzFrameSetSize(this.menu, 0.5, 0.38);
        BlzFrameSetSize(menuScrollbar, 0.48, 0.02);
        BlzFrameSetPoint(this.menu, FRAMEPOINT_CENTER, originFrameGameUi, FRAMEPOINT_CENTER, 0.0, 0.06);
        BlzFrameSetPoint(menuTitle, FRAMEPOINT_TOP, this.menu, FRAMEPOINT_TOP, 0.0, -0.02);
        BlzFrameSetPoint(escText, FRAMEPOINT_TOPRIGHT, this.menu, FRAMEPOINT_TOPRIGHT, -0.01, -0.01);
        BlzFrameSetPoint(menuScrollbar, FRAMEPOINT_BOTTOM, this.menu, FRAMEPOINT_BOTTOM, 0.0, 0.01);
        BlzFrameSetAllPoints(menuBackdrop, this.menu);
        BlzFrameSetVisible(this.menu, false);
        BlzFrameSetSize(this.mainButton, 0.04, 0.04);
        BlzFrameSetPoint(this.mainButton, FRAMEPOINT_BOTTOMLEFT, originFrameGameUi, FRAMEPOINT_BOTTOMLEFT, 0.005, 0.15);
        BlzFrameSetAllPoints(mainButtonBackdrop, this.mainButton);
        BlzFrameSetTexture(mainButtonBackdrop, 'ReplaceableTextures\\PassiveButtons\\PASGlyph.dds', 0, true);
        BlzFrameSetTooltip(this.mainButton, mainButtonTooltip);
        BlzFrameSetPoint(mainButtonTooltip, FRAMEPOINT_BOTTOM, this.mainButton, FRAMEPOINT_TOP, 0.0, 0.01);
        BlzFrameSetText(mainButtonTooltip, 'Recipe Menu (|cffffcc00T|r)');
        BlzFrameSetText(menuTitle, 'Recipes');
        BlzFrameSetText(escText, '(|cffffcc00ESC|r)');
        BlzFrameSetSize(mainButtonTooltip, 0.09283672, 0.009375);
        BlzFrameSetVisible(this.mainButton, false);
        BlzFrameSetVisible(this.animatedFrame, true);
        BlzFrameSetSize(this.animatedFrame, 0.02, 0.02);
        BlzFrameSetPoint(this.animatedFrame, FRAMEPOINT_TOPRIGHT, this.mainButton, FRAMEPOINT_TOPRIGHT, 0.0, 0.0);
        BlzFrameSetModel(this.animatedFrame, 'ui\\minimap\\minimap-ping.mdx', 0);

        this.itemRecipeResultIconFrame = BlzCreateFrameByType('BACKDROP', 'itemRecipeResultIcon', this.menu, '', 0);
        this.itemRecipeResultClickFrame = BlzCreateFrameByType('BUTTON', 'itemRecipeResultClickFrame', this.itemRecipeResultIconFrame, '', 0);
        this.itemRecipeResultDescriptionFrame = BlzCreateFrame('StandardValueTextTemplate', this.menu, 0, 0);
        this.itemRecipeResultUpgradeButton = BlzCreateFrame('ScriptDialogButton', this.menu, 0, 0);
        BlzFrameSetSize(this.itemRecipeResultIconFrame, 0.04, 0.04);
        BlzFrameSetPoint(this.itemRecipeResultIconFrame, FRAMEPOINT_TOPLEFT, this.menu, FRAMEPOINT_TOPLEFT, 0.02, -0.06);
        BlzFrameSetAllPoints(this.itemRecipeResultClickFrame, this.itemRecipeResultIconFrame);
        BlzFrameSetTexture(this.itemRecipeResultIconFrame, 'war3mapImported\\BTNNoItem.blp', 0, true);
        BlzFrameSetPoint(this.itemRecipeResultDescriptionFrame, FRAMEPOINT_TOPLEFT, this.menu, FRAMEPOINT_TOPLEFT, 0.07, -0.06);
        BlzFrameSetTextAlignment(this.itemRecipeResultDescriptionFrame, TEXT_JUSTIFY_LEFT, TEXT_JUSTIFY_TOP);
        BlzFrameSetSize(this.itemRecipeResultDescriptionFrame, 0.41, 0.24);
        BlzFrameSetPoint(this.itemRecipeResultUpgradeButton, FRAMEPOINT_TOPLEFT, this.menu, FRAMEPOINT_TOPLEFT, 0.01, -0.17);
        BlzFrameSetSize(this.itemRecipeResultUpgradeButton, 0.06, 0.03);
        BlzFrameSetEnable(this.itemRecipeResultUpgradeButton, false);

        const leftClickTrigger: Trigger = new Trigger();
        leftClickTrigger.registerFrameEvent(this.itemRecipeResultClickFrame, FRAMEEVENT_CONTROL_CLICK);
        leftClickTrigger.addAction(() => {
            if (GetTriggerPlayer() === GetLocalPlayer()) {
                this.localPlayerInterface.isLeftClick = true;
            }
        });

        const clickTrigger: Trigger = new Trigger();
        clickTrigger.registerFrameEvent(this.itemRecipeResultClickFrame, FRAMEEVENT_MOUSE_UP);
        clickTrigger.addAction(() => {
            if (GetTriggerPlayer() === GetLocalPlayer()) {
                BlzFrameSetEnable(this.itemRecipeResultClickFrame, false);
                BlzFrameSetEnable(this.itemRecipeResultClickFrame, true);

                if (this.localPlayerInterface.selectedItemId !== undefined) {
                    const currentItem: Item = this.itemMap[this.localPlayerInterface.selectedItemId];
                    if (!this.localPlayerInterface.isLeftClick) {
                        this.showRecipesUsingItemHandle(currentItem);
                    }
                }
            }
        });

        const syncTrigger: Trigger = new Trigger();
        syncTrigger.addAction(() => {
            this.buyItemRecipe(Number(BlzGetTriggerSyncData()));
        });
        for (let i: number = 0; i < bj_MAX_PLAYERS; i++) {
            syncTrigger.registerPlayerSyncEvent(Player(i), 'buyItem', false);
        }

        for (let i: number = 1; i < 7; i++) {
            this.itemRecipeFrames.push(this.createItemRecipeFrame(i));
        }

        for (let i: number = 1; i < 7; i++) {
            this.itemRecipeGreenBorderFrames.push(this.createItemRecipeGreenBorderFrame(i));
        }

        for (let i: number = 0; i < 11 && i < items.length; i++) {
            this.itemFrames.push(this.createItemFrame(this.menu, items[i].iconPath, i));
            this.itemGoldCost.push(this.createItemGoldCostFrame(this.menu, items[i].recipeCost, i));
        }

        this.createMainButtonTriggers();
        this.createMainFrameTriggers();
        this.createUpgradeButtonTrigger();

        this.localPlayerInterface = {
            heroItems: [],
            heroRecipeItems: [],
            filterItems: [],
            isMainWindowVisible: false,
            isItemListFiltered: false,
            isLeftClick: false,
            currentScrollValue: 0,
            selectedItemFrameIndex: undefined,
            selectedItemId: undefined,
            itemWindowMin: 0,
            itemWindowMax: this.itemFrames.length - 1,
            itemWindowSize: this.itemFrames.length,
        };

        this.selectedItemFrame = BlzCreateFrameByType('SPRITE', 'selectedItemFrame', this.menu, '', 0);
        BlzFrameSetVisible(this.selectedItemFrame, false);
        BlzFrameSetSize(this.selectedItemFrame, 0.04, 0.04);
        BlzFrameSetPoint(this.selectedItemFrame, FRAMEPOINT_BOTTOMLEFT, this.menu, FRAMEPOINT_BOTTOMLEFT, 0.016, 0.03);
        BlzFrameSetModel(this.selectedItemFrame, 'UI\\Feedback\\Autocast\\UI-ModalButtonOn.mdx', 0);

        const scrollTrigger: Trigger = new Trigger();
        scrollTrigger.registerFrameEvent(menuScrollbar, FRAMEEVENT_SLIDER_VALUE_CHANGED);
        scrollTrigger.addAction(() => {
            if (GetTriggerPlayer() === GetLocalPlayer()) {
                this.localPlayerInterface.currentScrollValue = BlzFrameGetValue(menuScrollbar);
                this.scrollEvent();
            }
        });

        this.createHeroDropAndPickupItemEvents();
    }

    public showMainButton(): void {
        BlzFrameSetVisible(this.mainButton, true);
    }

    private updateSelectedItemFrame(): void {
        const shouldSelectedItemFrameBeVisible: boolean = !(
            this.localPlayerInterface.selectedItemFrameIndex === undefined ||
            (this.localPlayerInterface.selectedItemFrameIndex as number) < 0 ||
            (this.localPlayerInterface.selectedItemFrameIndex as number) > this.localPlayerInterface.itemWindowSize - 1
        );

        BlzFrameSetVisible(this.selectedItemFrame as framehandle, shouldSelectedItemFrameBeVisible);
        BlzFrameSetPoint(
            this.selectedItemFrame as framehandle,
            FRAMEPOINT_BOTTOMLEFT,
            this.menu,
            FRAMEPOINT_BOTTOMLEFT,
            0.0175 +
                0.0425 *
                    (this.localPlayerInterface.selectedItemFrameIndex ? (this.localPlayerInterface.selectedItemFrameIndex as number) : 0),
            0.03,
        );
    }

    private scrollEvent(): void {
        const itemArrayLength: number = this.localPlayerInterface.isItemListFiltered
            ? this.localPlayerInterface.filterItems.length + 1
            : this.localPlayerInterface.heroRecipeItems.length + items.length;
        const itemWindowSize: number = Math.min(itemArrayLength, this.itemFrames.length);
        const itemWindowMax: number =
            itemWindowSize + Math.round(this.localPlayerInterface.currentScrollValue * (itemArrayLength - itemWindowSize)) - 1;

        if (itemWindowMax === this.localPlayerInterface.itemWindowMax) {
            return;
        }

        const itemWindowMaxDifference: number = this.localPlayerInterface.itemWindowMax - itemWindowMax;

        this.localPlayerInterface.itemWindowSize = itemWindowSize;
        this.localPlayerInterface.itemWindowMax = itemWindowMax;

        this.localPlayerInterface.itemWindowMin = this.localPlayerInterface.itemWindowMax + 1 - this.localPlayerInterface.itemWindowSize;

        if (this.localPlayerInterface.selectedItemFrameIndex !== undefined) {
            this.localPlayerInterface.selectedItemFrameIndex =
                (this.localPlayerInterface.selectedItemFrameIndex as number) + itemWindowMaxDifference;
        }

        this.updateSelectedItemFrame();
        this.updateItemFrames();
    }

    private getItemFrameTextureString(isOutsideItemArray: boolean, indexedItemWindowMin: number): string {
        if (isOutsideItemArray) {
            return 'war3mapImported\\BTNNoItem.blp';
        }

        if (this.localPlayerInterface.isItemListFiltered) {
            if (indexedItemWindowMin === 0) {
                return 'war3mapImported\\X.blp';
            }

            return items[this.localPlayerInterface.filterItems[indexedItemWindowMin - 1]].iconPath;
        }

        if (indexedItemWindowMin < this.localPlayerInterface.heroRecipeItems.length) {
            return this.localPlayerInterface.heroRecipeItems[indexedItemWindowMin].iconPath;
        }

        return items[indexedItemWindowMin - this.localPlayerInterface.heroRecipeItems.length].iconPath;
    }

    private getItemFrameTextString(isOutsideItemArray: boolean, indexedItemWindowMin: number): string {
        if (isOutsideItemArray) {
            return '';
        }

        if (this.localPlayerInterface.isItemListFiltered) {
            if (indexedItemWindowMin === 0) {
                return '';
            }
            return `|cFFFFCC00${items[this.localPlayerInterface.filterItems[indexedItemWindowMin - 1]].recipeCost}|r`;
        }

        if (indexedItemWindowMin < this.localPlayerInterface.heroRecipeItems.length) {
            return '|cFF808080Held|r';
        }

        return `|cFFFFCC00${items[indexedItemWindowMin - this.localPlayerInterface.heroRecipeItems.length].recipeCost}|r`;
    }

    private updateItemFrames(): void {
        const itemArrayLength: number = this.localPlayerInterface.isItemListFiltered
            ? this.localPlayerInterface.filterItems.length + 1
            : this.localPlayerInterface.heroRecipeItems.length + items.length;

        for (let i: number = 0; i < this.itemFrames.length; i++) {
            const indexedItemWindowMin: number = this.localPlayerInterface.itemWindowMin + i;
            const isOutsideItemArray: boolean = !(indexedItemWindowMin < itemArrayLength);
            const texture: string = this.getItemFrameTextureString(isOutsideItemArray, indexedItemWindowMin);
            const text: string = this.getItemFrameTextString(isOutsideItemArray, indexedItemWindowMin);

            BlzFrameSetTexture(this.itemFrames[i], texture, 0, true);
            BlzFrameSetText(this.itemGoldCost[i], text);
            BlzFrameSetVisible(this.itemFrames[i], !isOutsideItemArray);
        }
    }

    private createItemFrame(parent: framehandle, texture: string, index: number): framehandle {
        const itemIcon: framehandle = BlzCreateFrameByType('BACKDROP', 'itemIcon', parent, '', 0);
        const itemClickFrame: framehandle = BlzCreateFrameByType('BUTTON', 'itemClickFrame', itemIcon, '', 0);
        BlzFrameSetSize(itemIcon, 0.04, 0.04);
        BlzFrameSetPoint(itemIcon, FRAMEPOINT_BOTTOMLEFT, parent, FRAMEPOINT_BOTTOMLEFT, 0.0175 + 0.0425 * index, 0.03);
        BlzFrameSetAllPoints(itemClickFrame, itemIcon);
        BlzFrameSetTexture(itemIcon, texture, 0, true);

        const leftClickTrigger: Trigger = new Trigger();
        leftClickTrigger.registerFrameEvent(itemClickFrame, FRAMEEVENT_CONTROL_CLICK);
        leftClickTrigger.addAction(() => {
            if (GetTriggerPlayer() === GetLocalPlayer()) {
                this.localPlayerInterface.isLeftClick = true;
            }
        });

        const clickTrigger: Trigger = new Trigger();
        clickTrigger.registerFrameEvent(itemClickFrame, FRAMEEVENT_MOUSE_UP);
        clickTrigger.addAction(() => {
            if (GetTriggerPlayer() === GetLocalPlayer()) {
                BlzFrameSetEnable(itemClickFrame, false);
                BlzFrameSetEnable(itemClickFrame, true);
                if (this.localPlayerInterface.isLeftClick) {
                    this.localPlayerInterface.isLeftClick = false;
                    this.selectItemEvent(index);
                } else {
                    this.showRecipesUsingItem(index);
                }
            }
        });

        return itemIcon;
    }

    private findRecipeUses(item: Item): number[] {
        const result: number[] = [];

        for (let i: number = 0; i < items.length; i++) {
            let hasItem: boolean = false;

            for (let j: number = 0; !hasItem && j < items[i].recipe.length; j++) {
                if (items[i].recipe[j].itemId === item.itemId) {
                    hasItem = true;
                }
            }

            if (hasItem) {
                result.push(i);
            }
        }

        return result;
    }

    private showRecipesUsingItemHandle(item: Item): void {
        this.localPlayerInterface.isItemListFiltered = true;
        this.localPlayerInterface.filterItems = this.findRecipeUses(item);
        this.localPlayerInterface.selectedItemFrameIndex = undefined;
        BlzFrameSetVisible(this.selectedItemFrame as framehandle, this.localPlayerInterface.selectedItemFrameIndex !== undefined);
        this.scrollEvent();
        this.updateItemFrames();
    }

    private showRecipesUsingItem(index: number): void {
        if (!(this.localPlayerInterface.isItemListFiltered && index === 0)) {
            const itemIndex: number = index + this.localPlayerInterface.itemWindowMax + 1 - this.localPlayerInterface.itemWindowSize;
            let item: Item;
            if (this.localPlayerInterface.isItemListFiltered) {
                item = items[this.localPlayerInterface.filterItems[itemIndex - 1]];
            } else {
                if (itemIndex < this.localPlayerInterface.heroRecipeItems.length) {
                    item = this.localPlayerInterface.heroRecipeItems[itemIndex];
                } else {
                    item = items[itemIndex - this.localPlayerInterface.heroRecipeItems.length];
                }
            }

            return this.showRecipesUsingItemHandle(item);
        }
    }

    private createItemGoldCostFrame(parent: framehandle, goldCost: number, index: number): framehandle {
        const itemGoldText: framehandle = BlzCreateFrameByType('TEXT', 'itemGoldText', parent, '', 0);
        BlzFrameSetPoint(itemGoldText, FRAMEPOINT_BOTTOM, parent, FRAMEPOINT_BOTTOMLEFT, 0.04 + 0.0425 * index, 0.07);
        BlzFrameSetText(itemGoldText, `|cFFFFCC00${goldCost}|r`);

        return itemGoldText;
    }

    private findSlotItem(itemSlotArray: ItemInSlot[], itemId: number): ItemInSlot | undefined {
        for (let i: number = 0; i < itemSlotArray.length; i++) {
            if (!itemSlotArray[i].includedInRecipe && itemSlotArray[i].itemId === itemId) {
                return itemSlotArray[i];
            }
        }

        return undefined;
    }

    private selectItemEvent(index: number): void {
        if (index === 0 && this.localPlayerInterface.isItemListFiltered) {
            this.localPlayerInterface.isItemListFiltered = false;
            this.localPlayerInterface.selectedItemFrameIndex = undefined;
            this.scrollEvent();
            this.updateItemFrames();
        } else {
            this.localPlayerInterface.selectedItemFrameIndex = index;
            if (this.localPlayerInterface.isItemListFiltered) {
                this.localPlayerInterface.selectedItemId =
                    items[
                        this.localPlayerInterface.filterItems[
                            (this.localPlayerInterface.selectedItemFrameIndex as number) +
                                this.localPlayerInterface.itemWindowMax -
                                this.localPlayerInterface.itemWindowSize
                        ]
                    ].itemId;
            } else {
                const selectedItemFrame: number =
                    (this.localPlayerInterface.selectedItemFrameIndex as number) +
                    this.localPlayerInterface.itemWindowMax +
                    1 -
                    this.localPlayerInterface.itemWindowSize;
                if (selectedItemFrame < this.localPlayerInterface.heroRecipeItems.length) {
                    this.localPlayerInterface.selectedItemId = this.localPlayerInterface.heroRecipeItems[selectedItemFrame].itemId;
                } else {
                    this.localPlayerInterface.selectedItemId =
                        items[selectedItemFrame - this.localPlayerInterface.heroRecipeItems.length].itemId;
                }
            }

            this.selectItem();
        }

        const selectedItemFrameIndex: number | undefined = this.localPlayerInterface.selectedItemFrameIndex;
        BlzFrameSetPoint(
            this.selectedItemFrame as framehandle,
            FRAMEPOINT_BOTTOMLEFT,
            this.menu,
            FRAMEPOINT_BOTTOMLEFT,
            0.0175 + 0.0425 * (selectedItemFrameIndex ? selectedItemFrameIndex : 0),
            0.03,
        );
        BlzFrameSetVisible(this.selectedItemFrame as framehandle, selectedItemFrameIndex !== undefined);
    }

    private selectItemFromHandle(item: Item | undefined): void {
        BlzFrameSetText(this.itemRecipeResultDescriptionFrame, item ? item.description : '');
        if (item instanceof ItemRecipe) {
            let hasAllItems: boolean = true;
            const itemsInSlots: { itemId: number; includedInRecipe: boolean }[] = [];
            for (let i: number = 0; i < this.localPlayerInterface.heroItems.length; i++) {
                itemsInSlots.push({
                    itemId: this.localPlayerInterface.heroItems[i],
                    includedInRecipe: false,
                });
            }

            for (let i: number = 0; i < this.itemRecipeFrames.length; i++) {
                const foundSlotItem: ItemInSlot | undefined =
                    item && item.recipe.length > i ? this.findSlotItem(itemsInSlots, item.recipe[i].itemId) : undefined;
                if (foundSlotItem) {
                    foundSlotItem.includedInRecipe = true;
                } else if (item === undefined) {
                    hasAllItems = false;
                } else if (i < item.recipe.length) {
                    hasAllItems = false;
                }

                const itemRecipeGreenBorderFramesTexture: string = foundSlotItem
                    ? 'war3mapImported\\BTNGreenBorder.blp'
                    : 'war3mapImported\\BTNGreyedItem.blp';
                BlzFrameSetTexture(this.itemRecipeGreenBorderFrames[i], itemRecipeGreenBorderFramesTexture, 0, true);
                BlzFrameSetVisible(this.itemRecipeGreenBorderFrames[i], true);
                const itemRecipeFramesTexture: string =
                    item && item instanceof ItemRecipe && item.recipe.length > i
                        ? item.recipe[i].iconPath
                        : 'war3mapImported\\BTNNoItem.blp';
                BlzFrameSetTexture(this.itemRecipeFrames[i], itemRecipeFramesTexture, 0, true);
            }

            const hasEnoughGold: boolean = GetPlayerState(GetLocalPlayer(), PLAYER_STATE_RESOURCE_GOLD) >= item.recipeCost;
            BlzFrameSetText(this.itemRecipeResultUpgradeButton, item.recipeCost.toString());
            BlzFrameSetEnable(this.itemRecipeResultUpgradeButton, hasAllItems && hasEnoughGold);
            BlzFrameSetTexture(this.itemRecipeResultIconFrame, item.iconPath, 0, true);
        } else {
            for (let i: number = 0; i < this.itemRecipeFrames.length; i++) {
                BlzFrameSetTexture(this.itemRecipeGreenBorderFrames[i], 'war3mapImported\\BTNGreyedItem.blp', 0, true);
                BlzFrameSetVisible(this.itemRecipeGreenBorderFrames[i], true);
                BlzFrameSetTexture(this.itemRecipeFrames[i], 'war3mapImported\\BTNNoItem.blp', 0, true);
            }

            BlzFrameSetText(this.itemRecipeResultUpgradeButton, item ? '-' : '');
            BlzFrameSetEnable(this.itemRecipeResultUpgradeButton, false);
            BlzFrameSetTexture(this.itemRecipeResultIconFrame, item ? item.iconPath : 'war3mapImported\\BTNNoItem.blp', 0, true);
        }
    }

    private selectItem(): void {
        let item: Item | undefined;
        if (this.localPlayerInterface.selectedItemId !== undefined) {
            item = this.itemMap[this.localPlayerInterface.selectedItemId];
        }

        return this.selectItemFromHandle(item);
    }

    private createItemRecipeFrame(index: number): framehandle {
        const itemIcon: framehandle = BlzCreateFrameByType('BACKDROP', 'ItemIcon', this.menu, '', 0);
        const itemClickFrame: framehandle = BlzCreateFrameByType('BUTTON', 'itemClickFrame', itemIcon, '', 0);
        BlzFrameSetSize(itemIcon, 0.02, 0.02);
        const x: number = 0.019 + ((index - 1) % 2) * 0.022;
        const y: number = -0.085 - 0.02 * ((index % 2) + Math.floor(index / 2));
        BlzFrameSetPoint(itemIcon, FRAMEPOINT_TOPLEFT, this.menu, FRAMEPOINT_TOPLEFT, x, y);
        BlzFrameSetAllPoints(itemClickFrame, itemIcon);
        BlzFrameSetTexture(itemIcon, 'war3mapImported\\BTNNoItem.blp', 0, true);

        const leftClickTrigger: Trigger = new Trigger();
        leftClickTrigger.registerFrameEvent(itemClickFrame, FRAMEEVENT_CONTROL_CLICK);
        leftClickTrigger.addAction(() => {
            if (GetTriggerPlayer() === GetLocalPlayer()) {
                this.localPlayerInterface.isLeftClick = true;
            }
        });

        const clickTrigger: Trigger = new Trigger();
        clickTrigger.registerFrameEvent(itemClickFrame, FRAMEEVENT_MOUSE_UP);
        clickTrigger.addAction(() => {
            if (GetTriggerPlayer() === GetLocalPlayer()) {
                BlzFrameSetEnable(itemClickFrame, false);
                BlzFrameSetEnable(itemClickFrame, true);
                if (this.localPlayerInterface.selectedItemId !== undefined) {
                    const currentItem: Item = this.itemMap[this.localPlayerInterface.selectedItemId];
                    if (currentItem instanceof ItemRecipe && currentItem.recipe.length > index - 1) {
                        const clickedItem: Item = currentItem.recipe[index - 1];

                        if (this.localPlayerInterface.isLeftClick) {
                            this.localPlayerInterface.isLeftClick = false;
                            this.localPlayerInterface.selectedItemFrameIndex = undefined;
                            BlzFrameSetVisible(this.selectedItemFrame as framehandle, false);

                            this.localPlayerInterface.selectedItemId = clickedItem.itemId;
                            this.selectItem();
                        } else {
                            this.showRecipesUsingItemHandle(clickedItem);
                        }
                    }
                }
            }
        });

        return itemIcon;
    }

    private createItemRecipeGreenBorderFrame(index: number): framehandle {
        const itemIcon: framehandle = BlzCreateFrameByType('BACKDROP', 'ItemIcon', this.menu, '', 0);
        BlzFrameSetSize(itemIcon, 0.02, 0.02);
        const x: number = 0.019 + ((index - 1) % 2) * 0.022;
        const y: number = -0.085 - 0.02 * ((index % 2) + Math.floor(index / 2));
        BlzFrameSetPoint(itemIcon, FRAMEPOINT_TOPLEFT, this.menu, FRAMEPOINT_TOPLEFT, x, y);
        BlzFrameSetTexture(itemIcon, 'war3mapImported\\BTNGreyedItem.blp', 0, true);

        return itemIcon;
    }

    private createMainButtonTriggers(): void {
        for (let i: number = 0; i < bj_MAX_PLAYERS; i++) {
            if (this.gameGlobals.PlayerSpawnRegion.length > i) {
                const index: number = i;

                const hideMainButtonTrigger: Trigger = new Trigger();
                hideMainButtonTrigger.registerLeaveRectSimple(this.gameGlobals.PlayerSpawnRegion[i]);
                hideMainButtonTrigger.addCondition(() => GetHandleId(GetLeavingUnit()) === GetHandleId(this.gameGlobals.PlayerHero[index]));
                hideMainButtonTrigger.addAction(() => {
                    if (GetOwningPlayer(GetLeavingUnit()) === GetLocalPlayer()) {
                        if (this.animatedFrameIsVisible) {
                            this.animatedFrameIsVisible = false;
                            BlzFrameSetVisible(this.animatedFrame, false);
                        }
                    }
                });
            }
        }
    }

    private createMainFrameTriggers(): void {
        const t: Trigger = new Trigger();
        t.registerFrameEvent(this.mainButton, FRAMEEVENT_CONTROL_CLICK);
        t.addAction(() => {
            if (GetTriggerPlayer() === GetLocalPlayer()) {
                if (this.animatedFrameIsVisible) {
                    this.animatedFrameIsVisible = false;
                    BlzFrameSetVisible(this.animatedFrame, false);
                }

                this.localPlayerInterface.isMainWindowVisible = !this.localPlayerInterface.isMainWindowVisible;
                BlzFrameSetVisible(this.menu, this.localPlayerInterface.isMainWindowVisible);
                this.selectItem();

                BlzFrameSetEnable(this.mainButton, false);
                BlzFrameSetEnable(this.mainButton, true);
            }
        });
    }

    private buyItemRecipe(selectedItemIdForPlayer: number): void {
        const triggerPlayerId: number = GetPlayerId(GetTriggerPlayer());
        const selectedItem: Item = this.itemMap[selectedItemIdForPlayer];
        if (!(selectedItem instanceof ItemRecipe)) {
            return;
        }

        const itemsInSlots: ItemInSlot[] = [];
        for (let i: number = 1; i < 7; i++) {
            itemsInSlots.push({
                itemId: GetItemTypeId(UnitItemInSlotBJ(this.gameGlobals.PlayerHero[triggerPlayerId], i)),
                includedInRecipe: false,
            });
        }

        let hasAllItems: boolean = true;
        for (let i: number = 0; i < selectedItem.recipe.length; i++) {
            const foundSlotItem: ItemInSlot | undefined = this.findSlotItem(itemsInSlots, selectedItem.recipe[i].itemId);

            if (foundSlotItem) {
                foundSlotItem.includedInRecipe = true;
            } else if (i < selectedItem.recipe.length) {
                hasAllItems = false;
            }
        }

        const upgradeGoldCost: number = selectedItem.recipeCost;
        const playerCurrentGold: number = GetPlayerState(GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD);
        if (hasAllItems && playerCurrentGold >= upgradeGoldCost) {
            SetPlayerState(GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD, playerCurrentGold - upgradeGoldCost);

            for (let i: number = 0; i < selectedItem.recipe.length; i++) {
                RemoveItem(GetItemOfTypeFromUnitBJ(this.gameGlobals.PlayerHero[triggerPlayerId], selectedItem.recipe[i].itemId));
            }

            if (UnitAlive(this.gameGlobals.PlayerHero[triggerPlayerId])) {
                UnitAddItemById(this.gameGlobals.PlayerHero[triggerPlayerId], selectedItem.itemId);
            } else {
                CreateItem(
                    selectedItem.itemId,
                    GetRectCenterX(this.gameGlobals.PlayerSpawnRegion[triggerPlayerId]),
                    GetRectCenterY(this.gameGlobals.PlayerSpawnRegion[triggerPlayerId]),
                );
            }
            this.selectItem();
        }
    }

    private createUpgradeButtonTrigger(): void {
        const upgradeButtonTrigger: Trigger = new Trigger();
        upgradeButtonTrigger.registerFrameEvent(this.itemRecipeResultUpgradeButton, FRAMEEVENT_CONTROL_CLICK);
        upgradeButtonTrigger.addAction(() => {
            if (GetTriggerPlayer() === GetLocalPlayer()) {
                if (this.localPlayerInterface.selectedItemId !== undefined) {
                    BlzSendSyncData('buyItem', this.localPlayerInterface.selectedItemId.toString());
                }
            }
        });
    }

    private createHeroDropAndPickupItemEvents(): void {
        const dropItemTrigger: Trigger = new Trigger();
        dropItemTrigger.addAction(() => {
            const itemTypeId: number = GetItemTypeId(GetManipulatedItem());
            this.localPlayerInterface.heroItems.splice(this.localPlayerInterface.heroItems.indexOf(itemTypeId), 1);
            const foundItem: Item | undefined = this.itemMap[itemTypeId];
            if (foundItem !== undefined) {
                this.localPlayerInterface.heroRecipeItems.splice(this.localPlayerInterface.heroRecipeItems.indexOf(foundItem), 1);
                if (this.localPlayerInterface.selectedItemFrameIndex !== undefined && !this.localPlayerInterface.isItemListFiltered) {
                    this.localPlayerInterface.selectedItemFrameIndex--;
                    this.updateSelectedItemFrame();
                }
                this.updateItemFrames();
            }

            this.selectItem();
        });
        dropItemTrigger.addCondition(() => IsUnitType(GetTriggerUnit(), UNIT_TYPE_HERO));
        dropItemTrigger.registerAnyUnitEventBJ(EVENT_PLAYER_UNIT_DROP_ITEM);

        const pickupItemTrigger: Trigger = new Trigger();
        pickupItemTrigger.addAction(() => {
            const itemTypeId: number = GetItemTypeId(GetManipulatedItem());
            this.localPlayerInterface.heroItems.push(itemTypeId);
            const foundItem: Item | undefined = this.itemMap[itemTypeId];
            if (foundItem !== undefined) {
                this.localPlayerInterface.heroRecipeItems.push(foundItem);
                if (this.localPlayerInterface.selectedItemFrameIndex !== undefined && !this.localPlayerInterface.isItemListFiltered) {
                    this.localPlayerInterface.selectedItemFrameIndex++;
                    this.updateSelectedItemFrame();
                }
                this.updateItemFrames();
            }

            this.selectItem();
        });
        pickupItemTrigger.addCondition(() => IsUnitType(GetTriggerUnit(), UNIT_TYPE_HERO));
        pickupItemTrigger.registerAnyUnitEventBJ(EVENT_PLAYER_UNIT_PICKUP_ITEM);
    }
}
