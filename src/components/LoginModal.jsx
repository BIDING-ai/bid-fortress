import { useState } from "react";

export default function LoginModal({
  open,
  onClose,
  onLogin,
}) {
  const [mode, setMode] = useState("LOGIN");
  const [role, setRole] = useState("USER");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] = useState("");

  if (!open) return null;

  function switchMode(nextMode) {
    setMode(nextMode);
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const cleanUsername = username.trim();

    if (!cleanUsername || !password) {
      setError("PLEASE COMPLETE ALL FIELDS");
      return;
    }

    // =========================
    // SIGN UP
    // =========================
    if (mode === "SIGNUP") {
      if (cleanUsername.length < 3) {
        setError("USERNAME MUST BE AT LEAST 3 CHARACTERS");
        return;
      }

      if (password.length < 4) {
        setError("PASSWORD MUST BE AT LEAST 4 CHARACTERS");
        return;
      }

      if (password !== confirmPassword) {
        setError("PASSWORDS DO NOT MATCH");
        return;
      }

      const savedAccounts = JSON.parse(
        localStorage.getItem("bfAccounts") || "[]"
      );

      const exists = savedAccounts.some(
        (account) =>
          account.username.toLowerCase() ===
          cleanUsername.toLowerCase()
      );

      if (exists) {
        setError("USERNAME ALREADY EXISTS");
        return;
      }

      const newAccount = {
        username: cleanUsername,
        password,
        role: "USER",
      };

      localStorage.setItem(
        "bfAccounts",
        JSON.stringify([
          ...savedAccounts,
          newAccount,
        ])
      );

      // Signup ke baad automatically login
      onLogin({
        role: "USER",
        username: cleanUsername,
      });

      return;
    }

    // =========================
    // ADMIN LOGIN
    // =========================
    if (
      role === "ADMIN" &&
      cleanUsername === "admin" &&
      password === "admin123"
    ) {
      onLogin({
        role: "ADMIN",
        username: "admin",
      });

      return;
    }

    // =========================
    // DEMO USER LOGIN
    // =========================
    if (
      role === "USER" &&
      cleanUsername === "user" &&
      password === "1234"
    ) {
      onLogin({
        role: "USER",
        username: "user",
      });

      return;
    }

    // =========================
    // REGISTERED USER LOGIN
    // =========================
    const savedAccounts = JSON.parse(
      localStorage.getItem("bfAccounts") || "[]"
    );

    const account = savedAccounts.find(
      (item) =>
        item.username.toLowerCase() ===
          cleanUsername.toLowerCase() &&
        item.password === password
    );

    if (account) {
      onLogin({
        role: "USER",
        username: account.username,
      });

      return;
    }

    setError("INVALID USERNAME OR PASSWORD");
  }

  return (
    <div
      className="login-backdrop"
      onClick={onClose}
    >
      <div
        className="login-modal"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <div className="login-accent" />

        <button
          type="button"
          className="login-close"
          onClick={onClose}
        >
          ×
        </button>

        <div className="login-header">
          <div className="login-icon">BF</div>

          <span className="eyebrow">
            {mode === "LOGIN"
              ? "ACCOUNT ACCESS"
              : "ACCOUNT REGISTRATION"}
          </span>

          <h2>
            {mode === "LOGIN"
              ? "Welcome Back"
              : "Create Your Account"}
          </h2>

          <p>
            {mode === "LOGIN"
              ? "Authenticate your account to access bidding."
              : "Register once and start participating in the exchange."}
          </p>
        </div>

        {/* LOGIN / SIGN UP */}
        <div className="auth-switch">
          <button
            type="button"
            className={
              mode === "LOGIN" ? "active" : ""
            }
            onClick={() => switchMode("LOGIN")}
          >
            <span>01</span>
            LOGIN
          </button>

          <button
            type="button"
            className={
              mode === "SIGNUP" ? "active" : ""
            }
            onClick={() => switchMode("SIGNUP")}
          >
            <span>02</span>
            SIGN UP
          </button>
        </div>

        {/* USER / ADMIN */}
        {mode === "LOGIN" && (
          <div className="login-tabs">
            <button
              type="button"
              className={
                role === "USER" ? "active" : ""
              }
              onClick={() => {
                setRole("USER");
                setError("");
              }}
            >
              USER ACCESS
            </button>

            <button
              type="button"
              className={
                role === "ADMIN" ? "active" : ""
              }
              onClick={() => {
                setRole("ADMIN");
                setError("");
              }}
            >
              ADMIN ACCESS
            </button>
          </div>
        )}

        <form
          className="login-form"
          onSubmit={handleSubmit}
        >
          <div className="login-field">
            <label>USERNAME</label>

            <input
              type="text"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
                setError("");
              }}
              placeholder="ENTER USERNAME"
              autoComplete="username"
            />
          </div>

          <div className="login-field">
            <label>PASSWORD</label>

            <input
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError("");
              }}
              placeholder="ENTER PASSWORD"
              autoComplete={
                mode === "LOGIN"
                  ? "current-password"
                  : "new-password"
              }
            />
          </div>

          {mode === "SIGNUP" && (
            <div className="login-field">
              <label>CONFIRM PASSWORD</label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(event) => {
                  setConfirmPassword(
                    event.target.value
                  );
                  setError("");
                }}
                placeholder="CONFIRM PASSWORD"
                autoComplete="new-password"
              />
            </div>
          )}

          {error && (
            <div className="login-error">
              <span>!</span>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="login-submit"
          >
            <span>
              {mode === "LOGIN"
                ? "AUTHENTICATE"
                : "CREATE ACCOUNT"}
            </span>

            <b>→</b>
          </button>
        </form>

        <div className="login-footer">
          <span>SESSION ENCRYPTED</span>

          <span className="login-secure">
            <i />
            SECURE
          </span>
        </div>
      </div>
    </div>
  );
}