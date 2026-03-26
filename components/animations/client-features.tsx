"use client";

import React from "react";
import { Preloader } from "./preloader";
import { ScrollProgress } from "./scroll-progress";
import { ParticleField } from "./particle-field";
import { WhatsAppButton } from "./whatsapp-button";

export function ClientFeatures() {
  return (
    <>
      <Preloader />
      <ScrollProgress />
      <ParticleField />
      <WhatsAppButton />
    </>
  );
}
