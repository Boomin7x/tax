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
  FileChartColumn,
  HandCoins,
  MapPinHouse,
  Percent,
} from "lucide-react";

const AppSidebar = () => {
  const items = [
    {
      title: "Tax",
      url: "#",
      icon: HandCoins,
    },
    {
      title: "Goods and Services",
      url: "#",
      icon: BaggageClaim,
    },
    {
      title: "Location",
      url: "#",
      icon: MapPinHouse,
      isActive: true,
    },
    {
      title: "Tax Bracket",
      url: "#",
      icon: FileChartColumn,
    },
    {
      title: "Tax Breaks",
      url: "#",
      icon: Percent,
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
