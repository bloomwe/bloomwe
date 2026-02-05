
"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-6",
        caption: "flex justify-center items-center relative h-10 mb-8",
        caption_label: "text-base font-bold text-primary",
        nav: "flex items-center justify-between absolute inset-x-0 w-full px-1",
        button_previous: cn(
          buttonVariants({ variant: "outline" }),
          "h-10 w-10 bg-primary/5 p-0 opacity-80 hover:opacity-100 border-none rounded-2xl transition-all hover:bg-primary hover:text-white shadow-sm absolute left-0 z-10"
        ),
        button_next: cn(
          buttonVariants({ variant: "outline" }),
          "h-10 w-10 bg-primary/5 p-0 opacity-80 hover:opacity-100 border-none rounded-2xl transition-all hover:bg-primary hover:text-white shadow-sm absolute right-0 z-10"
        ),
        table: "w-full border-collapse space-y-2",
        head_row: "flex justify-between",
        head_cell:
          "text-muted-foreground/50 rounded-md w-10 font-bold text-[0.7rem] uppercase tracking-widest text-center",
        row: "flex w-full mt-3 justify-between",
        cell: "h-10 w-10 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-10 w-10 p-0 font-medium aria-selected:opacity-100 rounded-2xl transition-all"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground shadow-lg shadow-primary/30",
        day_today: "bg-secondary text-primary font-bold",
        day_outside:
          "day-outside text-muted-foreground/20 aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("h-6 w-6", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("h-6 w-6", className)} {...props} />
        ),
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
