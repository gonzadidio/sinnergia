"use server";

import { createServerClient } from "@/lib/supabase-server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
});

export async function submitContact(data: z.infer<typeof contactSchema>) {
  try {
    const validated = contactSchema.parse(data);
    const supabase = createServerClient();

    const { error } = await supabase.from("contact_submissions").insert({
      name: validated.name,
      email: validated.email,
      phone: validated.phone || null,
      message: validated.message,
      status: "new",
    });

    if (error) {
      return { error: "Error al enviar el mensaje. Intenta de nuevo." };
    }

    return { success: true };
  } catch {
    return { error: "Datos invalidos. Verifica el formulario." };
  }
}
