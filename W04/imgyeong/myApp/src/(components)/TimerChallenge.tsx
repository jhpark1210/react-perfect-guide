import { TimerProps } from "../lib/types";
import { useState, useRef } from "react";
import ResultModal from "./ResultModal";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";

interface DialogHandle {
   open: () => void;
}

const TimerChallenge = ({ title, targetTime }: TimerProps) => {
   const timer = useRef<NodeJS.Timeout | null>(null);
   const dialog = useRef<DialogHandle | null>(null);
   const [timerStarted, setTimerStarted] = useState<boolean>(false);
   const [timerExpired, setTimerExpired] = useState<boolean>(false);

   function handleStart() {
      timer.current = setTimeout(() => {
         dialog.current?.open();
         setTimerStarted(false);
         setTimerExpired(true);
      }, targetTime * 1000);
      setTimerStarted(true);
   }

   function handleStop() {
      if (timer.current) {
         setTimerStarted(false);
         clearTimeout(timer.current);
         timer.current = null;
      }
   }

   function handleReset() {
      setTimerExpired(false);
   }

   return (
      <>
         <ResultModal ref={dialog} title={title} onReset={handleReset} />
         <Card className="w-[50%]">
            <CardHeader>
               <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardDescription>
               {targetTime} second{targetTime > 1 ? "s" : ""}
            </CardDescription>
            <CardContent>
               <p className="text-sm">
                  {timerStarted && !timerExpired ? "Running..." : "Paused"}
               </p>
               <p className="text-sm">{timerExpired ? "Expired" : ""}</p>
            </CardContent>
            <CardFooter className="flex justify-center items-center">
               <Button onClick={timerStarted ? handleStop : handleStart}>
                  {timerStarted ? "Stop" : "Start"}
               </Button>
            </CardFooter>
         </Card>
      </>
   );
};

export default TimerChallenge;
