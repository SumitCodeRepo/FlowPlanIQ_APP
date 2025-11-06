import React from "react";
import { useSelector } from "react-redux";
import { selectIsDarkTheme } from "../features/themeSlice";
import { Willow ,WillowDark } from "@svar-ui/react-gantt";

export default function SVARThemeWrapper({ children }) {
  const isDark = useSelector(selectIsDarkTheme);

  const Wrapper = isDark ? WillowDark : Willow;

  return <Wrapper>{children}</Wrapper>;
}