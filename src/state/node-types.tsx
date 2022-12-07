export enum NodeTypes {
    Variable = "variable",
    Branch = "branch",
    Hit = "hit",
    CreateGameState = "createGameState",
    LightOn = "lightOn",
    LightSet = "lightSet"
}

export enum NodeCompileType {
    Inline = "inline",
    Sub = "sub"
}

export const EntryNodeTypes = new Set();
EntryNodeTypes.add("hit");