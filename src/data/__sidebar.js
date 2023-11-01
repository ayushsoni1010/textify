import home from "@/app/assets/home.svg";
import files from "@/app/assets/files.svg";
import saved from "@/app/assets/saved.svg";
import integrations from "@/app/assets/integrations.svg";
import trash from "@/app/assets/trash.svg";
import settings from "@/app/assets/settings.svg";
import help from "@/app/assets/help.svg";

export const sidebarOptions = [
  {
    index: 1,
    title: "Home",
    key: "home",
    icon: home,
    link: "/",
  },
  {
    index: 2,
    title: "All Files",
    key: "files",
    icon: files,
    link: "/files",
  },
  {
    index: 3,
    title: "Saved",
    key: "saved",
    icon: saved,
    link: "/saved",
  },
  {
    index: 4,
    title: "Integrations",
    key: "integrations",
    icon: integrations,
    link: "/integrations",
  },
  {
    index: 5,
    title: "Trash",
    key: "trash",
    icon: trash,
    link: "/trash",
  },
  {
    index: 6,
    title: "Settings",
    key: "settings",
    icon: settings,
    link: "/settings",
  },
  {
    index: 7,
    title: "Help and Support",
    key: "help",
    icon: help,
    link: "/help",
  },
];
