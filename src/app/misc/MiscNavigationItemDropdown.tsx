import { NavigationItem } from "@/catalyst-ui/components";
import { NavigationMenuLink } from "@/catalyst-ui/ui/navigation-menu";

export const MiscNavigationMenuItem = () => {
  return (
    <NavigationItem title="Misc">
      <NavigationMenuLink asChild>
        <a
          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
          href="/"
        >
          <img
            src="https://images.unsplash.com/photo-1572177812156-58036aae439c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="shadcn/ui"
          />
          {/* <LucideAlarmClock className="h-6 w-6" /> */}
          <div className="mb-2 mt-4 text-lg font-medium">shadcn/ui</div>
          <p className="text-sm leading-tight text-muted-foreground">
            Beautifully designed components built with Radix UI and Tailwind
            CSS.
          </p>
        </a>
      </NavigationMenuLink>
    </NavigationItem>
  );
};

export default MiscNavigationMenuItem;

