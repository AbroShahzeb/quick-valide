import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { isEmail } from "validator";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";

import GoogleIcon from "../assets/google.svg";
import EyeOpen from "../assets/eye-open.svg";
import EyeClosed from "../assets/eye-closed.svg";
import { request } from "../helpers/requestHelper";

const clientId =
  "933017194074-dp2kaj9jolvebu8u14uluqms0mibj9e2.apps.googleusercontent.com";

function Login() {
  const navigate = useNavigate();

  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(function () {
    document.title = "Login";
  }, []);

  async function onSubmit(data) {
    console.log(data);
    const res = await request(
      "https://api.quickvalide.com/api/Auth/login",
      "POST",
      data
    );
    navigate("/dashboard");
  }

  const googleLogin = useGoogleLogin({
    onSuccess: (response) => {
      console.log(response);

      // Handle successful login
    },

    onFailure: (error) => {
      console.error(error);
    },
  });

  return (
    <main className="w-full min-h-screen flex">
      <div className="md:flex hidden min-h-screen relative overflow-hidden bg-accent-1 bg-opacity-75 w-[30%] lg:w-[45%]">
        <p className="text-text-primary text-9xl top-1/2 -translate-y-1/2 absolute opacity-20 font-bold">
          Ideas to Reality
        </p>
      </div>
      <div className="flex items-center justify-center w-full relative">
        <Link
          to="/"
          className="absolute top-5 left-5 text-sm p-2 text-accent-2 font-medium hover:bg-accent-2 bg-white hover:text-white transition-all rounded-full"
        >
          &larr; Back to home
        </Link>
        <div className="flex md:w-[30rem] flex-col gap-5 px-5 py-8 rounded-lg border-[1px] bg-white border-gray-300 w-[90%] sm:w-[25rem]">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col items-center gap-1">
              <h2 className="text-2xl text-center font-medium text-text-primary">
                Welcome back
              </h2>
              <p className="text-text-secondary text-xs">
                Glad to see you again, let the magic begin
              </p>
            </div>

            {/* <div className="w-full">
              <GoogleLogin
                className="w-full"
                onSuccess={onSuccess}
                onFailure={onFailure}
                theme="outline"
                size="large"
                logo_alignment="center"
                text="Continue with Google"
                width={400}
              />
            </div> */}

            <div className="flex flex-col gap-4">
              <div
                role="button"
                onClick={() => googleLogin()}
                className="flex items-center justify-center gap-3 text-sm sm:text-md p-3 border-[1px] border-gray-200 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                <img src={GoogleIcon} alt="Google icon" />
                <p className="text-sm font-medium text-text-primary">
                  Continue with Google
                </p>
              </div>

              <div className="bg-text-secondary bg-opacity-75 w-full h-[1px] my-1 flex items-center justify-center text-text-secondary text-sm">
                <span className="p-1 bg-white">or</span>
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Email address"
                  className="p-2 py-3 border-[1px] input border-gray-200 rounded-md w-full focus:outline-none focus:border-accent-2 text-sm  text-text-primary"
                  {...register("email", {
                    required: "Email is required",
                    validate: (value) =>
                      isEmail(value) || "Invalid email provided",
                  })}
                />
                <p className="absolute top-0 transition-all -translate-y-1/2 left-2 text-xs p-1 px-2 bg-accent-2 rounded-md text-white">
                  Email address
                </p>
                {errors?.email && (
                  <p className="my-1 text-error text-sm font-medium">
                    {errors?.email?.message}
                  </p>
                )}
              </div>
              <div>
                <div className="flex items-center w-full relative">
                  <input
                    type={isPasswordShown ? "text" : "password"}
                    placeholder="Password"
                    className="p-2 py-3 border-[1px] input border-gray-200 rounded-md w-full mr-auto focus:outline-none focus:border-accent-2 text-sm  text-text-primary"
                    {...register("password", {
                      required: "Password is required",
                      minLength: [
                        8,
                        "Password cannot be less than 8 characters",
                      ],
                    })}
                  />
                  <p className="absolute top-0 transition-all -translate-y-1/2 left-2 text-xs p-1 px-2 bg-accent-2 rounded-md text-white">
                    Password
                  </p>

                  <img
                    src={isPasswordShown ? EyeClosed : EyeOpen}
                    alt="Eye open icon"
                    className={`absolute top-1/2 -translate-y-1/2 right-2 ${
                      isPasswordShown ? "mt-3 -mr-[20px]" : "mt-1"
                    }`}
                    width={isPasswordShown ? 48 : 32}
                    height={isPasswordShown ? 48 : 32}
                    onClick={() => setIsPasswordShown(!isPasswordShown)}
                  />
                </div>
                {errors?.password && (
                  <p className="my-1 text-[#e74c3c] text-sm font-medium">
                    {errors?.password?.message}
                  </p>
                )}
              </div>

              <a
                href="#"
                className="text-xs font-medium text-accent-2 self-end"
              >
                Forgot password?
              </a>
              <button
                type="submit"
                className="p-2  text-md hover:bg-opacity-80 font-medium text-white bg-accent-1 rounded-md"
              >
                Login
              </button>
            </div>

            <div className="flex items-center text-sm text-text-primary gap-1 self-center">
              <p>Don't have an account?</p>
              <Link to="/register" className="text-accent-2 font-semibold">
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Login;
