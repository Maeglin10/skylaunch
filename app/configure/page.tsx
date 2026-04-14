import { StepForm } from "@/components/StepForm";

export default function ConfigurePage() {
  return (
    <div id="main-content" className="min-h-screen bg-[#09090b] text-white pt-16">
      <div className="mx-auto max-w-xl px-6 py-16 flex flex-col items-center">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-3">Build your site</h1>
          <p className="text-zinc-300">5 quick steps — under 3 minutes</p>
        </div>
        <StepForm />
      </div>
    </div>
  );
}
