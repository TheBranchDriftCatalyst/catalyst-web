import { Button, Menubar, MenubarLabel, MenubarMenu, MenubarTrigger, ResponsiveTypography, useLocalStorageState } from "catalyst-ui";
import { ArrowLeftToLine, ArrowRightIcon } from "lucide-react";

export const TopBar = () => {
  const [barCollapsed, setBarCollapsed] = useLocalStorageState("top-bar:collapsed", false);

  if (barCollapsed) {
    return (
      <Button
        className="opacity-40 hover:opacity-100 text-primary absolute z-50"
        variant="ghost"
        size="icon"
        onClick={() => setBarCollapsed((a: boolean) => !a)}
      >
        <ArrowRightIcon className="text-primary h-5 w-5" />
      </Button>
    );
  }

  return (
    <Menubar className="opacity-50 z-50 w-full">
      <MenubarMenu>
        <MenubarTrigger onClick={() => setBarCollapsed((a) => !a)}>
          <ArrowLeftToLine className="text-primary h-5 w-5" />
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger onClick={() => {}}>Start</MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger onClick={() => {}}>Clear</MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarLabel>
          <ResponsiveTypography variant="h3">Layout</ResponsiveTypography>
        </MenubarLabel>
      </MenubarMenu>
    </Menubar>
  );
};