import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  DollarSign,
  Lock,
  Mail,
  Building,
  ArrowRight,
  User,
  Eye,
} from "lucide-react";
import { Button } from "@/components/custom/Button";
import { Input } from "@/components/custom/Input";
import { Label } from "@/components/custom/Label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/custom/Card";
import { RadioGroup, RadioGroupItem } from "@/components/custom/RadioGroup";
import { Trans } from "react-i18next";
import { useTranslation } from "react-i18next";

const Auth = () => {
  const { t } = useTranslation("auth");

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("Employee");
  const [managerId, setManagerId] = useState("");
  const [hrId, setHrId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation for sign up
    if (!isLogin && password !== confirmPassword) {
      alert("Passwords don't match");
      setIsLoading(false);
      return;
    }

    // Simulate authentication process
    setTimeout(() => {
      setIsLoading(false);
      // Store user data in localStorage for demo purposes
      if (!isLogin) {
        localStorage.setItem("userRole", role);
        localStorage.setItem("userName", fullName);
      }
      navigate("/dashboard");
    }, 1500);
  };

  const roleOptions = [
    {
      value: "Employee",
      label: "Employee",
      description: "Submit and track expense claims",
    },
    {
      value: "Manager",
      label: "Manager",
      description: "Approve team expense claims",
    },
    {
      value: "HR",
      label: "HR",
      description: "Manage employee data and policies",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-400 to-blue-200 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900">
      {/* Show left panel only for Sign In */}
      {!isLogin && <div className="hidden" />}{" "}
      {/* Hide left panel for Sign Up */}
      {isLogin && (
        <div
          className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-between"
          style={{
            background:
              "linear-gradient(120deg, rgba(99,102,241,0.85) 0%, rgba(139,92,246,0.85) 100%)",
            borderRadius: "2rem",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
          }}
        >
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">FinPilot</h1>
                <p className="text-white/80 text-sm">
                  Enterprise Finance Platform
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-white leading-tight">
                Streamline your
                <br />
                expense management
              </h2>
              <p className="text-xl text-white/90">
                Modern, secure, and efficient expense tracking and approval
                workflows for enterprise teams.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-white/80">
              <Building className="w-5 h-5" />
              <span>Trusted by 500+ companies worldwide</span>
            </div>
            <div className="flex items-center gap-4 text-white/80">
              <Eye className="w-5 h-5" />
              <span>Transparency comes first</span>
            </div>
          </div>
        </div>
      )}
      {/* Auth Form - always centered */}
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="mb-8 text-center lg:text-left">
            <h3 className="text-2xl font-bold mb-2">
              {isLogin ? t("auth.welcome") : t("auth.create")}
            </h3>
            <p className="text-muted-foreground">
              {isLogin ? t("auth.signInDesc") : t("auth.signUpDesc")}
            </p>
          </div>

          {/* Tab Buttons */}
          <motion.div layout className="flex rounded-lg bg-muted p-1 mb-6">
            <motion.button
              layout
              whileTap={{ scale: 0.97 }}
              className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all ${
                isLogin
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setIsLogin(true)}
            >
              {t("auth.signIn")}
            </motion.button>
            <motion.button
              layout
              whileTap={{ scale: 0.97 }}
              className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all ${
                !isLogin
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setIsLogin(false)}
            >
              {t("auth.signUp")}
            </motion.button>
          </motion.div>
          <AnimatePresence>
            <Card
              className="shadow-2xl border-0 rounded-2xl backdrop-blur-lg bg-white/90 dark:bg-zinc-900/90 p-8"
              style={{
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
            >
              <CardHeader className="mb-4">
                <CardTitle className="text-center text-3xl font-extrabold tracking-tight text-zinc-800 dark:text-white drop-shadow-lg">
                  {isLogin ? "Sign In" : "Sign Up"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email */}
                  <div className="space-y-4">
                    <Label
                      htmlFor="email"
                      className="font-semibold text-zinc-700 dark:text-zinc-200 text-base"
                    >
                      {t("auth.email")}
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t("auth.searchPlaceholder")}
                        className="pl-10 rounded-xl border border-zinc-300 focus:border-primary focus:ring-2 focus:ring-primary/30 bg-white/90 dark:bg-zinc-800/90 text-black placeholder:text-zinc-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-4">
                    <Label
                      htmlFor="password"
                      className="font-semibold text-zinc-700 dark:text-zinc-200 text-base"
                    >
                      {t("auth.password")}
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="pl-10 rounded-xl border border-zinc-300 focus:border-primary focus:ring-2 focus:ring-primary/30 bg-white/90 dark:bg-zinc-800/90 text-black placeholder:text-zinc-500"
                        required
                      />
                    </div>
                    {!isLogin && (
                      <p className="text-xs text-muted-foreground mt-1 ml-1">
                        Password must be at least 8 characters.
                      </p>
                    )}
                  </div>

                  {/* Confirm Password (Sign Up only) */}
                  {!isLogin && (
                    <motion.div layout className="space-y-4">
                      <Label
                        htmlFor="confirmPassword"
                        className="font-semibold text-zinc-700 dark:text-zinc-200 text-base"
                      >
                        {t("auth.confirmPassword")}
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          className="pl-10 rounded-xl border border-zinc-300 focus:border-primary focus:ring-2 focus:ring-primary/30 bg-white/90 dark:bg-zinc-800/90 text-black placeholder:text-zinc-500"
                          required
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Role Selection (Sign Up only) */}
                  {!isLogin && (
                    <motion.div layout className="space-y-4">
                      <Label
                        htmlFor="role"
                        className="font-semibold text-zinc-700 dark:text-zinc-200 text-base mb-2"
                      >
                        {t("auth.role")}
                      </Label>
                      <p className="text-xs text-muted-foreground mb-2">
                        Choose your role to personalize your experience.
                      </p>
                      <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full rounded-xl border border-zinc-300 bg-white/90 dark:bg-zinc-800/90 p-3 text-base focus:border-primary focus:ring-2 focus:ring-primary/30 text-black"
                        required
                      >
                        {roleOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <p className="text-xs text-muted-foreground mt-1">
                        {
                          roleOptions.find((option) => option.value === role)
                            ?.description
                        }
                      </p>
                    </motion.div>
                  )}

                  {!isLogin && role === "Employee" && (
                    <motion.div layout className="space-y-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="managerId"
                          className="font-semibold text-zinc-700 dark:text-zinc-200 text-base"
                        >
                          Manager ID
                        </Label>
                        <Input
                          id="managerId"
                          type="text"
                          value={managerId}
                          onChange={(e) => setManagerId(e.target.value)}
                          placeholder="Enter your manager's ID"
                          className="rounded-xl border border-zinc-300 focus:border-primary focus:ring-2 focus:ring-primary/30 bg-white/95 dark:bg-zinc-800/95 text-black placeholder:text-zinc-500"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="hrId"
                          className="font-semibold text-zinc-700 dark:text-zinc-200 text-base"
                        >
                          HR ID
                        </Label>
                        <Input
                          id="hrId"
                          type="text"
                          value={hrId}
                          onChange={(e) => setHrId(e.target.value)}
                          placeholder="Enter your HR's ID"
                          className="rounded-xl border border-zinc-300 focus:border-primary focus:ring-2 focus:ring-primary/30 bg-white/95 dark:bg-zinc-800/95 text-black placeholder:text-zinc-500"
                          required
                        />
                      </div>
                    </motion.div>
                  )}

                  <motion.div layout className="pt-6">
                    <Button
                      type="submit"
                      className="w-full py-3 rounded-xl font-semibold text-lg bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white shadow-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-200 border-none"
                      style={{
                        boxShadow: "0 4px 24px 0 rgba(139,92,246,0.15)",
                      }}
                      variant="enterprise"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        isLogin ? (
                          t("auth.loadingSignIn")
                        ) : (
                          t("auth.loadingSignUp")
                        )
                      ) : (
                        <>
                          {isLogin ? "Sign In" : "Sign Up"}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </AnimatePresence>
          <motion.div
            className="mt-6 text-center text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <p>
              <Trans i18nKey="auth.help">
                Need help? Contact{" "}
                <a
                  href="mailto:support@finpilot.com"
                  className="text-primary hover:underline"
                >
                  support@finpilot.com
                </a>
              </Trans>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
