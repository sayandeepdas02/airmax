"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Interactive";
import styles from "./Footer.module.css";

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "done">("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    if (typeof email !== "string" || !email.includes("@")) return;
    // TODO: send `email` to your email platform (Resend, Loops, ConvertKit, HubSpot…).
    setStatus("done");
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate={false}>
      <label className={styles.field}>
        <span className="sr-only">Email address</span>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder={status === "done" ? "Thanks — we'll be in touch." : "Email address"}
          disabled={status === "done"}
        />
      </label>
      <Button type="submit" size="small" disabled={status === "done"}>
        {status === "done" ? "Done" : "Subscribe"}
      </Button>
    </form>
  );
}
