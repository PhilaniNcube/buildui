import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  parse,
  startOfWeek,
  subMonths,
  startOfMonth,
} from "date-fns";
import {AnimatePresence, motion, MotionConfig} from "framer-motion";
import { useState } from "react";
import useMeasure from "react-use-measure";


    let variants = {
      enter: (direction) => {
        return { x: `${100 * direction}%`, opacity: 0 };
      },
      middle: { x: "0%", opacity: 1 },
      exit: (direction) => {
        return { x: `${-100 * direction}%`, opacity: 0 };
      },
    };


        const removeImmediately = {
          exit: {
            visibility: "hidden",
          },
        };



const Calendar = () => {



  let [monthString, setMonthString] = useState(format(new Date(), "yyyy-MM"))
  let [direction, setDirection] = useState(1)
  let [isAnimating, setIsAnimating] = useState(false)

  let month = parse(monthString, "yyyy-MM", new Date())

  function nextMonth() {

    if(isAnimating) return;
    let next = addMonths(month, 1)

    setMonthString(format(next,"yyyy-MM"))
    setDirection(1)
    setIsAnimating(true)
  }

  function previousMonth() {
    if (isAnimating) return;
    let previous = subMonths(month, 1)

    setMonthString(format(previous,"yyyy-MM"))
    setDirection(-1)
    setIsAnimating(true);
  }

  let days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(month)),
    end: endOfWeek(endOfMonth(month)),
  });

  return (
    <MotionConfig transition={{ duration: 0.6 }}>
      <div className="flex min-h-screen items-start bg-stone-800 pt-16 text-stone-900 overflow-hidden">
        <div className="mx-auto w-full max-w-md rounded-2xl bg-white relative overflow-hidden">
          <div className="py-8">
            <div className="flex flex-col justify-center rounded text-center">
              <ResizablePanel>
                <AnimatePresence
                  mode="popLayout"
                  initial={false}
                  custom={direction}
                  onExitComplete={() => setIsAnimating(false)}
                >
                  <motion.div
                    initial="enter"
                    animate="middle"
                    exit="exit"
                    key={monthString}
                  >
                    <header className="relative flex justify-between px-8">
                      <motion.button
                        variants={{
                          exit: {
                            visibility: "hidden",
                          },
                        }}
                        className="z-10 rounded-full p-1.5 hover:bg-stone-100"
                        onClick={previousMonth}
                      >
                        <ChevronLeftIcon className="h-4 w-4" />
                      </motion.button>

                      <motion.p
                        variants={variants}
                        custom={direction}
                        className="absolute inset-0 flex items-center justify-center font-medium"
                      >
                        {format(month, "MMMM yyyy")}
                      </motion.p>

                      <motion.button
                        variants={{
                          exit: {
                            visibility: "hidden",
                          },
                        }}
                        className="z-10 rounded-full p-1.5 hover:bg-stone-100"
                        onClick={nextMonth}
                      >
                        <ChevronRightIcon className="h-4 w-4" />
                      </motion.button>
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage:
                            "linear-gradient(to right, white 10%, transparent 30%, transparent 70%, white 90%)",
                        }}
                      ></div>
                    </header>

                    <motion.div
                      variants={{
                        exit: {
                          visibility: "hidden",
                        },
                      }}
                      className="grid grid-cols-7 gap-y-6 px-8 mt-3 font-medium"
                    >
                      <span className="font-medium text-stone-500">Su</span>
                      <span className="font-medium text-stone-500">Mo</span>
                      <span className="font-medium text-stone-500">Tu</span>
                      <span className="font-medium text-stone-500">We</span>
                      <span className="font-medium text-stone-500">Th</span>
                      <span className="font-medium text-stone-500">Fr</span>
                      <span className="font-medium text-stone-500">Sa</span>
                    </motion.div>

                    <motion.div
                      variants={variants}
                      custom={direction}
                      className="grid grid-cols-7 gap-y-6 px-8 mt-3 font-medium"
                    >
                      {days.map((day) => (
                        <span
                          className={`${
                            isSameMonth(day, month) ? "" : "text-stone-400"
                          } font-semibold`}
                          key={format(day, "yyy-MM-dd")}
                        >
                          {format(day, "d")}
                        </span>
                      ))}
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </ResizablePanel>
            </div>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
};
export default Calendar;


const ResizablePanel = ({ children }) => {
  let [ref, bounds] = useMeasure();

  return (
    <motion.div animate={{ height: bounds.height > 0 ? bounds.height : null }}>
      <div ref={ref}>{children}</div>
    </motion.div>
  );
};
