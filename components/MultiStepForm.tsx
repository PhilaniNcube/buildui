import { useState } from "react";
import Step from "./Step";

const MultiStepForm = () => {

let [step, setStep] = useState(1)

  return (
    <div className="flex min-h-screen items-center bg-gradient-to-br from-slate-700">
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white">
        <div className="flex justify-between rounded p-8">
          <Step step={1} currentStep={step} />
          <Step step={2} currentStep={step} />
          <Step step={3} currentStep={step} />
          <Step step={4} currentStep={step} />
        </div>
        <div className="px-8 pb-8">
          <div>
            <div className="mt-2 h-6 w-40 rounded bg-slate-100" />
            <div className="mt-4 space-y-2">
              <div className="h-4 w-5/6 rounded bg-slate-100"></div>
              <div className="h-4 rounded bg-slate-100"></div>
              <div className="h-4 w-4/6 rounded bg-slate-100"></div>
            </div>
            <div className="mt-10 flex justify-between">
              <button
                onClick={() => setStep(step < 2 ? step : step - 1)}
                className="rounded px-2 py-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                Back
              </button>
              <button
                className={`${
                  step > 4 ? "pointer-events-none opacity-50" : ""
                } rounded-full px-4 font-medium py-1.5 text-white text-center bg-blue-600 hover:bg-blue-500 cursor-pointer`}
                onClick={() => setStep(step > 4 ? step : step + 1)}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MultiStepForm;
