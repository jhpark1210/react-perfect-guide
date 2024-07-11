import { MouseEvent, useRef, useState } from "react";
import { z } from "zod";
import TimerChallenge from "./(components)/TimerChallenge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./components/ui/button";
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "./components/ui/form";
import { Input } from "./components/ui/input";
import { Card, CardContent } from "./components/ui/card";
import { Task } from "./lib/types";

function App() {
   const username = useRef<HTMLInputElement>(null);
   const [enteredName, setEnteredName] = useState<string>("");
   const [data, setData] = useState<Task[]>([]);

   const formSchema = z.object({
      title: z.string().min(2).max(50),
      targetTime: z.number().min(1),
   });

   function handleClick(e: MouseEvent<HTMLButtonElement>) {
      e.preventDefault();
      if (username.current) {
         setEnteredName(username.current.value);
         username.current.value = "";
      }
   }

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         title: "",
         targetTime: 1,
      },
   });

   function onSubmit(values: z.infer<typeof formSchema>) {
      const newData = {
         title: values.title,
         targetTime: values.targetTime,
      };

      setData([...data, newData]);
   }

   return (
      <main>
         <h2 className="font-bold text-xl p-3">
            Welcome, {enteredName ? enteredName : "unknown user"}!
         </h2>
         <div className="flex flex-row space-x-3 p-4">
            <Input ref={username} type="text" />
            <Button onClick={handleClick}>Confirm</Button>
         </div>

         <Card className="pt-4">
            <CardContent>
               <Form {...form}>
                  <form
                     onSubmit={form.handleSubmit(onSubmit)}
                     className="space-x-3 flex flex-row items-center justify-center"
                  >
                     <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel className="font-bold">Title</FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder="ex. Microwave Time"
                                    {...field}
                                 />
                              </FormControl>
                              <FormDescription>
                                 What is this for?
                              </FormDescription>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="targetTime"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel className="font-bold">
                                 Target Seconds
                              </FormLabel>
                              <FormControl>
                                 <Input
                                    type="number"
                                    {...field}
                                    onChange={(event) =>
                                       field.onChange(+event.target.value)
                                    }
                                 />
                              </FormControl>
                              <FormDescription>Set your timer</FormDescription>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <Button type="submit">Add</Button>
                  </form>
               </Form>
            </CardContent>
         </Card>

         <div className="flex flex-row gap-3 justify-center items-center p-3">
            {data.map((d) => {
               return (
                  <TimerChallenge title={d.title} targetTime={d.targetTime} />
               );
            })}
         </div>
      </main>
   );
}

export default App;
