import { redirect } from "next/navigation";

// Impact vault templates are now integrated into the unified /themes gallery
export default function TemplatesPage() {
  redirect("/themes");
}
