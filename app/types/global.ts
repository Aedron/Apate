import * as React from "react";

export type Maybe<T> = T | null | undefined;

export interface WithReactChildren {
  children: React.ReactNode;
}

export type Function<T = any, U = void> = (param: T) => U;

export type PromiseValueType<T> = T extends Promise<infer U> ? U : never;

export enum RequestStatus {
  LOADING = "loading",
  SUCCESS = "success",
  FAILED = "failed"
}
