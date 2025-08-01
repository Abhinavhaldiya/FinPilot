import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DollarSign, Lock, Mail, Building, ArrowRight, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1500);
  };

  const handleDemoLogin = (role: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

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
            <Eye className="w-5 h-5" />
            <span>Transparency comes first</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:text-left">
            <h3 className="text-2xl font-bold mb-2">Welcome back</h3>
            <p className="text-muted-foreground">
              Sign in to your FinPilot account
            </p>
          </div>

          <Tabs defaultValue="login" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="demo">Demo Access</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Account Login</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
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

                    <Button
                      type="submit"
                      className="w-full"
                      variant="enterprise"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        "Signing in..."
                      ) : (
                        <>
                          Sign In
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="demo">
              <Card>
                <CardHeader>
                  <CardTitle>Try Demo Access</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground mb-4">
                    Experience FinPilot with different user roles
                  </p>

                  <Button
                    variant="outline"
                    className="w-full justify-between"
                    onClick={() => handleDemoLogin('employee')}
                    disabled={isLoading}
                  >
                    <span>Login as Employee</span>
                    <div className="w-2 h-2 bg-accent rounded-full" />
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-between"
                    onClick={() => handleDemoLogin('manager')}
                    disabled={isLoading}
                  >
                    <span>Login as Manager</span>
                    <div className="w-2 h-2 bg-warning rounded-full" />
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-between"
                    onClick={() => handleDemoLogin('finance')}
                    disabled={isLoading}
                  >
                    <span>Login as Finance</span>
                    <div className="w-2 h-2 bg-success rounded-full" />
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

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

export default Login;