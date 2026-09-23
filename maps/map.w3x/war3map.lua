gg_rct_Red_Exit = nil
gg_rct_Blue_Exit = nil
gg_rct_Teal_Exit = nil
gg_rct_Purple_Exit = nil
gg_rct_Yellow_Exit = nil
gg_rct_Orange_Exit = nil
gg_snd_PriestPissed2 = nil
gg_snd_PriestPissed4 = nil
gg_snd_RiflemanPissed7 = nil
gg_snd_RiflemanPissed5 = nil
gg_snd_UtherPissed1 = nil
gg_snd_BigButtonClick = nil
gg_snd_MouseClick1 = nil
function InitGlobals()
end

function InitSounds()
gg_snd_PriestPissed2 = CreateSound("Units\\Human\\Priest\\PriestPissed2.wav", false, true, true, 10, 10, "DefaultEAXON")
SetSoundDuration(gg_snd_PriestPissed2, 3025)
SetSoundChannel(gg_snd_PriestPissed2, 0)
SetSoundVolume(gg_snd_PriestPissed2, -1)
SetSoundPitch(gg_snd_PriestPissed2, 1.0)
SetSoundDistances(gg_snd_PriestPissed2, 0.0, 10000.0)
SetSoundDistanceCutoff(gg_snd_PriestPissed2, 3000.0)
SetSoundConeAngles(gg_snd_PriestPissed2, 0.0, 0.0, 127)
SetSoundConeOrientation(gg_snd_PriestPissed2, 0.0, 0.0, 0.0)
gg_snd_PriestPissed4 = CreateSound("Units\\Human\\Priest\\PriestPissed4.wav", false, true, true, 10, 10, "DefaultEAXON")
SetSoundDuration(gg_snd_PriestPissed4, 2931)
SetSoundChannel(gg_snd_PriestPissed4, 0)
SetSoundVolume(gg_snd_PriestPissed4, -1)
SetSoundPitch(gg_snd_PriestPissed4, 1.0)
SetSoundDistances(gg_snd_PriestPissed4, 0.0, 10000.0)
SetSoundDistanceCutoff(gg_snd_PriestPissed4, 3000.0)
SetSoundConeAngles(gg_snd_PriestPissed4, 0.0, 0.0, 127)
SetSoundConeOrientation(gg_snd_PriestPissed4, 0.0, 0.0, 0.0)
gg_snd_RiflemanPissed7 = CreateSound("Units\\Human\\Rifleman\\RiflemanPissed7.wav", false, true, true, 10, 10, "DefaultEAXON")
SetSoundDuration(gg_snd_RiflemanPissed7, 4609)
SetSoundChannel(gg_snd_RiflemanPissed7, 0)
SetSoundVolume(gg_snd_RiflemanPissed7, -1)
SetSoundPitch(gg_snd_RiflemanPissed7, 1.0)
SetSoundDistances(gg_snd_RiflemanPissed7, 0.0, 10000.0)
SetSoundDistanceCutoff(gg_snd_RiflemanPissed7, 3000.0)
SetSoundConeAngles(gg_snd_RiflemanPissed7, 0.0, 0.0, 127)
SetSoundConeOrientation(gg_snd_RiflemanPissed7, 0.0, 0.0, 0.0)
gg_snd_RiflemanPissed5 = CreateSound("Units\\Human\\Rifleman\\RiflemanPissed5.wav", false, true, true, 10, 10, "DefaultEAXON")
SetSoundDuration(gg_snd_RiflemanPissed5, 4167)
SetSoundChannel(gg_snd_RiflemanPissed5, 0)
SetSoundVolume(gg_snd_RiflemanPissed5, -1)
SetSoundPitch(gg_snd_RiflemanPissed5, 1.0)
SetSoundDistances(gg_snd_RiflemanPissed5, 0.0, 10000.0)
SetSoundDistanceCutoff(gg_snd_RiflemanPissed5, 3000.0)
SetSoundConeAngles(gg_snd_RiflemanPissed5, 0.0, 0.0, 127)
SetSoundConeOrientation(gg_snd_RiflemanPissed5, 0.0, 0.0, 0.0)
gg_snd_UtherPissed1 = CreateSound("Units\\Human\\Uther\\UtherPissed1.wav", false, true, true, 10, 10, "HeroAcksEAX")
SetSoundDuration(gg_snd_UtherPissed1, 1950)
SetSoundChannel(gg_snd_UtherPissed1, 0)
SetSoundVolume(gg_snd_UtherPissed1, -1)
SetSoundPitch(gg_snd_UtherPissed1, 1.0)
SetSoundDistances(gg_snd_UtherPissed1, 0.0, 10000.0)
SetSoundDistanceCutoff(gg_snd_UtherPissed1, 3000.0)
SetSoundConeAngles(gg_snd_UtherPissed1, 0.0, 0.0, 127)
SetSoundConeOrientation(gg_snd_UtherPissed1, 0.0, 0.0, 0.0)
gg_snd_BigButtonClick = CreateSound("Sound\\Interface\\BigButtonClick.wav", false, false, false, 10, 10, "DefaultEAXON")
SetSoundDuration(gg_snd_BigButtonClick, 390)
SetSoundChannel(gg_snd_BigButtonClick, 0)
SetSoundVolume(gg_snd_BigButtonClick, -1)
SetSoundPitch(gg_snd_BigButtonClick, 1.0)
gg_snd_MouseClick1 = CreateSound("Sound\\Interface\\MouseClick1.wav", false, false, false, 10, 10, "DefaultEAXON")
SetSoundDuration(gg_snd_MouseClick1, 239)
SetSoundChannel(gg_snd_MouseClick1, 0)
SetSoundVolume(gg_snd_MouseClick1, -1)
SetSoundPitch(gg_snd_MouseClick1, 1.0)
end

