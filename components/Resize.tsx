import { ReactNode, useState } from "react";
import {MotionConfig, motion, AnimatePresence} from "framer-motion"
import useMeasure from "react-use-measure";

const Resize = () => {

  const [expanded, setExpanded] = useState<boolean>(false)



  return (
    <MotionConfig transition={{duration: 0.7}}>
      <div className="flex min-h-screen flex-col p-10 text-zinc-100">
        <div className="mx-auto mt-8 h-full w-full max-w-sm border border-zinc-500">
          <h1 className="mb-8 text-center text-3xl font-thin mt-10">Hello</h1>
          <div className="mt-8 flex justify-between px-8">
            <button
              className="border px-2 py-1"
              onClick={() => setExpanded(!expanded)}
            >
              Toggle
            </button>
          </div>


            <ResizablePanel>
              {expanded ? (
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Assumenda soluta rerum veniam perferendis quaerat, corporis
                  quas ut provident architecto et, labore consequuntur repellat
                  autem cum?
                </p>
              ) : (
                <p>Something short</p>
              )}
            </ResizablePanel>

        </div>

        <div className="mx-auto mt-16 max-w-md">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
            maxime vero voluptas sunt, quisquam in doloribus quidem odit velit
            dolor necessitatibus temporibus quia aliquam eius impedit excepturi
            ratione suscipit ipsa voluptatum rerum voluptate. Consequatur, vel.
            Soluta, sequi? Et ut corporis aut voluptatibus, dolores
            exercitationem commodi!
          </p>
        </div>
      </div>
    </MotionConfig>
  );
};
export default Resize;


function ResizablePanel({children}:{children: ReactNode}) {
  let [ref, {height}] = useMeasure()

   return (
     <motion.div animate={{ height }} className="overflow-hidden">
       <AnimatePresence mode="wait">
         <motion.div
           key={JSON.stringify(children, ignoreCircularReferences())}
           exit={{ opacity: 0 }}
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
         >
           <div ref={ref} className="px-8 mt-8 pb-16">
             {children}
           </div>
         </motion.div>
       </AnimatePresence>
     </motion.div>
   );
}

const ignoreCircularReferences = () => {
  const seen = new WeakSet();
  return (key:any, value:any) => {
    if(key.startsWith("_")) return
    if(typeof value === "object" && value !== null) {
      if(seen.has(value)) return;
      seen.add(value)
    }
    return value
  }
}
