import { NavigationItem, NavigationListItem } from "@/catalyst-ui/components";
import { NavigationMenuLink } from "@/catalyst-ui/ui/navigation-menu";

import Earth from "@/catalyst-web/components/canvas/Earth"

export const MiscNavigationMenuItem = () => {
  return (
    <NavigationItem title="Misc">
      <NavigationMenuLink asChild>
        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
          <li className="row-span-3">
            {/* <NavigationMenuLink asChild> */}
              <a
                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                href="/misc"
              >
                <Earth />
                <img
                  src="https://images.unsplash.com/photo-1572177812156-58036aae439c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="shadcn/ui"
                />
                {/* <LucideAlarmClock className="h-6 w-6" /> */}
                <div className="mb-2 mt-4 text-lg font-medium">shadcn/ui</div>
                <p className="text-sm leading-tight text-muted-foreground">
                  Misc Projects and
                </p>
              </a>
            {/* </NavigationMenuLink> */}
          </li>
          <NavigationListItem href="/misc/n-queens" title="N-Queens Solver">
            N-Queens solver with different strategies
          </NavigationListItem>
          <NavigationListItem href="/docs/installation" title="Installation">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem, odit excepturi minima eaque ad sapiente consequuntur commodi sunt similique beatae? Cupiditate placeat iusto officiis nobis harum ea rem vero nesciunt!
          </NavigationListItem>
          <NavigationListItem href="/docs/primitives/typography" title="Typography">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur fuga vero ad officiis cupiditate dolorem autem amet porro quam nostrum ullam repellat quaerat, incidunt molestias a? Fugiat minima ut animi!
          </NavigationListItem>
        </ul>
      </NavigationMenuLink>
    </NavigationItem>
  );
};

export default MiscNavigationMenuItem;