function CreateBuildingsForPlayer0()
local p = Player(0)
local u
local unitID
local t
local life

u = BlzCreateUnitWithSkin(p, FourCC("n00Z"), 9728.0, 10240.0, 270.000, FourCC("n00Z"))
WaygateSetDestination(u, GetRectCenterX(gg_rct_Red_Exit), GetRectCenterY(gg_rct_Red_Exit))
WaygateActivate(u, true)
end

function CreateBuildingsForPlayer1()
local p = Player(1)
local u
local unitID
local t
local life

u = BlzCreateUnitWithSkin(p, FourCC("n00Z"), 9728.0, -256.0, 270.000, FourCC("n00Z"))
WaygateSetDestination(u, GetRectCenterX(gg_rct_Blue_Exit), GetRectCenterY(gg_rct_Blue_Exit))
WaygateActivate(u, true)
end

function CreateBuildingsForPlayer2()
local p = Player(2)
local u
local unitID
local t
local life

u = BlzCreateUnitWithSkin(p, FourCC("n00Z"), 9728.0, -10752.0, 270.000, FourCC("n00Z"))
WaygateSetDestination(u, GetRectCenterX(gg_rct_Teal_Exit), GetRectCenterY(gg_rct_Teal_Exit))
WaygateActivate(u, true)
end

function CreateBuildingsForPlayer3()
local p = Player(3)
local u
local unitID
local t
local life

u = BlzCreateUnitWithSkin(p, FourCC("n00Z"), -3840.0, 10240.0, 270.000, FourCC("n00Z"))
WaygateSetDestination(u, GetRectCenterX(gg_rct_Purple_Exit), GetRectCenterY(gg_rct_Purple_Exit))
WaygateActivate(u, true)
end

function CreateBuildingsForPlayer4()
local p = Player(4)
local u
local unitID
local t
local life

u = BlzCreateUnitWithSkin(p, FourCC("n00Z"), -3840.0, -256.0, 270.000, FourCC("n00Z"))
WaygateSetDestination(u, GetRectCenterX(gg_rct_Yellow_Exit), GetRectCenterY(gg_rct_Yellow_Exit))
WaygateActivate(u, true)
end

function CreateBuildingsForPlayer5()
local p = Player(5)
local u
local unitID
local t
local life

u = BlzCreateUnitWithSkin(p, FourCC("n00Z"), -3840.0, -10752.0, 270.000, FourCC("n00Z"))
WaygateSetDestination(u, GetRectCenterX(gg_rct_Orange_Exit), GetRectCenterY(gg_rct_Orange_Exit))
WaygateActivate(u, true)
end

function CreateNeutralPassiveBuildings()
local p = Player(PLAYER_NEUTRAL_PASSIVE)
local u
local unitID
local t
local life

