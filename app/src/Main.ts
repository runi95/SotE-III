import { Trigger } from './JassOverrides/Trigger';
import { Log, LogLevel } from './lib/Serilog/Serilog';
import { StringSink } from './lib/Serilog/Sinks/StringSink';
import { Game } from './Game/Game';


ceres.addHook('main::after', () => {
    Log.Init([
        new StringSink(LogLevel.Error, SendMessage),
    ]);


    function Main(this: void): void {
        const game: Game = new Game();
    }

    xpcall(() => {
        const init: Trigger = new Trigger();
        init.registerTimerEvent(0.00, false);
        init.addAction(() => Main());
    },     (err) => {
        Log.Fatal(err);
    });

});

function SendMessage(this: void, msg: any): void {
    DisplayTimedTextToForce(bj_FORCE_ALL_PLAYERS, 10, `${msg}`);
}
