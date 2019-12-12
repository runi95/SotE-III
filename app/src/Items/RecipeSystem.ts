import { GameGlobals } from '../Game/GameGlobals';
import { Trigger } from '../JassOverrides/Trigger';
// tslint:disable-next-line: import-name
import items from './ItemRecipeController';
import { ItemRecipe } from './ItemRecipe';

interface ItemInSlot {
    itemId: number;
    includedInRecipe: boolean;
}

export class RecipeSystem {
    private readonly gameGlobals: GameGlobals;
    private readonly menu: framehandle;
    private mainButton: framehandle;
    private selectedItemFrameIndex: number | undefined;
    private selectedItemIndex: (number | undefined)[] = [];
    private itemRecipeResultDescriptionFrame: framehandle;
    private previousItemWindowMax: number;
    private itemWindowSize: number;
    private selectedItemFrame: framehandle | undefined;
    private itemRecipeFrames: framehandle[] = [];
    private itemRecipeGreenBorderFrames: framehandle[] = [];
    private itemRecipeResultUpgradeButton: framehandle;
    private itemRecipeResultIconFrame: framehandle;

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

        this.createMainButtonTriggers();

        this.itemWindowSize = Math.min(items.length, 11);
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

        for (let i: number = 1; i < 7; i++) {
            this.itemRecipeFrames.push(this.createItemRecipeFrame(i));
        }

        for (let i: number = 1; i < 7; i++) {
            this.itemRecipeGreenBorderFrames.push(this.createItemRecipeGreenBorderFrame(i));
        }

        for (let i: number = 0; i < bj_MAX_PLAYERS; i++) {
            this.selectedItemIndex[i] = undefined;
        }

        this.previousItemWindowMax = this.itemWindowSize - 1;

        this.createMainFrameTriggers();
        this.createUpgradeButtonTrigger();

        const itemFrames: framehandle[] = [];
        for (let i: number = 0; i < this.itemWindowSize && i < items.length; i++) {
            itemFrames.push(this.createItemFrame(this.menu, items[i].iconPath, i));
        }

        const itemGoldCost: framehandle[] = [];
        for (let i: number = 0; i < this.itemWindowSize && i < items.length; i++) {
            itemGoldCost.push(this.createItemGoldCostFrame(this.menu, items[i].goldCost, i));
        }

        this.selectedItemFrame = BlzCreateFrameByType('SPRITE', 'selectedItemFrame', this.menu, '', 0);
        BlzFrameSetVisible(this.selectedItemFrame, false);
        BlzFrameSetSize(this.selectedItemFrame, 0.04, 0.04);
        BlzFrameSetPoint(this.selectedItemFrame, FRAMEPOINT_BOTTOMLEFT, this.menu, FRAMEPOINT_BOTTOMLEFT, 0.016, 0.03);
        BlzFrameSetModel(this.selectedItemFrame, 'UI\\Feedback\\Autocast\\UI-ModalButtonOn.mdx', 0);

