import { Trigger } from './JassOverrides/Trigger';
import { Log, LogLevel } from './lib/Serilog/Serilog';
import { StringSink } from './lib/Serilog/Sinks/StringSink';
import { Game } from './Game/Game';
import { GameGlobals } from './Game/GameGlobals';
import { Hero } from './Game/Hero';
import { RandomNumberGenerator } from './Utility/RandomNumberGenerator';

ceres.addHook('main::after', () => {
    Log.Init([
        new StringSink(LogLevel.Error, SendMessage),
    ]);

    xpcall(() => {
        const gameGlobals: GameGlobals = new GameGlobals();
        const randomNumberGenerator: RandomNumberGenerator = new RandomNumberGenerator();

        seedRandomNumberGenerator(randomNumberGenerator);
        spawnAllCreeps(gameGlobals);
        initializeHeroSelection(gameGlobals);
        setPlayerCameras(gameGlobals);
        initializeGameOptionFrames(gameGlobals, randomNumberGenerator);
    },     (err) => {
        Log.Fatal(err);
    });
});

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
    private size: number = 0.02;

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
        this.size = size;
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
    SetCameraPosition(-14400.00, -10700.00);
    const heroSelectionArea: rect = Rect(-15616, -11904, -13184, -9472);
    SetCameraBoundsToRect(heroSelectionArea);
    for (let i: number = 0; i < bj_MAX_PLAYERS; i++) {
        FogModifierStart(CreateFogModifierRect(Player(i), FOG_OF_WAR_VISIBLE, heroSelectionArea, false, false));
        if (gameGlobals.PlayerSpawnRegion[i] !== undefined) {
            FogModifierStart(CreateFogModifierRect(Player(i), FOG_OF_WAR_VISIBLE, gameGlobals.PlayerSpawnRegion[i], true, false));
        }
        SetPlayerStateBJ(Player(i), PLAYER_STATE_RESOURCE_GOLD, 500);
    }
}

