"use client"

import { useTheme, useMediaQuery } from "@mui/material"
import type { BreakpointKey } from "../../core/types/common.types"

export const useResponsive = () => {
  const theme = useTheme()

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"))
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"))
  const isLargeDesktop = useMediaQuery(theme.breakpoints.up("lg"))

  const breakpoint: BreakpointKey = isMobile ? "xs" : isTablet ? "sm" : isDesktop ? "md" : "lg"

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    breakpoint,

    isBreakpoint: (bp: BreakpointKey) => breakpoint === bp,
    isBreakpointUp: (bp: BreakpointKey) => {
      const order = ["xs", "sm", "md", "lg", "xl"]
      return order.indexOf(breakpoint) >= order.indexOf(bp)
    },
    isBreakpointDown: (bp: BreakpointKey) => {
      const order = ["xs", "sm", "md", "lg", "xl"]
      return order.indexOf(breakpoint) <= order.indexOf(bp)
    },
  }
}
