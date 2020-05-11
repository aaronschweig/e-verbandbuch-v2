import { Machine, assign, interpret } from "xstate";

const incrementStep = (ctx: any, _event: any) => ({
  ...ctx,
  step: ctx.step + 1
});
const decreaseStep = (ctx: any, _event: any) => ({
  ...ctx,
  step: ctx.step - 1
});
const isLastStep = (ctx: any, event: any) =>
  event.step
    ? event.step === ctx.MAX_STEP_COUNT
    : ctx.step + 1 >= ctx.MAX_STEP_COUNT;
const isFirstStep = (ctx: any, event: any) =>
  event.step ? event.step === ctx.MAX_STEP_COUNT : ctx.step - 1 === 1;
const setStep = (ctx: any, event: any) => ({ ...ctx, step: event.step });

export const stepperMachine = Machine({
  id: "stepper",
  context: {
    step: 1,
    MAX_STEP_COUNT: 3
  },
  initial: "first",
  states: {
    first: {
      on: {
        NEXT: [
          {
            target: "last",
            actions: "incrementStep",
            cond: "isLastStep"
          },
          {
            target: "intermediate",
            actions: "incrementStep"
          }
        ]
      }
    },
    intermediate: {
      on: {
        NEXT: [
          {
            target: "last",
            actions: "incrementStep",
            cond: "isLastStep"
          },
          {
            target: "intermediate",
            actions: "incrementStep"
          }
        ],
        PREV: [
          {
            target: "first",
            actions: "decreaseStep",
            cond: "isFirstStep"
          },
          {
            target: "intermediate",
            actions: "decreaseStep"
          }
        ]
      }
    },
    last: {
      on: {
        PREV: [
          {
            target: "first",
            actions: "decreaseStep",
            cond: "isFirstStep"
          },
          {
            target: "intermediate",
            actions: "decreaseStep"
          }
        ]
      }
    }
  },
  on: {
    JUMP: [
      {
        target: "first",
        cond: "isFirstStep",
        actions: "setStep"
      },
      {
        target: "last",
        cond: "isLastStep",
        actions: "setStep"
      },
      {
        target: "intermediate",
        actions: "setStep"
      }
    ]
  }
});

export const createStepperMachine = () =>
  interpret(
    stepperMachine.withConfig({
      guards: { isLastStep, isFirstStep },
      actions: {
        incrementStep: assign(incrementStep),
        decreaseStep: assign(decreaseStep),
        setStep: assign(setStep)
      }
    })
  );