u = BlzCreateUnitWithSkin(p, FourCC("ncop"), 14272.0, 448.0, 270.000, FourCC("ncop"))
u = BlzCreateUnitWithSkin(p, FourCC("n008"), 2944.0, -512.0, 270.000, FourCC("n008"))
u = BlzCreateUnitWithSkin(p, FourCC("etrp"), 1525.1, -7755.7, 212.417, FourCC("etrp"))
IssueImmediateOrder(u, "unroot")
u = BlzCreateUnitWithSkin(p, FourCC("eaom"), 2560.0, -7424.0, 270.000, FourCC("eaom"))
u = BlzCreateUnitWithSkin(p, FourCC("etoe"), 3264.0, -4352.0, 270.000, FourCC("etoe"))
u = BlzCreateUnitWithSkin(p, FourCC("ncp3"), 14912.0, 10368.0, 270.000, FourCC("ncp3"))
u = BlzCreateUnitWithSkin(p, FourCC("n00V"), 2944.0, 256.0, 270.000, FourCC("n00V"))
u = BlzCreateUnitWithSkin(p, FourCC("ncp3"), -8896.0, -3968.0, 270.000, FourCC("ncp3"))
u = BlzCreateUnitWithSkin(p, FourCC("nmg1"), 13664.0, 11360.0, 270.000, FourCC("nmg1"))
u = BlzCreateUnitWithSkin(p, FourCC("ncop"), -576.0, 14016.0, 270.000, FourCC("ncop"))
u = BlzCreateUnitWithSkin(p, FourCC("ncp2"), 2272.0, -15136.0, 270.000, FourCC("ncp2"))
u = BlzCreateUnitWithSkin(p, FourCC("ncp2"), 7520.0, 14816.0, 270.000, FourCC("ncp2"))
u = BlzCreateUnitWithSkin(p, FourCC("ncp3"), -7936.0, 14016.0, 270.000, FourCC("ncp3"))
u = BlzCreateUnitWithSkin(p, FourCC("n005"), 576.0, -14080.0, 270.000, FourCC("n005"))
u = BlzCreateUnitWithSkin(p, FourCC("ncop"), -8320.0, -13184.0, 270.000, FourCC("ncop"))
u = BlzCreateUnitWithSkin(p, FourCC("ncp3"), 14656.0, -15168.0, 270.000, FourCC("ncp3"))
u = BlzCreateUnitWithSkin(p, FourCC("nmg1"), 15136.0, 11808.0, 270.000, FourCC("nmg1"))
u = BlzCreateUnitWithSkin(p, FourCC("eate"), 3680.0, -4704.0, 270.000, FourCC("eate"))
u = BlzCreateUnitWithSkin(p, FourCC("nmg0"), 15200.0, 9696.0, 270.000, FourCC("nmg0"))
u = BlzCreateUnitWithSkin(p, FourCC("nmg1"), 14048.0, 9504.0, 270.000, FourCC("nmg1"))
u = BlzCreateUnitWithSkin(p, FourCC("nmg1"), 12704.0, 10336.0, 270.000, FourCC("nmg1"))
u = BlzCreateUnitWithSkin(p, FourCC("n00R"), 960.0, -4736.0, 270.000, FourCC("n00R"))
u = BlzCreateUnitWithSkin(p, FourCC("ncop"), 14656.0, 14656.0, 270.000, FourCC("ncop"))
u = BlzCreateUnitWithSkin(p, FourCC("emow"), 2784.0, -4384.0, 270.000, FourCC("emow"))
u = BlzCreateUnitWithSkin(p, FourCC("etrp"), 2912.0, -5344.0, 270.000, FourCC("etrp"))
u = BlzCreateUnitWithSkin(p, FourCC("etrp"), 3616.0, -5344.0, 270.000, FourCC("etrp"))
u = BlzCreateUnitWithSkin(p, FourCC("edos"), 1984.0, -3584.0, 270.000, FourCC("edos"))
u = BlzCreateUnitWithSkin(p, FourCC("emow"), 1312.0, -3616.0, 270.000, FourCC("emow"))
u = BlzCreateUnitWithSkin(p, FourCC("eden"), 6464.0, -4608.0, 270.000, FourCC("eden"))
u = BlzCreateUnitWithSkin(p, FourCC("edob"), 4992.0, -3712.0, 270.000, FourCC("edob"))
u = BlzCreateUnitWithSkin(p, FourCC("emow"), 544.0, -6688.0, 270.000, FourCC("emow"))
u = BlzCreateUnitWithSkin(p, FourCC("emow"), 1184.0, -6432.0, 270.000, FourCC("emow"))
u = BlzCreateUnitWithSkin(p, FourCC("emow"), 1056.0, -7072.0, 270.000, FourCC("emow"))
u = BlzCreateUnitWithSkin(p, FourCC("eaoe"), 896.0, -3840.0, 270.000, FourCC("eaoe"))
u = BlzCreateUnitWithSkin(p, FourCC("eaow"), 2112.0, -6848.0, 270.000, FourCC("eaow"))
u = BlzCreateUnitWithSkin(p, FourCC("etrp"), 5856.0, -3872.0, 270.000, FourCC("etrp"))
u = BlzCreateUnitWithSkin(p, FourCC("emow"), 352.0, -3872.0, 270.000, FourCC("emow"))
u = BlzCreateUnitWithSkin(p, FourCC("etrp"), 224.0, -5344.0, 270.000, FourCC("etrp"))
u = BlzCreateUnitWithSkin(p, FourCC("eaom"), 6281.7, -6113.8, 199.168, FourCC("eaom"))
IssueImmediateOrder(u, "unroot")
u = BlzCreateUnitWithSkin(p, FourCC("eaoe"), 5299.0, -5659.5, 121.399, FourCC("eaoe"))
IssueImmediateOrder(u, "unroot")
u = BlzCreateUnitWithSkin(p, FourCC("ncp2"), 13664.0, -6944.0, 270.000, FourCC("ncp2"))
u = BlzCreateUnitWithSkin(p, FourCC("unpl"), 14528.0, -8448.0, 270.000, FourCC("unpl"))
u = BlzCreateUnitWithSkin(p, FourCC("ugrv"), 12416.0, -8448.0, 270.000, FourCC("ugrv"))
u = BlzCreateUnitWithSkin(p, FourCC("uzg2"), 12384.0, -9120.0, 270.000, FourCC("uzg2"))
u = BlzCreateUnitWithSkin(p, FourCC("uzg2"), 12064.0, -7584.0, 270.000, FourCC("uzg2"))
u = BlzCreateUnitWithSkin(p, FourCC("uzg2"), 12320.0, -6048.0, 270.000, FourCC("uzg2"))
u = BlzCreateUnitWithSkin(p, FourCC("uzg2"), 12576.0, -4896.0, 270.000, FourCC("uzg2"))
u = BlzCreateUnitWithSkin(p, FourCC("uzg2"), 13728.0, -5344.0, 270.000, FourCC("uzg2"))
u = BlzCreateUnitWithSkin(p, FourCC("uzg2"), 14752.0, -4832.0, 270.000, FourCC("uzg2"))
u = BlzCreateUnitWithSkin(p, FourCC("ubon"), 14848.0, -9280.0, 270.000, FourCC("ubon"))
u = BlzCreateUnitWithSkin(p, FourCC("utod"), 12032.0, -8192.0, 270.000, FourCC("utod"))
u = BlzCreateUnitWithSkin(p, FourCC("uzg2"), 13536.0, -8864.0, 270.000, FourCC("uzg2"))
u = BlzCreateUnitWithSkin(p, FourCC("uzg2"), 15008.0, -6112.0, 270.000, FourCC("uzg2"))
end

