import { GameGlobals } from './GameGlobals';
import { Trigger } from '../JassOverrides/Trigger';

export class Hero {
    private readonly selectRect: rect;
    private readonly heroId: number;
    private readonly dummyX: number;
    private readonly dummyY: number;
    private readonly facingAngle: number;
    private isHeroPicked = false;
    private readonly gameGlobals: GameGlobals;
    private readonly trig: Trigger = new Trigger();
    private readonly heroSelectorUnitTypeId: number = FourCC('e001');

    constructor(gameGlobals: GameGlobals, selectRect: rect, heroId: number, dummyX: number, dummyY: number, facingAngle: number, heroReadySoundPath: string) {
        this.selectRect = selectRect;
        this.heroId = heroId;
        this.dummyX = dummyX;
        this.dummyY = dummyY;
        this.facingAngle = facingAngle;
        this.gameGlobals = gameGlobals;

        this.trig.addCondition(() => {
            return !this.isHeroPicked && GetUnitTypeId(GetEnteringUnit()) === this.heroSelectorUnitTypeId;
        });
        const statueUnit: unit = CreateUnit(Player(PLAYER_NEUTRAL_PASSIVE), this.heroId, this.dummyX, this.dummyY, this.facingAngle);
        this.trig.addAction(() => {
            this.isHeroPicked = true;
            RemoveUnit(GetEnteringUnit());
            RemoveUnit(statueUnit);
            const owningPlayer: player = GetOwningPlayer(GetEnteringUnit());
            const playerId: number = GetPlayerId(owningPlayer);
            if (GetLocalPlayer() !== owningPlayer) {
                heroReadySoundPath = '';
            }
            
            PlaySoundBJ(CreateSound(heroReadySoundPath, false, false, false, 0, 0, 'DefaultEAXON'));
            this.gameGlobals.PlayerHeroId[playerId] = this.heroId;
            this.gameGlobals.PlayerLives[playerId] = this.gameGlobals.GameStartingLife;
        });
        this.trig.registerEnterRectSimple((() => this.selectRect)());
    }

    public getIsHeroPicked(): boolean {
        return this.isHeroPicked;
    }
}
