
import {motion} from "framer-motion"

const Step = ({step, currentStep}:{step:number, currentStep:number}) => {

  let status =  currentStep === step ? "active" : currentStep < step ? "inactive" : "complete";

  return (
    <motion.div animate={status} className="relative isolate">
      <motion.div

      variants={{
        active: {
          scale: 1,
          transition: {
            delay: 0,
            duration: 0.3
          }
        },
        complete: {
          scale: 1.35,

        }
      }}
      transition={{duration: 0.5, delay:0.25, type: "tween", ease: "circOut"}}
      className="absolute inset-0 bg-blue-200 rounded-full"></motion.div>
      <motion.div
        initial={false}

        variants={{
          inactive: {
            backgroundColor: "var(--white)",
            borderColor: "var(--slate-200)",
            color: "var(--slate-400)",
          },
          active: {
            backgroundColor: "var(--white)",
            borderColor: "var(--blue-500)",
            color: "var(--blue-500)",
          },
          complete: {
            backgroundColor: "var(--blue-500)",
            borderColor: "var(--slate-200)",
            color: "var(--slate-400)",
          },
        }}
        transition={{
          duration: 0.3,
        }}
        className={`flex h-10 w-10 relative items-center justify-center rounded-full border-2 font-semibold`}
      >
        <div className="flex items-center justify-center">
          {status === "complete" ? (
            <CheckIcon className="h-6 w-6 text-white" />
          ) : (
            <span>{step}</span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
export default Step;

function CheckIcon(props:any) {
  return (
    <svg
      {...props}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <motion.path
      initial={{pathLength: 0}}
      animate={{pathLength: 1}}
      transition={{delay: 0.2, type: 'tween' , ease: 'easeOut', duration: 0.3}}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