function CreateNeutralPassive()
local p = Player(PLAYER_NEUTRAL_PASSIVE)
local u
local unitID
local t
local life

u = BlzCreateUnitWithSkin(p, FourCC("n009"), -3906.9, 576.0, 268.856, FourCC("n009"))
u = BlzCreateUnitWithSkin(p, FourCC("emtg"), 739.7, -8252.9, 267.240, FourCC("emtg"))
u = BlzCreateUnitWithSkin(p, FourCC("esen"), 2398.4, -7653.3, 195.170, FourCC("esen"))
u = BlzCreateUnitWithSkin(p, FourCC("n00A"), -4545.2, 11070.6, 269.066, FourCC("n00A"))
u = BlzCreateUnitWithSkin(p, FourCC("n009"), -3906.0, 11067.9, 268.856, FourCC("n009"))
u = BlzCreateUnitWithSkin(p, FourCC("n00A"), -4546.8, -9921.3, 269.066, FourCC("n00A"))
u = BlzCreateUnitWithSkin(p, FourCC("n009"), -3907.9, -9922.1, 268.856, FourCC("n009"))
u = BlzCreateUnitWithSkin(p, FourCC("n00A"), 10045.0, -9933.5, 269.066, FourCC("n00A"))
u = BlzCreateUnitWithSkin(p, FourCC("n00W"), 2050.5, -1401.7, 25.000, FourCC("n00W"))
u = BlzCreateUnitWithSkin(p, FourCC("n00A"), -4545.8, 576.8, 269.066, FourCC("n00A"))
u = BlzCreateUnitWithSkin(p, FourCC("n009"), 10684.0, -9934.3, 268.856, FourCC("n009"))
u = BlzCreateUnitWithSkin(p, FourCC("n00X"), 2646.6, 5452.4, 273.673, FourCC("n00X"))
u = BlzCreateUnitWithSkin(p, FourCC("n00A"), 10042.1, 576.1, 269.066, FourCC("n00A"))
u = BlzCreateUnitWithSkin(p, FourCC("o000"), -2787.3, -14820.7, 196.520, FourCC("o000"))
u = BlzCreateUnitWithSkin(p, FourCC("o000"), -2761.2, -15149.1, 151.248, FourCC("o000"))
u = BlzCreateUnitWithSkin(p, FourCC("o001"), -2092.1, -14687.3, 152.880, FourCC("o001"))
u = BlzCreateUnitWithSkin(p, FourCC("o001"), -1875.6, -15493.2, 356.945, FourCC("o001"))
u = BlzCreateUnitWithSkin(p, FourCC("o001"), -1881.8, -15753.7, 1.622, FourCC("o001"))
u = BlzCreateUnitWithSkin(p, FourCC("o000"), 149.9, -14651.7, 148.190, FourCC("o000"))
u = BlzCreateUnitWithSkin(p, FourCC("o000"), -412.4, -13810.2, 285.680, FourCC("o000"))
u = BlzCreateUnitWithSkin(p, FourCC("n009"), 10681.1, 575.3, 268.856, FourCC("n009"))
u = BlzCreateUnitWithSkin(p, FourCC("n00A"), 10051.6, 11075.9, 269.066, FourCC("n00A"))
u = BlzCreateUnitWithSkin(p, FourCC("n009"), 10690.5, 11075.1, 268.856, FourCC("n009"))
u = BlzCreateUnitWithSkin(p, FourCC("echm"), 2527.3, -3611.1, 330.890, FourCC("echm"))
u = BlzCreateUnitWithSkin(p, FourCC("ehip"), 3172.4, -3052.1, 122.886, FourCC("ehip"))
u = BlzCreateUnitWithSkin(p, FourCC("ehip"), 3966.7, -3329.0, 38.894, FourCC("ehip"))
u = BlzCreateUnitWithSkin(p, FourCC("ebal"), 3392.4, -7059.6, 251.372, FourCC("ebal"))
u = BlzCreateUnitWithSkin(p, FourCC("efon"), 5800.0, -6290.2, 199.217, FourCC("efon"))
u = BlzCreateUnitWithSkin(p, FourCC("efon"), 5553.5, -6452.0, 46.495, FourCC("efon"))
u = BlzCreateUnitWithSkin(p, FourCC("n022"), 9664.9, 9917.4, 0.000, FourCC("n022"))
u = BlzCreateUnitWithSkin(p, FourCC("earc"), 4937.1, -4140.8, 140.330, FourCC("earc"))
u = BlzCreateUnitWithSkin(p, FourCC("now3"), 823.6, -15852.2, 143.510, FourCC("now3"))
u = BlzCreateUnitWithSkin(p, FourCC("efon"), 5313.3, -6341.0, 295.784, FourCC("efon"))
u = BlzCreateUnitWithSkin(p, FourCC("n022"), 9656.9, -578.3, 0.000, FourCC("n022"))
u = BlzCreateUnitWithSkin(p, FourCC("n022"), 9665.2, -11069.3, 0.000, FourCC("n022"))
u = BlzCreateUnitWithSkin(p, FourCC("edcm"), 5084.1, -5734.6, 106.343, FourCC("edcm"))
u = BlzCreateUnitWithSkin(p, FourCC("even"), 1817.8, -3164.9, 153.570, FourCC("even"))
u = BlzCreateUnitWithSkin(p, FourCC("n022"), -3778.2, -11074.4, 180.000, FourCC("n022"))
u = BlzCreateUnitWithSkin(p, FourCC("edry"), 5132.1, -3906.0, 192.417, FourCC("edry"))
u = BlzCreateUnitWithSkin(p, FourCC("n022"), -3776.0, -578.6, 180.000, FourCC("n022"))
u = BlzCreateUnitWithSkin(p, FourCC("n022"), -3777.3, 9918.5, 180.000, FourCC("n022"))
end

