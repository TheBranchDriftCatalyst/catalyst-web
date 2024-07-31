"use client";
import { CatalystHeader } from "@/catalyst-ui/components/CatalystHeader";
// import Navbar from "@/components/Navbar";
// import "catalyst-ui/dist/assets/contexts/Theme/styles/catalyst.css";
import "@/catalyst-ui/contexts/Theme/styles/catalyst.css";
import "@/catalyst-ui/global.css";
// import "catalyst-ui/dist/assets/global.css";
// import { NavigationItem, _sampleLinkObjects } from "catalyst-ui/dist/components";
// import CatalystHeader from "catalyst-ui/dist/components/CatalystHeader/CatalystHeader";
import './3portfolio.css';
import './globals.css';
import MiscNavigationSection from "./misc/NavigationItem";


const titles = [
  'Harmonious Algorithm',
  'Techno Serenade',
  'Code Conductor',
  'Cyber Symphony',
  'Virtual Vanguard',
  'Logic Maestro',
  'Digital Luminary',
  'Data Whisperer',
  'Byte Emperor',
  'Algorithmic Aether',
  'Software Sorcerer',
  'Engineering Nexus',
  'Code Alchemist',
  'Cybernetic Maestro',
  'Software Paragon',
  'Techno Architect',
  'Engineering Virtuoso',
  'Digital Maestro',
  'Software Luminary',
  'Technological Enigma'
]


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="theme-catalyst dark" lang="en">
      <body>
        <CatalystHeader
          title="Knowledge Dump"
          navigationItems={[
            <MiscNavigationSection key="1" />
            // <NavigationItem key="2" title="Other Stuff" links={_sampleLinkObjects} />,
          ]}
        />
        {/* <CatalystHeader
            navigationItems={[
              <NavigationItem title="Components" links={_sampleLinkObjects} />,
              <NavigationItem title="Otherstuff" links={_sampleLinkObjects} />,
            ]}
            title="Catalyst Header"
            breadcrumbs={[
              { href: "/section1", name: "Section 1" },
              { href: "/section1/subsection1", name: "Subsection 1", compact: 3},
              { href: "/section1/subsection1/item1", name: "Item 1" },
              { href: "/section1/subsection1/item1/detail1", name: "Detail 1" },
              { href: "/section1/subsection1/item1/detail1/more", name: "More" },
            ]}
        /> */}
        {/* <Navbar
          title={
            <>
              <span>DJ &nbsp; | &nbsp;</span>
              <RotatingTitle titles={titles}/>
            </>
          }
        /> */}
        {children}
      </body>
    </html>
  );
}
