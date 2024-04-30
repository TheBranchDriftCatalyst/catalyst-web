import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "catalyst-ui";

// Card,
// CardHeader,
// CardFooter,
// CardTitle,
// CardDescription,
// CardContent,


export const SolverStats = ({}) => {

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stats</CardTitle>
        <CardDescription>Some stats about the board</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Some stats about the board</p>
      </CardContent>
    </Card>
  );

}

export default SolverStats;