function CreatePlayerBuildings()
CreateBuildingsForPlayer0()
CreateBuildingsForPlayer1()
CreateBuildingsForPlayer2()
CreateBuildingsForPlayer3()
CreateBuildingsForPlayer4()
CreateBuildingsForPlayer5()
end

function CreatePlayerUnits()
end

function CreateAllUnits()
CreateNeutralPassiveBuildings()
CreatePlayerBuildings()
CreateNeutralPassive()
CreatePlayerUnits()
end

function CreateRegions()
local we

gg_rct_Red_Exit = Rect(8224.0, 10208.0, 8288.0, 10272.0)
gg_rct_Blue_Exit = Rect(8224.0, -288.0, 8288.0, -224.0)
gg_rct_Teal_Exit = Rect(8224.0, -10784.0, 8288.0, -10720.0)
gg_rct_Purple_Exit = Rect(-2400.0, 10208.0, -2336.0, 10272.0)
gg_rct_Yellow_Exit = Rect(-2400.0, -288.0, -2336.0, -224.0)
gg_rct_Orange_Exit = Rect(-2400.0, -10784.0, -2336.0, -10720.0)
end

function InitCustomPlayerSlots()
SetPlayerStartLocation(Player(0), 0)
ForcePlayerStartLocation(Player(0), 0)
SetPlayerColor(Player(0), ConvertPlayerColor(0))
SetPlayerRacePreference(Player(0), RACE_PREF_HUMAN)
SetPlayerRaceSkin(Player(0), RACE_PREF_USER_SELECTABLE)
SetPlayerRaceSelectable(Player(0), true)
SetPlayerController(Player(0), MAP_CONTROL_USER)
SetPlayerStartLocation(Player(1), 1)
ForcePlayerStartLocation(Player(1), 1)
SetPlayerColor(Player(1), ConvertPlayerColor(1))
SetPlayerRacePreference(Player(1), RACE_PREF_ORC)
SetPlayerRaceSkin(Player(1), RACE_PREF_USER_SELECTABLE)
SetPlayerRaceSelectable(Player(1), true)
SetPlayerController(Player(1), MAP_CONTROL_USER)
SetPlayerStartLocation(Player(2), 2)
ForcePlayerStartLocation(Player(2), 2)
SetPlayerColor(Player(2), ConvertPlayerColor(2))
SetPlayerRacePreference(Player(2), RACE_PREF_UNDEAD)
SetPlayerRaceSkin(Player(2), RACE_PREF_USER_SELECTABLE)
SetPlayerRaceSelectable(Player(2), true)
SetPlayerController(Player(2), MAP_CONTROL_USER)
SetPlayerStartLocation(Player(3), 3)
ForcePlayerStartLocation(Player(3), 3)
SetPlayerColor(Player(3), ConvertPlayerColor(3))
SetPlayerRacePreference(Player(3), RACE_PREF_NIGHTELF)
SetPlayerRaceSkin(Player(3), RACE_PREF_USER_SELECTABLE)
SetPlayerRaceSelectable(Player(3), true)
SetPlayerController(Player(3), MAP_CONTROL_USER)
SetPlayerStartLocation(Player(4), 4)
ForcePlayerStartLocation(Player(4), 4)
SetPlayerColor(Player(4), ConvertPlayerColor(4))
SetPlayerRacePreference(Player(4), RACE_PREF_HUMAN)
SetPlayerRaceSkin(Player(4), RACE_PREF_USER_SELECTABLE)
SetPlayerRaceSelectable(Player(4), true)
SetPlayerController(Player(4), MAP_CONTROL_USER)
SetPlayerStartLocation(Player(5), 5)
ForcePlayerStartLocation(Player(5), 5)
SetPlayerColor(Player(5), ConvertPlayerColor(5))
SetPlayerRacePreference(Player(5), RACE_PREF_ORC)
SetPlayerRaceSkin(Player(5), RACE_PREF_USER_SELECTABLE)
SetPlayerRaceSelectable(Player(5), true)
SetPlayerController(Player(5), MAP_CONTROL_USER)
end

