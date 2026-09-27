import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProfiles, pinLogin } from "../api/auth";
import { useAuthStore } from "../store/authStore";
import Avatar from "../components/common/Avatar";
import alloneFriends from "../assets/characters/allone-friends.png";

const PIN_LENGTH = 4;

function PinPad({ profile, onBack, onSuccess }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const isParent = profile.role === "PARENT";

  const submit = async (fullPin) => {
    setLoading(true);
    setError("");
    try {
      const data = await pinLogin(profile.id, fullPin);
      onSuccess(data);
    } catch (e) {
      setError(e.response?.data?.error || "로그인에 실패했어요. 다시 시도해주세요.");
      setPin("");
    } finally {
      setLoading(false);
    }
  };

  const press = (digit) => {
    if (loading) return;
    const next = (pin + digit).slice(0, PIN_LENGTH);
    setPin(next);
    if (next.length === PIN_LENGTH) submit(next);
  };

  return (
    <div className="flex flex-1 flex-col items-center px-6 pb-8 pt-4 animate-pop-in">
      <div className={`flex h-20 w-20 items-center justify-center rounded-[26px] shadow-card ring-1 ${isParent ? "bg-parent-50 ring-parent-100" : "bg-junior-50 ring-junior-100"}`}>
        <Avatar value={profile.avatarEmoji} className="h-16 w-16" textClassName="text-5xl" />
      </div>
      <p className="mt-3 text-xl font-extrabold text-[#223127]">{profile.name}</p>
      <p className="mt-1 text-sm text-[#7A877E]">PIN 번호 4자리를 입력해주세요</p>

      <div className="my-6 flex gap-3">
        {Array.from({ length: PIN_LENGTH }).map((_, i) => (
          <div key={i} className={`h-4 w-4 rounded-full border-2 ${i < pin.length ? (isParent ? "border-parent-600 bg-parent-600" : "border-junior-500 bg-junior-500") : "border-gray-300 bg-white"}`} />
        ))}
      </div>

      {error ? <p className="mb-3 min-h-5 text-center text-sm font-medium text-red-500">{error}</p> : <div className="mb-3 h-5" />}

      <div className="grid w-full max-w-xs grid-cols-3 gap-3">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((n) => (
          <button key={n} onClick={() => press(n)} className="tap-target rounded-[22px] bg-white py-4 text-xl font-extrabold text-[#344138] shadow-card ring-1 ring-black/[0.03] transition active:scale-95 active:shadow-none">{n}</button>
        ))}
        <button onClick={onBack} className="tap-target rounded-[22px] py-4 text-sm font-bold text-[#89938C]">취소</button>
        <button onClick={() => press("0")} className="tap-target rounded-[22px] bg-white py-4 text-xl font-extrabold text-[#344138] shadow-card ring-1 ring-black/[0.03] transition active:scale-95">0</button>
        <button onClick={() => setPin((p) => p.slice(0, -1))} className="tap-target rounded-[22px] py-4 text-xl font-bold text-[#89938C]">⌫</button>
      </div>
    </div>
  );
}

function ManualLogin({ profiles, onBack, onSuccess }) {
  const [profileId, setProfileId] = useState(profiles[0]?.id || "");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const data = await pinLogin(profileId, pin);
      onSuccess(data);
    } catch (e2) {
      setError(e2.response?.data?.error || "로그인에 실패했어요.");
    }
  };

  return (
    <form onSubmit={submit} className="flex flex-1 flex-col gap-4 px-6 py-6 animate-pop-in">
      <h2 className="text-center text-xl font-extrabold text-[#223127]">다른 계정으로 로그인</h2>
      <label className="text-sm font-bold text-[#617066]">계정 선택</label>
      <select value={profileId} onChange={(e) => setProfileId(e.target.value)} className="tap-target rounded-2xl border-2 border-[#E3EAE5] bg-white px-3 py-3">
        {profiles.map((p) => <option key={p.id} value={p.id}>{p.name} ({p.role === "PARENT" ? "부모" : "자녀"})</option>)}
      </select>
      <label className="text-sm font-bold text-[#617066]">PIN 번호</label>
      <input type="password" inputMode="numeric" maxLength={4} value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))} className="tap-target rounded-2xl border-2 border-[#E3EAE5] bg-white px-3 py-3 text-center text-xl tracking-widest" placeholder="••••" />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button type="submit" className="btn-big bg-junior-600 text-white">로그인</button>
      <button type="button" onClick={onBack} className="py-2 text-sm font-medium text-[#89938C]">계정 목록으로 돌아가기</button>
    </form>
  );
}

