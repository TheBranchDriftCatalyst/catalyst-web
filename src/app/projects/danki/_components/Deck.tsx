"use client";
import { CatalystCard } from "@/catalyst-ui/components/CatalystCard";
import Button from "@/catalyst-ui/ui/button";
import { Label } from "@/catalyst-ui/ui/label";
import { RadioGroup, RadioGroupItem } from "@/catalyst-ui/ui/radio-group";
import ResponsiveTypography from "@/catalyst-ui/ui/typography";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

interface DeckProps {
  deckId?: string;
}

const MCTQuestionCard = () => {
  const question =
    "Any contingent or unknown event, whether past or future, which may damnify (cause injury to) a person having an insurable interest, or create a liability against him, may be insured against except";
  const answers = {
    a: "lottery or its outcome",
    b: "A policy executed by way of gaming or wagering",
    c: "Coverage for the payment of any damages awarded to a person because of Section 1029.8 of the Code of Civil Pro",
    d: "All of the above",
  };
  const correct_answers = ["d"];

  const onSelect = (e: any) => {
    console.log(e);
  };

  return (
    <CatalystCard
      // description={question}
      content={
        <div>
          <ResponsiveTypography size="sm">{question}</ResponsiveTypography>
          <RadioGroup>
            <div className="flex flex-col mt-2 space-y-1">
              {Object.entries(answers).map(([key, answer]) => (
                <div key={key} className="flex-1 items-center space-x-1 ">
                  <RadioGroupItem onClick={onSelect} value={key} id={key} />
                  <Label className="text-xs" htmlFor={key}>{answer}</Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
      }
    />
  );
};

const Deck = ({ deckId }: DeckProps) => {
  const autoPlay = true;

  const handlePreviousClick = () => {
    // Add logic for handling previous button click
    console.log("Previous button clicked");
  };

  const handleNextClick = () => {

  };

  return (
    <div>
      <div className="flex justify-evenly align-bottom">
        <Button size="icon" variant="outline" onClick={handlePreviousClick}>
          <ArrowLeftIcon />
        </Button>
        <div className="max-w-[33%]">
          <MCTQuestionCard />
        </div>

        {/* <MCTQuestionCard /> */}
        <Button size="icon" variant="outline" onClick={handleNextClick}>
          <ArrowRightIcon />
        </Button>
      </div>
    </div>
  );
};

export default Deck;
