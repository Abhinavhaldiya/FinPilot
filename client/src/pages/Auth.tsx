import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DollarSign, Lock, Mail, Building, ArrowRight, User } from "lucide-react";
import { Button } from "@/components/custom/Button";
import { Input } from "@/components/custom/Input";
import { Label } from "@/components/custom/Label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/custom/Card";
import { RadioGroup, RadioGroupItem } from "@/components/custom/RadioGroup";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("Employee");
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
        localStorage.setItem('userRole', role);
        localStorage.setItem('userName', fullName);
      }
      navigate("/dashboard");
    }, 1500);
  };

  const roleOptions = [
    { value: "Employee", label: "Employee", description: "Submit and track expense claims" },
    { value: "Manager", label: "Manager", description: "Approve team expense claims" },
    { value: "HR", label: "HR", description: "Manage employee data and policies" }
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-hero p-12 flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">FinPilot</h1>
              <p className="text-white/80 text-sm">Enterprise Finance Platform</p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-white leading-tight">
              Streamline your<br />
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
            <Lock className="w-5 h-5" />
            <span>Bank-grade security and compliance</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:text-left">
            <h3 className="text-2xl font-bold mb-2">
              {isLogin ? "Welcome back" : "Create your account"}
            </h3>
            <p className="text-muted-foreground">
              {isLogin 
                ? "Sign in to your FinPilot account" 
                : "Join FinPilot to manage your expenses"
              }
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex rounded-lg bg-muted p-1 mb-6">
            <button
              className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all ${
                isLogin 
                  ? 'bg-background text-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setIsLogin(true)}
            >
              Sign In
            </button>
            <button
              className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all ${
                !isLogin 
                  ? 'bg-background text-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{isLogin ? "Account Login" : "Create Account"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name (Sign Up only) */}
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Confirm Password (Sign Up only) */}
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Role Selection (Sign Up only) */}
                {!isLogin && (
                  <div className="space-y-3">
                    <Label>Select your role</Label>
                    <RadioGroup value={role} onValueChange={setRole}>
                      {roleOptions.map((option) => (
                        <div key={option.value} className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                          <RadioGroupItem 
                            value={option.value} 
                            id={option.value.toLowerCase()}
                            className="mt-0.5"
                          />
                          <div className="flex-1">
                            <Label 
                              htmlFor={option.value.toLowerCase()} 
                              className="text-sm font-medium cursor-pointer"
                            >
                              {option.label}
                            </Label>
                            <p className="text-xs text-muted-foreground mt-1">
                              {option.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full" 
                  variant="enterprise"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    isLogin ? "Signing in..." : "Creating account..."
                  ) : (
                    <>
                      {isLogin ? "Sign In" : "Sign Up"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>
              Need help? Contact{" "}
              <a href="#" className="text-primary hover:underline">
                support@finpilot.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;