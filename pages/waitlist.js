import { useState } from "react";

export default function WaitlistPage() {
  const [form, setForm] = useState({
    name: "",
    project: "",
    email: "",
    reason: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) setSubmitted(true);
  };

  return (
    <main className="min-h-screen px-4 py-20 bg-black text-white flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4 text-center">Join the Waitlist</h1>
      <p className="text-gray-400 mb-10 max-w-xl text-center">
        Be one of the first 100 to shape PolinaOS. Tell us who you are.
      </p>

      {submitted ? (
        <div className="text-green-400 text-xl font-semibold">
          🎉 Thanks! We’ll be in touch soon.
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl space-y-6 bg-white/5 p-8 rounded-xl backdrop-blur-xl"
        >
          {["name", "project", "email", "reason"].map((field) => (
            <div key={field} className="flex flex-col">
              <label className="mb-1 capitalize text-sm text-white/80">
                {field === "reason"
                  ? "Why do you want to use PolinaOS?"
                  : field === "project"
                    ? "Which project are you from?"
                    : field}
              </label>
              {field === "reason" ? (
                <textarea
                  name={field}
                  rows={4}
                  required
                  value={form[field]}
                  onChange={handleChange}
                  className="bg-black border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#64e3a1]"
                />
              ) : (
                <input
                  name={field}
                  type={field === "email" ? "email" : "text"}
                  required
                  value={form[field]}
                  onChange={handleChange}
                  className="bg-black border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#64e3a1]"
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            className="bg-[#27a567] hover:bg-[#239e5d] text-white font-semibold px-8 py-3 rounded-full shadow hover:scale-105 transition"
          >
            Submit
          </button>
        </form>
      )}
    </main>
  );
}
