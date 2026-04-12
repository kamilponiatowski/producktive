import { d as defineEventHandler, r as readBody, c as createError, a as useRuntimeConfig } from '../../_/nitro.mjs';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'vue';
import 'consola';
import 'vue-router';
import 'node:fs';
import 'node:path';
import 'nuxtseo-shared/utils';
import 'fast-xml-parser';
import 'node:url';
import 'ipx';
import 'node:crypto';

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(254),
  message: z.string().min(10).max(5e3),
  honeypot: z.string().max(0).optional()
});
const contact_post = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  if (body == null ? void 0 : body.honeypot) {
    return { success: true };
  }
  const result = contactSchema.safeParse(body);
  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Validation failed",
      data: result.error.flatten().fieldErrors
    });
  }
  const supabase = createClient(
    config.supabaseUrl,
    config.supabaseAnonKey
  );
  const { error } = await supabase.from("contact_submissions").insert({
    name: result.data.name,
    email: result.data.email,
    message: result.data.message
  });
  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to submit. Please try again."
    });
  }
  return { success: true };
});

export { contact_post as default };
//# sourceMappingURL=contact.post.mjs.map
