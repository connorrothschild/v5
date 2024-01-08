import { useState } from "react";
import { toast } from "sonner";

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
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
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
              Tell me a bit about your project, and I&apos;ll be in touch!
            </DialogDescription>
          </DialogHeader>
          <ProfileForm
            inquiryPlaceholder={inquiryPlaceholder}
            setOpen={setOpen}
          />
        </DialogContent>
      </Dialog>
    );
  }

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
            Tell me a bit about your project, and I&apos;ll be in touch!
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm
          className="px-4"
          inquiryPlaceholder={inquiryPlaceholder}
          setOpen={setOpen}
        />
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
  setOpen,
}: {
  className?: string;
  inquiryPlaceholder?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiry: inquiryPlaceholder,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.name === "") {
      toast.error("Please enter your name.");
      return;
    }

    if (formData.email === "") {
      toast.error("Please enter your email.");
      return;
    }

    if (formData.inquiry === "") {
      toast.error("Please enter your inquiry.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.inquiry,
        }),
      });

      if (response.ok) {
        console.log("Message sent successfully");
        toast.success("Sent! I'll be in touch soon.");

        setFormData({
          name: "",
          email: "",
          inquiry: "",
        });
        setOpen(false);
      } else {
        console.error("Failed to send message");
        toast.error("Failed to send message. Please try again.");
        // Optional: Give user feedback about the error
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
      // Optional: Give user feedback about the network error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className={clsx("grid items-start gap-4", className)}
      onSubmit={handleSubmit}
    >
      <div className="grid gap-2">
        <Label htmlFor="email">Name</Label>
        <Input
          type="text"
          id="name"
          autoComplete="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="inquiry">Inquiry</Label>
        <Textarea
          id="inquiry"
          value={formData.inquiry}
          onChange={handleChange}
          className="leading-snug"
        />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        Send
      </Button>
    </form>
  );
}
