import PageTransitionWrapper from "@/components/PageTransitionWrapper";
import Archive from "@/components/Sections/Archive";
import FeaturedProjects from "@/components/Sections/FeaturedProjects";
import Footer from "@/components/Sections/Footer";
import React from "react";

export default function projects() {
  return (
    <PageTransitionWrapper>
      <FeaturedProjects />
      <Archive />
      <Footer />
    </PageTransitionWrapper>
  );
}
