import { useState } from 'react';

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyM7LEvsI05_EFvEUaf8WYMNMXPE4K9HWsTSyOWxma0141zgrLW1ikT6LogzFld3Rp7oQ/exec";

export default function App() {
  const [orchard, setOrchard] = useState("");
  const [block, setBlock] = useState("");
  const [variety, setVariety] = useState("");
  const [bins, setBins] = useState("");
  const [msg, setMsg] = useState("");

  async function submit() {
    const payload = {
      entryId: Date.now().toString(),
      user: "",
      notes: "",
      entries: [
        {
          orchard,
          block,
          variety,
          bins: Number(bins)
        }
      ]
    };

    try {
      const res = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success) {
        setMsg("Saved to Google Sheets ✅");
      } else {
        setMsg("Error: " + data.error);
      }
    } catch (e) {
      setMsg("Failed to submit");
    }
  }

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h2>Hansen Apple Bin Tally</h2>
      <input style={{ width: "100%", padding: 10, marginBottom: 12 }} placeholder="Orchard" value={orchard} onChange={e => setOrchard(e.target.value)} />
      <input style={{ width: "100%", padding: 10, marginBottom: 12 }} placeholder="Block" value={block} onChange={e => setBlock(e.target.value)} />
      <input style={{ width: "100%", padding: 10, marginBottom: 12 }} placeholder="Variety" value={variety} onChange={e => setVariety(e.target.value)} />
      <input style={{ width: "100%", padding: 10, marginBottom: 12 }} placeholder="Bins" value={bins} onChange={e => setBins(e.target.value)} />
      <button style={{ padding: "10px 16px" }} onClick={submit}>Submit</button>
      <p>{msg}</p>
    </div>
  );
}
