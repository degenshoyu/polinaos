import { useState } from "react";
import { Dialog } from "@headlessui/react";

export default function WaitlistModal({ open, onClose }) {
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
    if (res.ok) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setForm({ name: "", project: "", email: "", reason: "" });
        onClose();
      }, 2000);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-[9999] font-sora">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-xl bg-[#111827] text-white rounded-2xl p-8 shadow-2xl border border-white/10 relative transition-all duration-300">
          <Dialog.Title className="text-3xl font-bold mb-6 text-[#64e3a1] text-center">
            Join the Waitlist
          </Dialog.Title>

          {submitted ? (
            <div className="text-green-400 text-lg text-center">🎉 Thanks! We’ll be in touch soon.</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { name: "name", label: "Name" },
                { name: "project", label: "Which Project Are You From?" },
                { name: "email", label: "Email", type: "email" },
                { name: "reason", label: "Why Do You Want To Use PolinaOS?" },
              ].map(({ name, label, type }) => (
                <div key={name} className="flex flex-col">
                  <label className="text-sm mb-2 text-white/70">{label}</label>
                  {name === "reason" ? (
                    <textarea
                      name={name}
                      rows={4}
                      required
                      value={form[name]}
                      onChange={handleChange}
                      className="bg-black border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#64e3a1] focus:bg-black transition"
                      placeholder="Share your reason..."
                    />
                  ) : (
                    <input
                      name={name}
                      type={type || "text"}
                      required
                      value={form[name]}
                      onChange={handleChange}
                      className="bg-black border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#64e3a1] focus:bg-black transition"
                      placeholder={`Enter your ${label.toLowerCase()}`}
                    />
                  )}
                </div>
              ))}

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 text-sm rounded-full border border-white/20 text-white/80 hover:bg-white/10 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#27a567] hover:bg-[#239e5d] text-white text-sm rounded-full shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