export default function ProfileSelect() {
  const [profiles, setProfiles] = useState([]);
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState("list");
  const [loadError, setLoadError] = useState("");
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  useEffect(() => {
    fetchProfiles().then(setProfiles).catch(() => setLoadError("서버에 연결할 수 없어요. 서버가 켜져 있는지 확인해주세요."));
  }, []);

  const handleSuccess = ({ accessToken, user }) => {
    setAuth(accessToken, user);
    navigate("/home");
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#F7FFF3] via-[#FFFDF7] to-white">
      <div className="relative overflow-hidden px-5 pb-4 pt-7 text-center">
        <div className="absolute left-[-28px] top-8 h-24 w-24 rounded-full bg-[#DDF7E7]/70" />
        <div className="absolute right-[-18px] top-20 h-20 w-20 rounded-full bg-[#FFF0B8]/70" />
        <p className="relative text-xs font-extrabold tracking-[0.18em] text-junior-600">NH ALLONE JUNIOR</p>
        <h1 className="relative mt-2 text-3xl font-black tracking-tight text-[#223127]">주니어빌리지</h1>
        <p className="relative mt-2 text-sm font-medium text-[#617066]">올원프렌즈와 함께 돈을 배우고, 모으고, 성장해요</p>
        <div className="relative mx-auto mt-3 flex h-44 max-w-sm items-end justify-center overflow-hidden rounded-[32px] bg-gradient-to-br from-[#E9F9EC] via-[#FFFBE8] to-[#EAF5FF] shadow-card ring-1 ring-white">
          <img src={alloneFriends} alt="올원프렌즈" className="max-h-[160px] w-auto object-contain drop-shadow-sm" />
          <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1.5 text-xs font-extrabold text-junior-700 shadow-sm">우리랑 같이 가자! ✨</span>
        </div>
      </div>

      {mode === "pin" && selected ? (
        <PinPad profile={selected} onBack={() => setMode("list")} onSuccess={handleSuccess} />
      ) : mode === "manual" ? (
        <ManualLogin profiles={profiles} onBack={() => setMode("list")} onSuccess={handleSuccess} />
      ) : (
        <div className="flex flex-1 flex-col px-5 pb-6 pt-2">
          <div className="mb-4 text-center">
            <h2 className="text-lg font-extrabold text-[#223127]">누구로 들어갈까요?</h2>
            <p className="mt-1 text-sm text-[#89938C]">내 프로필을 골라주세요</p>
          </div>
          {loadError && <p className="mb-4 text-center text-sm text-red-500">{loadError}</p>}

          <div className="flex flex-col gap-3">
            {profiles.map((p) => {
              const isParent = p.role === "PARENT";
              return (
                <button
                  key={p.id}
                  onClick={() => { setSelected(p); setMode("pin"); }}
                  className={`group flex items-center gap-4 rounded-[24px] p-4 text-left shadow-card ring-1 transition-all active:scale-[0.985] active:shadow-none ${isParent ? "bg-gradient-to-r from-[#EEF5FC] to-white ring-parent-100" : "bg-gradient-to-r from-[#EEF9F0] to-white ring-junior-100"}`}
                >
                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-[20px] ${isParent ? "bg-parent-50" : "bg-junior-50"}`}>
                    <Avatar value={p.avatarEmoji} className="h-12 w-12" textClassName="text-4xl" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-extrabold text-[#223127]">{p.name}</p>
                    <p className="mt-0.5 text-xs font-medium text-[#7A877E]">{isParent ? "부모(보호자) 계정" : "자녀(주니어) 계정"}</p>
                  </div>
                  <span className={`flex h-9 w-9 items-center justify-center rounded-full text-lg font-black ${isParent ? "bg-parent-100 text-parent-700" : "bg-junior-100 text-junior-700"}`}>›</span>
                </button>
              );
            })}
          </div>

          <div className="flex-1" />
          <button onClick={() => setMode("manual")} className="py-4 text-sm font-medium text-[#89938C] underline underline-offset-2">다른 계정으로 로그인</button>
        </div>
      )}
    </div>
  );
}
