import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const bgImageUrl =
  "https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=2515&auto=format&fit=crop";

const Login = () => {
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  const [registerUser, { data: registerData, error: registerError, isLoading: registerIsLoading, isSuccess: registerIsSuccess }] = useRegisterUserMutation();
  const [loginUser, { data: loginData, error: loginError, isLoading: loginIsLoading, isSuccess: loginIsSuccess }] = useLoginUserMutation();

  const navigate = useNavigate();

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleRegistration = async (e, type) => {
    e.preventDefault();
    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  };

  useEffect(() => {
    if (registerIsSuccess) {
      toast.success(registerData?.message || "Signup successful. Please log in.");
    }
    if (registerError) {
      toast.error(registerError.data?.message || "Signup Failed");
    }
    if (loginIsSuccess) {
      toast.success(loginData?.message || "Login successful.");
      navigate("/");
    }
    if (loginError) {
      toast.error(loginError.data?.message || "Login Failed");
    }
  }, [
    loginIsSuccess,
    registerIsSuccess,
    loginData,
    registerData,
    loginError,
    registerError,
    navigate,
  ]);

  return (
    <div className="w-full min-h-screen flex flex-col lg:grid lg:grid-cols-2 bg-stone-50 dark:bg-stone-950">
      
      
      <div className="relative w-full h-60 lg:h-full">
        
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImageUrl})` }}
        />
        
        
        <div className="absolute inset-0 bg-stone-950/60" />

       <div className="relative h-full flex flex-col justify-center mt-18 pt-24 p-6 text-white lg:p-10">
           <p className="mt-2 lg:mt-4 text-lg text-stone-300 max-w-md">
            "The only true wisdom is in knowing you know nothing." – Socrates
          </p>
        </div>
      </div>

      
      <div className="flex items-center justify-center py-12 px-4">
        <div className="mx-auto grid w-[400px] gap-6">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-stone-200 dark:bg-stone-900 rounded-sm">
              <TabsTrigger value="signup" className="rounded-sm">Sign Up</TabsTrigger>
              <TabsTrigger value="login" className="rounded-sm">Login</TabsTrigger>
            </TabsList>

            
            <TabsContent value="signup">
              <Card className="bg-transparent border-none shadow-none">
                <CardHeader>
                  <CardTitle className="font-serif text-3xl">Register</CardTitle>
                  <CardDescription>
                    Become a member to begin your intellectual journey.
                  </CardDescription>
                </CardHeader>
                <form onSubmit={(e) => handleRegistration(e, "signup")}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input name="name" value={signupInput.name} onChange={(e) => changeInputHandler(e, "signup")} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input name="email" type="email" value={signupInput.email} onChange={(e) => changeInputHandler(e, "signup")} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input name="password" type="password" value={signupInput.password} onChange={(e) => changeInputHandler(e, "signup")} required />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full" disabled={registerIsLoading}>
                      {registerIsLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Create Account
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            
            <TabsContent value="login">
              <Card className="bg-transparent border-none shadow-none">
                <CardHeader>
                  <CardTitle className="font-serif text-3xl">Welcome Back</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your account.
                  </CardDescription>
                </CardHeader>
                <form onSubmit={(e) => handleRegistration(e, "login")}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input name="email" type="email" value={loginInput.email} onChange={(e) => changeInputHandler(e, "login")} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input name="password" type="password" value={loginInput.password} onChange={(e) => changeInputHandler(e, "login")} required />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full" disabled={loginIsLoading}>
                      {loginIsLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Login
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Login;
