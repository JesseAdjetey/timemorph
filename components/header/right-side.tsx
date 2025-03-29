"use client"
import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useViewStore } from "@/lib/store";



const HeaderRight = () => {
  const {setView} = useViewStore();
    return (
        <div className={"flex items-center space-x-4"} >
            <Select onValueChange={(value) => setView(value)}>
              <SelectTrigger className="w-24 focus-visible:outline-none focus">
                <SelectValue placeholder="Week" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Month">Month</SelectItem>
                <SelectItem value="Week">Week</SelectItem>
                <SelectItem value="Day">Day</SelectItem>
              </SelectContent>
            </Select>

          <Avatar>
            <AvatarImage src="/img/inst2.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
    )
}
export default HeaderRight