function InitCustomTeams()
SetPlayerTeam(Player(0), 0)
SetPlayerTeam(Player(1), 0)
SetPlayerTeam(Player(2), 0)
SetPlayerTeam(Player(3), 1)
SetPlayerTeam(Player(4), 1)
SetPlayerTeam(Player(5), 1)
end

function InitAllyPriorities()
SetStartLocPrioCount(0, 2)
SetStartLocPrio(0, 0, 1, MAP_LOC_PRIO_HIGH)
SetStartLocPrio(0, 1, 3, MAP_LOC_PRIO_LOW)
SetStartLocPrioCount(1, 3)
SetStartLocPrio(1, 0, 0, MAP_LOC_PRIO_HIGH)
SetStartLocPrio(1, 1, 2, MAP_LOC_PRIO_HIGH)
SetStartLocPrio(1, 2, 4, MAP_LOC_PRIO_LOW)
SetStartLocPrioCount(2, 2)
SetStartLocPrio(2, 0, 1, MAP_LOC_PRIO_HIGH)
SetStartLocPrio(2, 1, 5, MAP_LOC_PRIO_LOW)
SetStartLocPrioCount(3, 2)
SetStartLocPrio(3, 0, 0, MAP_LOC_PRIO_LOW)
SetStartLocPrio(3, 1, 4, MAP_LOC_PRIO_HIGH)
SetStartLocPrioCount(4, 3)
SetStartLocPrio(4, 0, 1, MAP_LOC_PRIO_LOW)
SetStartLocPrio(4, 1, 3, MAP_LOC_PRIO_HIGH)
SetStartLocPrio(4, 2, 5, MAP_LOC_PRIO_HIGH)
SetStartLocPrioCount(5, 2)
SetStartLocPrio(5, 0, 2, MAP_LOC_PRIO_LOW)
SetStartLocPrio(5, 1, 4, MAP_LOC_PRIO_HIGH)
end

