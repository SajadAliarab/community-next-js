'use client'
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

export default function ThemeToggle(){
const {theme, setTheme,systemTheme}=useTheme()
// prevent theme equal null when transfer between SSR and CSH
const [mounted , setMounted] = useState(false)
useEffect(()=>{
    setMounted(true)
},[])
if(!mounted) return null
const current = theme==='system' ? systemTheme : theme
return(
    <>
    <Switch id="theme-toggle" className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-primary" onClick={()=>setTheme(current === 'dark' ? 'light' : 'dark')}/>
      <Label htmlFor="theme-toggle"> {current==='dark'?'🌞 Light' : '🌙 Dark'}</Label> 
      </>
)
}
