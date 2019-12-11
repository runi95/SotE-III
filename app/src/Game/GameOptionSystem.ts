import { GameGlobals } from './GameGlobals';
import { RandomNumberGenerator } from '../Utility/RandomNumberGenerator';
import { Trigger } from '../JassOverrides/Trigger';
import { Game } from './Game';

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

export class GameOptionSystem {
    private readonly gameGlobals: GameGlobals;
    private readonly randomNumberGenerator: RandomNumberGenerator;

    constructor(gameGlobals: GameGlobals, randomNumberGenerator: RandomNumberGenerator) {
        this.gameGlobals = gameGlobals;
        this.randomNumberGenerator = randomNumberGenerator;

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
        const fakeMenuFogOfWarText: framehandle = BlzCreateFrame(
            'StandardValueTextTemplate',
            fakeMenuFogOfWarCheckbox.getBorderFrame(),
            0,
            0,
        );
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
        const fakeMenuLivesValue: framehandle = BlzCreateFrame(
            'StandardValueTextTemplate',
            fakeMenuFogOfWarCheckbox.getBorderFrame(),
            0,
            0,
        );
        const fakeMenuWaitingForHostText: framehandle = BlzCreateFrame(
            'StandardValueTextTemplate',
            fakeMenuFogOfWarCheckbox.getBorderFrame(),
            0,
            0,
        );

        fakeMenuFogOfWarCheckbox.setFramePoint(FRAMEPOINT_CENTER, menuTitle, FRAMEPOINT_CENTER, -0.12, -0.03);
        BlzFrameSetPoint(fakeMenuFogOfWarText, FRAMEPOINT_LEFT, fakeMenuFogOfWarCheckbox.getBorderFrame(), FRAMEPOINT_RIGHT, 0.01, 0.0);
        fakeMenuAllRandomCheckbox.setFramePoint(
            FRAMEPOINT_CENTER,
            fakeMenuFogOfWarCheckbox.getBorderFrame(),
            FRAMEPOINT_CENTER,
            0.0,
            -0.025,
        );
        BlzFrameSetPoint(fakeMenuAllRandomText, FRAMEPOINT_LEFT, fakeMenuAllRandomCheckbox.getBorderFrame(), FRAMEPOINT_RIGHT, 0.01, 0.0);
        fakeMenuSuddenDeathCheckbox.setFramePoint(
            FRAMEPOINT_CENTER,
            fakeMenuAllRandomCheckbox.getBorderFrame(),
            FRAMEPOINT_CENTER,
            0.0,
            -0.025,
        );
        BlzFrameSetPoint(
            fakeMenuSuddenDeathText,
            FRAMEPOINT_LEFT,
            fakeMenuSuddenDeathCheckbox.getBorderFrame(),
            FRAMEPOINT_RIGHT,
            0.01,
            0.0,
        );
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
        this.createCheckboxTrigger(fogOfWarCheckbox, (state: boolean) => {
            isFogOfWarEnabled = !state;
            fakeMenuFogOfWarCheckbox.setChecked(state);
        });

        let isAllRandomEnabled: boolean = false;
        this.createCheckboxTrigger(allRandomCheckbox, (state: boolean) => {
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
        this.createCheckboxTrigger(suddenDeathCheckbox, (state: boolean) => {
            isSuddenDeathEnabled = !state;
            fakeMenuSuddenDeathCheckbox.setChecked(state);
        });

        let lives: number = 10;
        this.createSliderTrigger(livesSlider, (value: number) => {
            lives = Math.max(Math.ceil(100 * value), 1);
            BlzFrameSetText(livesCurrentValueText, lives.toString());
            BlzFrameSetText(fakeMenuLivesValue, lives.toString());
        });

        const startButtonTrigger: Trigger = new Trigger();
        startButtonTrigger.addAction(() => {
            BlzFrameSetVisible(menu, false);

            this.gameGlobals.GameIsFogOfWarEnabled = isFogOfWarEnabled;
            this.gameGlobals.GameIsAllRandomEnabled = isAllRandomEnabled;
            this.gameGlobals.GameIsTeamsEnabled = isTeamsEnabled;
            this.gameGlobals.GameIsSuddenDeathEnabled = isSuddenDeathEnabled;
            this.gameGlobals.GameStartingLife = lives;

            const game: Game = new Game(this.gameGlobals, this.randomNumberGenerator);
        });
        startButtonTrigger.registerFrameEvent(startButton, FRAMEEVENT_CONTROL_CLICK);

        let showHostMenu: boolean = false;

        if (GetLocalPlayer() === Player(0)) {
            showHostMenu = true;
        }

        BlzFrameSetVisible(fogOfWarCheckbox, showHostMenu);
        BlzFrameSetVisible(fakeMenuFogOfWarCheckbox.getBorderFrame(), !showHostMenu);
    }

    private createCheckboxTrigger(frame: framehandle, event: (state: boolean) => void): void {
        const checkboxCheckedTrigger: Trigger = new Trigger();
        checkboxCheckedTrigger.addAction(() => event(true));
        checkboxCheckedTrigger.registerFrameEvent(frame, FRAMEEVENT_CHECKBOX_CHECKED);
        const checkboxUncheckedTrigger: Trigger = new Trigger();
        checkboxUncheckedTrigger.addAction(() => event(false));
        checkboxUncheckedTrigger.registerFrameEvent(frame, FRAMEEVENT_CHECKBOX_UNCHECKED);
    }

    private createSliderTrigger(frame: framehandle, event: (value: number) => void): void {
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
}
