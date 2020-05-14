import { Machine } from "xstate";

const isSameKey = (ctx: any, event: any) => {
  return ctx.key === event.key;
};

export const ascendigSorter = <T>(key: keyof T) => (e1: T, e2: T) => {
  if (e1[key] < e2[key]) {
    return -1;
  }
  if (e1[key] > e2[key]) {
    return 1;
  }

  return 0;
};

export const descendingSorter = <T>(key: keyof T) => (e1: T, e2: T) => {
  if (e1[key] > e2[key]) {
    return -1;
  }
  if (e1[key] < e2[key]) {
    return 1;
  }

  return 0;
};

export const sortMachine = Machine({
  id: "sorter",
  context: {
    key: ""
  },
  initial: "CLEAN",
  states: {
    ASC: {
      on: {
        SORT: {
          target: "DESC",
          actions: "descSort",
          cond: isSameKey
        }
      }
    },
    DESC: {
      on: {
        SORT: {
          target: "CLEAN",
          actions: "cleanSort",
          cond: isSameKey
        }
      }
    },
    CLEAN: {
      on: {
        SORT: {
          target: "ASC",
          actions: "ascSort",
          cond: isSameKey
        }
      }
    }
  },
  on: {
    SORT: {
      target: "ASC",
      actions: "ascSort",
      cond: (ctx: any, e: any) => ctx.key !== e.key
    }
  }
});
