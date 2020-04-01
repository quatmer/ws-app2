import { type } from 'os';

type FunctionType = (...args: any[]) => any;
type ActionCreatorsMapsObject = { [actionCreator: string]: FunctionType };

export type ActionsUnion<A extends ActionCreatorsMapsObject> = ReturnType<A[keyof A]>;
