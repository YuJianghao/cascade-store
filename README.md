# cascade-store

A simple store work with Array State and Cascade State

## Installation

```bash
yarn add @winwin/cascade-store
```

## Usage

### Work with common stores(i.e. object store)

Just implement your store according to `IObjStore` interface

### Work with array state

In this step, we implement `IArrayStore` interface.

#### State

`IArrayStore.state` is an array of common state object. The only different is that this is an array which has type: `IState[]`, while common state has type `IState`.

#### Mutations

Mutations should receive an parameter to indicate which state(in state array) you want you mutate. This parameter should be state obj reference or state index. The other params are the same as common mutations.

#### Getters

All getters should return a function taking state obj reference or state index as the only parameter to get the working state. When using getter, user should pass in state obj reference or state index and call the function themselves.

> Note. If you want to get summarized info about state array, DO NOT write getters here. I will explain later.

You can use `getState` helper function when implementing `IArrayStore.mutaions` and `IArrayStore.mutaions`. This function will help you get item from array by index or array item.

### Parse function

This function(`IArrayStore<T>.parse`) tell parent store or outside how to build a state. All state should be build by **this arraystore** or build by **others by calling parse function**.

### Work with cascade store

The whole store look like:

```txt
root-store
  ├─getters
  ├─mutations
  └─state
      ├─part-state-1
      ├─...
      ├─part-state-n
      ├─sub-store-1
      │   ├─getters
      │   ├─mutations
      │   └─state
      │       ├─part-state-11
      │       ├─...
      │       ├─part-state-1n
      │       ├─sub-store-11
      │       │   ├─getters
      │       │   ├─mutations
      │       │   └─state
      │       │       ├─part-state-111
      │       │       ├─...
      │       │       ├─part-state-11n
      │       │       ├─sub-store-111
      │       │       ├─...
      │       │       └─sub-store-11n
      │       ├─sub-store-12
      │       ├─...
      │       └─sub-store-1n
      ├─sub-store-2
      ├─...
      └─sub-store-n
```

Quite simple, yes? See `./example` folder for exapmle.

### Work with cascade array store

If add/remove/reorder array state(i.e. child store's state), please finish these mutation inside parent store's mutation. Cause it's not necessary to know how child store works.

If add a new child store state, use `IArrayStore<T>.parse` instead of build state yourself. Cause how to build state and manage state is part of the child store's job.

If get summarized info about array state, also use parent store's getter. Cause, child store getters are mean to get info that is relative to **ONE** child store state.

## Contribute

Just make PRs. I'm still stucking with how to manage state in web apps.
