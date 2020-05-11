import { Machine } from "xstate";

const formMachine = Machine({
  id: "form",
  context: {},
  states: {
    clean: {},
    dirty: {},
    valid: {},
    invalid: {}
  }
});
