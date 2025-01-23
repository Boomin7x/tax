"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  BaggageClaim,
  Factory,
  FileChartColumn,
  HandCoins,
  MapPinHouse,
  Percent,
} from "lucide-react";
import { usePathname } from "next/navigation";

const AppSidebar = () => {
  const pathName = usePathname();
  const items = [
    {
      title: "Taxations",
      url: "/",
      icon: HandCoins,
      isActive: pathName === "/",
    },
    {
      title: "Goods and Services",
      url: "/goods-and-services",
      icon: BaggageClaim,
      isActive: pathName === "/goods-and-services",
    },
    {
      title: "Industry",
      url: "/industry",
      icon: Factory,
      isActive: pathName === "/industry",
    },
    {
      title: "Location",
      url: "/location",
      icon: MapPinHouse,
      isActive: pathName === "/location",
    },
    {
      title: "Tax Bracket",
      url: "/tax-bracket",
      icon: FileChartColumn,
      isActive: pathName === "/tax-bracket",
    },
    {
      title: "Tax Breaks",
      url: "/tax-break",
      icon: Percent,
      isActive: pathName === "/tax-break",
    },
  ];
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center  bg-sidebar-primary text-sidebar-primary-foreground">
                  TL
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold text-lg">TAX LION</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Factors</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item?.isActive}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
