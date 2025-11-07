import React from "react";
import { useSelector } from "react-redux";
import { selectIsDarkTheme } from "../features/themeSlice";
import { Willow, WillowDark } from "@svar-ui/react-gantt";

const SVARThemeWrapper = ({ children }) => {
  const isDark = useSelector(selectIsDarkTheme);
  const Wrapper = isDark ? WillowDark : Willow;

  return <Wrapper>{children}</Wrapper>;
};

export default SVARThemeWrapper;