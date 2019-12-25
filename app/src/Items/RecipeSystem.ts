import { GameGlobals } from '../Game/GameGlobals';
import { Trigger } from '../JassOverrides/Trigger';
// tslint:disable-next-line: import-name
import items from './ItemRecipeController';
import { ItemRecipe } from './ItemRecipe';

interface ItemInSlot {
    itemId: number;
    includedInRecipe: boolean;
}

interface LocalPlayerInterface {
    heroItems: number[];
    filterItems: number[];

    isMainWindowVisible: boolean;
    isMainButtonVisible: boolean;
    isItemListFiltered: boolean;
    isLeftClick: boolean;

    selectedItemFrameIndex: number | undefined;
    selectedItemRecipeIndex: number | undefined;
    currentScrollValue: number;
    itemWindowMin: number;
    itemWindowMax: number;
    itemWindowSize: number;
}

// TODO: Refactor
export class RecipeSystem {
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
    private readonly itemRecipeResultDescriptionFrame: framehandle;
    private selectedItemFrame: framehandle | undefined;

    constructor(gameGlobals: GameGlobals) {
        this.gameGlobals = gameGlobals;

        const originFrameGameUi: framehandle = BlzGetOriginFrame(ORIGIN_FRAME_GAME_UI, 0);
        this.menu = BlzCreateFrame('EscMenuPopupMenuTemplate', originFrameGameUi, 0, 0);
        const menuBackdrop: framehandle = BlzCreateFrame('EscMenuButtonBackdropTemplate', this.menu, 0, 0);
        const menuTitle: framehandle = BlzCreateFrame('StandardTitleTextTemplate', this.menu, 0, 0);
        const menuScrollbar: framehandle = BlzCreateFrame('EscMenuSliderTemplate', this.menu, 0, 0);
        this.mainButton = BlzCreateFrame('ScoreScreenTabButtonTemplate', originFrameGameUi, 0, 0);
        const mainButtonBackdrop: framehandle = BlzCreateFrameByType('BACKDROP', 'mainButtonBackdrop', this.mainButton, '', 0);

        BlzFrameSetSize(this.menu, 0.5, 0.38);
        BlzFrameSetSize(menuScrollbar, 0.48, 0.02);
        BlzFrameSetPoint(this.menu, FRAMEPOINT_CENTER, originFrameGameUi, FRAMEPOINT_CENTER, 0.0, 0.06);
        BlzFrameSetPoint(menuTitle, FRAMEPOINT_TOP, this.menu, FRAMEPOINT_TOP, 0.0, -0.02);
        BlzFrameSetPoint(menuScrollbar, FRAMEPOINT_BOTTOM, this.menu, FRAMEPOINT_BOTTOM, 0.0, 0.01);
        BlzFrameSetAllPoints(menuBackdrop, this.menu);
        BlzFrameSetVisible(this.menu, false);
        BlzFrameSetSize(this.mainButton, 0.04, 0.04);
        BlzFrameSetPoint(this.mainButton, FRAMEPOINT_BOTTOMLEFT, originFrameGameUi, FRAMEPOINT_BOTTOMLEFT, 0.005, 0.15);
        BlzFrameSetAllPoints(mainButtonBackdrop, this.mainButton);
        BlzFrameSetTexture(mainButtonBackdrop, 'ReplaceableTextures\\CommandButtons\\BTNScroll.blp', 0, true);
        BlzFrameSetText(menuTitle, 'Recipes');
        BlzFrameSetVisible(this.mainButton, false);

        this.itemRecipeResultIconFrame = BlzCreateFrameByType('BACKDROP', 'itemRecipeResultIcon', this.menu, '', 0);
        this.itemRecipeResultDescriptionFrame = BlzCreateFrame('StandardValueTextTemplate', this.menu, 0, 0);
        this.itemRecipeResultUpgradeButton = BlzCreateFrame('ScriptDialogButton', this.menu, 0, 0);
        BlzFrameSetSize(this.itemRecipeResultIconFrame, 0.04, 0.04);
        BlzFrameSetPoint(this.itemRecipeResultIconFrame, FRAMEPOINT_TOPLEFT, this.menu, FRAMEPOINT_TOPLEFT, 0.02, -0.06);
        BlzFrameSetTexture(this.itemRecipeResultIconFrame, 'war3mapImported\\BTNNoItem.blp', 0, true);
        BlzFrameSetPoint(this.itemRecipeResultDescriptionFrame, FRAMEPOINT_TOPLEFT, this.menu, FRAMEPOINT_TOPLEFT, 0.07, -0.06);
        BlzFrameSetTextAlignment(this.itemRecipeResultDescriptionFrame, TEXT_JUSTIFY_LEFT, TEXT_JUSTIFY_TOP);
        BlzFrameSetSize(this.itemRecipeResultDescriptionFrame, 0.41, 0.24);
        BlzFrameSetPoint(this.itemRecipeResultUpgradeButton, FRAMEPOINT_TOPLEFT, this.menu, FRAMEPOINT_TOPLEFT, 0.01, -0.17);
        BlzFrameSetSize(this.itemRecipeResultUpgradeButton, 0.06, 0.03);
        BlzFrameSetEnable(this.itemRecipeResultUpgradeButton, false);

        const syncTrigger: Trigger = new Trigger();
        syncTrigger.addAction(() => {
            this.buyItemRecipe(Number(BlzGetTriggerSyncData()));
            // this.selectedItemRecipeIndex[GetPlayerId(GetTriggerPlayer())] = Number(BlzGetTriggerSyncData());
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

        // FIXME: This will crash if items.length ever becomes less than 11
        for (let i: number = 0; i < 11; i++) {
            this.itemFrames.push(this.createItemFrame(this.menu, items[i].iconPath, i));
            this.itemGoldCost.push(this.createItemGoldCostFrame(this.menu, items[i].goldCost, i));
        }

        this.createMainButtonTriggers();
        this.createMainFrameTriggers();
        this.createUpgradeButtonTrigger();

        this.localPlayerInterface = {
            heroItems: [],
            filterItems: [],
            isMainWindowVisible: false,
            isMainButtonVisible: false,
            isItemListFiltered: false,
            isLeftClick: false,
            currentScrollValue: 0,
            selectedItemFrameIndex: undefined,
            selectedItemRecipeIndex: undefined,
            itemWindowMin: 0,
            itemWindowMax: this.itemFrames.length - 1,
            itemWindowSize: this.itemFrames.length,
        }

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

    private scrollEvent(): void {
        const itemArrayLength: number = this.localPlayerInterface.isItemListFiltered
            ? this.localPlayerInterface.filterItems.length + 1
            : items.length;
        const itemWindowSize: number = Math.min(itemArrayLength, this.itemFrames.length);
        const itemWindowMax: number =
            itemWindowSize +
            Math.round(
                this.localPlayerInterface.currentScrollValue *
                (itemArrayLength - itemWindowSize),
            ) -
            1;

        if (itemWindowMax === this.localPlayerInterface.itemWindowMax) {
            return;
        }

        const itemWindowMaxDifference: number =
            this.localPlayerInterface.itemWindowMax - itemWindowMax;

        this.localPlayerInterface.itemWindowSize = itemWindowSize;
        this.localPlayerInterface.itemWindowMax = itemWindowMax;

        this.localPlayerInterface.itemWindowMin =
            this.localPlayerInterface.itemWindowMax + 1 - this.localPlayerInterface.itemWindowSize;

        if (this.localPlayerInterface.selectedItemFrameIndex !== undefined) {
            this.localPlayerInterface.selectedItemFrameIndex =
                (this.localPlayerInterface.selectedItemFrameIndex as number) + itemWindowMaxDifference;
        }

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
            (this.localPlayerInterface.selectedItemFrameIndex
                ? (this.localPlayerInterface.selectedItemFrameIndex as number)
                : 0),
            0.03,
        );

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

        return items[indexedItemWindowMin].iconPath;
    }

    private getItemFrameTextString(isOutsideItemArray: boolean, indexedItemWindowMin: number): string {
        if (isOutsideItemArray) {
            return '';
        }

        if (this.localPlayerInterface.isItemListFiltered) {
            if (indexedItemWindowMin === 0) {
                return '';
            }
            return `|cFFFFCC00${items[this.localPlayerInterface.filterItems[indexedItemWindowMin - 1]].goldCost}|r`;
        }

        return `|cFFFFCC00${items[indexedItemWindowMin].goldCost}|r`;
    }

    private updateItemFrames(): void {
        const itemArrayLength: number = this.localPlayerInterface.isItemListFiltered
            ? this.localPlayerInterface.filterItems.length + 1
            : items.length;

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
        const itemIcon: framehandle = BlzCreateFrameByType('BACKDROP', 'ItemIcon', parent, '', 0);
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

    private findRecipeUses(item: ItemRecipe): number[] {
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

    private showRecipesUsingItem(index: number): void {
        if (!(this.localPlayerInterface.isItemListFiltered && index === 0)) {
            const itemIndex: number =
                index +
                this.localPlayerInterface.itemWindowMax +
                1 -
                this.localPlayerInterface.itemWindowSize;
            const itemRecipe: ItemRecipe = this.localPlayerInterface.isItemListFiltered
                ? items[this.localPlayerInterface.filterItems[itemIndex - 1]]
                : items[itemIndex];
            this.localPlayerInterface.isItemListFiltered = true;
            this.localPlayerInterface.filterItems = this.findRecipeUses(itemRecipe);
            this.localPlayerInterface.selectedItemFrameIndex = undefined;
            BlzFrameSetVisible(
                this.selectedItemFrame as framehandle,
                this.localPlayerInterface.selectedItemFrameIndex !== undefined,
            );
            this.scrollEvent();
            this.updateItemFrames();
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
                this.localPlayerInterface.selectedItemRecipeIndex = this.localPlayerInterface.filterItems[(this.localPlayerInterface.selectedItemFrameIndex as number) +
                    this.localPlayerInterface.itemWindowMax -
                    this.localPlayerInterface.itemWindowSize];
            } else {
                this.localPlayerInterface.selectedItemRecipeIndex = (this.localPlayerInterface.selectedItemFrameIndex as number) +
                    this.localPlayerInterface.itemWindowMax +
                    1 -
                    this.localPlayerInterface.itemWindowSize;
            }
        }

        this.selectItem();

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

    private selectItem(): void {
        let hasAllItems: boolean = true;
        const itemsInSlots: { itemId: number; includedInRecipe: boolean }[] = [];
        const item: ItemRecipe | undefined = this.localPlayerInterface.selectedItemRecipeIndex !== undefined ? items[this.localPlayerInterface.selectedItemRecipeIndex] : undefined;

        BlzFrameSetText(this.itemRecipeResultDescriptionFrame, item ? item.description : '');
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
                item && item.recipe.length > i ? item.recipe[i].iconPath : 'war3mapImported\\BTNNoItem.blp';
            BlzFrameSetTexture(this.itemRecipeFrames[i], itemRecipeFramesTexture, 0, true);
        }

        BlzFrameSetText(this.itemRecipeResultUpgradeButton, item ? item.goldCost.toString() : '');
        BlzFrameSetEnable(this.itemRecipeResultUpgradeButton, hasAllItems);
        BlzFrameSetTexture(this.itemRecipeResultIconFrame, item ? item.iconPath : 'war3mapImported\\BTNNoItem.blp', 0, true);
    }

    private createItemRecipeFrame(index: number): framehandle {
        const itemIcon: framehandle = BlzCreateFrameByType('BACKDROP', 'ItemIcon', this.menu, '', 0);
        BlzFrameSetSize(itemIcon, 0.02, 0.02);
        const x: number = 0.019 + ((index - 1) % 2) * 0.022;
        const y: number = -0.085 - 0.02 * ((index % 2) + Math.floor(index / 2));
        BlzFrameSetPoint(itemIcon, FRAMEPOINT_TOPLEFT, this.menu, FRAMEPOINT_TOPLEFT, x, y);
        BlzFrameSetTexture(itemIcon, 'war3mapImported\\BTNNoItem.blp', 0, true);

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
                const showMainButtonTrigger: Trigger = new Trigger();
                showMainButtonTrigger.registerEnterRectSimple(this.gameGlobals.PlayerSpawnRegion[i]);
                showMainButtonTrigger.addCondition(
                    () => GetHandleId(GetEnteringUnit()) === GetHandleId(this.gameGlobals.PlayerHero[index]),
                );
                showMainButtonTrigger.addAction(() => {
                    if (GetOwningPlayer(GetEnteringUnit()) === GetLocalPlayer()) {
                        this.localPlayerInterface.isMainButtonVisible = true;
                        BlzFrameSetVisible(this.mainButton, this.localPlayerInterface.isMainButtonVisible);
                    }
                });

                const hideMainButtonTrigger: Trigger = new Trigger();
                hideMainButtonTrigger.registerLeaveRectSimple(this.gameGlobals.PlayerSpawnRegion[i]);
                hideMainButtonTrigger.addCondition(() => GetHandleId(GetLeavingUnit()) === GetHandleId(this.gameGlobals.PlayerHero[index]));
                hideMainButtonTrigger.addAction(() => {
                    if (GetOwningPlayer(GetLeavingUnit()) === GetLocalPlayer()) {
                        this.localPlayerInterface.isMainButtonVisible = false;
                        this.localPlayerInterface.isMainWindowVisible = false;
                        BlzFrameSetVisible(this.mainButton, this.localPlayerInterface.isMainButtonVisible);
                        BlzFrameSetVisible(this.menu, this.localPlayerInterface.isMainWindowVisible);
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
                this.localPlayerInterface.isMainWindowVisible = !this.localPlayerInterface.isMainWindowVisible;
                BlzFrameSetVisible(this.menu, this.localPlayerInterface.isMainWindowVisible);
                this.selectItem();

                BlzFrameSetEnable(this.mainButton, false);
                BlzFrameSetEnable(this.mainButton, true);
            }
        });
    }

    private buyItemRecipe(selectedItemForPlayerIndex: number): void {
        const triggerPlayerId: number = GetPlayerId(GetTriggerPlayer());
        const itemsInSlots: ItemInSlot[] = [];
        for (let i: number = 1; i < 7; i++) {
            itemsInSlots.push({
                itemId: GetItemTypeId(UnitItemInSlotBJ(this.gameGlobals.PlayerHero[triggerPlayerId], i)),
                includedInRecipe: false,
            });
        }

        let hasAllItems: boolean = true;
        for (let i: number = 0; i < items[selectedItemForPlayerIndex].recipe.length; i++) {
            const foundSlotItem: ItemInSlot | undefined = this.findSlotItem(
                itemsInSlots,
                items[selectedItemForPlayerIndex].recipe[i].itemId,
            );

            if (foundSlotItem) {
                foundSlotItem.includedInRecipe = true;
            } else if (i < items[selectedItemForPlayerIndex].recipe.length) {
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
                        this.gameGlobals.PlayerHero[triggerPlayerId],
                        items[selectedItemForPlayerIndex].recipe[i].itemId,
                    ),
                );
            }
            UnitAddItemById(this.gameGlobals.PlayerHero[triggerPlayerId], items[selectedItemForPlayerIndex].itemId);
            this.selectItem();
        }
    }

    private createUpgradeButtonTrigger(): void {
        const upgradeButtonTrigger: Trigger = new Trigger();
        upgradeButtonTrigger.registerFrameEvent(this.itemRecipeResultUpgradeButton, FRAMEEVENT_CONTROL_CLICK);
        upgradeButtonTrigger.addAction(() => {
            if (GetTriggerPlayer() === GetLocalPlayer()) {
                if (this.localPlayerInterface.selectedItemRecipeIndex !== undefined) {
                    BlzSendSyncData('buyItem', this.localPlayerInterface.selectedItemRecipeIndex.toString());
                }
            }
        });
    }

    private createHeroDropAndPickupItemEvents(): void {
        const dropItemTrigger: Trigger = new Trigger();
        dropItemTrigger.addAction(() => {
            const triggerPlayerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
            this.localPlayerInterface.heroItems.splice(
                this.localPlayerInterface.heroItems.indexOf(GetItemTypeId(GetManipulatedItem())),
                1,
            );

            this.selectItem();
        });
        dropItemTrigger.addCondition(() => IsUnitType(GetTriggerUnit(), UNIT_TYPE_HERO));
        dropItemTrigger.registerAnyUnitEventBJ(EVENT_PLAYER_UNIT_DROP_ITEM);

        const pickupItemTrigger: Trigger = new Trigger();
        pickupItemTrigger.addAction(() => {
            const triggerPlayerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
            this.localPlayerInterface.heroItems.push(GetItemTypeId(GetManipulatedItem()));

            this.selectItem();
        });
        pickupItemTrigger.addCondition(() => IsUnitType(GetTriggerUnit(), UNIT_TYPE_HERO));
        pickupItemTrigger.registerAnyUnitEventBJ(EVENT_PLAYER_UNIT_PICKUP_ITEM);
    }
}
