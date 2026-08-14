import { useState } from "react";
import { Navigate } from "react-router-dom";
import { LogIn, Mountain } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/ui/Button";

export default function AdminLogin() {
  const { session, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (session) return <Navigate to="/admin" replace />;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await signIn(email, password);
    if (error) setError(error === "Invalid login credentials" ? "Email atau password salah." : error);
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-mist px-5">
      <div className="w-full max-w-sm card-surface p-8">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-600 text-white"><Mountain className="h-6 w-6" /></span>
          <h1 className="mt-4 font-display font-bold text-xl text-dusk-800">Login Admin</h1>
          <p className="mt-1 text-sm text-dusk-700/60">Pedukuhan Plagrak Kiyaran</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <div>
            <label className="text-sm font-medium text-dusk-800">Email</label>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field mt-1.5" placeholder="admin@plagrakkiyaran.desa.id" />
          </div>
          <div>
            <label className="text-sm font-medium text-dusk-800">Password</label>
            <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field mt-1.5" placeholder="••••••••" />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full justify-center">
            <LogIn className="h-4 w-4" />
            {loading ? "Memproses..." : "Masuk"}
          </Button>
        </form>
        <p className="mt-6 text-center text-xs text-dusk-700/45">Khusus Akun Admin.</p>
      </div>
    </div>
  );
}
