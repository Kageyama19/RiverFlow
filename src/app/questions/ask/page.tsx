import QuestionForm from "@/components/QuestionForm";

export default function AskQuestionPage() {
  return (
    <main
      className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0f1121] via-[#18192d] to-[#23243a] px-2 py-8"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(80,143,255,0.12) 0%, transparent 100%), radial-gradient(ellipse 60% 80% at 60% 100%, rgba(114,208,255,0.08) 0%, transparent 100%)",
      }}
    >
      <section
        className="w-full max-w-6xl md:max-w-7xl rounded-3xl shadow-2xl px-6 md:px-24 py-12 glass-card border border-[#24263b] backdrop-blur-md"
        style={{
          background:
            "linear-gradient(120deg, rgba(36,38,59,0.85) 60%, rgba(25,26,40,0.98) 100%)",
        }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-8 drop-shadow-xl tracking-tight">
          <span className="bg-gradient-to-r from-[#7ecbff] to-[#4f69df] bg-clip-text text-transparent">
            Ask a Question
          </span>
        </h1>
        <div className="mb-6 text-center text-[#b2b6c8] text-base font-medium">
          Have a programming problem or need advice? Fill out the form below to
          get help from the community!
        </div>
        <QuestionForm />
      </section>
    </main>
  );
}