        const scrollTrigger: Trigger = new Trigger();
        scrollTrigger.registerFrameEvent(menuScrollbar, FRAMEEVENT_SLIDER_VALUE_CHANGED);
        scrollTrigger.addAction(() => {
            const value: number = BlzFrameGetValue(menuScrollbar);
            const itemWindowMax: number = this.itemWindowSize + Math.round(value * (items.length - this.itemWindowSize)) - 1;
            if (itemWindowMax === this.previousItemWindowMax) {
                return;
            }

            const itemWindowMaxDifference: number = this.previousItemWindowMax - itemWindowMax;
            this.previousItemWindowMax = itemWindowMax;
            const itemWindowMin: number = itemWindowMax + 1 - this.itemWindowSize;
            if (this.selectedItemFrameIndex === undefined) {
                BlzFrameSetVisible(this.selectedItemFrame as framehandle, false);
            } else {
                this.selectedItemFrameIndex += itemWindowMaxDifference;
                if (this.selectedItemFrameIndex < 0 || this.selectedItemFrameIndex > this.itemWindowSize - 1) {
                    BlzFrameSetVisible(this.selectedItemFrame as framehandle, false);
                } else {
                    BlzFrameSetPoint(
                        this.selectedItemFrame as framehandle,
                        FRAMEPOINT_BOTTOMLEFT,
                        this.menu,
                        FRAMEPOINT_BOTTOMLEFT,
                        0.0175 + 0.0425 * this.selectedItemFrameIndex,
                        0.03,
                    );
                    BlzFrameSetVisible(this.selectedItemFrame as framehandle, true);
                }
            }

            for (let i: number = 0; i < itemFrames.length && itemWindowMin + i < items.length; i++) {
                BlzFrameSetTexture(itemFrames[i], items[itemWindowMin + i].iconPath, 0, true);
            }
        });
    }

    private createItemFrame(parent: framehandle, texture: string, index: number): framehandle {
        const itemIcon: framehandle = BlzCreateFrameByType('BACKDROP', 'ItemIcon', parent, '', 0);
        const itemClickFrame: framehandle = BlzCreateFrameByType('BUTTON', 'itemClickFrame', itemIcon, '', 0);
        BlzFrameSetSize(itemIcon, 0.04, 0.04);
        BlzFrameSetPoint(itemIcon, FRAMEPOINT_BOTTOMLEFT, parent, FRAMEPOINT_BOTTOMLEFT, 0.0175 + 0.0425 * index, 0.03);
        BlzFrameSetAllPoints(itemClickFrame, itemIcon);
        BlzFrameSetTexture(itemIcon, texture, 0, true);

        const t: Trigger = new Trigger();
        t.registerFrameEvent(itemClickFrame, FRAMEEVENT_CONTROL_CLICK);
        t.addAction(() => {
            BlzFrameSetEnable(itemClickFrame, false);
            BlzFrameSetEnable(itemClickFrame, true);
            this.selectItemEvent(index, GetPlayerId(GetTriggerPlayer()));
        });

        return itemIcon;
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

    private selectItemEvent(index: number, triggerPlayerId: number): void {
        this.selectedItemFrameIndex = index;
        this.selectedItemIndex[triggerPlayerId] = this.selectedItemFrameIndex + this.previousItemWindowMax + 1 - this.itemWindowSize;
        this.selectItem(this.selectedItemIndex[triggerPlayerId] as number);

        BlzFrameSetPoint(
            this.selectedItemFrame as framehandle,
            FRAMEPOINT_BOTTOMLEFT,
            this.menu,
            FRAMEPOINT_BOTTOMLEFT,
            0.0175 + 0.0425 * this.selectedItemFrameIndex,
            0.03,
        );
        BlzFrameSetVisible(this.selectedItemFrame as framehandle, true);
    }

    private selectItem(index: number): void {
        const item: ItemRecipe = items[index];
        BlzFrameSetText(this.itemRecipeResultDescriptionFrame, item.description);
        let hasAllItems: boolean = true;
        const itemsInSlots: { itemId: number; includedInRecipe: boolean }[] = [];
        const playerId: number = GetPlayerId(GetLocalPlayer());
        for (let i: number = 1; i < 7; i++) {
            itemsInSlots.push({
                itemId: GetItemTypeId(UnitItemInSlotBJ(this.gameGlobals.PlayerHero[playerId], i)),
                includedInRecipe: false,
            });
        }

        for (let i: number = 0; i < this.itemRecipeFrames.length; i++) {
            if (i < item.recipe.length) {
                const foundSlotItem: ItemInSlot | undefined = this.findSlotItem(itemsInSlots, item.recipe[i].itemId);
                if (foundSlotItem !== undefined) {
                    foundSlotItem.includedInRecipe = true;
                    BlzFrameSetTexture(this.itemRecipeGreenBorderFrames[i], 'war3mapImported\\BTNGreenBorder.blp', 0, true);
                } else {
                    hasAllItems = false;
                    BlzFrameSetTexture(this.itemRecipeGreenBorderFrames[i], 'war3mapImported\\BTNGreyedItem.blp', 0, true);
                }

                BlzFrameSetVisible(this.itemRecipeGreenBorderFrames[i], true);
                BlzFrameSetTexture(this.itemRecipeFrames[i], item.recipe[i].iconPath, 0, true);
            } else {
                BlzFrameSetTexture(this.itemRecipeFrames[i], 'war3mapImported\\BTNNoItem.blp', 0, true);
            }
        }

        if (hasAllItems) {
            BlzFrameSetText(this.itemRecipeResultUpgradeButton, item.goldCost.toString());
            BlzFrameSetEnable(this.itemRecipeResultUpgradeButton, true);
        } else {
            BlzFrameSetText(this.itemRecipeResultUpgradeButton, '');
            BlzFrameSetEnable(this.itemRecipeResultUpgradeButton, false);
        }

        BlzFrameSetTexture(this.itemRecipeResultIconFrame, item.iconPath, 0, true);
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
        const showMainButton: boolean[] = [];
        for (let i: number = 0; i < bj_MAX_PLAYERS; i++) {
            showMainButton.push(false);
            if (this.gameGlobals.PlayerSpawnRegion.length > i) {
                const index: number = i;
                const showMainButtonTrigger: Trigger = new Trigger();
                showMainButtonTrigger.registerEnterRectSimple(this.gameGlobals.PlayerSpawnRegion[i]);
                showMainButtonTrigger.addAction(() => {
                    showMainButton[index] = true;
                    BlzFrameSetVisible(this.mainButton, showMainButton[GetPlayerId(GetLocalPlayer())]);
                });

                const hideMainButtonTrigger: Trigger = new Trigger();
                hideMainButtonTrigger.registerLeaveRectSimple(this.gameGlobals.PlayerSpawnRegion[i]);
                hideMainButtonTrigger.addAction(() => {
                    showMainButton[index] = false;
                    BlzFrameSetVisible(this.mainButton, showMainButton[GetPlayerId(GetLocalPlayer())]);
                });
            }
        }
    }

    private createMainFrameTriggers(): void {
        const showMainFrame: boolean[] = [];
        for (let i: number = 0; i < bj_MAX_PLAYERS; i++) {
            showMainFrame.push(false);
            if (GetPlayerController(Player(i)) === MAP_CONTROL_USER && GetPlayerSlotState(Player(i)) === PLAYER_SLOT_STATE_PLAYING) {
                const index: number = i;
                const t: Trigger = new Trigger();
                t.registerFrameEvent(this.mainButton, FRAMEEVENT_CONTROL_CLICK);
                t.addAction(() => {
                    showMainFrame[index] = !showMainFrame[index];
                    BlzFrameSetVisible(this.menu, showMainFrame[GetPlayerId(GetLocalPlayer())]);

                    if (showMainFrame[index]) {
                        if (this.selectedItemIndex[index] !== undefined) {
                            this.selectItem(this.selectedItemIndex[index] as number);
                        }
                    }

                    BlzFrameSetEnable(this.mainButton, false);
                    BlzFrameSetEnable(this.mainButton, true);
                });
            }
        }
    }

    private createUpgradeButtonTrigger(): void {
        const upgradeButtonTrigger: Trigger = new Trigger();
        upgradeButtonTrigger.registerFrameEvent(this.itemRecipeResultUpgradeButton, FRAMEEVENT_CONTROL_CLICK);
        upgradeButtonTrigger.addAction(() => {
            const triggerPlayerId: number = GetPlayerId(GetTriggerPlayer());
            const selectedItemForPlayerIndex: number | undefined = this.selectedItemIndex[triggerPlayerId];
            if (selectedItemForPlayerIndex !== undefined) {
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
                                this.gameGlobals.PlayerHero[triggerPlayerId],
                                items[selectedItemForPlayerIndex].recipe[i].itemId,
                            ),
                        );
                    }
                    UnitAddItemById(this.gameGlobals.PlayerHero[triggerPlayerId], items[selectedItemForPlayerIndex].itemId);
                    this.selectItemEvent(this.selectedItemFrameIndex as number, triggerPlayerId);
                }
            }
        });
    }
}
