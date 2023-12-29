import * as React from "react";

import { useMediaQuery } from "usehooks-ts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import clsx from "clsx";

export function ContactPopup({
  children,
  inquiryPlaceholder = "A bit about your project...",
}: {
  children: React.ReactNode;
  inquiryPlaceholder?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // if (isDesktop) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* <Button variant="outline">Edit Profile</Button> */}
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] !font-sans">
        <DialogHeader>
          <DialogTitle>Get in touch</DialogTitle>
          <DialogDescription>
            Tell me a bit about your project, and I&apos;ll be in touch soon.
          </DialogDescription>
        </DialogHeader>
        <ProfileForm inquiryPlaceholder={inquiryPlaceholder} />
      </DialogContent>
    </Dialog>
  );
  // }

  // FIXME: Drawer will unmount sticky elements, including navbar, when animating, watch https://github.com/shadcn-ui/ui/pull/2147
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {/* <Button variant="outline">Edit Profile</Button> */}
        {children}
      </DrawerTrigger>
      <DrawerContent className="!font-sans">
        <DrawerHeader className="text-left">
          <DrawerTitle>Get in touch</DrawerTitle>
          <DrawerDescription>
            Tell me a bit about your project, and I&apos;ll be in touch soon.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" inquiryPlaceholder={inquiryPlaceholder} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({
  className,
  inquiryPlaceholder = "",
}: {
  className?: string;
  inquiryPlaceholder?: string;
}) {
  return (
    <form className={clsx("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" defaultValue="your@email.com" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="inquiry">Inquiry</Label>
        <Textarea id="inquiry" defaultValue={inquiryPlaceholder} />
      </div>
      <Button type="submit">Send</Button>
    </form>
  );
}
