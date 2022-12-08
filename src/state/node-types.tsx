export enum NodeTypes {
    Variable = "variable",
    Branch = "branch",
    Hit = "hit",
    LightOn = "lightOn",
    LightSet = "lightSet",
    Timer = "timer",
    GetGameState = "getGameState",
    SetGameState = "setGameState",
    GetPlayerState = "getPlayerState",
    SetPlayerState = "setPlayerState",
    Formula = "formula"
}

export enum NodeCompileType {
    Inline = "inline",
    Sub = "sub"
}

export const EntryNodeTypes = new Set();
EntryNodeTypes.add("hit");
EntryNodeTypes.add("timer");