"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Globe, Languages, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Control } from "react-hook-form";
import { Link } from "@remix-run/react";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup,
  DropdownMenuRadioItem, DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { position } from "unist-util-position";


export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  register: any;
  formName: string;
}

const LocalizedInput = (props: InputProps) => {
  const lang = "en";
  const { formName, className, register, ...restProps } = props;
  const [selectedLocale, setSelectedLocale] = useState("en");

  return <div className="flex flex-row gap-2 items-start">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Globe className="w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Translation</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={selectedLocale} onValueChange={setSelectedLocale}>
          <DropdownMenuRadioItem value="ar">Arabic</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    <Input
      {...register(`${formName}.en`)}
      {...restProps}
      className={`${className} ${selectedLocale == "ar" ? "hidden" : ""}`}
    />
    <Input
      {...register(`${formName}.ar`)}
      {...restProps}
      className={`${className} ${selectedLocale == "en" ? "hidden" : ""}`}
    />
  </div>;
};

export default LocalizedInput;
