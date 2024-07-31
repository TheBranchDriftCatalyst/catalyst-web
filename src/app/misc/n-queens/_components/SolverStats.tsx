// import { Button } from "@/catalyst-ui/ui";
import Button from "@/catalyst-ui/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/catalyst-ui/ui/card";


export const SolverStats = ({ }) => {
  return (
    <>
      <CardHeader>
        <CardTitle>Stats</CardTitle>
        <CardDescription>Some stats about the board</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae magni optio repellendus est officiis minima, placeat non, deleniti, nisi delectus cupiditate. Sit reiciendis, quisquam est odio explicabo cum ullam non.</p>
      </CardContent>
      <CardFooter>
        <Button>Solve</Button>
        <Button variant="destructive">Reset</Button>
      </CardFooter>
    </>
  );
};

export default SolverStats;