function initializeGameOptionFrames(gameGlobals: GameGlobals, randomNumberGenerator: RandomNumberGenerator): void {
    BlzLoadTOCFile('war3mapImported\\Templates.toc');

    // EscMenuSliderTemplate
    // StandardSliderTemplate
    // BattleNetSliderTemplate

    const menu: framehandle = BlzCreateFrame('EscMenuPopupMenuTemplate', BlzGetOriginFrame(ORIGIN_FRAME_GAME_UI, 0), 0, 0);
    const menuBackdrop: framehandle = BlzCreateFrame('EscMenuButtonBackdropTemplate', menu, 0, 0);
    const menuTitle: framehandle = BlzCreateFrame('StandardTitleTextTemplate', menu, 0, 0);
    const fogOfWarCheckbox: framehandle = BlzCreateFrame('QuestCheckBox', menu, 0, 0);
    const fogOfWarText: framehandle = BlzCreateFrame('StandardInfoTextTemplate', fogOfWarCheckbox, 0, 0);
    const teamsText: framehandle = BlzCreateFrame('StandardInfoTextTemplate', fogOfWarCheckbox, 0, 0);
    const threeVersusThreeRadioButton: RadioButton = new RadioButton(fogOfWarCheckbox, true);
    const threeVersusThreeText: framehandle = BlzCreateFrame('StandardInfoTextTemplate', fogOfWarCheckbox, 0, 0);
    const noTeamsRadioButton: RadioButton = new RadioButton(fogOfWarCheckbox, false);
    const noTeamsText: framehandle = BlzCreateFrame('StandardInfoTextTemplate', fogOfWarCheckbox, 0, 0);
    const suddenDeathCheckbox: framehandle = BlzCreateFrame('QuestCheckBox', fogOfWarCheckbox, 0, 0);
    const suddenDeathText: framehandle = BlzCreateFrame('StandardInfoTextTemplate', fogOfWarCheckbox, 0, 0);
    const livesLabel: framehandle = BlzCreateFrame('StandardInfoTextTemplate', fogOfWarCheckbox, 0, 0);
    const livesMinValueText: framehandle = BlzCreateFrame('StandardInfoTextTemplate', fogOfWarCheckbox, 0, 0);
    const livesSlider: framehandle = BlzCreateFrame('EscMenuSliderTemplate', fogOfWarCheckbox, 0, 0);
    const livesMaxValueText: framehandle = BlzCreateFrame('StandardInfoTextTemplate', fogOfWarCheckbox, 0, 0);
    const livesCurrentValueText: framehandle = BlzCreateFrame('StandardInfoTextTemplate', fogOfWarCheckbox, 0, 0);
    const startButton: framehandle = BlzCreateFrame('ScriptDialogButton', fogOfWarCheckbox, 0, 0);

    BlzFrameSetSize(menu, 0.3, 0.3);
    BlzFrameSetSize(menuBackdrop, 0.3, 0.3);
    BlzFrameSetSize(fogOfWarCheckbox, 0.02, 0.02);
    BlzFrameSetSize(suddenDeathCheckbox, 0.02, 0.02);
    BlzFrameSetSize(livesSlider, 0.2, 0.02);
    BlzFrameSetSize(startButton, 0.22, 0.035);

    BlzFrameSetAbsPoint(menu, FRAMEPOINT_CENTER, 0.4, 0.35);

    BlzFrameSetPoint(menuBackdrop, FRAMEPOINT_CENTER, menu, FRAMEPOINT_CENTER, 0.0, 0.0);
    BlzFrameSetPoint(menuTitle, FRAMEPOINT_TOPLEFT, menu, FRAMEPOINT_TOPLEFT, 0.11, -0.02);
    BlzFrameSetPoint(fogOfWarCheckbox, FRAMEPOINT_CENTER, menuTitle, FRAMEPOINT_CENTER, -0.12, -0.03);
    BlzFrameSetPoint(fogOfWarText, FRAMEPOINT_LEFT, fogOfWarCheckbox, FRAMEPOINT_RIGHT, 0.01, 0.0);
    BlzFrameSetPoint(teamsText, FRAMEPOINT_LEFT, fogOfWarCheckbox, FRAMEPOINT_LEFT, 0.0, -0.025);
    threeVersusThreeRadioButton.setFramePoint(FRAMEPOINT_LEFT, teamsText, FRAMEPOINT_RIGHT, 0.01, 0.0);
    BlzFrameSetPoint(threeVersusThreeText, FRAMEPOINT_LEFT,
                     threeVersusThreeRadioButton.getHiddenButtonFrame(), FRAMEPOINT_RIGHT, 0.005, 0.0);
    noTeamsRadioButton.setFramePoint(FRAMEPOINT_LEFT, threeVersusThreeText, FRAMEPOINT_RIGHT, 0.01, 0.0);
    BlzFrameSetPoint(noTeamsText, FRAMEPOINT_LEFT, noTeamsRadioButton.getHiddenButtonFrame(), FRAMEPOINT_RIGHT, 0.005, 0.0);
    BlzFrameSetPoint(suddenDeathCheckbox, FRAMEPOINT_LEFT, teamsText, FRAMEPOINT_LEFT, 0.0, -0.025);
    BlzFrameSetPoint(suddenDeathText, FRAMEPOINT_LEFT, suddenDeathCheckbox, FRAMEPOINT_RIGHT, 0.01, 0.0);
    BlzFrameSetPoint(livesMinValueText, FRAMEPOINT_CENTER, suddenDeathCheckbox, FRAMEPOINT_CENTER, 0.0, -0.04);
    BlzFrameSetPoint(livesSlider, FRAMEPOINT_LEFT, livesMinValueText, FRAMEPOINT_RIGHT, 0.01, 0.0);
    BlzFrameSetPoint(livesMaxValueText, FRAMEPOINT_LEFT, livesSlider, FRAMEPOINT_RIGHT, 0.01, 0.0);
    BlzFrameSetPoint(livesLabel, FRAMEPOINT_CENTER, livesSlider, FRAMEPOINT_CENTER, 0.0, 0.015);
    BlzFrameSetPoint(livesCurrentValueText, FRAMEPOINT_CENTER, livesSlider, FRAMEPOINT_CENTER, 0.0, -0.015);
    BlzFrameSetPoint(startButton, FRAMEPOINT_CENTER, menu, FRAMEPOINT_CENTER, 0.0, -0.11);

    BlzFrameSetValue(livesSlider, 0.10);

    BlzFrameSetText(menuTitle, 'SotE Rules');
    BlzFrameSetText(fogOfWarText, 'Disable Fog of War');
    BlzFrameSetText(teamsText, 'Teams:');
    BlzFrameSetText(threeVersusThreeText, '3 vs 3');
    BlzFrameSetText(noTeamsText, 'All vs All');
    BlzFrameSetText(suddenDeathText, 'Disable Sudden Death');
    BlzFrameSetText(livesLabel, 'Lives');
    BlzFrameSetText(livesMinValueText, '1');
    BlzFrameSetText(livesMaxValueText, '100');
    BlzFrameSetText(livesCurrentValueText, '10');
    BlzFrameSetText(startButton, 'Start Game');

    const fakeMenuFogOfWarCheckbox: FakeCheckbox = new FakeCheckbox(menu);
    const fakeMenuFogOfWarText: framehandle = BlzCreateFrame('StandardValueTextTemplate', fakeMenuFogOfWarCheckbox.getBorderFrame(), 0, 0);
    const fakeMenuTeamsText: framehandle = BlzCreateFrame('StandardValueTextTemplate', fakeMenuFogOfWarCheckbox.getBorderFrame(), 0, 0);
    const fakeMenuSuddenDeathCheckbox: FakeCheckbox = new FakeCheckbox(fakeMenuFogOfWarCheckbox.getBorderFrame());
    const fakeMenuSuddenDeathText: framehandle = BlzCreateFrame('StandardValueTextTemplate',
                                                                fakeMenuFogOfWarCheckbox.getBorderFrame(), 0, 0);
    const fakeMenuLivesText: framehandle = BlzCreateFrame('StandardValueTextTemplate', fakeMenuFogOfWarCheckbox.getBorderFrame(), 0, 0);
    const fakeMenuLivesValue: framehandle = BlzCreateFrame('StandardValueTextTemplate', fakeMenuFogOfWarCheckbox.getBorderFrame(), 0, 0);
    const fakeMenuWaitingForHostText: framehandle = BlzCreateFrame('StandardValueTextTemplate',
                                                                   fakeMenuFogOfWarCheckbox.getBorderFrame(), 0, 0);

    fakeMenuFogOfWarCheckbox.setFramePoint(FRAMEPOINT_CENTER, menuTitle, FRAMEPOINT_CENTER, -0.12, -0.03);
    BlzFrameSetPoint(fakeMenuFogOfWarText, FRAMEPOINT_LEFT, fakeMenuFogOfWarCheckbox.getBorderFrame(), FRAMEPOINT_RIGHT, 0.01, 0.0);
    BlzFrameSetPoint(fakeMenuTeamsText, FRAMEPOINT_LEFT, fakeMenuFogOfWarCheckbox.getBorderFrame(), FRAMEPOINT_LEFT, 0.0, -0.025);
    fakeMenuSuddenDeathCheckbox.setFramePoint(FRAMEPOINT_LEFT, fakeMenuTeamsText,
                                              FRAMEPOINT_LEFT, 0.0, -0.025);
    BlzFrameSetPoint(fakeMenuSuddenDeathText, FRAMEPOINT_LEFT, fakeMenuSuddenDeathCheckbox.getBorderFrame(), FRAMEPOINT_RIGHT, 0.01, 0.0);
    BlzFrameSetPoint(fakeMenuLivesText, FRAMEPOINT_LEFT, fakeMenuSuddenDeathCheckbox.getBorderFrame(), FRAMEPOINT_CENTER, 0.0, -0.025);
    BlzFrameSetPoint(fakeMenuLivesValue, FRAMEPOINT_LEFT, fakeMenuLivesText, FRAMEPOINT_RIGHT, 0.01, 0.0);
    BlzFrameSetPoint(fakeMenuWaitingForHostText, FRAMEPOINT_CENTER, menu, FRAMEPOINT_CENTER, 0.0, -0.11);
    fakeMenuFogOfWarCheckbox.setChecked(false);
    fakeMenuSuddenDeathCheckbox.setChecked(false);

    BlzFrameSetText(fakeMenuFogOfWarText, 'Disable Fog of War');
    BlzFrameSetText(fakeMenuTeamsText, 'Teams: 3 vs 3');
    BlzFrameSetText(fakeMenuSuddenDeathText, 'Disable Sudden Death');
    BlzFrameSetText(fakeMenuLivesText, 'Lives:');
    BlzFrameSetText(fakeMenuLivesValue, '10');
    BlzFrameSetText(fakeMenuWaitingForHostText, 'Waiting for host...');

    let isFogOfWarEnabled: boolean = true;
    createCheckboxTrigger(fogOfWarCheckbox, (state: boolean) => {
        isFogOfWarEnabled = !state;
        fakeMenuFogOfWarCheckbox.setChecked(state);
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
        SetUnitUserData(CreateUnit(Player(PLAYER_NEUTRAL_AGGRESSIVE),
                                   FourCC(gameGlobals.CreepUnitTypeID[i]),
                                   gameGlobals.CreepSpawnPoint[i].x,
                                   gameGlobals.CreepSpawnPoint[i].y,
                                   gameGlobals.CreepSpawnAngle[i]),
                        i);
    }
}

function initializeHeroSelection(gameGlobals: GameGlobals): void {
    for (let i: number = 0; i < gameGlobals.HeroArraySize; i++) {
        gameGlobals.HeroList.push(new Hero(gameGlobals,
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
