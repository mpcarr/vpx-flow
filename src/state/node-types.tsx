import { BranchNode } from "../nodes/branch";
import HitNode from "../nodes/events/hit";
import VariableNode from "../nodes/variable";


export enum NodeTypes{
    Variable = "variable",
    Branch = "branch",
    Hit = "hit"
}

export enum NodeCompileType {
    Inline = "inline",
    Sub = "sub"
}

export const EntryNodeTypes = new Set();
EntryNodeTypes.add("hit");