function main()
SetCameraBounds(-15616.0 + GetCameraMargin(CAMERA_MARGIN_LEFT), -15872.0 + GetCameraMargin(CAMERA_MARGIN_BOTTOM), 15616.0 - GetCameraMargin(CAMERA_MARGIN_RIGHT), 15360.0 - GetCameraMargin(CAMERA_MARGIN_TOP), -15616.0 + GetCameraMargin(CAMERA_MARGIN_LEFT), 15360.0 - GetCameraMargin(CAMERA_MARGIN_TOP), 15616.0 - GetCameraMargin(CAMERA_MARGIN_RIGHT), -15872.0 + GetCameraMargin(CAMERA_MARGIN_BOTTOM))
SetDayNightModels("Environment\\DNC\\DNCLordaeron\\DNCLordaeronTerrain\\DNCLordaeronTerrain.mdl", "Environment\\DNC\\DNCLordaeron\\DNCLordaeronUnit\\DNCLordaeronUnit.mdl")
SetHDWaterParamsEx(0, 0, 0, false, 20, 0, 100, 10, 0, 50, 100, 100)
NewSoundEnvironment("Default")
SetAmbientDaySound("LordaeronSummerDay")
SetAmbientNightSound("LordaeronSummerNight")
SetMapMusic("Music", true, 0)
InitSounds()
CreateRegions()
CreateAllUnits()
InitBlizzard()
InitGlobals()
end

function config()
SetMapName("TRIGSTR_4324")
SetMapDescription("")
SetPlayers(6)
SetTeams(6)
SetGamePlacement(MAP_PLACEMENT_TEAMS_TOGETHER)
DefineStartLocation(0, 10496.0, 10240.0)
DefineStartLocation(1, 10496.0, -256.0)
DefineStartLocation(2, 10496.0, -10752.0)
DefineStartLocation(3, -4608.0, 10240.0)
DefineStartLocation(4, -4608.0, -256.0)
DefineStartLocation(5, -4608.0, -10752.0)
InitCustomPlayerSlots()
InitCustomTeams()
InitAllyPriorities()
end

